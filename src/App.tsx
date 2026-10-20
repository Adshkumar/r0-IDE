import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import SitePages from './SitePages';

// --- Import your actual images ---
import mainBodyImg from './assets/main-body.png';
import aiImg from './assets/ai.png';
import editImg from './assets/edit.png';
import terminalImg from './assets/terminal.png';
import gitImg from './assets/git.png';

// --- SVG Icons ---
const GitIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/></svg>;

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Workflow', href: '#workflow' },
    { name: 'Documentation', href: '/docs' },
    { name: 'GitHub', href: 'https://github.com/Adshkumar/r0', external: true },
  ];

  useEffect(() => {
    if (mobileMenuOpen) {
      document.querySelector<HTMLElement>('#mobile-navigation a')?.focus();
      const closeOnOutsideClick = (event: PointerEvent) => {
        if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
          setMobileMenuOpen(false);
        }
      };
      document.addEventListener('pointerdown', closeOnOutsideClick);
      return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
    }
  }, [mobileMenuOpen]);

  const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape' && mobileMenuOpen) {
      setMobileMenuOpen(false);
      mobileMenuButtonRef.current?.focus();
    }
  };

  return (
    <header ref={headerRef} onKeyDown={handleMenuKeyDown} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#f7f7f4]/90 backdrop-blur-md border-b border-[#e6e5e0]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between md:h-16">
          <div className="flex min-w-0 items-center gap-2 md:gap-3">
            <a href="/" aria-label="r0 home" className="inline-flex shrink-0 items-center transition-opacity hover:opacity-75">
              <img src="/r0-wordmark-dark.svg" alt="r0" className="h-8 w-[104px] object-contain sm:h-9 sm:w-[116px]" />
            </a>
            <span className="rounded-full border border-[#e6e5e0] bg-[#f2f1ed] px-2 py-0.5 text-[9px] font-medium text-[#5c5a52] sm:text-[10px]">Desktop editor</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} className="text-sm text-[#5c5a52] hover:text-[#26251e] transition-colors relative group font-medium">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#b45309] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center gap-3">
            <a href="/download" className="bg-[#26251e] text-white text-xs md:text-sm font-medium px-4 md:px-5 py-2 rounded-md hover:bg-[#3d3b32] transition-all duration-200 shadow-sm hover:shadow-md">
              Download
            </a>
          </div>

          <button
            ref={mobileMenuButtonRef}
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-[#26251e] transition-colors hover:bg-[#f2f1ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b45309] md:hidden"
          >
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
        <div id="mobile-navigation" className="md:hidden bg-[#f7f7f4] border-b border-[#e6e5e0]">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} onClick={() => setMobileMenuOpen(false)} className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm text-[#5c5a52] transition-colors hover:bg-[#f2f1ed] hover:text-[#26251e]">
                {link.name}
              </a>
            ))}
            <a href="/download" onClick={() => setMobileMenuOpen(false)} className="mt-2 flex min-h-11 items-center justify-center rounded-lg bg-[#26251e] px-4 py-2 text-center text-sm font-medium text-white">
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
    <section ref={heroRef} className="relative overflow-hidden px-4 pb-10 pt-20 sm:px-6 sm:pb-12 md:pb-24 md:pt-32 lg:px-8" style={{'--mouse-x': '50%', '--mouse-y': '50%'} as React.CSSProperties}>
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(180, 83, 9, 0.06), transparent 40%)'}}></div>
      
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-[#e6e5e0] bg-[#f2f1ed] px-3 py-1 text-[10px] font-mono text-[#b45309] animate-fade-in sm:mb-6 md:mb-8 md:text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#b45309] animate-pulse"></span>
          DESKTOP CODE EDITOR · AI AGENT WORKFLOWS
        </div>
        
        <h1 className="mb-4 text-[clamp(2rem,8.8vw,4.5rem)] font-extrabold leading-[1.08] tracking-tight text-[#26251e] animate-fade-in-up md:mb-6">
          Build with AI.<br/>
          <span className="text-[#b45309]">Stay in your flow.</span>
        </h1>
        
        <p className="mx-auto mb-6 max-w-xl text-[0.95rem] leading-7 text-[#5c5a52] animate-fade-in-up sm:text-base md:mb-10 md:max-w-2xl md:text-lg" style={{animationDelay: '0.1s'}}>
          Plan with an AI agent, edit with language-aware tooling, and review Git changes without leaving your workspace. r0 brings your editor, terminal, and development tools together on Windows, macOS, and Linux.
        </p>
        
        <div className="mb-6 flex flex-col items-stretch justify-center gap-2.5 animate-fade-in-up sm:flex-row sm:items-center sm:gap-3 md:mb-8 md:gap-4" style={{animationDelay: '0.2s'}}>
          <a href="/download" className="flex min-h-12 w-full items-center justify-center rounded-lg bg-[#26251e] px-5 py-3 text-center text-sm font-medium text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#3d3b32] hover:shadow-lg sm:w-auto md:px-8 md:text-base">
            Download r0
          </a>
          <a href="/docs" className="flex min-h-12 w-full items-center justify-center rounded-lg border border-[#e6e5e0] bg-white px-5 py-3 text-center text-sm font-medium text-[#26251e] transition-all duration-200 hover:border-[#d1d0cb] hover:bg-[#f2f1ed] sm:w-auto md:px-8 md:text-base">
            Read the documentation
          </a>
        </div>
        <p className="mb-5 text-xs text-[#8a877e] sm:mb-6 sm:text-sm">
          Want to explore the implementation? <a href="https://github.com/Adshkumar/r0" target="_blank" rel="noopener noreferrer" className="font-medium text-[#92400e] underline underline-offset-4 hover:text-[#713f12]">Browse the r0 repository</a>.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 text-[10px] text-[#8a877e] font-mono animate-fade-in-up sm:gap-x-5 md:gap-x-6 md:text-xs" style={{animationDelay: '0.3s'}}>
          <span className="flex items-center gap-1.5"><svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#b45309]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Agent · Ask · Plan</span>
          <span className="flex items-center gap-1.5"><svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#b45309]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Language servers + Vim mode</span>
          <span className="flex items-center gap-1.5"><svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#b45309]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Windows · macOS · Linux</span>
        </div>

        <div className="relative mt-7 animate-fade-in-up sm:mt-10 md:mt-16" style={{animationDelay: '0.4s'}}>
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#26251e]/5 to-transparent blur-xl sm:-inset-4 sm:blur-2xl"></div>
          <div className="relative overflow-hidden rounded-xl border border-[#e6e5e0] bg-white shadow-xl sm:rounded-2xl sm:shadow-2xl">
            <div className="flex items-center justify-between gap-2 border-b border-[#e6e5e0] bg-[#f2f1ed] px-3 py-2 sm:px-4 sm:py-3">
              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-400"></span>
                <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-400"></span>
                <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-400"></span>
              </div>
              <div className="truncate text-[9px] text-[#8a877e] font-mono sm:text-[10px] md:text-xs">r0 — Desktop IDE</div>
              <div className="hidden shrink-0 text-[10px] text-[#8a877e] sm:block md:text-xs">Rust + Tauri</div>
            </div>
            <img src={mainBodyImg} alt="r0 desktop editor showing a project file explorer, code editor, tabs, and integrated terminal" className="block h-auto w-full object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const diagramRef = useRef<HTMLDivElement>(null);
  const [diagramError, setDiagramError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: 'base',
      themeVariables: {
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '14px',
        primaryColor: '#ffffff',
        primaryTextColor: '#26251e',
        primaryBorderColor: '#e6e5e0',
        lineColor: '#b45309',
        secondaryColor: '#fbf0e4',
        tertiaryColor: '#f7f7f4',
      },
      flowchart: {
        curve: 'linear',
        nodeSpacing: 24,
        rankSpacing: 24,
        htmlLabels: false,
      },
    });

    const workflow = `flowchart TB
      task([Describe task]) --> ai["AI plan"]
      ai --> build["Code & run checks"]
      build --> review["Review changes"]
      review -->|Ready| git([Commit & push])
      review -->|Adjust| build
      classDef startEnd fill:#26251e,stroke:#26251e,color:#ffffff,stroke-width:1.5px
      classDef action fill:#ffffff,stroke:#e6e5e0,color:#26251e,stroke-width:1.5px
      classDef focus fill:#fbf0e4,stroke:#d5a06a,color:#713f12,stroke-width:1.5px
      class task,git startEnd
      class ai,review action
      class build focus`;

    mermaid.render('r0-workflow-diagram', workflow)
      .then(({ svg }) => {
        if (!cancelled && diagramRef.current) {
          diagramRef.current.innerHTML = svg;
        }
      })
      .catch((error: unknown) => {
        console.error('Unable to render the r0 workflow diagram.', error);
        if (!cancelled) {
          setDiagramError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="features" className="scroll-mt-14 border-t border-[#e6e5e0] bg-[#f2f1ed] px-4 py-10 sm:px-6 sm:py-12 md:scroll-mt-16 md:py-24 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-7 text-center animate-on-scroll sm:mb-8 md:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b45309] mb-3">A clearer path from idea to release</p>
          <h2 className="mb-3 text-[clamp(1.8rem,7vw,3rem)] font-bold leading-tight text-[#26251e] sm:mb-4">Your whole workflow, connected</h2>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-[#5c5a52] sm:text-base sm:leading-relaxed md:text-lg">Plan with AI, build in your editor, run and review your work, then ship it — all without breaking focus.</p>
        </div>

        <div className="mx-auto max-w-3xl animate-on-scroll">
          {diagramError ? (
            <div role="alert" className="mx-auto max-w-2xl text-center text-sm text-[#5c5a52]">
              <p className="font-semibold text-[#26251e]">The workflow diagram could not be displayed.</p>
              <p className="mt-2">Describe a task, plan with AI, edit and run your code, review the diff, then commit and push.</p>
            </div>
          ) : (
            <div
              ref={diagramRef}
              role="img"
              aria-label="Development workflow: describe a task, get AI assistance, edit in CodeMirror, run in the terminal, review the diff, and commit and push. If checks need work, return to the editor."
              className="workflow-diagram mx-auto flex max-w-full justify-center"
            />
          )}
        </div>
      </div>
    </section>
  );
};

const GitWorkflowDemo = () => {
  return (
    <section id="workflow" className="scroll-mt-14 border-t border-[#e6e5e0] bg-[#f7f7f4] px-4 py-10 sm:px-6 sm:py-12 md:scroll-mt-16 md:py-24 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-7 text-center animate-on-scroll sm:mb-10 md:mb-16">
          <h2 className="mb-3 text-[clamp(1.55rem,6vw,2.5rem)] font-bold leading-tight text-[#26251e] sm:mb-4">From code changes to GitHub.<br className="hidden sm:block"/> Without breaking your flow.</h2>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-[#5c5a52] sm:text-base sm:leading-relaxed">Review your work, write a commit message, and commit and push your changes directly from r0.</p>
        </div>

        {/* Increased size of this card */}
        <div className="mx-auto max-w-6xl overflow-hidden rounded-xl border border-[#e6e5e0] bg-white shadow-lg animate-on-scroll sm:rounded-2xl sm:shadow-xl">
          <div className="flex items-center justify-between gap-3 border-b border-[#e6e5e0] bg-[#f2f1ed] px-3 py-2.5 sm:px-4 md:px-6 md:py-4">
            <div className="flex min-w-0 items-center gap-2 text-xs text-[#5c5a52] font-mono sm:text-sm md:text-base">
              <span className="shrink-0"><GitIcon /></span> <span className="truncate">Source Control</span>
            </div>
            <div className="shrink-0 text-[9px] text-[#8a877e] sm:text-xs md:text-sm">GIT DEMO</div>
          </div>
          <div className="w-full overflow-hidden bg-[#1e1e1e]">
            <img src={gitImg} alt="r0 Git Commit and Push UI" className="block h-auto w-full object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
};

const AdvancedFeatures = () => {
  const featureCards = [
    {
      number: '01',
      label: 'AI WORKSPACE',
      title: 'Choose how the agent helps.',
      description: 'Switch between Agent, Ask, and Plan modes. Configure provider models, agent rules, permissions, and MCP servers from the workspace.',
      image: aiImg,
      alt: 'r0 AI workspace showing Agent, Ask, and Plan modes',
      links: [
        { label: 'AI and agents', href: '/docs/ai' },
        { label: 'AI settings', href: '/docs/settings#ai' },
      ],
    },
    {
      number: '02',
      label: 'EDITOR INTELLIGENCE',
      title: 'Go beyond syntax highlighting.',
      description: 'CodeMirror editing, language-server features, Vim mode, diagnostics, and configurable formatting tools live alongside your files.',
      image: editImg,
      alt: 'Code open in the r0 editor with project navigation and source-control tools',
      links: [
        { label: 'Editor guide', href: '/docs/editor' },
        { label: 'Keymaps and Vim', href: '/docs/keymaps' },
      ],
    },
    {
      number: '03',
      label: 'DEVELOPER TOOLING',
      title: 'Keep your project tools close.',
      description: 'Run commands in the integrated terminal, inspect supported databases, and use project tools without leaving the desktop workspace.',
      image: terminalImg,
      alt: 'Integrated terminal running a development command inside the r0 workspace',
      links: [
        { label: 'Terminal guide', href: '/docs/terminal' },
        { label: 'Database tools', href: '/docs/database' },
      ],
    },
  ];

  return (
    <section className="border-t border-[#e6e5e0] bg-[#f7f7f4] px-4 py-12 sm:px-6 sm:py-16 md:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#b45309]">More than an editor</p>
            <h2 className="max-w-2xl text-[clamp(1.8rem,6vw,3rem)] font-bold leading-tight text-[#26251e]">The advanced tools are part of the workspace.</h2>
          </div>
          <p className="max-w-lg text-sm leading-6 text-[#5c5a52] md:text-base md:leading-7">
            These capabilities are grounded in r0&apos;s current application and public repository. Some integrations need their own providers, credentials, or developer tools.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {featureCards.map((feature) => (
            <article key={feature.number} className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#e6e5e0] bg-white transition-colors hover:border-[#d1d0cb]">
              <div className="flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-[#e6e5e0] bg-[#f2f1ed]">
                <img
                  src={feature.image}
                  alt={feature.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.015] motion-reduce:transition-none"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-semibold tracking-[0.14em] text-[#b45309]">{feature.label}</span>
                  <span className="font-mono text-[11px] text-[#8a877e]">{feature.number}</span>
                </div>
                <h3 className="mb-2 text-lg font-bold tracking-tight text-[#26251e] sm:text-xl">{feature.title}</h3>
                <p className="mb-5 flex-1 text-sm leading-6 text-[#5c5a52]">{feature.description}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-[#eeede8] pt-4">
                  {feature.links.map((link) => (
                    <a key={link.href} href={link.href} className="text-xs font-semibold text-[#92400e] underline-offset-4 hover:text-[#713f12] hover:underline">
                      {link.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-[#e6e5e0] bg-[#f2f1ed] p-5 sm:p-6 md:mt-6 md:p-8">
          <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="mb-1 font-mono text-[10px] font-semibold tracking-[0.14em] text-[#b45309]">ALSO IN THE TOOLKIT</p>
              <h3 className="text-base font-bold text-[#26251e] sm:text-lg">Built around real project workflows.</h3>
            </div>
            <a href="/docs/features" className="inline-flex min-h-10 items-center text-sm font-semibold text-[#92400e] hover:text-[#713f12]">
              Explore all features <span className="ml-1" aria-hidden="true">→</span>
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'GitHub pull requests & Actions', href: '/docs/github-integration' },
              { label: 'SQLite · PostgreSQL · MySQL', href: '/docs/database' },
              { label: 'MongoDB · Redis · DuckDB', href: '/docs/database' },
              { label: 'MCP tool servers', href: '/docs/ai#agent-customization' },
              { label: 'Extensions & themes', href: '/docs/extensions' },
              { label: 'Remote workspaces', href: '/docs/collaboration' },
            ].map((capability) => (
              <a
                key={capability.label}
                href={capability.href}
                className="inline-flex min-h-9 items-center rounded-md border border-[#e1dfd8] bg-white px-3 text-xs font-medium text-[#5c5a52] transition-colors hover:border-[#d6a36f] hover:text-[#713f12]"
              >
                {capability.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-xl bg-[#26251e] px-5 py-6 text-white sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div>
            <p className="mb-1 font-mono text-[10px] font-semibold tracking-[0.14em] text-[#d6a36f]">VERIFY IT IN THE SOURCE</p>
            <p className="text-sm leading-6 text-white/75">Explore the project code, issues, and actual release builds on GitHub.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="https://github.com/Adshkumar/r0" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center rounded-md bg-white px-4 text-xs font-semibold text-[#26251e] transition-colors hover:bg-[#f2f1ed]">
              Browse GitHub <span className="ml-2" aria-hidden="true">↗</span>
            </a>
            <a href="https://github.com/Adshkumar/r0/releases" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center rounded-md border border-white/25 px-4 text-xs font-semibold text-white transition-colors hover:border-white/60">
              Releases
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Principles = () => {
  const principles = [
    {
      title: "Bring your own keys",
      desc: "Connect supported AI integrations with your own API keys, and choose the setup that works for you.",
      label: "YOUR AI, YOUR CHOICE",
      details: ["Supported AI integrations", "Your own API keys"],
      icon: <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>,
    },
    {
      title: "Public project",
      desc: "Browse the public source repository, report issues, and follow the project's development on GitHub.",
      label: "SOURCE ON GITHUB",
      details: ["Explore the repository", "Report issues"],
      icon: <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
    },
    {
      title: "Local desktop workflow",
      desc: "Bring your editor, AI tools, terminal, and source control together in a desktop development environment.",
      label: "A WORKSPACE THAT'S YOURS",
      details: ["Desktop development", "Rust + Tauri"],
      icon: <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
    },
    {
      title: "Flexible tooling",
      desc: "Use the editor with your existing project tools, supported extensions, themes, and agent integrations.",
      label: "YOUR PROJECT, YOUR TOOLS",
      details: ["Extensions and themes", "Agent integrations"],
      icon: <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/></svg>,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const activePrinciple = principles[activeIndex];

  return (
    <section className="border-t border-[#e6e5e0] bg-[#f2f1ed] px-4 py-10 sm:px-6 sm:py-12 md:py-24 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-7 text-center animate-on-scroll sm:mb-10 md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b45309] mb-3">Made for the way you work</p>
          <h2 className="mb-3 text-[clamp(1.55rem,6vw,2.5rem)] font-bold leading-tight text-[#26251e] md:mb-4">An IDE built around developer control.</h2>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-[#5c5a52] sm:text-base sm:leading-relaxed">Explore the choices that keep your development workflow yours.</p>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-4 animate-on-scroll sm:gap-6 lg:items-stretch lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div role="group" aria-label="Developer control features" className="-mx-4 flex max-w-full gap-1 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0">
            {principles.map((principle, idx) => {
              const selected = activeIndex === idx;
              return (
                <button
                  key={principle.title}
                  id={`principle-tab-${idx}`}
                  type="button"
                  aria-pressed={selected}
                  aria-controls="principle-panel"
                  onClick={() => setActiveIndex(idx)}
                  className={`group flex min-h-12 min-w-max shrink-0 items-center gap-2.5 border-b-2 px-2 py-2 text-left text-[#77746c] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b45309] sm:gap-3 sm:px-3 lg:min-w-0 lg:gap-4 lg:border-b lg:px-0 lg:py-5 lg:pr-2 ${selected ? 'border-[#b45309] text-[#26251e] lg:border-[#deddd7]' : 'border-transparent hover:text-[#26251e] lg:hover:border-[#deddd7]'}`}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200 sm:h-10 sm:w-10 lg:h-11 lg:w-11 lg:rounded-xl ${selected ? 'bg-[#26251e] text-white shadow-md' : 'bg-white text-[#b45309] group-hover:bg-[#fbf0e4]'}`}>
                    {principle.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="hidden text-[0.65rem] font-semibold tracking-[0.16em] text-[#a19d93] lg:block">0{idx + 1}</span>
                    <span className={`block whitespace-nowrap text-xs font-semibold sm:text-sm lg:mt-0.5 lg:text-base ${selected ? 'text-[#26251e]' : ''}`}>{principle.title}</span>
                  </span>
                  <svg className={`hidden h-4 w-4 shrink-0 transition-transform duration-200 lg:block ${selected ? 'translate-x-0 text-[#b45309]' : '-translate-x-1 text-[#a19d93] opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              );
            })}
          </div>

          <div
            id="principle-panel"
            aria-label={`Selected feature: ${activePrinciple.title}`}
            aria-live="polite"
            className="relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-2xl bg-[#26251e] p-5 text-white shadow-[0_24px_70px_-36px_rgba(38,37,30,0.6)] sm:min-h-[280px] sm:rounded-3xl sm:p-7 md:min-h-[340px] md:p-10 lg:min-h-[380px]"
          >
            <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#b45309]/20 blur-3xl" aria-hidden="true"></div>
            <div className="relative">
              <div className="mb-7 flex items-center justify-between gap-3 sm:mb-10">
                <span className="text-[0.65rem] font-semibold tracking-[0.2em] text-[#d6a36f]">{activePrinciple.label}</span>
                <span className="font-mono text-xs text-white/40">0{activeIndex + 1} / 04</span>
              </div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#e6a65f]">
                {activePrinciple.icon}
              </div>
              <h3 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">{activePrinciple.title}</h3>
              <p className="max-w-lg text-sm leading-7 text-white/65 md:text-base">{activePrinciple.desc}</p>
            </div>
            <div className="relative mt-10 flex flex-wrap gap-2.5">
              {activePrinciple.details.map((detail) => (
                <span key={detail} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 text-xs font-medium text-white/80 md:text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e6a65f]"></span>
                  {detail}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DownloadSection = () => {
  return (
    <section className="border-t border-[#e6e5e0] bg-[#f7f7f4] px-4 py-10 sm:px-6 sm:py-12 md:py-24 lg:px-8">
      <div className="max-w-7xl mx-auto text-center animate-on-scroll">
        <h2 className="mb-3 text-[clamp(1.6rem,6vw,2.5rem)] font-bold leading-tight text-[#26251e] md:mb-4">Your next project starts here.</h2>
        <p className="mx-auto mb-5 max-w-2xl text-sm leading-6 text-[#5c5a52] sm:mb-6 sm:text-base sm:leading-relaxed md:mb-8">Get r0 for Windows, macOS, or Linux and explore its desktop development tools.</p>
        <div className="mb-5 flex flex-col items-center justify-center gap-3 sm:mb-8 sm:flex-row md:gap-4">
          <a href="/download" className="flex min-h-12 w-full items-center justify-center rounded-lg bg-[#26251e] px-6 py-3 text-center text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-[#3d3b32] hover:shadow-lg sm:w-auto md:px-8 md:text-base">
            Download r0
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-[#8a877e] sm:gap-x-6 sm:text-sm">
          <a href="https://github.com/Adshkumar/r0/releases" className="inline-flex min-h-10 items-center hover:text-[#b45309] transition-colors">View all releases</a>
          <a href="https://github.com/Adshkumar/r0" className="inline-flex min-h-10 items-center hover:text-[#b45309] transition-colors">Explore source code</a>
          <a href="https://github.com/Adshkumar/r0/issues" className="inline-flex min-h-10 items-center hover:text-[#b45309] transition-colors">Report an issue</a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="border-t border-[#e6e5e0] bg-[#f2f1ed] px-4 py-8 sm:px-6 sm:py-9 md:py-12 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-7 min-[420px]:gap-x-6 sm:gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <a href="/" aria-label="r0 home" className="mb-3 inline-flex items-center md:mb-4">
              <img src="/r0-wordmark-dark.svg" alt="r0" className="h-8 w-[104px] object-contain sm:h-9 sm:w-[116px]" />
            </a>
            <p className="text-xs md:text-sm text-[#8a877e]">A cross-platform desktop code editor.</p>
          </div>
          <div>
            <h4 className="text-sm md:text-base font-semibold text-[#26251e] mb-3 md:mb-4">Product</h4>
            <ul className="space-y-2 text-xs md:text-sm text-[#5c5a52]">
              <li><a href="#features" className="hover:text-[#b45309] transition-colors">Features</a></li>
              <li><a href="#workflow" className="hover:text-[#b45309] transition-colors">Workflow</a></li>
              <li><a href="/download" className="hover:text-[#b45309] transition-colors">Download</a></li>
              <li><a href="/changelog" className="hover:text-[#b45309] transition-colors">Changelog</a></li>
          </ul>
          </div>
          <div>
            <h4 className="text-sm md:text-base font-semibold text-[#26251e] mb-3 md:mb-4">Documentation</h4>
            <ul className="space-y-2 text-xs md:text-sm text-[#5c5a52]">
              <li><a href="/docs" className="hover:text-[#b45309] transition-colors">Overview</a></li>
              <li><a href="/docs/installation" className="hover:text-[#b45309] transition-colors">Installation</a></li>
              <li><a href="/docs/troubleshooting" className="hover:text-[#b45309] transition-colors">Troubleshooting</a></li>
              <li><a href="/contributing" className="hover:text-[#b45309] transition-colors">Contributing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-[#26251e] md:mb-4 md:text-base">Project</h4>
            <ul className="space-y-2 text-xs md:text-sm text-[#5c5a52]">
              <li><a href="https://github.com/Adshkumar/r0" className="transition-colors hover:text-[#b45309]">GitHub</a></li>
              <li><a href="https://github.com/Adshkumar/r0/releases" className="transition-colors hover:text-[#b45309]">Releases</a></li>
              <li><a href="https://github.com/Adshkumar/r0/issues" className="transition-colors hover:text-[#b45309]">Issues and support</a></li>
              <li><a href="/about" className="transition-colors hover:text-[#b45309]">About r0</a></li>
            </ul>
          </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-7xl flex-col items-start justify-between gap-2 border-t border-[#e6e5e0] pt-6 text-xs text-[#8a877e] sm:flex-row sm:items-center sm:gap-4 md:mt-12 md:pt-8 md:text-sm">
          <p>&copy; {new Date().getFullYear()} r0. License details are listed in the <a href="/about" className="hover:text-[#b45309]">project information</a>.</p>
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

  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  if (pathname !== '/') {
    return <SitePages pathname={pathname} />;
  }

  return (
    <div className="bg-[#f7f7f4] text-[#26251e] font-sans antialiased min-h-screen flex flex-col selection:bg-[#26251e] selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <GitWorkflowDemo />
        <AdvancedFeatures />
        <Principles />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;