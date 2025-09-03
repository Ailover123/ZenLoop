import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500 opacity-20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500 opacity-10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-1/4 w-2 h-2 bg-purple-300 rounded-full opacity-60 animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-1 h-1 bg-violet-400 rounded-full opacity-40 animate-bounce"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-indigo-300 rounded-full opacity-30 animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-50 animate-bounce"
          style={{ animationDelay: "1.5s", animationDuration: "3.5s" }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          {/* Glassmorphism card */}
          <div
            className="rounded-3xl p-10 text-center relative overflow-hidden shadow-2xl"
            style={{
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Subtle border glow */}
            <div
              className="absolute inset-0 rounded-3xl opacity-30"
              style={{
                background:
                  "linear-gradient(135deg, rgba(168, 85, 247, 0.3), transparent, rgba(139, 92, 246, 0.3))",
                filter: "blur(1px)",
              }}
            ></div>

            {/* Card content */}
            <div className="relative z-10">
              {/* Subtitle */}
              <p className="text-purple-200 text-sm font-medium mb-4 opacity-80">
                ✨ Your Personal Productivity Hub
              </p>

              {/* Title */}
              <h1
                className="text-7xl font-bold mb-4 animate-pulse"
                style={{
                  background:
                    "linear-gradient(135deg, #c084fc, #a78bfa, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 30px rgba(147, 51, 234, 0.5)",
                }}
              >
                ZenLoop
              </h1>

              {/* Description */}
              <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                Focus Better. Achieve More.
                <br />
                <span className="text-purple-300">
                  Transform your workflow into zen.
                </span>
              </p>

              {/* Buttons container */}
              <div className="space-y-6">
                {/* Focus on Today Button */}
                <button
                  onClick={() => handleNavigate("/focus")}
                  onMouseEnter={() => setHoveredButton("focus")}
                  onMouseLeave={() => setHoveredButton(null)}
                  className="w-full py-5 px-10 rounded-2xl font-bold text-xl text-white relative overflow-hidden transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                  style={{
                    background:
                      hoveredButton === "focus"
                        ? "linear-gradient(135deg, #a855f7 0%, #8b5cf6 50%, #7c3aed 100%)"
                        : "linear-gradient(135deg, #9333ea, #7c3aed)",
                    boxShadow:
                      hoveredButton === "focus"
                        ? "0 25px 50px rgba(147, 51, 234, 0.5), 0 0 30px rgba(147, 51, 234, 0.4)"
                        : "0 15px 35px rgba(147, 51, 234, 0.3)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-white opacity-0 hover:opacity-15 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,255,255,0.3), transparent)",
                    }}
                  ></div>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    🎯 Focus on Today
                  </span>
                </button>

                {/* ZenCode Room Button */}
                <button
                  onClick={() => handleNavigate("/zen-code")}
                  onMouseEnter={() => setHoveredButton("zencode")}
                  onMouseLeave={() => setHoveredButton(null)}
                  className="w-full py-5 px-10 rounded-2xl font-bold text-xl relative overflow-hidden transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                  style={{
                    background:
                      hoveredButton === "zencode"
                        ? "rgba(255, 255, 255, 0.15)"
                        : "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(147, 51, 234, 0.4)",
                    color: "#f3f4f6",
                    boxShadow:
                      hoveredButton === "zencode"
                        ? "0 25px 50px rgba(147, 51, 234, 0.3), 0 0 30px rgba(255, 255, 255, 0.1)"
                        : "0 15px 35px rgba(0, 0, 0, 0.2)",
                    backdropFilter: "blur(15px)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(168, 85, 247, 0.15), rgba(139, 92, 246, 0.15))",
                    }}
                  ></div>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    💻 ZenCode Room
                  </span>
                </button>
              </div>

              {/* Bottom tagline */}
              <p className="text-purple-200 text-xs mt-8 opacity-60">
                Where productivity meets mindfulness
              </p>
            </div>
          </div>

          {/* Floating elements for extra visual appeal */}
          <div
            className="absolute -top-6 -right-6 w-10 h-10 bg-purple-400 opacity-30 rounded-full blur-sm animate-bounce"
            style={{ animationDelay: "0.3s" }}
          ></div>
          <div
            className="absolute -bottom-4 -left-4 w-8 h-8 bg-violet-400 opacity-30 rounded-full blur-sm animate-bounce"
            style={{ animationDelay: "0.7s" }}
          ></div>
          <div
            className="absolute top-1/2 -right-2 w-6 h-6 bg-indigo-400 opacity-20 rounded-full blur-sm animate-bounce"
            style={{ animationDelay: "1.2s" }}
          ></div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black opacity-20 pointer-events-none"></div>
    </div>
  );
}

export default Landing;
