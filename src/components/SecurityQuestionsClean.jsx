import React, { useState } from 'react';
import { Shield, Check, X } from 'lucide-react';

export function SecurityQuestionsClean({ onVerify, onCancel, mode = 'create' }) {
  const [questions, setQuestions] = useState([
    { id: 1, question: '', answer: '' },
    { id: 2, question: '', answer: '' },
    { id: 3, question: '', answer: '' }
  ]);

  const [answers, setAnswers] = useState(['', '', '']);
  const [currentStep] = useState(mode === 'create' ? 'setup' : 'verify');

  const predefinedQuestions = [
    "What was the name of your first pet?",
    "What is your mother's maiden name?",
    "What was the name of your first school?",
    "What is your favorite childhood memory?",
    "What was your first job?",
    "What is the name of your favorite book?",
    "What city were you born in?",
    "What is your favorite movie?",
    "What was your childhood nickname?",
    "What is your favorite food?"
  ];

  const handleQuestionChange = (index, field, value) => {
    if (mode === 'create') {
      const updated = [...questions];
      updated[index][field] = value;
      setQuestions(updated);
    }
  };

  const handleAnswerChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSetupComplete = () => {
    // Validate that all questions and answers are filled
    const isValid = questions.every(q => q.question.trim() && q.answer.trim());
    if (isValid) {
      onVerify(questions);
    }
  };

  const handleVerifyComplete = () => {
    // In a real implementation, this would verify against stored answers
    // For now, just pass the answers
    onVerify(answers);
  };

  if (currentStep === 'setup') {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Set Up Security Questions</h2>
              <p className="text-gray-600">Create 3 security questions to protect your ZenCode room</p>
            </div>
          </div>

          <div className="space-y-6">
            {questions.map((q, index) => (
              <div key={q.id} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question {index + 1}
                  </label>
                  {mode === 'create' ? (
                    <select
                      value={q.question}
                      onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select a question...</option>
                      {predefinedQuestions.map((question, qIndex) => (
                        <option key={qIndex} value={question}>{question}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700">
                      {q.question}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Answer {index + 1}
                  </label>
                  <input
                    type="text"
                    value={q.answer}
                    onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                    placeholder="Your answer..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-4 mt-8">
            <button
              onClick={onCancel}
              className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSetupComplete}
              className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all duration-200"
            >
              Set Up Security
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Verify mode
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Security Verification</h2>
            <p className="text-gray-600">Answer the security questions to access this room</p>
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={q.id}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {q.question}
              </label>
              <input
                type="text"
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                placeholder="Your answer..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>

        <div className="flex space-x-4 mt-8">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleVerifyComplete}
            className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all duration-200"
          >
            Verify Access
          </button>
        </div>
      </div>
    </div>
  );
}
