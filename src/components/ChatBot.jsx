import React, { useState, useRef, useEffect } from 'react';

const ChatBot = ({ documents }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Zenloop study assistant. I can help answer questions about your study materials. What would you like to know?",
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage) => {
    // Simple simulation - in production, this would connect to an AI API
    const studyKeywords = ['study', 'learn', 'understand', 'explain', 'what is', 'how to'];
    const docKeywords = documents.flatMap(doc => 
      doc.title.toLowerCase().split(' ')
    );
    
    const hasStudyContent = studyKeywords.some(keyword => 
      userMessage.toLowerCase().includes(keyword)
    );
    
    const hasDocReference = docKeywords.some(keyword => 
      userMessage.toLowerCase().includes(keyword) && keyword.length > 3
    );

    if (hasStudyContent && hasDocReference) {
      return "Based on your study materials, I can help explain concepts. For more detailed answers, I'd need to connect to an AI service that can analyze your documents.";
    } else if (hasStudyContent) {
      return "I'm here to help with your studies! To provide the best assistance, please make sure to add your study materials to the Documents section first.";
    } else {
      return "I'm your Zenloop study assistant. I specialize in helping with academic questions and study materials. How can I assist you with your learning today?";
    }
  };

  const sendMessage = async () => {
    if (inputMessage.trim()) {
      const userMessage = {
        id: Date.now(),
        text: inputMessage,
        sender: 'user',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      setIsTyping(true);

      // Simulate AI thinking and response
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          text: simulateAIResponse(inputMessage),
          sender: 'bot',
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chatbot">
      <div className="chat-header">
        <h2>Study Assistant</h2>
        <span className="status">Online</span>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-content">
              <p>{message.text}</p>
              <span className="timestamp">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message bot">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about your studies..."
          disabled={isTyping}
        />
        <button onClick={sendMessage} disabled={isTyping || !inputMessage.trim()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
