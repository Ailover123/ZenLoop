import React from "react";
import MainLayout from "../components/MainLayout";

function Focus() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Blurred glass container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div
          className="w-full max-w-5xl rounded-3xl p-8 shadow-2xl"
          style={{
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <MainLayout />
        </div>
      </div>
    </div>
  );
}

export default Focus;
