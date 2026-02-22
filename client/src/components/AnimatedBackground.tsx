import React from 'react';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none w-full h-full z-[-1] bg-background">
      {/* Top right primary blob */}
      <div className="blob bg-primary w-[500px] h-[500px] top-[-10%] right-[-10%] animation-delay-2000"></div>
      
      {/* Bottom left accent blob */}
      <div className="blob bg-accent w-[600px] h-[600px] bottom-[-20%] left-[-10%] animation-delay-4000"></div>
      
      {/* Center muted blob */}
      <div className="blob bg-purple-600/30 w-[400px] h-[400px] top-[40%] left-[30%]"></div>
      
      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
    </div>
  );
}
