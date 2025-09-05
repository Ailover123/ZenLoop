import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function ZenCodeEntry() {
  const [zenCode, setZenCode] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (zenCode.trim()) {
      navigate("/zen-code/" + zenCode);
    }
  };

  const handleCreate = () => {
    // Logic to create a new room and generate a ZenCode
    // For now, navigate to a placeholder or generate a random code
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    navigate("/zen-code/" + newCode);
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
          <h1 className="text-4xl font-bold mb-6 text-purple-300">💻 ZenCode Room</h1>

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
        </div>
      </div>
    </div>
  );
}

export default ZenCodeEntry;
