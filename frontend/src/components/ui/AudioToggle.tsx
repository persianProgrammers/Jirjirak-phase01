import { useState } from 'react';
import { motion } from 'motion/react';

export function AudioToggle() {
  const [isMuted, setIsMuted] = useState(true);

  // Colors
  const activeColor = "#FFF083";
  const mutedColor = "rgba(255,255,255,0.3)";

  return (
    <button
      onClick={() => setIsMuted(!isMuted)}
      className="relative w-10 h-10 lg:w-[50px] lg:h-[50px] flex items-center justify-center cursor-pointer group pointer-events-auto bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 hover:border-brand-yellow/40 transition-all duration-500 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5)] overflow-hidden shrink-0"
      aria-label={isMuted ? "Unmute sound" : "Mute sound"}
    >
      {/* Ambient Background Glow when active */}
      <div 
        className={`absolute inset-0 rounded-full transition-opacity duration-1000 pointer-events-none ${isMuted ? 'opacity-0' : 'opacity-100'}`} 
        style={{ background: 'radial-gradient(circle at center, rgba(255,240,131,0.15) 0%, transparent 70%)' }} 
      />

      {/* Gramophone Icon Container */}
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none pr-0.5">
        <svg viewBox="-10 -10 68 68" className="w-[1.7rem] h-[1.7rem] lg:w-[2.2rem] lg:h-[2.2rem] drop-shadow-md overflow-visible" fill="none" strokeLinecap="round" strokeLinejoin="round">
          
          {/* Emissions: Sound Waves, Particles & Notes */}
          <motion.g
            initial={false}
            animate={{ opacity: isMuted ? 0 : 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Floating Musical Note */}
            <motion.g
              animate={{ 
                x: isMuted ? 0 : -8, 
                y: isMuted ? 0 : -14, 
                opacity: isMuted ? 0 : [0, 1, 0], 
                rotate: isMuted ? 0 : [0, -15, 10] 
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
            >
              <path d="M 12 18 L 12 10 L 17 8 L 17 12 M 12 13 L 17 11" stroke={activeColor} strokeWidth="1" />
              <circle cx="10" cy="18" r="2" fill={activeColor} stroke="none" />
              <circle cx="15" cy="17" r="2" fill={activeColor} stroke="none" />
            </motion.g>

            {/* Magic Audio Frequencies (Particles) */}
            <motion.circle cx="4" cy="18" r="1" fill={activeColor} stroke="none"
              animate={{ x: isMuted ? 0 : -10, y: isMuted ? 0 : -6, opacity: [0, 0.8, 0], scale: [0.5, 1.5, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.2 }} />
            <motion.circle cx="8" cy="10" r="1.5" fill={activeColor} stroke="none"
              animate={{ x: isMuted ? 0 : -8, y: isMuted ? 0 : -8, opacity: [0, 0.6, 0], scale: [0.5, 2, 0.5] }}
              transition={{ duration: 2.7, repeat: Infinity, ease: "easeOut", delay: 0.8 }} />
          </motion.g>

          {/* --- ULTRA-DETAILED GRAMOPHONE V2 --- */}
          <g stroke={isMuted ? mutedColor : "white"} strokeWidth="1.5" className="transition-colors duration-500">
            
            {/* Base Cabinet */}
            <rect x="20" y="34" width="22" height="8" rx="1.5" fill="#0A0A0A" />
            <line x1="18" y1="34" x2="44" y2="34" strokeWidth="2" />
            <line x1="22" y1="42" x2="40" y2="42" strokeWidth="1" opacity="0.5" />
            
            {/* Ornamental Feet */}
            <path d="M 22 42 L 20 45 M 40 42 L 42 45" strokeWidth="2" strokeLinecap="round" />

            {/* Base Plaques & Details */}
            <circle cx="25" cy="38" r="1" fill={isMuted ? mutedColor : "white"} stroke="none" className="transition-colors duration-500" />
            <line x1="29" y1="38" x2="35" y2="38" strokeWidth="1" />

            {/* Mechanical Hand Crank (Spins continuously when playing) */}
            <motion.g
              animate={{ rotate: isMuted ? 0 : 360 }}
              style={{ transformOrigin: "42px 38px" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="42" cy="38" r="1.5" fill="#0A0A0A" />
              <line x1="42" y1="38" x2="46" y2="41" strokeWidth="1.5" />
              <circle cx="46" cy="41" r="1.5" fill={isMuted ? mutedColor : "white"} stroke="none" className="transition-colors duration-500" />
            </motion.g>

            {/* Turntable Platter */}
            <line x1="24" y1="30" x2="38" y2="30" strokeWidth="2" />
            
            {/* Spindle */}
            <line x1="31" y1="26" x2="31" y2="30" strokeWidth="1.5" />

            {/* Spinning Record (Dashed line that rotates mechanically) */}
            <motion.line 
              x1="26" y1="28" x2="36" y2="28" 
              stroke={isMuted ? mutedColor : activeColor} 
              strokeWidth="1.5" 
              strokeDasharray={isMuted ? "none" : "2 2"}
              animate={{ strokeDashoffset: isMuted ? 0 : -20 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            />

            {/* Multi-jointed Tonearm (Drops onto the record) */}
            <motion.g
              initial={false}
              animate={{ rotate: isMuted ? -22 : 0 }}
              style={{ transformOrigin: "36px 28px" }}
              transition={{ duration: 0.6, ease: "backOut" }}
            >
              {/* Main Arm */}
              <path d="M 36 28 L 36 22 L 28 25 L 26 27.5" fill="none" strokeWidth="1.5" />
              {/* Counterweight */}
              <circle cx="36" cy="28" r="2" fill="#0A0A0A" />
              {/* Needle Head/Stylus */}
              <path d="M 26 27.5 L 25 29" strokeWidth="1" />
            </motion.g>

            {/* Heavy Brass Horn Neck (Steampunk Pipe) */}
            <path d="M 38 34 C 42 20 35 15 28 14" fill="none" strokeWidth="2.5" />
            
            {/* Neck Segments (Industrial details) */}
            <line x1="39.5" y1="27" x2="41.5" y2="26" strokeWidth="1" />
            <line x1="36.5" y1="21" x2="38.5" y2="19" strokeWidth="1" />
            <line x1="32" y1="16" x2="34" y2="14" strokeWidth="1" />

            {/* 3D Fluted Horn Bell (Breathes and vibrates with the music) */}
            <motion.g
              animate={isMuted ? { scale: 1, rotate: 0 } : { scale: [1, 1.03, 1], rotate: [0, -2, 1, 0] }}
              style={{ transformOrigin: "28px 14px" }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              stroke={isMuted ? mutedColor : activeColor}
            >
              {/* Main Bell Silhouette */}
              <path d="M 28 14 C 22 14 14 8 8 4 C 4 8 2 14 2 20 C 6 26 18 20 28 14 Z" 
                fill={isMuted ? "none" : "rgba(255, 240, 131, 0.12)"} 
                strokeWidth="1.5" strokeLinejoin="round" className="transition-all duration-500" />
                
              {/* Internal Fluting (Creates the 3D trumpet volume effect) */}
              <path d="M 28 14 C 20 14 12 12 4 12" fill="none" strokeWidth="0.8" opacity="0.6" />
              <path d="M 28 14 C 20 14 12 16 6 18" fill="none" strokeWidth="0.8" opacity="0.6" />
              <path d="M 28 14 C 22 14 16 10 7 7" fill="none" strokeWidth="0.8" opacity="0.6" />
              
              {/* Inner depth ring at the bell opening */}
              <ellipse cx="6" cy="12" rx="1.5" ry="7" strokeWidth="0.5" opacity="0.4" transform="rotate(30 6 12)" />
            </motion.g>

          </g>
        </svg>
      </div>
    </button>
  );
}
