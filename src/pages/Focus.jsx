import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MainLayout from "../components/MainLayout";

function Focus() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500 opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500 opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-10 right-1/3 w-64 h-64 bg-fuchsia-500 opacity-15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 left-1/3 w-56 h-56 bg-cyan-500 opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Floating particles for enhanced ambiance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-purple-300 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-violet-400 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-indigo-300 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }}></div>
        <div className="absolute top-10 left-10 w-2 h-2 bg-fuchsia-300 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '4.2s' }}></div>
        <div className="absolute bottom-20 right-10 w-1.5 h-1.5 bg-cyan-300 rounded-full opacity-35 animate-bounce" style={{ animationDelay: '2.3s', animationDuration: '3.8s' }}></div>
      </div>

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

      {/* Main glass container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div
          className="w-full max-w-7xl rounded-3xl p-10 shadow-2xl relative overflow-hidden"
          style={{
            backdropFilter: "blur(25px)",
            WebkitBackdropFilter: "blur(25px)",
            background: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
          }}
        >
          {/* Subtle animated border glow */}
          <div
            className="absolute inset-0 rounded-3xl opacity-30 animate-pulse"
            style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), transparent, rgba(139, 92, 246, 0.3), transparent, rgba(99, 102, 241, 0.2))',
              filter: 'blur(1px)'
            }}
          ></div>

          {/* Content container */}
          <div className="relative z-10">
            <MainLayout />
          </div>

          {/* Corner accent elements */}
          <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-violet-400/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-lg"></div>

          {/* Edge lighting effects */}
          <div className="absolute top-0 left-1/4 w-32 h-0.5 bg-gradient-to-r from-transparent via-purple-300/40 to-transparent blur-sm"></div>
          <div className="absolute bottom-0 right-1/4 w-24 h-0.5 bg-gradient-to-r from-transparent via-violet-300/40 to-transparent blur-sm"></div>
          <div className="absolute left-0 top-1/4 h-28 w-0.5 bg-gradient-to-b from-transparent via-indigo-300/40 to-transparent blur-sm"></div>
          <div className="absolute right-0 bottom-1/3 h-20 w-0.5 bg-gradient-to-b from-transparent via-purple-300/40 to-transparent blur-sm"></div>
        </div>
      </div>

      {/* Enhanced ambient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
    </div>
  );
}

export default Focus;