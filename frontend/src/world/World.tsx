import { useState, useEffect } from 'react';

export default function World() {
  const [isLoaded, setIsLoaded] = useState(false);
  const src = '/assets/images/ui/top-view.png';

  useEffect(() => {
    const img = new Image();
    img.src = src;
    if (img.complete && img.naturalWidth > 0) {
      setIsLoaded(true);
      return;
    }
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setIsLoaded(true);
  }, [src]);

  return (
    <div className="relative w-full flex items-center justify-end pointer-events-none select-none">
      <div className="relative w-[110%] flex items-center justify-end">
        {/* Ambient Backlight Glow */}
        <div className="absolute inset-0 max-w-4xl mx-auto h-[70%] top-[15%] rounded-full blur-[100px] bg-brand-yellow/15 pointer-events-none -z-10" />

        <img
          src={src}
          alt="Jirjirak Studio Buildings - Top View"
          draggable={false}
          className={`w-full max-w-none h-auto max-h-[90vh] object-contain transition-all duration-1000 ease-out select-none drop-shadow-[0_16px_40px_rgba(0,0,0,0.22)] ${
            isLoaded 
              ? 'blur-0 scale-100 opacity-100' 
              : 'blur-xl scale-[1.03] opacity-60'
          }`}
        />
      </div>
    </div>
  );
}
