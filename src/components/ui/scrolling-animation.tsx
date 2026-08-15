"use client"

import { useEffect, useState, useRef } from "react";
import { 
  Film, 
  Sparkles, 
  Sliders, 
  Scissors, 
  Layers, 
  Volume2, 
  Wand2, 
  Video 
} from "lucide-react";

const editingTools = [
  {
    name: "Premiere Pro",
    tag: "Pr",
    icon: Film,
    color: "from-purple-600 to-blue-600",
    bg: "#00005b",
  },
  {
    name: "After Effects",
    tag: "Ae",
    icon: Sparkles,
    color: "from-indigo-600 to-purple-800",
    bg: "#00005b",
  },
  {
    name: "DaVinci Resolve",
    tag: "Dv",
    icon: Sliders,
    color: "from-red-600 to-yellow-500",
    bg: "#2b0a0a",
  },
  {
    name: "Final Cut Pro",
    tag: "Fc",
    icon: Scissors,
    color: "from-cyan-500 to-blue-600",
    bg: "#0a1f2b",
  },
  {
    name: "Photoshop",
    tag: "Ps",
    icon: Layers,
    color: "from-blue-600 to-cyan-500",
    bg: "#001e36",
  },
  {
    name: "Audition",
    tag: "Au",
    icon: Volume2,
    color: "from-green-600 to-teal-500",
    bg: "#002b1f",
  },
  {
    name: "Blender 3D",
    tag: "3D",
    icon: Wand2,
    color: "from-orange-500 to-amber-600",
    bg: "#2b1a0a",
  },
  {
    name: "CapCut Pro",
    tag: "Cc",
    icon: Video,
    color: "from-emerald-500 to-lime-500",
    bg: "#0a2b16",
  },
];

export function ScrollingAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScroll = rect.height - windowHeight;
      if (totalScroll <= 0) return;
      const currentScroll = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, currentScroll / totalScroll));
      setProgress(rawProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const expandRadius = progress * 280;

  return (
    <div ref={sectionRef} className="min-h-[220vh] bg-[#050505] relative">
      <div className="h-screen flex items-center justify-center p-4 sm:p-8 sticky top-0 overflow-hidden">
        <div className="relative flex items-center justify-center">
          {/* Outer Ring 2 */}
          <div
            className={`w-[320px] h-[320px] sm:w-[580px] sm:h-[580px] rounded-full flex items-center justify-center transition-all duration-500 ${
              progress > 0.6 ? "border-2 border-gray-800/80 shadow-[0_0_50px_rgba(217,253,49,0.1)]" : "border-transparent"
            }`}
          >
            {/* Outer Ring 1 */}
            <div
              className={`w-[260px] h-[260px] sm:w-[480px] sm:h-[480px] rounded-full flex items-center justify-center relative transition-all duration-500 ${
                progress > 0.2 ? "border-2 border-blue-900/40" : "border-transparent"
              }`}
            >
              {/* Gradient Border Inner Circle */}
              <div className="w-[200px] h-[200px] sm:w-[380px] sm:h-[380px] rounded-full bg-gradient-to-r from-lime-400 via-emerald-500 to-cyan-500 p-0.5 flex items-center justify-center relative">
                <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center relative shadow-2xl">
                  
                  {/* 8 Radial Expanding Video Editing Tool Cards */}
                  {editingTools.map((tool, index) => {
                    const angle = (index * Math.PI) / 4;
                    const x = expandRadius * Math.cos(angle);
                    const y = expandRadius * Math.sin(angle);
                    const Icon = tool.icon;

                    return (
                      <div
                        key={tool.name}
                        className="absolute w-16 h-16 sm:w-22 sm:h-22 rounded-2xl overflow-hidden border-2 border-white/20 dark:border-gray-800 shadow-xl transition-transform duration-300 ease-out z-10 flex flex-col items-center justify-center p-2 group hover:scale-110"
                        style={{
                          transform: `translate(${x}px, ${y}px)`,
                          backgroundColor: tool.bg,
                        }}
                      >
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-1 shadow-md`}>
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold text-white tracking-wider">
                          {tool.tag}
                        </span>
                      </div>
                    );
                  })}

                  {/* Central Text Reveal */}
                  <div
                    className={`flex flex-col items-center justify-center relative z-20 transition-all duration-500 px-4 text-center ${
                      progress > 0.4 ? "opacity-100 scale-100" : "opacity-0 scale-90"
                    }`}
                  >
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-1 uppercase">
                      Mastering Every
                    </h2>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--accent-neon)] tracking-tight mb-3 uppercase drop-shadow-[0_0_20px_rgba(217,253,49,0.4)]">
                      Editing Tool
                    </h2>

                    <p className="text-gray-400 text-xs sm:text-sm max-w-xs font-medium leading-relaxed">
                      From Premiere Pro & After Effects to DaVinci Resolve, we deploy industry-grade tools for viral growth.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DemoOne() {
  return (
    <div className="w-full">
      <ScrollingAnimation />
    </div>
  );
}
