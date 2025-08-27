import React, { useState } from 'react';

const Docs = () => {
  const [documents, setDocuments] = useState([]);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocContent, setNewDocContent] = useState('');

  const addDocument = () => {
    if (newDocTitle.trim() && newDocContent.trim()) {
      const newDoc = {
        id: Date.now(),
        title: newDocTitle,
        content: newDocContent,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setDocuments([...documents, newDoc]);
      setNewDocTitle('');
      setNewDocContent('');
    }
  };

  const deleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <div className="docs-page">
      <h1>Study Documents</h1>
      
      <div className="add-doc-section">
        <h2>Add New Document</h2>
        <input
          type="text"
          placeholder="Document Title"
          value={newDocTitle}
          onChange={(e) => setNewDocTitle(e.target.value)}
          className="doc-title-input"
        />
        <textarea
          placeholder="Document Content"
          value={newDocContent}
          onChange={(e) => setNewDocContent(e.target.value)}
          className="doc-content-input"
          rows="6"
        />
        <button onClick={addDocument} className="add-doc-btn">
          Add Document
        </button>
      </div>

      <div className="documents-list">
        <h2>Your Documents ({documents.length})</h2>
        {documents.length === 0 ? (
          <p className="no-docs">No documents yet. Add your first study material!</p>
        ) : (
          documents.map((doc) => (
            <div key={doc.id} className="document-card">
              <div className="doc-header">
                <h3>{doc.title}</h3>
                <button 
                  onClick={() => deleteDocument(doc.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
              <div className="doc-content">
                <p>{doc.content}</p>
              </div>
              <div className="doc-meta">
                <span>Created: {new Date(doc.createdAt).toLocaleDateString()}</span>
                <span>Updated: {new Date(doc.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Docs;
