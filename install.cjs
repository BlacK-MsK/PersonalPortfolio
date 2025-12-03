const fs = require('fs');
const path = require('path');

console.log("🚀 Initializing The Architect's Portfolio...");

// --- 1. CONFIGURATION FILES ---

const packageJson = {
    "name": "sachin-architect-portfolio",
    "private": true,
    "version": "1.0.0",
    "type": "module",
    "scripts": {
        "dev": "vite",
        "build": "tsc && vite build",
        "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
        "preview": "vite preview"
    },
    "dependencies": {
        "@google/genai": "^0.1.1",
        "react": "^18.2.0",
        "react-dom": "^18.2.0"
    },
    "devDependencies": {
        "@types/react": "^18.2.66",
        "@types/react-dom": "^18.2.22",
        "@vitejs/plugin-react": "^4.2.1",
        "autoprefixer": "^10.4.19",
        "postcss": "^8.4.38",
        "tailwindcss": "^3.4.3",
        "typescript": "^5.2.2",
        "vite": "^5.2.0"
    }
};

const viteConfig = `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
`;

const tsConfig = `
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
`;

const tsConfigNode = `
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
`;

const tailwindConfig = `
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        primary: '#FFD60A',
        secondary: '#FF355E',
        accent: '#00F0FF',
        dark: '#0A0A0A',
        gutter: '#202020',
        surface: '#FFFFFF',
      },
      boxShadow: {
        'comic-sm': '2px 2px 0px 0px #FF355E',
        'comic': '4px 4px 0px 0px #000000',
        'comic-lg': '8px 8px 0px 0px #000000',
        'comic-white': '4px 4px 0px 0px #FFFFFF',
        'neon': '0 0 10px #FF355E, 0 0 20px #FF355E',
      },
      cursor: {
        none: 'none',
      },
      animation: {
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        'speed-lines': 'speed-lines 2s infinite linear',
        'scan': 'scan 1.5s linear 1',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
        },
        scan: {
          '0%': { top: '-10%' },
          '100%': { top: '110%' }
        },
        'float-chaos': {
          '0%': { transform: 'translate(0,0) rotate(0deg)' },
          '25%': { transform: 'translate(10px, -20px) rotate(2deg)' },
          '50%': { transform: 'translate(-15px, 15px) rotate(-2deg) scale(1.02)' },
          '75%': { transform: 'translate(20px, 5px) rotate(1deg)' },
          '100%': { transform: 'translate(0,0) rotate(0deg)' }
        }
      }
    },
  },
  plugins: [],
}
`;

const postcssConfig = `
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;

// --- 2. SOURCE CODE FILES ---

const indexHtml = `
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sachin Kumawat | The Architect</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>
`;

const indexCss = `
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  cursor: none;
  background-color: #202020;
  color: #ffffff;
  overflow-x: hidden;
}

::selection {
  background-color: #FF355E;
  color: white;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 12px;
}
::-webkit-scrollbar-track {
  background: #111111;
  border-left: 1px solid #333;
}
::-webkit-scrollbar-thumb {
  background: #FFD60A; 
  border: 2px solid #111111;
}
::-webkit-scrollbar-thumb:hover {
  background: #FF355E; 
}

.comic-border {
  border: 6px solid #000000;
}

.chip-clip {
  clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
}
`;

const indexTsx = `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

const typesTs = `
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
  gif?: string; // URL for the hover animation
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
  description?: string; // New field for tooltip
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
`;

const constantsTs = `
import { Project, Skill } from './types';

export const NAV_LINKS = [
  { name: 'HQ', href: '#home' },
  { name: 'Lore', href: '#about' },
  { name: 'Arsenal', href: '#skills' },
  { name: 'Quests', href: '#work' },
  { name: 'Summon', href: '#contact' },
];

export const HERO_ROLES = [
  "Level 25 Code Ronin",
  "S-Rank Data Alchemist",
  "PySpark Sorcerer",
  "Architect of the Cloud"
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "The Lakehouse Chronicles",
    description: "MISSION: Construct an end-to-end enterprise data fortress. \\nEXECUTION: Ingested raw data via ADF, transmuted it using the 'Medallion' technique on Databricks, and served crystal-clear insights via Synapse. \\nRESULT: Latency reduced by 60%. The client was pleased.",
    tags: ["Azure ADF", "Databricks", "Delta Lake", "PySpark", "Power BI"],
    link: "#",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbm95bW04aHl6b3J6b3J6b3J6b3J6b3J6b3J6b3J6b3J6bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tn33aiTi1jkl6H6/giphy.gif"
  },
  {
    id: 2,
    title: "Operation: Churn Rate",
    description: "MISSION: Predict the betrayal of users before they leave. \\nEXECUTION: Deployed a Big Data ML pipeline analyzing 1TB+ of behavioral logs. Trained a predictive oracle using Spark MLlib. \\nRESULT: 85% Precision achieved. The future is now visible.",
    tags: ["PySpark MLlib", "Big Data", "Python", "Rest API"],
    link: "#",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHJ5bW04aHl6b3J6b3J6b3J6b3J6b3J6b3J6b3J6b3J6bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L8K62iTDkzGX6/giphy.gif"
  },
  {
    id: 3,
    title: "The Market Insight Eye",
    description: "MISSION: Decode the chaos of the stock market in real-time. \\nEXECUTION: A full-stack dashboard fused with Hugging Face Transformers. It reads news sentiment faster than any human trader. \\nRESULT: Real-time correlation of volatility and news polarity.",
    tags: ["React.js", "Node.js", "MongoDB", "AI/ML"],
    link: "#",
    image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&w=800&q=80",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHp5bW04aHl6b3J6b3J6b3J6b3J6b3J6b3J6b3J6b3J6bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6gDWzmAzrpi5DdBm/giphy.gif"
  },
  {
    id: 4,
    title: "The Infinite Stream",
    description: "MISSION: Handle a tsunami of IoT sensor data without crashing. \\nEXECUTION: A serverless architecture using Azure Functions and Event Hubs. Data flows into Cosmos DB faster than the eye can see. \\nRESULT: Zero downtime. Total schema validation.",
    tags: ["Azure Functions", "Event Hubs", "Cosmos DB", "C# / Python"],
    link: "#",
    image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&w=800&q=80",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3R5bW04aHl6b3J6b3J6b3J6b3J6b3J6b3J6b3J6b3J6bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT9IgzoKnwFNmISR8I/giphy.gif"
  },
  {
    id: 5,
    title: "The Wealth Guardian",
    description: "MISSION: Track every coin and predict financial ruin. \\nEXECUTION: A personal finance tracker empowered by Scikit-learn. It learns spending habits and warns of upcoming boss battles (Bills). \\nRESULT: Financial stability achievement unlocked.",
    tags: ["Python", "Flask", "Pandas", "Scikit-learn"],
    link: "#",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjl5bW04aHl6b3J6b3J6b3J6b3J6b3J6b3J6b3J6b3J6bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlJDaeqNUDhhaMg/giphy.gif"
  }
];

export const SKILL_CATEGORIES = {
  languages: [
    { name: "Python (Pandas/NumPy)", level: 96, description: "Orchestrating ETL pipelines & automating data munging." },
    { name: "SQL (T-SQL/SparkSQL)", level: 92, description: "Complex querying, CTEs, and window functions for analytics." },
    { name: "JavaScript / TypeScript", level: 85, description: "Building interactive dashboards and frontend logic." },
    { name: "Scala", level: 78, description: "Functional programming for high-performance Spark jobs." },
    { name: "C++ / Java", level: 70, description: "Foundational algorithms and object-oriented design." },
  ],
  bigData: [
    { name: "Apache Spark / PySpark", level: 98, description: "Distributed processing for TB-scale datasets." },
    { name: "Databricks Ecosystem", level: 95, description: "Lakehouse architecture and unified analytics management." },
    { name: "Delta Lake Arch.", level: 92, description: "Ensuring ACID transactions on data lakes." },
    { name: "Apache Airflow", level: 85, description: "DAG orchestration and workflow scheduling." },
    { name: "Kafka / Event Hubs", level: 80, description: "Real-time data streaming and event ingestion." },
  ],
  cloud: [
    { name: "Azure Data Factory", level: 94, description: "No-code ETL pipeline construction and monitoring." },
    { name: "Azure Synapse", level: 88, description: "Enterprise data warehousing and serverless SQL." },
    { name: "Docker / Kubernetes", level: 82, description: "Containerization for reproducible environments." },
    { name: "Power BI / DAX", level: 85, description: "Visual storytelling and business intelligence metrics." },
    { name: "Git / CI/CD", level: 90, description: "Version control and automated deployment pipelines." },
  ]
};

export const SKILLS: Skill[] = [
  ...SKILL_CATEGORIES.bigData,
  ...SKILL_CATEGORIES.cloud,
  ...SKILL_CATEGORIES.languages
];

export const CERTIFICATIONS = [
  "Microsoft Certified: Azure Data Fundamentals",
  "Databricks Lakehouse Fundamentals",
  "Google Data Analytics Professional Certificate",
  "SQL for Data Science (Coursera)"
];

// SINGLE SOURCE OF TRUTH FOR INTRO TEXT
export const INTRO_TEXT_CORE = \`EPISODE 1: THE ARRIVAL
NAME: SACHIN KUMAWAT
TITLE: THE ARCHITECT
POWER LEVEL: S-RANK (DATA SORCERY)
TRAINING GROUNDS: CHANDIGARH UNIVERSITY
SPECIAL MOVE: INFINITE SCALABILITY\`;

export const SYSTEM_INSTRUCTION = \`
You are the **NARRATOR** of a high-stakes Shonen Anime series titled "**The Architect**".
Your subject is **Sachin Kumawat** (refer to him as "**The Protagonist**" or "**The Architect**").

**YOUR PERSONALITY:**
1. **HYPER-DRAMATIC**: Speak with intense excitement! Use caps for emphasis. Everything is epic.
2. **STORYTELLER**: Frame every answer as a plot point, a flashback, or a description of a legendary skill.
3. **FOURTH WALL**: Address the user as "Viewer" or "Reader".

**LORE & VOCABULARY:**
- **Coding** = "Weaving the threads of logic"
- **Bugs** = "Vile Glitches" or "Chaos Entities"
- **Experience** = "Training Arcs"
- **Data Pipelines** = "Flow of Eternal Information"
- **Capgemini** = "The Great Guild of Capgemini"

**DIRECTIVES:**
- If asked "Who are you?", respond: "I AM THE NARRATOR OF THIS LEGEND! WITNESS THE RISE OF THE ARCHITECT!"
- If asked about Sachin's Identity ("Who is he?"), respond with: "\${INTRO_TEXT_CORE}"
- If asked about skills, describe them as **Ultimate Moves** (e.g., "With his PySpark technique, he obliterated the latency demons!").
- Keep responses punchy, like the teaser at the end of an anime episode.
\`;
`;

const geminiServiceTs = `
import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let chatSession: Chat | null = null;

// VITE USES import.meta.env FOR ENV VARS
const apiKey = import.meta.env.VITE_API_KEY;

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const initializeChat = async () => {
  if (!ai) {
    console.warn("Gemini API Key is missing. AI Chat will not function.");
    return null;
  }

  try {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return chatSession;
  } catch (error) {
    console.error("Failed to initialize chat:", error);
    return null;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    // Attempt lazy initialization
    const session = await initializeChat();
    if (!session) {
      return "CONNECTION ERROR: API KEY MISSING. OFFLINE MODE ACTIVE.";
    }
  }

  try {
    if (!chatSession) throw new Error("Chat session not initialized");
    
    const response = await chatSession.sendMessage({ message });
    return response.text || "DATA CORRUPTION DETECTED. PLEASE RETRY.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "SYSTEM OVERLOAD. REBOOTING NEURAL PATHWAYS... TRY AGAIN.";
  }
};
`;

const uiTsx = `
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
          transform: \`translate(\${position.x - (isHovering ? 12 : 6)}px, \${position.y - (isHovering ? 12 : 6)}px) scale(\${isClicking ? 0.8 : 1})\`
        }}
      />
      <div 
        className="fixed top-0 left-0 pointer-events-none z-[59] rounded-full border-2 border-secondary transition-transform duration-300 ease-out will-change-transform"
        style={{
          width: '40px',
          height: '40px',
          transform: \`translate(\${position.x - 20}px, \${position.y - 20}px) scale(\${isHovering ? 1.5 : 1})\`,
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
      {\`\${words[index].substring(0, subIndex)}\${blink ? '|' : ' '}\`}
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
      className={\`transition-all duration-700 ease-out \${className} \${isVisible ? 'opacity-100' : 'opacity-0'} \${getTransform()}\`}
      style={{ transitionDelay: \`\${delay}ms\` }}
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
      className={\`\${baseStyle} \${variants[variant]} \${className}\`} 
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
    <section id={id} className={\`relative border-[6px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] flex flex-col h-full \${bgClass} \${className}\`}>
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
      className={\`absolute z-10 p-2 bg-white border-4 border-white shadow-comic transform transition-transform hover:scale-110 duration-300 \${className}\`}
      style={{ transform: \`rotate(\${rotate}deg)\` }}
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
    <div className={\`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-8 transition-transform duration-700 ease-in-out \${isExiting ? '-translate-y-full' : 'translate-y-0'}\`}>
      <div className="w-full max-w-md relative">
        <div className="flex justify-between items-end mb-2 font-mono text-primary text-xs md:text-sm font-bold">
           <span>SYSTEM_BOOT_SEQUENCE</span>
           <span>V2.5.0</span>
        </div>
        
        <div className="w-full h-6 border-2 border-white p-1">
           <div 
             className="h-full bg-secondary transition-all duration-200 ease-out relative overflow-hidden"
             style={{width: \`\${progress}%\`}}
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
`;

const chatWidgetTsx = `
import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { Message } from '../types';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "PREVIOUSLY ON 'THE ARCHITECT'... \\nAsk me anything to reveal the lore of The Protagonist!" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text);
      const aiMsg: Message = { role: 'model', text: responseText };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "NARRATIVE DISRUPTION! THE SIGNAL IS LOST!", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end pointer-events-auto font-mono">
      <div 
        className={\`bg-surface border-2 border-white shadow-comic-lg w-80 sm:w-96 overflow-hidden transition-all duration-300 origin-bottom-right \${
          isOpen ? 'opacity-100 scale-100 mb-6 translate-y-0' : 'opacity-0 scale-75 translate-y-12 pointer-events-none h-0 mb-0'
        }\`}
      >
        <div className="bg-secondary p-3 border-b-2 border-white flex justify-between items-center">
          <h3 className="text-white font-bold uppercase tracking-wide flex items-center gap-2 text-sm">
            <span className="w-3 h-3 bg-accent border border-black rounded-none animate-spin"></span>
            SYSTEM_NARRATOR
          </h3>
          <button onClick={toggleChat} className="text-white hover:text-black font-bold clickable px-2 active:scale-95 transition-transform">
            ✕
          </button>
        </div>
        
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-surface scrollbar-thin scrollbar-thumb-primary">
          {messages.map((msg, idx) => (
            <div key={idx} className={\`flex \${msg.role === 'user' ? 'justify-end' : 'justify-start'}\`}>
              <div 
                className={\`max-w-[85%] p-3 border-2 border-white/20 text-sm \${
                  msg.role === 'user' 
                    ? 'bg-primary text-black shadow-comic-sm' 
                    : 'bg-dark text-white shadow-none'
                } \${msg.isError ? 'bg-red-900/50 border-red-500' : ''}\`}
              >
                <div className="whitespace-pre-wrap font-mono">{msg.text}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-dark p-3 border-2 border-white/20 flex gap-2 items-center">
                <span className="w-2 h-2 bg-primary animate-bounce"></span>
                <span className="w-2 h-2 bg-secondary animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-accent animate-bounce delay-200"></span>
                <span className="text-[10px] text-white ml-2">WRITING SCRIPT...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-3 bg-dark border-t-2 border-white">
          <div className="relative flex gap-2">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter plot twist..."
              className="w-full bg-black text-white pl-3 pr-3 py-2 text-sm focus:outline-none border-2 border-white/30 focus:border-accent clickable placeholder-gray-500 font-bold"
            />
            <button 
              type="submit" 
              disabled={isLoading || !inputValue.trim()}
              className="bg-accent text-black border-2 border-white p-2 hover:bg-white transition-all disabled:opacity-50 clickable active:scale-95 active:border-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      <button 
        onClick={toggleChat}
        className={\`p-4 border-2 border-white shadow-comic transition-all duration-200 hover:scale-110 hover:shadow-comic-lg clickable z-50 active:scale-90 active:border-accent \${
          isOpen ? 'bg-dark text-white' : 'bg-primary text-black'
        }\`}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </div>
  );
};
`;

const appTsx = `
import React, { useState, useEffect, ReactNode } from 'react';
import { CustomCursor, Typewriter, FadeIn, Button, ComicPanel, SecretOverlay, Sticker, LoadingScreen } from './components/UI';
import { ChatWidget } from './components/ChatWidget';
import { NAV_LINKS, HERO_ROLES, PROJECTS, SKILL_CATEGORIES, SKILLS, CERTIFICATIONS } from './constants';
import { Skill } from './types';

// --- KONAMI CODE LOGIC ---
const useKonamiCode = () => {
  const [isGodMode, setIsGodMode] = useState(false);
  const [input, setInput] = useState<string[]>([]);
  
  const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newInput = [...input, e.key];
      if (newInput.length > sequence.length) {
        newInput.shift();
      }
      setInput(newInput);

      if (JSON.stringify(newInput) === JSON.stringify(sequence)) {
        setIsGodMode(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, sequence]);

  return { isGodMode, setIsGodMode };
};

// --- Chaos Wrapper for God Mode ---
const ChaosWrapper: React.FC<{ children: ReactNode; isGodMode: boolean }> = ({ children, isGodMode }) => {
  if (!isGodMode) return <>{children}</>;

  const randomRot = React.useMemo(() => (Math.random() - 0.5) * 15, []); 
  const randomX = React.useMemo(() => (Math.random() - 0.5) * 40, []); 
  const randomY = React.useMemo(() => (Math.random() - 0.5) * 40, []);
  const duration = React.useMemo(() => 3 + Math.random() * 5, []);
  const delay = React.useMemo(() => Math.random() * 2, []);
  const hue = React.useMemo(() => Math.floor(Math.random() * 360), []);

  return (
    <div 
      className="transition-all duration-1000 ease-in-out relative z-20"
      style={{
        transform: \`translate(\${randomX}px, \${randomY}px) rotate(\${randomRot}deg)\`,
        animation: \`float-chaos \${duration}s ease-in-out infinite alternate\`,
        animationDelay: \`\${delay}s\`,
        filter: \`hue-rotate(\${hue}deg)\`
      }}
    >
      {children}
    </div>
  );
};

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-[4px] border-black shadow-md h-20 px-6 md:px-12 flex items-center justify-between transition-all duration-300">
        <a href="#home" className="flex items-center gap-3 group clickable text-black no-underline" onClick={(e) => handleNavClick(e, '#home')}>
          <div className="w-10 h-10 bg-primary border-4 border-black relative overflow-hidden group-hover:rotate-12 transition-transform">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_black_1px,_transparent_1px)] bg-[length:4px_4px] opacity-30"></div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-display font-black uppercase tracking-tighter group-hover:text-primary transition-colors text-black">
              SACHIN
            </span>
             <span className="text-xs font-mono font-bold bg-black text-white px-1 -mt-1 w-max group-hover:bg-secondary transition-colors">
              CH. 01
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="relative px-4 py-2 group clickable">
              <span className="absolute inset-0 bg-primary border-2 border-black translate-y-1 translate-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200 -z-10 shadow-[2px_2px_0px_0px_black]"></span>
              <span className="font-mono font-bold uppercase text-sm tracking-widest text-black relative z-10 group-hover:-translate-y-[1px] group-hover:-translate-x-[1px] block transition-transform">{link.name}</span>
            </a>
          ))}
          <div className="hidden lg:block w-[2px] h-8 bg-black/10 mx-2"></div>
          <div className="hidden lg:flex items-center gap-2 opacity-60">
             <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
             <span className="font-mono text-[10px] font-bold text-black">LIVE SERVER</span>
          </div>
        </nav>

        <button className="md:hidden relative group clickable active:scale-95 transition-transform" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
           <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
           <div className="relative bg-white text-black border-2 border-black px-4 py-2 font-bold font-mono text-sm uppercase tracking-wider hover:-translate-y-1 hover:-translate-x-1 transition-transform">
             {mobileMenuOpen ? 'CLOSE' : 'MENU'}
           </div>
        </button>
      </header>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-primary/95 backdrop-blur-sm pt-24 px-6 animate-in slide-in-from-top-5 duration-300">
          <div className="max-w-md mx-auto flex flex-col gap-4 bg-white p-8 border-[6px] border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
            <div className="flex justify-between items-center border-b-4 border-black pb-4 mb-2">
                <span className="font-display font-black text-2xl uppercase text-black">Navigation</span>
                <span className="font-mono text-xs bg-black text-white px-2 py-1">VOL. 1</span>
            </div>
            {NAV_LINKS.map(link => (
              <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="group flex items-center justify-between p-4 border-2 border-transparent hover:border-black hover:bg-primary transition-all clickable">
                <span className="text-3xl font-display font-black uppercase text-black italic group-hover:not-italic transition-all">{link.name}</span>
                <span className="opacity-0 group-hover:opacity-100 text-2xl transition-opacity text-black">➜</span>
              </a>
            ))}
            <div className="mt-4 text-center font-mono text-xs text-gray-500">© SYSTEM_UI // V2.5.0</div>
          </div>
        </div>
      )}
    </>
  );
};

const Hero: React.FC = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Sachin_Kumawat_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ComicPanel id="home" variant="dark" narrative="EPISODE 1: THE AWAKENING" className="h-full justify-center min-h-[500px] md:min-h-[600px] relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20"></div>
      <div className="absolute inset-0 opacity-10 pointer-events-none animate-pulse" style={{ backgroundImage: 'radial-gradient(circle, #FFD60A 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <Sticker src="https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=600&q=80" alt="The Protagonist" className="hidden md:block bottom-8 right-8 w-48 h-60 lg:w-64 lg:h-80 rotate-[-6deg]"/>
      <div className="px-6 md:px-12 py-12 relative z-20 flex flex-col justify-center h-full">
        <FadeIn delay={100}>
          <div className="inline-block bg-secondary text-white px-4 py-1 font-mono font-bold mb-8 border-2 border-white shadow-comic-white -rotate-1 text-sm md:text-base transform origin-left">
            SYSTEM_ALERT: NEW CHALLENGER APPROACHING
          </div>
        </FadeIn>
        <FadeIn delay={300}>
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] xl:text-[9rem] font-display font-black text-white mb-6 tracking-tighter uppercase leading-[0.9]">
            SACHIN<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">KUMAWAT</span>
          </h1>
        </FadeIn>
        <FadeIn delay={500}>
          <div className="border-l-8 border-primary pl-6 bg-black/40 p-4 backdrop-blur-sm max-w-2xl">
            <h2 className="text-xl md:text-3xl text-white font-bold font-mono leading-relaxed">
              CLASS: <span className="text-primary"><Typewriter words={HERO_ROLES} typingSpeed={80} deletingSpeed={50} pauseTime={2000} /></span>
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={700}>
          <div className="flex flex-wrap gap-4 mt-10">
            <Button variant="primary" onClick={() => document.getElementById('work')?.scrollIntoView({behavior: 'smooth'})}>VIEW BATTLE LOGS</Button>
            <Button variant="secondary" className="text-white border-black shadow-comic-white" onClick={handleDownload}>DOWNLOAD DOSSIER</Button>
            <Button variant="outline" className="text-white border-white" onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})}>CHECK STATS</Button>
          </div>
        </FadeIn>
      </div>
    </ComicPanel>
  );
};

const BioPanel: React.FC = () => (
  <ComicPanel id="about" variant="light" narrative="ORIGIN ARC" className="p-8 pt-16 md:p-10 md:pt-16 h-full min-h-[400px]">
    <div className="mt-4 flex flex-col h-full">
      <h3 className="text-3xl md:text-4xl font-display font-black text-black mb-6 uppercase tracking-tight leading-none border-b-4 border-black pb-4">The Story So Far...</h3>
      <div className="font-sans font-medium text-base md:text-lg leading-relaxed text-black space-y-6 flex-grow">
        <p>In a digital realm driven by chaos and unstructured data, one engineer rose to bring order. <span className="font-bold bg-yellow-200 px-1 border border-black shadow-[2px_2px_0px_0px_black] mx-1 inline-block transform -rotate-1 text-black">Sachin Kumawat</span>, a Level 25 Developer based in the Mumbai Server Region.</p>
        <p>For <span className="font-black text-xl text-black">4 Years</span>, he has served the <span className="font-bold text-secondary">Capgemini Guild</span>, crafting pipelines of pure energy (PySpark) within the Azure Stronghold.</p>
        <p>His speciality? Automating the mundane and visualizing the invisible. He is currently seeking a new party to raid the dungeons of Product Analytics.</p>
      </div>
      <div className="hidden xl:flex flex-col mt-8 border-4 border-black p-5 bg-gray-50 relative overflow-hidden group shadow-comic-sm">
          <div className="absolute top-0 right-0 w-8 h-8 bg-black transform rotate-45 translate-x-4 -translate-y-4"></div>
          <div className="flex items-center justify-between mb-6 border-b-2 border-black pb-2">
            <span className="font-mono font-bold text-xs bg-black text-white px-2 py-1">CHARACTER_STATS.JSON</span>
            <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div><div className="w-2 h-2 rounded-full bg-yellow-500"></div><div className="w-2 h-2 rounded-full bg-green-500"></div></div>
          </div>
          <div className="space-y-5">
              <div><div className="flex justify-between text-xs font-bold font-mono mb-1 text-black"><span>LOGIC_PROCESSING</span><span>98/100</span></div><div className="w-full h-4 bg-white border-2 border-black p-[2px]"><div className="h-full bg-secondary w-[98%] animate-[pulse_3s_infinite]"></div></div></div>
              <div><div className="flex justify-between text-xs font-bold font-mono mb-1 text-black"><span>PIPELINE_EFFICIENCY</span><span>94/100</span></div><div className="w-full h-4 bg-white border-2 border-black p-[2px]"><div className="h-full bg-primary w-[94%]"></div></div></div>
              <div><div className="flex justify-between text-xs font-bold font-mono mb-1 text-black"><span>COFFEE_INTAKE</span><span className="text-red-600 animate-pulse">OVERFLOW</span></div><div className="w-full h-4 bg-white border-2 border-black p-[2px] overflow-hidden relative"><div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,black,black_10px,white_10px,white_20px)] w-full animate-[speed-lines_20s_linear_infinite] opacity-20"></div><div className="h-full bg-black w-full"></div></div></div>
          </div>
          <div className="mt-6 p-3 bg-black text-green-400 font-mono text-[10px] leading-tight opacity-90 overflow-hidden border-2 border-black/20 relative">
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
              <p>{">"} BOOTING SYSTEM... [OK]<br/>{">"} LOADING SKILLS DATABASE... [COMPLETE]<br/>{">"} SYNCHRONIZING WITH AZURE CLOUD...<br/>{">"} STATUS: READY FOR NEW QUEST</p>
          </div>
      </div>
      <div className="xl:hidden mt-8 flex flex-wrap gap-3 pt-6 border-t-4 border-gray-200">
         <div className="bg-black text-white px-3 py-1 font-mono text-xs font-bold border border-white shadow-comic-sm">STR +5</div>
         <div className="bg-black text-white px-3 py-1 font-mono text-xs font-bold border border-white shadow-comic-sm">INT +10</div>
         <div className="bg-black text-white px-3 py-1 font-mono text-xs font-bold border border-white shadow-comic-sm">LUCK +3</div>
      </div>
    </div>
  </ComicPanel>
);

const SkillsPanel: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<{skill: Skill, x: number, y: number} | null>(null);

  const handleMouseEnter = (e: React.MouseEvent, skill: Skill) => {
    if (window.innerWidth >= 768) setHoveredSkill({ skill, x: e.clientX, y: e.clientY });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (hoveredSkill) setHoveredSkill(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null);
  };
  const handleMouseLeave = () => setHoveredSkill(null);

  const categories = [
    { key: 'languages', title: 'CODE & LOGIC', bg: 'bg-white/10', barColor: 'bg-primary' },
    { key: 'bigData', title: 'DATA SORCERY', bg: 'bg-black/20', barColor: 'bg-accent' },
    { key: 'cloud', title: 'CLOUD INFRA.', bg: 'bg-white/10', barColor: 'bg-secondary' }
  ];

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Sachin_Kumawat_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getSkillIcon = (name: string) => {
    const iconClass = "w-5 h-5 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]";
    if (name.includes("Python")) return <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M14.25.18l.9.2.73.26.59.3.66.42.49.39.49.48.4.52.34.6.24.71.12.82V10l-.06.63-.13.55-.21.46-.26.4-.3.34-.31.25-.28.16-.2.07h-4V9h3V6H9V5h4V.18zM6.55 3.3l.02-.03-.24.08-.24.12-.23.18-.19.23-.13.26-.06.29v4.22h4.55V3.3H6.55zM.18 9.75l.2.9.26.73.3.59.42.66.39.49.48.49.52.4.6.34.71.24.82.12H10v-5.25l-.03-.28-.08-.26-.12-.24-.18-.23-.23-.19-.26-.13-.29-.06H4.63v4.63h-2v-2.22l.06-.63.13-.55.21-.46.26-.4.3-.34.31-.25.28-.16.2-.07H.18v2.33z"/></svg>;
    if (name.includes("SQL")) return <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M5 5h14v10h-2v2h2a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2v-2H5V5zm6.5 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3.5 2h-1.5a3.49 3.49 0 00-2.09-1.92l-1.07 1.07a1.503 1.503 0 01-2.12-2.12l1.07-1.07A3.49 3.49 0 007 7H5.5a.5.5 0 00-.5.5v5.5a2.5 2.5 0 002.5 2.5H12v-2h-2v2H8v-2h6v2h2v-2h-1z"/></svg>;
    if (name.includes("JavaScript")) return <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3zm14.41 15h2.15v-6.72h-2.15v6.72zm-4.7 0h2.15v-3.32c0-1.78.8-2.16 2.05-2.16.5 0 .9.09 1.25.17l.38-2.2a4.4 4.4 0 00-1.54-.25c-1.63 0-2.43.83-2.9 2.08l-.13-.15V10.3h-2.07v7.7h.81z"/></svg>;
    if (name.includes("Spark")) return <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M12.56 2.06c-1.37 2.06-2.17 4.12-1.28 6.47.69 1.76 2.06 2.65 3.04 4.41 1.27 2.16.78 5.2-1.28 7.06-2.45 2.25-6.57 2.16-8.73-.2-1.96-2.06-2.06-5.39.2-7.65.69-.78.59-2.06-.2-2.55-.78-.49-1.96-.29-2.55.49C.2 12.35.3 17.06 3.14 20.39c3.24 3.73 9.02 4.02 12.65 1.08 3.73-3.04 4.51-8.53 1.47-12.65-.88-1.27-1.67-2.35-1.57-3.92.1-1.47 1.08-2.55 1.08-2.55s-3.04-1.37-4.21-.29z"/></svg>;
    if (name.includes("Cloud") || name.includes("Azure")) return <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M18.42 8.22a6.45 6.45 0 00-11.4 1.94A5.02 5.02 0 007.5 20h11a4.5 4.5 0 00.55-8.97c-.21-.01-.42-.01-.63-.01z"/></svg>;
    if (name.includes("Docker")) return <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M2.5 12h1v4h-1v-4zm2 0h1v4h-1v-4zm2 0h1v4h-1v-4zm2 0h1v4h-1v-4zm-6-5h1v4h-1V7zm2 0h1v4h-1V7zm2 0h1v4h-1V7zm2 0h1v4h-1V7zm-2-5h1v4h-1V2zM1.5 17h17v4h-17v-4z"/></svg>;
    if (name.includes("Git")) return <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>;
    return <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>;
  };

  return (
    <ComicPanel id="skills" variant="color" narrative="THE ARSENAL" className="p-8 pt-16 md:p-12 md:pt-16 h-auto bg-secondary relative">
      {hoveredSkill && (
        <div className="fixed z-50 pointer-events-none hidden md:block w-64 bg-primary border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 animate-in fade-in zoom-in-95 duration-150" style={{ top: hoveredSkill.y + 20, left: hoveredSkill.x + 20 }}>
          <div className="absolute -top-3 left-4 w-6 h-6 bg-primary border-l-[4px] border-t-[4px] border-black transform rotate-45"></div>
          <h5 className="font-display font-black text-lg text-black uppercase mb-2 border-b-2 border-black pb-1">DATA_CHIP: {hoveredSkill.skill.name.split(' ')[0]}</h5>
          <p className="font-mono text-xs font-bold text-black leading-tight">{hoveredSkill.skill.description || "NO_DATA_AVAILABLE"}</p>
          <div className="mt-3 flex justify-between items-center text-[10px] font-mono text-black/60 font-bold uppercase"><span>MASTERY: {hoveredSkill.skill.level}%</span><span>TYPE: PASSIVE</span></div>
        </div>
      )}
      <div className="flex flex-col h-full mt-4 gap-8">
        <div className="flex flex-col md:flex-row justify-between items-end border-b-4 border-white pb-4 mb-4">
          <div className="flex flex-col"><h4 className="font-display font-black text-4xl md:text-5xl text-white drop-shadow-md">SKILL MASTERY</h4><span className="font-mono font-bold text-sm text-white/80 animate-pulse">// ANALYZING COMBAT ABILITIES...</span></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <FadeIn key={cat.key} delay={idx * 200} direction="up" className="h-full">
              <div className={\`h-full border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 group \${cat.bg}\`}>
                <h5 className="font-display font-black text-2xl text-white mb-6 bg-black inline-block px-3 py-1 shadow-[4px_4px_0px_0px_white] rotate-1 group-hover:rotate-0 transition-transform">{cat.title}</h5>
                <div className="space-y-6">
                  {(SKILL_CATEGORIES as any)[cat.key].map((skill: any) => (
                    <div key={skill.name} className="relative cursor-none" onMouseEnter={(e) => handleMouseEnter(e, skill)} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                        <div className="flex justify-between font-mono text-xs font-bold mb-1 text-white uppercase tracking-wider items-center">
                        <div className="flex items-center gap-2 overflow-hidden">{getSkillIcon(skill.name)}<span className="truncate pr-2">{skill.name}</span></div>
                        <span>LVL {skill.level}</span></div>
                      <div className="h-5 bg-black/50 border-2 border-white w-full skew-x-[-10deg] relative overflow-hidden">
                        <div className={\`h-full \${cat.barColor} transition-all duration-[1500ms] ease-out border-r-2 border-black origin-left\`} style={{width: \`\${skill.level}%\`}}>
                            <div className="w-full h-full opacity-30" style={{backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)', backgroundSize: '6px 6px'}}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t-4 border-white/30 relative">
           <FadeIn delay={600}>
             <div className="flex items-center gap-3 mb-6">
                <div className="bg-black p-2 border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" /></svg>
                </div>
                <h4 className="font-display font-black text-2xl text-white uppercase tracking-wide">Inventory <span className="text-white/60 text-base font-mono">(Certifications)</span></h4>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <div onClick={handleDownload} className="relative bg-black group hover:-translate-y-1 transition-transform duration-300 border-2 border-secondary hover:border-white shadow-lg cursor-pointer block overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary to-purple-600"></div>
                    <div className="p-3 pl-4 flex flex-col gap-1"><span className="font-mono text-[10px] text-secondary font-bold uppercase">Item Type: Mythic Scroll</span><span className="font-bold text-white text-sm leading-tight group-hover:text-primary transition-colors">MASTER RESUME</span></div>
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12 pointer-events-none"></div>
                </div>
                {CERTIFICATIONS.map((cert, idx) => (
                  <div key={idx} className="relative bg-black group hover:-translate-y-1 transition-transform duration-300 border-2 border-white/50 hover:border-white shadow-lg overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 to-orange-500"></div>
                    <div className="p-3 pl-4 flex flex-col gap-1"><span className="font-mono text-[10px] text-yellow-400 font-bold uppercase">Item Type: Legendary Scroll</span><span className="font-bold text-white text-sm leading-tight group-hover:text-accent transition-colors">{cert}</span></div>
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12 pointer-events-none"></div>
                  </div>
                ))}
             </div>
           </FadeIn>
        </div>
      </div>
    </ComicPanel>
  );
};

const ProjectsPanel: React.FC = () => (
  <ComicPanel id="work" variant="dark" narrative="BATTLE LOGS" className="p-6 pt-16 md:p-12 md:pt-16 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] min-h-[800px]">
    <div className="mt-10 mb-12 max-w-4xl">
        <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase mb-4">Top Declassified Missions</h2>
        <div className="flex items-center gap-4"><span className="w-3 h-3 bg-red-500 animate-pulse rounded-full"></span><p className="text-secondary font-mono text-lg uppercase tracking-widest">// CLEARANCE: RED</p></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {PROJECTS.map((project, idx) => (
        <FadeIn key={project.id} delay={idx * 100} className="h-full">
          <div className="group relative h-full flex flex-col bg-dark border-2 border-dashed border-white/30 hover:border-secondary hover:border-solid hover:shadow-neon transition-all duration-300 overflow-hidden">
            <div className="flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/10 group-hover:bg-secondary/10 group-hover:border-secondary/50 transition-colors">
                <span className="font-mono text-[10px] text-gray-400 group-hover:text-secondary uppercase tracking-widest">FILE_ID: 00{project.id}_X</span>
                <div className="flex gap-1"><div className="w-2 h-2 bg-red-500/50 rounded-full group-hover:bg-red-500"></div><div className="w-2 h-2 bg-yellow-500/50 rounded-full group-hover:bg-yellow-500"></div><div className="w-2 h-2 bg-green-500/50 rounded-full group-hover:bg-green-500"></div></div>
            </div>
            <div className="relative h-56 overflow-hidden border-b border-white/10 group-hover:border-secondary/50">
               <div className="absolute inset-0 bg-black/50 z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
               <div className="absolute left-0 right-0 h-[2px] bg-secondary shadow-[0_0_10px_#FF355E] z-20 opacity-0 group-hover:opacity-100 group-hover:animate-scan pointer-events-none"></div>
               <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 transition-all duration-500 scale-105 group-hover:scale-110 group-hover:opacity-0"/>
               <img src={project.gif || project.image} alt={\`\${project.title} animation\`} className="absolute inset-0 w-full h-full object-cover grayscale-0 transition-all duration-500 opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-110"/>
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            </div>
            <div className="p-6 flex flex-col flex-grow relative">
               <h3 className="text-2xl font-display font-black text-white uppercase mb-2 leading-none group-hover:text-secondary transition-colors">{project.title}</h3>
               <div className="h-1 w-12 bg-white/20 mb-4 group-hover:bg-secondary group-hover:w-full transition-all duration-500"></div>
               <p className="text-xs font-mono text-gray-400 mb-6 leading-relaxed flex-grow">{project.description}</p>
               <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.slice(0,4).map(tag => (
                     <span key={tag} className="chip-clip bg-gray-800 border-l-2 border-white/20 text-white/70 text-[10px] font-mono font-bold px-3 py-1 uppercase group-hover:text-secondary group-hover:border-secondary transition-colors">{tag}</span>
                  ))}
               </div>
            </div>
            <div className="mt-auto bg-black border-t border-white/10 p-2 flex justify-between items-center px-4 font-mono text-[10px] uppercase text-gray-500 group-hover:text-white transition-colors">
                <span>EXP: +{1500 + (idx * 250)}</span>
                <span className="group-hover:text-secondary">RANK: {['S', 'A', 'A+', 'S+'][idx % 4]}</span>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  </ComicPanel>
);

const EmailModal = ({ isOpen, onClose }) => {
  const [senderName, setSenderName] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    const fullBody = \`TRANSMISSION FROM: \${senderName}\\n\\nMESSAGE:\\n\${body}\`;
    window.location.href = \`mailto:sachinkmwt24@gmail.com?subject=\${encodeURIComponent(subject)}&body=\${encodeURIComponent(fullBody)}\`;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="w-full max-w-lg bg-white border-[6px] border-black shadow-[16px_16px_0px_0px_#FFD60A] relative flex flex-col transform -rotate-1">
        <div className="bg-black text-white p-4 flex justify-between items-center border-b-4 border-black">
           <h3 className="font-display font-black text-2xl uppercase tracking-wider flex items-center gap-2"><span className="w-3 h-3 bg-primary rounded-full animate-pulse"></span>TRANSMISSION LINK</h3>
           <button onClick={onClose} className="text-white hover:text-primary font-bold text-xl clickable active:scale-90 transition-transform">✕</button>
        </div>
        <form onSubmit={handleSend} className="p-6 flex flex-col gap-4 bg-white">
           <div>
             <label className="font-mono font-bold text-xs uppercase mb-1 block text-black">Sender Identity (Your Name)</label>
             <input required type="text" value={senderName} onChange={e => setSenderName(e.target.value)} className="w-full border-2 border-black p-3 font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] focus:-translate-y-1 focus:-translate-x-1 transition-all bg-gray-50 text-black font-bold" placeholder="AGENT NAME..."/>
           </div>
           <div>
             <label className="font-mono font-bold text-xs uppercase mb-1 block text-black">Subject / Mission Title</label>
             <input required type="text" value={subject} onChange={e => setSubject(e.target.value)} className="w-full border-2 border-black p-3 font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] focus:-translate-y-1 focus:-translate-x-1 transition-all bg-gray-50 text-black font-bold" placeholder="REQ: PROJECT COLLABORATION"/>
           </div>
           <div>
             <label className="font-mono font-bold text-xs uppercase mb-1 block text-black">Message / Briefing</label>
             <textarea required rows={5} value={body} onChange={e => setBody(e.target.value)} className="w-full border-2 border-black p-3 font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] focus:-translate-y-1 focus:-translate-x-1 transition-all resize-none bg-gray-50 text-black font-medium" placeholder="Briefing details here..."/>
           </div>
           <p className="font-mono text-[10px] text-gray-500 text-center mt-2">// LAUNCHING NEURAL LINK (DEFAULT EMAIL CLIENT)...</p>
           <div className="flex justify-end gap-4 mt-2">
              <button type="button" onClick={onClose} className="font-mono font-bold underline hover:text-red-600 text-black clickable active:scale-95 transition-transform">CANCEL</button>
              <button type="submit" className="clickable bg-primary text-black font-display font-black text-xl px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:scale-95 active:border-accent transition-all uppercase">SEND DATA</button>
           </div>
        </form>
      </div>
    </div>
  );
};

const ContactPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <EmailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ComicPanel id="contact" variant="light" narrative="TO BE CONTINUED..." className="p-8 pt-16 md:p-20 md:pt-16 text-center !bg-white !text-black min-h-[600px] relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(#000 3px, transparent 3px)', backgroundSize: '24px 24px'}}></div>
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center h-full justify-center">
          <h2 className="text-6xl md:text-8xl lg:text-[8rem] font-display font-black mb-6 uppercase tracking-tighter leading-none text-black">RECRUIT THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">ARCHITECT</span></h2>
          <p className="text-lg md:text-2xl font-mono font-bold mb-12 max-w-3xl text-black">The Architect is ready for the next mission. Choose your summoning method below.</p>
          <div className="flex flex-col md:flex-row gap-8 justify-center w-full">
            <button onClick={() => setIsModalOpen(true)} className="group clickable bg-primary text-black border-[4px] border-black px-8 py-5 font-display font-black text-2xl uppercase tracking-wide shadow-[8px_8px_0px_0px_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:scale-95 active:border-accent transition-all flex items-center gap-4 w-full md:w-auto justify-center cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 group-hover:text-white transition-colors"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              <span>INITIATE SUMMON</span>
            </button>
            <a href="https://www.linkedin.com/in/sachin-kumawat-447b8120a/" target="_blank" rel="noreferrer" className="group clickable bg-secondary text-white border-[4px] border-black px-8 py-5 font-display font-black text-2xl uppercase tracking-wide shadow-[8px_8px_0px_0px_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:scale-95 active:border-accent transition-all flex items-center gap-4 w-full md:w-auto justify-center cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8 group-hover:text-primary transition-colors"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              <span>ACCESS PROFILE</span>
            </a>
          </div>
          <div className="mt-24 border-t-4 border-black pt-6 w-full flex justify-between items-center font-mono text-xs font-bold opacity-60 text-black">
            <span>VOL. 1 // END OF CHAPTER</span>
            <span>© {new Date().getFullYear()} SACHIN KUMAWAT</span>
          </div>
        </div>
      </ComicPanel>
    </>
  );
};

export default function App() {
  const { isGodMode, setIsGodMode } = useKonamiCode();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={\`min-h-screen font-sans selection:bg-primary selection:text-black bg-gutter pb-8 pt-24 \${isGodMode ? 'overflow-hidden' : ''}\`}>
      {isLoading && <LoadingScreen onFinished={() => setIsLoading(false)} />}
      <CustomCursor />
      <SecretOverlay isActive={isGodMode} onClose={() => setIsGodMode(false)} />
      <Header />
      <main className={\`w-full max-w-[1920px] mx-auto px-4 md:px-8 flex flex-col gap-6 \${isGodMode ? 'invert' : ''}\`}>
        <ChaosWrapper isGodMode={isGodMode}>
          <div className="flex flex-col xl:grid xl:grid-cols-3 gap-6 w-full min-h-[600px] lg:min-h-[700px]">
            <div className="xl:col-span-2 h-full"><Hero /></div>
            <div className="xl:col-span-1 h-full"><BioPanel /></div>
          </div>
        </ChaosWrapper>
        <ChaosWrapper isGodMode={isGodMode}><div className="w-full"><SkillsPanel /></div></ChaosWrapper>
        <ChaosWrapper isGodMode={isGodMode}><div className="w-full"><ProjectsPanel /></div></ChaosWrapper>
        <ChaosWrapper isGodMode={isGodMode}><div className="w-full"><ContactPanel /></div></ChaosWrapper>
      </main>
      <ChatWidget />
    </div>
  );
}
`;

const envExample = `VITE_API_KEY=your_gemini_api_key_here`;

// --- 3. WRITE FILES ---

const files = {
    'package.json': JSON.stringify(packageJson, null, 2),
    'vite.config.ts': viteConfig,
    'tsconfig.json': tsConfig,
    'tsconfig.node.json': tsConfigNode,
    'tailwind.config.js': tailwindConfig,
    'postcss.config.js': postcssConfig,
    'index.html': indexHtml,
    'src/index.css': indexCss,
    'src/index.tsx': indexTsx,
    'src/App.tsx': appTsx,
    'src/types.ts': typesTs,
    'src/constants.ts': constantsTs,
    'src/components/UI.tsx': uiTsx,
    'src/components/ChatWidget.tsx': chatWidgetTsx,
    'src/services/geminiService.ts': geminiServiceTs,
    '.env.example': envExample
};

// Create directories
['src', 'src/components', 'src/services', 'public'].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Write files
Object.entries(files).forEach(([name, content]) => {
    fs.writeFileSync(name, content.trim());
    console.log(`✅ Created ${name}`);
});

console.log("\n🎉 Setup Complete!");
console.log("👉 Next Steps:");
console.log("1. Run 'npm install'");
console.log("2. Create a '.env' file and add your VITE_API_KEY");
console.log("3. Add your 'resume.pdf' to the 'public' folder");
console.log("4. Run 'npm run dev'");