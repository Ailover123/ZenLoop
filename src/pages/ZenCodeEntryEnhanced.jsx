import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import { SecurityQuestions } from "../components/SecurityQuestions";

function ZenCodeEntryEnhanced() {
  const [zenCode, setZenCode] = useState("");
  const [showSecurity, setShowSecurity] = useState(false);
  const [securityMode, setSecurityMode] = useState('create');
  const [pendingAction, setPendingAction] = useState(null);
  const navigate = useNavigate();

  const handleJoin = () => {
    if (zenCode.trim()) {
      setSecurityMode('verify');
      setPendingAction('join');
      setShowSecurity(true);
    }
  };

  const handleCreate = () => {
    setSecurityMode('create');
    setPendingAction('create');
    setShowSecurity(true);
  };

  const handleSecurityVerified = (securityData) => {
    setShowSecurity(false);

    if (pendingAction === 'join') {
      navigate("/zen-code/" + zenCode);
    } else if (pendingAction === 'create') {
      // Logic to create a new room with security questions
      const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      // Store security questions with the room
      localStorage.setItem(`zencode_security_${newCode}`, JSON.stringify(securityData));
      navigate("/zen-code/" + newCode);
    }

    setPendingAction(null);
  };

  const handleSecurityCancel = () => {
    setShowSecurity(false);
    setPendingAction(null);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Back Button */}
      <div className="absolute top-8 left-8 z-20">
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg backdrop-blur-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div
          className="w-full max-w-lg rounded-3xl p-10 text-center shadow-2xl"
          style={{
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Shield className="w-8 h-8 text-purple-300" />
            <h1 className="text-4xl font-bold text-purple-300">💻 ZenCode Room</h1>
          </div>

          <p className="text-white/70 mb-8">
            Secure, persistent workspace with AI-powered productivity tools
          </p>

          <div className="flex space-x-4 mb-6">
            <input
              type="text"
              placeholder="Enter code..."
              value={zenCode}
              onChange={(e) => setZenCode(e.target.value)}
              className="flex-grow px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={handleJoin}
              className="py-3 px-6 rounded-xl font-bold text-lg text-white transition-all transform hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #9333ea, #7c3aed)",
                boxShadow: "0 15px 35px rgba(147, 51, 234, 0.3)",
              }}
            >
              Join Room
            </button>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleCreate}
              className="py-3 px-6 rounded-xl font-bold text-lg text-white transition-all transform hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #6b21a8, #8b5cf6)",
                boxShadow: "0 15px 35px rgba(139, 92, 246, 0.3)",
              }}
            >
              Create Room
            </button>
          </div>

          <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center justify-center space-x-2 text-white/60 text-sm">
              <Shield className="w-4 h-4" />
              <span>Protected by security questions</span>
            </div>
          </div>
        </div>
      </div>

      {showSecurity && (
        <SecurityQuestions
          mode={securityMode}
          onVerify={handleSecurityVerified}
          onCancel={handleSecurityCancel}
        />
      )}
    </div>
  );
}

export default ZenCodeEntryEnhanced;
