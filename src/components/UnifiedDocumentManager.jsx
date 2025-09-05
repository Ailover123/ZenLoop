import React, { useState } from 'react';
import { Upload, FileText, Trash2, Download, Eye, Edit3 } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import { useDropzone } from 'react-dropzone';

export function UnifiedDocumentManager({ documents = [], onSave, onDelete }) {
  const [currentDoc, setCurrentDoc] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  const [docContent, setDocContent] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      file: file
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/*': ['.txt', '.md', '.json'],
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: true
  });

  const handleNewDocument = () => {
    setCurrentDoc(null);
    setDocTitle('');
    setDocContent('');
    setIsEditing(true);
  };

  const handleEditDocument = (doc) => {
    setCurrentDoc(doc);
    setDocTitle(doc.title);
    setDocContent(doc.content);
    setIsEditing(true);
  };

  const handleSaveDocument = () => {
    if (!docTitle.trim()) return;

    const docData = {
      id: currentDoc?.id || Date.now(),
      title: docTitle,
      content: docContent,
      files: uploadedFiles,
      updatedAt: new Date().toISOString(),
      createdAt: currentDoc?.createdAt || new Date().toISOString()
    };

    onSave(docData);
    setIsEditing(false);
    setCurrentDoc(null);
    setDocTitle('');
    setDocContent('');
    setUploadedFiles([]);
  };

  const handleDeleteFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Documents</h3>
            <p className="text-white/70">Manage your notes and files</p>
          </div>
        </div>

        <button
          onClick={handleNewDocument}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-purple-500/20"
        >
          <Edit3 className="w-4 h-4" />
          <span>New Document</span>
        </button>
      </div>

      {/* Document Editor */}
      {isEditing && (
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-white">
              {currentDoc ? 'Edit Document' : 'New Document'}
            </h4>
            <div className="flex space-x-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 rounded-xl transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDocument}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-purple-500/20"
              >
                Save Document
              </button>
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Document Title</label>
            <input
              type="text"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              placeholder="Enter document title..."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400/50 focus:bg-white/20 transition-all duration-200"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Attach Files</label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${isDragActive
                ? 'border-purple-400 bg-purple-400/10'
                : 'border-white/20 hover:border-white/30 hover:bg-white/5'
                }`}
            >
              <input {...getInputProps()} />
              <Upload className="w-8 h-8 text-white/50 mx-auto mb-2" />
              <p className="text-white/70">
                {isDragActive ? 'Drop files here...' : 'Drag & drop files or click to select'}
              </p>
              <p className="text-white/50 text-sm mt-1">
                Supports: PDF, DOC, DOCX, TXT, MD, Images
              </p>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4 text-white/60" />
                      <div>
                        <p className="text-white text-sm font-medium">{file.name}</p>
                        <p className="text-white/50 text-xs">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteFile(file.id)}
                      className="text-white/60 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Markdown Editor */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Content</label>
            <div data-color-mode="dark">
              <MDEditor
                value={docContent}
                onChange={setDocContent}
                preview="edit"
                hideToolbar={false}
                visibleDragBar={false}
                height={400}
                className="bg-white/5 border border-white/20 rounded-xl overflow-hidden"
              />
            </div>
          </div>
        </div>
      )}

      {/* Documents List */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
        {documents.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white/50" />
            </div>
            <h4 className="text-white font-semibold text-lg mb-2">No documents yet</h4>
            <p className="text-white/60">Create your first document to get started.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-purple-400" />
              Your Documents ({documents.length})
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h5 className="text-white font-semibold text-lg flex-1">{doc.title}</h5>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditDocument(doc)}
                        className="p-2 text-white/60 hover:text-purple-400 hover:bg-purple-400/10 rounded-lg transition-all duration-200"
                        title="Edit document"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(doc.id)}
                        className="p-2 text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200"
                        title="Delete document"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-white/70 text-sm mb-3 line-clamp-3">
                    {doc.content.replace(/[#*`]/g, '').substring(0, 150)}...
                  </p>

                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>Updated: {new Date(doc.updatedAt).toLocaleDateString()}</span>
                    {doc.files && doc.files.length > 0 && (
                      <span>{doc.files.length} file(s)</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
