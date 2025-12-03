import React, { useEffect, useState, useRef, ReactNode } from 'react';

// --- Custom Cursor ---
export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, input, textarea, .clickable');
      setIsHovering(!!isClickable);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <div className="hidden md:block">
      <div 
        className="fixed top-0 left-0 pointer-events-none z-[60] rounded-none bg-primary mix-blend-difference transition-transform duration-100 ease-out will-change-transform rotate-45"
        style={{
          width: isHovering ? '24px' : '12px',
          height: isHovering ? '24px' : '12px',
          transform: `translate(${position.x - (isHovering ? 12 : 6)}px, ${position.y - (isHovering ? 12 : 6)}px) scale(${isClicking ? 0.8 : 1})`
        }}
      />
      <div 
        className="fixed top-0 left-0 pointer-events-none z-[59] rounded-full border-2 border-secondary transition-transform duration-300 ease-out will-change-transform"
        style={{
          width: '40px',
          height: '40px',
          transform: `translate(${position.x - 20}px, ${position.y - 20}px) scale(${isHovering ? 1.5 : 1})`,
          opacity: 0.7
        }}
      />
    </div>
  );
};

// --- Typewriter Effect ---
interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export const Typewriter: React.FC<TypewriterProps> = ({ 
  words, 
  typingSpeed = 100, 
  deletingSpeed = 50, 
  pauseTime = 2000 
}) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), pauseTime);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="font-mono text-accent bg-dark/80 px-2 inline-block min-h-[1.5em]">
      {`${words[index].substring(0, subIndex)}${blink ? '|' : ' '}`}
    </span>
  );
};

// --- Fade In Animation ---
interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'none';
}

export const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "", direction = 'up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const getTransform = () => {
    if (!isVisible) {
      switch(direction) {
        case 'up': return 'translate-y-8';
        case 'left': return '-translate-x-8';
        case 'right': return 'translate-x-8';
        default: return '';
      }
    }
    return 'translate-y-0 translate-x-0';
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${isVisible ? 'opacity-100' : 'opacity-0'} ${getTransform()}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'black';
}

export const useUiSound = () => {
  const playHover = () => {
    // Placeholder for sound
  };

  const playClick = () => {
    // Placeholder for sound
  };

  return { playHover, playClick };
};

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const { playHover, playClick } = useUiSound();
  const baseStyle = "px-8 py-3 font-bold uppercase tracking-wider transition-all duration-100 border-2 border-black clickable active:scale-95 active:border-accent active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-sm md:text-base";
  
  const variants = {
    primary: "bg-primary text-black shadow-comic hover:shadow-comic-lg hover:-translate-y-1",
    secondary: "bg-secondary text-white shadow-comic hover:shadow-comic-lg hover:-translate-y-1",
    black: "bg-black text-white shadow-[4px_4px_0px_0px_#888] hover:shadow-[6px_6px_0px_0px_#888] hover:-translate-y-1",
    outline: "bg-transparent text-current hover:bg-black hover:text-white shadow-comic hover:shadow-comic-lg hover:-translate-y-1"
  };

  return (
    <button 
      onMouseEnter={playHover}
      onClick={(e) => {
        playClick();
        props.onClick?.(e);
      }}
      className={`${baseStyle} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

// --- Comic Panel Wrapper ---
interface ComicPanelProps {
  children: ReactNode;
  variant?: 'dark' | 'light' | 'color';
  className?: string;
  narrative?: string;
  id?: string;
}

export const ComicPanel: React.FC<ComicPanelProps> = ({ children, variant = 'dark', className = '', narrative, id }) => {
  const bgClass = {
    dark: 'bg-dark text-white',
    light: 'bg-white text-black',
    color: 'bg-secondary text-white',
  }[variant];

  return (
    <section id={id} className={`relative border-[6px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] flex flex-col h-full ${bgClass} ${className}`}>
      {narrative && (
        <div className="absolute top-0 left-0 bg-white text-black border-r-4 border-b-4 border-black px-4 py-2 font-bold font-mono text-xs md:text-sm uppercase tracking-widest z-30 pointer-events-none whitespace-nowrap">
          {narrative}
        </div>
      )}
      {children}
    </section>
  );
};

// --- Sticker Component ---
interface StickerProps {
  src: string;
  alt: string;
  className?: string;
  rotate?: number;
}

export const Sticker: React.FC<StickerProps> = ({ src, alt, className = '', rotate = 0 }) => {
  return (
    <div 
      className={`absolute z-10 p-2 bg-white border-4 border-white shadow-comic transform transition-transform hover:scale-110 duration-300 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-200/90 shadow-sm rotate-1 z-20" style={{clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)'}}></div>
      <img src={src} alt={alt} className="w-full h-full object-cover border border-gray-200 grayscale hover:grayscale-0 transition-all" />
    </div>
  );
};

// --- Secret Overlay ---
interface SecretOverlayProps {
  isActive: boolean;
  onClose: () => void;
}

export const SecretOverlay: React.FC<SecretOverlayProps> = ({ isActive, onClose }) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center overflow-hidden p-4">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: 'repeating-conic-gradient(from 0deg, transparent 0deg, transparent 10deg, #fff 10deg, #fff 11deg)'
      }}></div>
      
      <div className="relative z-10 text-center p-8 md:p-12 border-8 border-primary bg-black text-white transform rotate-2 shadow-[20px_20px_0px_0px_#FF355E] max-w-2xl w-full animate-shake">
        <h1 className="text-6xl md:text-8xl font-display font-black text-primary mb-4 animate-pulse">GOD MODE</h1>
        <h2 className="text-2xl md:text-4xl font-mono font-bold text-secondary mb-8">DIMENSION FRACTURED</h2>
        <p className="text-lg md:text-xl font-bold uppercase tracking-widest mb-8 text-white/80">
          Physics Engine: OFF<br/>
          Reality: UNSTABLE
        </p>
        <Button variant="primary" onClick={onClose} className="text-xl py-4 px-12 animate-bounce">
          RETURN TO BATTLE
        </Button>
      </div>
    </div>
  );
};

// --- Loading Screen ---
interface LoadingScreenProps {
  onFinished: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [message, setMessage] = useState("INITIALIZING NARRATIVE ENGINE...");

  const messages = [
    "INITIALIZING NARRATIVE ENGINE...",
    "LOADING MANGA PANELS...",
    "SYNCHRONIZING LORE...",
    "GENERATING WORLD...",
    "ESTABLISHING CONNECTION...",
    "READY PLAYER ONE..."
  ];

  useEffect(() => {
    const msgInterval = setInterval(() => {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      setMessage(randomMsg);
    }, 600);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(msgInterval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1; 
      });
    }, 150);

    return () => {
      clearInterval(progressInterval);
      clearInterval(msgInterval);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onFinished, 800);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, onFinished]);

  if (progress >= 100 && isExiting) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-transform duration-700 ease-in-out -translate-y-full pointer-events-none">
      </div>
    );
  }
  
  return (
    <div className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-8 transition-transform duration-700 ease-in-out ${isExiting ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="w-full max-w-md relative">
        <div className="flex justify-between items-end mb-2 font-mono text-primary text-xs md:text-sm font-bold">
           <span>SYSTEM_BOOT_SEQUENCE</span>
           <span>V2.5.0</span>
        </div>
        
        <div className="w-full h-6 border-2 border-white p-1">
           <div 
             className="h-full bg-secondary transition-all duration-200 ease-out relative overflow-hidden"
             style={{width: `${progress}%`}}
           >
             <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.2)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2)_75%,transparent_75%,transparent)] bg-[length:10px_10px]"></div>
           </div>
        </div>

        <div className="flex justify-between items-start mt-2 font-mono font-bold">
           <span className="text-white text-xs md:text-sm animate-pulse">{message}</span>
           <span className="text-primary text-xl">{Math.min(progress, 100)}%</span>
        </div>
      </div>
    </div>
  );
};