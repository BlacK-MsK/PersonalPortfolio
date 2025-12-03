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
        transform: `translate(${randomX}px, ${randomY}px) rotate(${randomRot}deg)`,
        animation: `float-chaos ${duration}s ease-in-out infinite alternate`,
        animationDelay: `${delay}s`,
        filter: `hue-rotate(${hue}deg)`
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
      {/* <Sticker src="public/image.png" alt="The Protagonist" className="hidden md:block bottom-8 right-8 w-48 h-60 lg:w-64 lg:h-80 rotate-[-6deg]"/> */}
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
    { key: 'cloud', title: 'CLOUD INFRA.', bg: 'bg-white/10', barColor: 'bg-secondary' },
    { key: 'tools', title: 'TOOLS', bg: 'bg-black/20', barColor: 'bg-accent'}
  ];

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Sachin_Kumawat_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // const getSkillIcon = (name: string) => {
  //   const iconClass = "w-5 h-5 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]";
  //   if (name.includes("Python")) return <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M14.25.18l.9.2.73.26.59.3.66.42.49.39.49.48.4.52.34.6.24.71.12.82V10l-.06.63-.13.55-.21.46-.26.4-.3.34-.31.25-.28.16-.2.07h-4V9h3V6H9V5h4V.18zM6.55 3.3l.02-.03-.24.08-.24.12-.23.18-.19.23-.13.26-.06.29v4.22h4.55V3.3H6.55zM.18 9.75l.2.9.26.73.3.59.42.66.39.49.48.49.52.4.6.34.71.24.82.12H10v-5.25l-.03-.28-.08-.26-.12-.24-.18-.23-.23-.19-.26-.13-.29-.06H4.63v4.63h-2v-2.22l.06-.63.13-.55.21-.46.26-.4.3-.34.31-.25.28-.16.2-.07H.18v2.33z"/></svg>;
  //   if (name.includes("SQL")) return <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M5 5h14v10h-2v2h2a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2v-2H5V5zm6.5 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3.5 2h-1.5a3.49 3.49 0 00-2.09-1.92l-1.07 1.07a1.503 1.503 0 01-2.12-2.12l1.07-1.07A3.49 3.49 0 007 7H5.5a.5.5 0 00-.5.5v5.5a2.5 2.5 0 002.5 2.5H12v-2h-2v2H8v-2h6v2h2v-2h-1z"/></svg>;
  //   if (name.includes("JavaScript")) return <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3zm14.41 15h2.15v-6.72h-2.15v6.72zm-4.7 0h2.15v-3.32c0-1.78.8-2.16 2.05-2.16.5 0 .9.09 1.25.17l.38-2.2a4.4 4.4 0 00-1.54-.25c-1.63 0-2.43.83-2.9 2.08l-.13-.15V10.3h-2.07v7.7h.81z"/></svg>;
  //   if (name.includes("Spark")) return <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M12.56 2.06c-1.37 2.06-2.17 4.12-1.28 6.47.69 1.76 2.06 2.65 3.04 4.41 1.27 2.16.78 5.2-1.28 7.06-2.45 2.25-6.57 2.16-8.73-.2-1.96-2.06-2.06-5.39.2-7.65.69-.78.59-2.06-.2-2.55-.78-.49-1.96-.29-2.55.49C.2 12.35.3 17.06 3.14 20.39c3.24 3.73 9.02 4.02 12.65 1.08 3.73-3.04 4.51-8.53 1.47-12.65-.88-1.27-1.67-2.35-1.57-3.92.1-1.47 1.08-2.55 1.08-2.55s-3.04-1.37-4.21-.29z"/></svg>;
  //   if (name.includes("Cloud") || name.includes("Azure")) return <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M18.42 8.22a6.45 6.45 0 00-11.4 1.94A5.02 5.02 0 007.5 20h11a4.5 4.5 0 00.55-8.97c-.21-.01-.42-.01-.63-.01z"/></svg>;
  //   if (name.includes("Docker")) return <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M2.5 12h1v4h-1v-4zm2 0h1v4h-1v-4zm2 0h1v4h-1v-4zm2 0h1v4h-1v-4zm-6-5h1v4h-1V7zm2 0h1v4h-1V7zm2 0h1v4h-1V7zm2 0h1v4h-1V7zm-2-5h1v4h-1V2zM1.5 17h17v4h-17v-4z"/></svg>;
  //   if (name.includes("Git")) return <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>;
  //   return <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>;
  // };

  return (
    <ComicPanel id="skills" variant="color" narrative="THE ARSENAL" className="p-8 pt-16 md:p-12 md:pt-16 h-auto bg-secondary relative">
      {hoveredSkill && (
        <div className="fixed z-50 pointer-events-none hidden md:block w-64 bg-primary border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 animate-in fade-in zoom-in-95 duration-150" style={{ top: hoveredSkill.y + 20, left: hoveredSkill.x + 20 }}>
          <div className="absolute -top-3 left-4 w-6 h-6 bg-primary border-l-[4px] border-t-[4px] border-black transform rotate-45"></div>
          <h5 className="font-display font-black text-lg text-black uppercase mb-2 border-b-2 border-black pb-1">{hoveredSkill.skill.name.split(' ')[0]}</h5>
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
              <div className={`h-full border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 group ${cat.bg}`}>
                <h5 className="font-display font-black text-2xl text-white mb-6 bg-black inline-block px-3 py-1 shadow-[4px_4px_0px_0px_white] rotate-1 group-hover:rotate-0 transition-transform">{cat.title}</h5>
                <div className="space-y-6">
                  {(SKILL_CATEGORIES as any)[cat.key].map((skill: any) => (
                    <div key={skill.name} className="relative cursor-none" onMouseEnter={(e) => handleMouseEnter(e, skill)} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                        <div className="flex justify-between font-mono text-xs font-bold mb-1 text-white uppercase tracking-wider items-center">
                        <div className="flex items-center gap-2 overflow-hidden"><span className="truncate pr-2">{skill.name}</span></div>
                        <span>LVL {skill.level}</span></div>
                      <div className="h-5 bg-black/50 border-2 border-white w-full skew-x-[-10deg] relative overflow-hidden">
                        <div className={`h-full ${cat.barColor} transition-all duration-[1500ms] ease-out border-r-2 border-black origin-left`} style={{width: `${skill.level}%`}}>
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
                <div onClick={handleDownload} className="relative bg-black group hover:-translate-y-1 transition-transform duration-300 border-2 border-white/50 hover:border-white shadow-lg cursor-pointer block overflow-hidden">
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
               <img src={project.gif || project.image} alt={`${project.title} animation`} className="absolute inset-0 w-full h-full object-cover grayscale-0 transition-all duration-500 opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-110"/>
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
    const fullBody = `TRANSMISSION FROM: ${senderName}\n\nMESSAGE:\n${body}`;
    window.location.href = `mailto:sachinkmwt24@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullBody)}`;
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
    <div className={`min-h-screen font-sans selection:bg-primary selection:text-black bg-gutter pb-8 pt-24 ${isGodMode ? 'overflow-hidden' : ''}`}>
      {isLoading && <LoadingScreen onFinished={() => setIsLoading(false)} />}
      <CustomCursor />
      <SecretOverlay isActive={isGodMode} onClose={() => setIsGodMode(false)} />
      <Header />
      <main className={`w-full max-w-[1920px] mx-auto px-4 md:px-8 flex flex-col gap-6 ${isGodMode ? 'invert' : ''}`}>
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