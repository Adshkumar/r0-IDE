import React, { useState, useEffect, useRef } from 'react';

// --- Import your actual images ---
import mainBodyImg from './assets/main-body.png';
import gitImg from './assets/git.png';

// --- SVG Icons ---
const CodeIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>;
const AIIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>;
const TerminalIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>;
const GitIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/></svg>;
const ShieldIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>;
const PaletteIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>;

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Workflow', href: '#workflow' },
    { name: 'GitHub', href: 'https://github.com/Adshkumar/r0', external: true },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#f7f7f4]/90 backdrop-blur-md border-b border-[#e6e5e0]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          <div className="flex items-center gap-2 md:gap-3">
            <a href="/" className="flex items-center gap-1.5 md:gap-2 text-lg md:text-xl font-bold tracking-tight text-[#26251e]">
              <svg width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 9L10 12L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 9L16 12L14 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              r0
            </a>
            <span className="text-[9px] md:text-[10px] font-medium px-1.5 md:px-2 py-0.5 bg-[#f2f1ed] border border-[#e6e5e0] rounded-full text-[#5c5a52]">v0.2.10</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} target={link.external ? "_blank" : "_self"} rel={link.external ? "noreferrer" : ""} className="text-sm text-[#5c5a52] hover:text-[#26251e] transition-colors relative group font-medium">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#b45309] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center gap-3">
            <a href="https://github.com/Adshkumar/r0/releases/latest/download/r0-latest-setup.exe" className="bg-[#26251e] text-white text-xs md:text-sm font-medium px-4 md:px-5 py-2 rounded-md hover:bg-[#3d3b32] transition-all duration-200 shadow-sm hover:shadow-md">
              Download
            </a>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-[#26251e] p-1.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f7f7f4] border-b border-[#e6e5e0]">
          <div className="px-3 pt-1 pb-3 space-y-1">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-[#5c5a52] hover:text-[#26251e] hover:bg-[#f2f1ed] rounded-md transition-colors">
                {link.name}
              </a>
            ))}
            <a href="https://github.com/Adshkumar/r0/releases/latest/download/r0-latest-setup.exe" className="block text-center bg-[#26251e] text-white font-medium px-4 py-2 rounded-md mt-2 text-sm">
              Download
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      heroRef.current.style.setProperty('--mouse-x', `${x}px`);
      heroRef.current.style.setProperty('--mouse-y', `${y}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={heroRef} className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 overflow-hidden" style={{'--mouse-x': '50%', '--mouse-y': '50%'} as React.CSSProperties}>
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(180, 83, 9, 0.06), transparent 40%)'}}></div>
      
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2f1ed] border border-[#e6e5e0] text-[10px] md:text-xs font-mono text-[#b45309] mb-6 md:mb-8 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-[#b45309] animate-pulse"></span>
          OPEN SOURCE · AI-FIRST DEVELOPMENT
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-4 md:mb-6 text-[#26251e] animate-fade-in-up">
          Your code. Your flow.<br/>
          <span className="text-[#b45309]">Your AI IDE.</span>
        </h1>
        
        <p className="text-base md:text-lg text-[#5c5a52] max-w-xl md:max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          Write, understand, run, and ship code in one focused workspace. r0 brings AI-assisted development, an integrated terminal, and GitHub workflows together in a desktop IDE built for developers.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <a href="https://github.com/Adshkumar/r0/releases/latest/download/r0-latest-setup.exe" className="bg-[#26251e] text-white text-sm md:text-base font-medium px-6 md:px-8 py-2.5 md:py-3 rounded-md hover:bg-[#3d3b32] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 w-full sm:w-auto text-center">
            Download for Windows
          </a>
          <a href="https://github.com/Adshkumar/r0" target="_blank" rel="noreferrer" className="bg-[#ffffff] text-[#26251e] text-sm md:text-base font-medium px-6 md:px-8 py-2.5 md:py-3 rounded-md border border-[#e6e5e0] hover:bg-[#f2f1ed] hover:border-[#d1d0cb] transition-all duration-200 w-full sm:w-auto text-center">
            Explore the source
          </a>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-[10px] md:text-xs text-[#8a877e] font-mono animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <span className="flex items-center gap-1.5"><svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#b45309]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Built with Rust + Tauri</span>
          <span className="flex items-center gap-1.5"><svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#b45309]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Bring your own API keys</span>
          <span className="flex items-center gap-1.5"><svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#b45309]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Open source</span>
        </div>

        <div className="mt-10 md:mt-16 relative animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <div className="absolute -inset-4 bg-gradient-to-r from-[#26251e]/5 to-transparent blur-2xl rounded-3xl"></div>
          <div className="relative bg-[#ffffff] rounded-xl overflow-hidden shadow-2xl border border-[#e6e5e0]">
            <div className="flex items-center justify-between px-3 md:px-4 py-2 md:py-3 bg-[#f2f1ed] border-b border-[#e6e5e0]">
              <div className="flex items-center gap-1.5 md:gap-2">
                <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-400"></span>
                <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-400"></span>
                <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-400"></span>
              </div>
              <div className="text-[10px] md:text-xs text-[#8a877e] font-mono">r0 — Desktop IDE</div>
              <div className="text-[10px] md:text-xs text-[#8a877e]">Rust + Tauri</div>
            </div>
            <img src={mainBodyImg} alt="r0 IDE Main View" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      title: "AI-Powered Development",
      desc: "Ask questions about your codebase, get structured plans, or let Agent handle multi-step coding tasks. File writes and shell commands require your approval.",
      icon: <AIIcon />,
    },
    {
      title: "CodeMirror 6 Editor",
      desc: "Full syntax support for JavaScript, TypeScript, Rust, Python, HTML, CSS, JSON, Markdown, SQL, and more. Includes tabs, diagnostics, and formatting.",
      icon: <CodeIcon />,
    },
    {
      title: "Integrated Terminal",
      desc: "Powered by xterm.js and Rust portable-pty. Run commands with multiple terminal tabs without leaving your editor workspace.",
      icon: <TerminalIcon />,
    },
    {
      title: "Git and Source Control",
      desc: "Review diffs, browse commit history, manage branches, commit changes, and push to your remote — all within the IDE.",
      icon: <GitIcon />,
    },
    {
      title: "Themes and Extensions",
      desc: "Choose from r0 Dark, r0 Light, Dracula, GitHub Dark, and Cobalt2. Search Open VSX for contributed themes and extensions.",
      icon: <PaletteIcon />,
    },
    {
      title: "Built with Rust and Tauri",
      desc: "A lightweight, cross-platform desktop application that leverages Rust for performance and Tauri for a small, secure footprint.",
      icon: <ShieldIcon />,
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 px-4 bg-[#f2f1ed] border-t border-[#e6e5e0]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16 animate-on-scroll">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-[#26251e]">Everything you need to build</h2>
          <p className="text-sm md:text-base text-[#5c5a52] max-w-2xl mx-auto">r0 combines code editing, integrated terminal, debugging, AI-assisted development, and a modern developer experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-[#ffffff] p-8 md:p-10 rounded-2xl border border-[#e6e5e0] hover:border-[#b45309] hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-on-scroll flex flex-col" style={{animationDelay: `${idx * 0.1}s`}}>
              <div className="w-14 h-14 rounded-xl bg-[#f7f7f4] flex items-center justify-center text-[#b45309] mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#26251e] mb-4">{feature.title}</h3>
              <p className="text-[#5c5a52] leading-relaxed flex-grow">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GitWorkflowDemo = () => {
  return (
    <section id="workflow" className="py-16 md:py-24 px-4 bg-[#f7f7f4] border-t border-[#e6e5e0]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16 animate-on-scroll">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-[#26251e]">From code changes to GitHub.<br/>Without breaking your flow.</h2>
          <p className="text-sm md:text-base text-[#5c5a52] max-w-2xl mx-auto">Review your work, write a commit message, and commit and push your changes directly from r0.</p>
        </div>

        {/* Increased size of this card */}
        <div className="max-w-6xl mx-auto bg-[#ffffff] rounded-2xl border border-[#e6e5e0] overflow-hidden animate-on-scroll shadow-xl">
          <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-[#f2f1ed] border-b border-[#e6e5e0]">
            <div className="flex items-center gap-2 text-sm md:text-base text-[#5c5a52] font-mono">
              <GitIcon /> Source Control
            </div>
            <div className="text-xs md:text-sm text-[#8a877e]">GIT DEMO</div>
          </div>
          <div className="w-full bg-[#1e1e1e]">
            <img src={gitImg} alt="r0 Git Commit and Push UI" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Principles = () => {
  const principles = [
    { title: "Bring your own keys", desc: "Use the supported AI integrations and your own API keys.", icon: <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg> },
    { title: "Open source", desc: "Explore the implementation, report issues, and contribute through GitHub.", icon: <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
    { title: "Local desktop workflow", desc: "Work in a desktop development environment.", icon: <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> },
    { title: "No lock-in", desc: "Keep the project focused on developer choice and transparent workflows.", icon: <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/></svg> },
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-[#f2f1ed] border-t border-[#e6e5e0]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16 animate-on-scroll">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-[#26251e]">An IDE built around developer control.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {principles.map((p, idx) => (
            <div key={idx} className="bg-[#ffffff] p-6 md:p-8 rounded-2xl border border-[#e6e5e0] hover:border-[#b45309] transition-all duration-300 hover:-translate-y-1 animate-on-scroll shadow-sm hover:shadow-md" style={{animationDelay: `${idx * 0.1}s`}}>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#f7f7f4] flex items-center justify-center text-[#b45309] mb-6">
                {p.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-[#26251e] mb-3">{p.title}</h3>
              <p className="text-sm md:text-base text-[#5c5a52] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DownloadSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-[#f7f7f4] border-t border-[#e6e5e0]">
      <div className="max-w-7xl mx-auto text-center animate-on-scroll">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-[#26251e]">Your next project starts here.</h2>
        <p className="text-sm md:text-base text-[#5c5a52] max-w-2xl mx-auto mb-6 md:mb-8">Get r0 for Windows and explore an AI-first development workflow.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
          <a href="https://github.com/Adshkumar/r0/releases/latest/download/r0-latest-setup.exe" className="bg-[#26251e] text-white text-sm md:text-base font-medium px-6 md:px-8 py-2.5 md:py-3 rounded-md hover:bg-[#3d3b32] transition-all duration-200 shadow-md hover:shadow-lg w-full sm:w-auto text-center">
            Download for Windows
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-[#8a877e]">
          <a href="https://github.com/Adshkumar/r0/releases" className="hover:text-[#b45309] transition-colors">View all releases</a>
          <a href="https://github.com/Adshkumar/r0" className="hover:text-[#b45309] transition-colors">Explore source code</a>
          <a href="https://github.com/Adshkumar/r0/issues" className="hover:text-[#b45309] transition-colors">Report an issue</a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-10 md:py-12 px-4 border-t border-[#e6e5e0] bg-[#f2f1ed]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-8">
        <div className="sm:col-span-2 md:col-span-1">
          <a href="/" className="flex items-center gap-2 text-lg md:text-xl font-bold tracking-tight text-[#26251e] mb-3 md:mb-4">
            <svg width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 9L10 12L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 9L16 12L14 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            r0
          </a>
          <p className="text-xs md:text-sm text-[#8a877e]">A fast, agentic code editor built for AI-first development.</p>
        </div>
        <div>
          <h4 className="text-sm md:text-base font-semibold text-[#26251e] mb-3 md:mb-4">Product</h4>
          <ul className="space-y-2 text-xs md:text-sm text-[#5c5a52]">
            <li><a href="#features" className="hover:text-[#b45309] transition-colors">Features</a></li>
            <li><a href="#workflow" className="hover:text-[#b45309] transition-colors">Workflow</a></li>
            <li><a href="https://github.com/Adshkumar/r0/releases/latest/download/r0-latest-setup.exe" className="hover:text-[#b45309] transition-colors">Download</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm md:text-base font-semibold text-[#26251e] mb-3 md:mb-4">Community</h4>
          <ul className="space-y-2 text-xs md:text-sm text-[#5c5a52]">
            <li><a href="https://github.com/Adshkumar/r0" className="hover:text-[#b45309] transition-colors">GitHub</a></li>
            <li><a href="https://github.com/Adshkumar/r0/releases" className="hover:text-[#b45309] transition-colors">Releases</a></li>
            <li><a href="https://github.com/Adshkumar/r0/issues" className="hover:text-[#b45309] transition-colors">Issues</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm md:text-base font-semibold text-[#26251e] mb-3 md:mb-4">More</h4>
          <ul className="space-y-2 text-xs md:text-sm text-[#5c5a52]">
            <li><a href="https://github.com/Adshkumar/r0" className="hover:text-[#b45309] transition-colors">Source Code</a></li>
            <li><a href="https://github.com/Adshkumar/r0/releases" className="hover:text-[#b45309] transition-colors">All Releases</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 md:mt-12 pt-6 md:pt-8 border-t border-[#e6e5e0] flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-xs md:text-sm text-[#8a877e]">
        <p>&copy; 2024 r0. Open source under the Apache License.</p>
        <p>Built for developers.</p>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#f7f7f4] text-[#26251e] font-sans antialiased min-h-screen flex flex-col selection:bg-[#26251e] selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <GitWorkflowDemo />
        <Principles />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;