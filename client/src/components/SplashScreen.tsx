import { useState, useEffect, useRef } from "react";
import splashVideo from "@assets/19700121_1329_693f25f859a48191a481b6c716a303b0_1765746495663.mp4";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        onComplete();
      });
    }
  }, [onComplete]);

  const handleVideoEnd = () => {
    setIsVisible(false);
    setTimeout(onComplete, 300);
  };

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onComplete, 300);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      data-testid="splash-screen"
    >
      <video
        ref={videoRef}
        src={splashVideo}
        className="max-w-full max-h-full object-contain"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        data-testid="splash-video"
      />
      
      <div className="absolute bottom-20 left-0 right-0 overflow-hidden">
        <div 
          className="whitespace-nowrap text-white text-lg md:text-xl font-medium animate-marquee"
          style={{
            animation: 'marquee 8s linear infinite'
          }}
        >
          Привет, я Бронник, ваш помощник. Добро пожаловать в БФР! &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Привет, я Бронник, ваш помощник. Добро пожаловать в БФР! &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      
      <button
        onClick={handleSkip}
        className="absolute bottom-4 right-8 text-white/70 hover:text-white text-sm px-4 py-2 rounded-full border border-white/30 hover:border-white/60 transition-colors"
        data-testid="button-skip-splash"
      >
        Пропустить
      </button>
    </div>
  );
}
