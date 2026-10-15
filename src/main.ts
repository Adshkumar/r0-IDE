import './style.css';

const repoUrl = 'https://github.com/Adshkumar/r0';
const releaseUrl = 'https://github.com/Adshkumar/r0/releases/latest';
const releasesPage = 'https://github.com/Adshkumar/r0/releases';
const windowsSetupUrl = 'https://github.com/Adshkumar/r0/releases/latest/download/r0-latest-setup.exe';
const version = 'v0.2.10';
const wordmarkUrl = '/r0-wordmark.svg';

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'Product tour', href: '#showreel' },
  { label: 'Docs', href: 'https://github.com/Adshkumar/r0/tree/main/docs' },
  { label: 'Releases', href: releaseUrl },
];

const featureSections = [
  {
    meta: 'CODEMIRROR 6',
    title: 'A capable code editor',
    kicker: 'Code, search, and preview',
    text: 'Edit JavaScript, TypeScript, Rust, Python, HTML, CSS, and more. Use tabs, find and replace, formatting, diagnostics, image previews, and a local HTML preview.',
  },
  {
    meta: 'WORKSPACE CONTEXT',
    title: 'Project-wide navigation',
    kicker: 'Find your way around the codebase',
    text: 'Browse files, search across your workspace, use the command palette, and reopen recent projects. Bring multiple files into AI conversations for useful context.',
  },
  {
    meta: 'ASK · PLAN · AGENT',
    title: 'AI in your workflow',
    kicker: 'From code questions to multi-step tasks',
    text: 'Ask about your workspace, explore a structured plan, or use Agent for coding tasks. Agent file edits and shell commands require your approval.',
  },
  {
    meta: 'CLOUD + LOCAL',
    title: 'Your choice of AI provider',
    kicker: 'Bring the models you already use',
    text: 'Connect Anthropic, OpenAI, Gemini, OpenRouter, DeepSeek, Mistral, Groq, Cohere, or xAI, or use Ollama, LM Studio, and compatible vLLM endpoints.',
  },
  {
    meta: 'GIT + TERMINAL',
    title: 'Tools beside your code',
    kicker: 'Run, review, and keep moving',
    text: 'Use multiple integrated terminal tabs, check Git status, commit and push, manage branches, browse commit history, and inspect historical file diffs.',
  },
  {
    meta: '5 BUILT-IN THEMES',
    title: 'A workspace that feels like yours',
    kicker: 'Choose a theme, make it comfortable',
    text: 'Switch between r0 Dark, r0 Light, Dracula, GitHub Dark, and Cobalt2. Discover Open VSX extensions for contributed themes.',
  },
];

const screenshots = [
  {
    label: 'Built for focus',
    title: 'Stay in the flow with a clean, project-first workspace.',
    text: 'r0 combines editor tabs, project navigation, and search so your coding loop stays focused on the work instead of tool-hopping.',
    image: '/r0-editor-finance.png',
    imageAlt: 'r0 editor showing a Finance project with file explorer, code tabs, and integrated terminal',
    imageTitle: 'Everyday coding',
    imageCaption: 'Your files, editor tabs, and terminal in one workspace.',
    reverse: false,
  },
  {
    label: 'Connected workflow',
    title: 'Keep source control and terminal right beside your code.',
    text: 'Use the built-in terminal, inspect the repository state, and review diffs while staying grounded in the same project context.',
    image: '/r0-git-panel.png',
    imageAlt: 'r0 Git panel showing commit controls, changed files, and commit history',
    imageTitle: 'Git, without the detour',
    imageCaption: 'Review changes, commit, and browse history beside your code.',
    reverse: true,
  },
  {
    label: 'AI in context',
    title: 'Use AI assistance where the work actually happens.',
    text: 'r0 is designed to keep AI coding support close to your files, history, and terminal instead of leaving you in a separate workflow.',
    image: '/r0-ai-panel.png',
    imageAlt: 'r0 code editor with the Ask, Plan, and Agent AI assistant panel open',
    imageTitle: 'AI, right where you work',
    imageCaption: 'Ask, Plan, or use Agent mode with your workspace in context.',
    reverse: false,
  },
];

const workflowDemos = [
  {
    mode: 'ASK',
    prompt: 'Where do I configure an AI provider?',
    answer: 'Open Settings → AI Providers. Choose a provider and model to get started.',
  },
  {
    mode: 'PLAN',
    prompt: 'What can I do with Ask, Plan, and Agent?',
    answer: 'Ask answers questions. Plan maps out a change. Agent works after you approve its actions.',
  },
  {
    mode: 'AGENT',
    prompt: 'Review this workspace before changing any files.',
    answer: 'Inspect the relevant files, outline the change, then wait for approval before writing.',
  },
];

const installSteps = [
  'Download the latest Windows release from the GitHub releases page.',
  'Run the installer and complete the setup process on your machine.',
  'Open a project folder or create a new file to begin building.',
  'Configure your AI provider in settings and start coding in context.',
];

const sourceLinks = [
  { label: 'GitHub repository', href: repoUrl },
  { label: 'Releases', href: releaseUrl },
  { label: 'All releases', href: releasesPage },
  { label: 'Issues', href: `${repoUrl}/issues` },
  { label: 'Contributing', href: `${repoUrl}/blob/main/CONTRIBUTING.md` },
  { label: 'License', href: `${repoUrl}/blob/main/LICENSE` },
];

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  app.innerHTML = `
    <header class="topbar">
      <div class="container nav-wrap">
        <a href="#top" class="brand" aria-label="r0 home">
          <img src="${wordmarkUrl}" alt="r0" />
        </a>

        <nav class="site-nav" aria-label="Main navigation">
          ${navItems
            .map(
              (item) => `
                <a href="${item.href}">${item.label}</a>
              `,
            )
            .join('')}
        </nav>

        <a class="button button-primary nav-download" href="${windowsSetupUrl}" target="_blank" rel="noreferrer">
          Download
        </a>
      </div>
    </header>

    <main id="top">
      <section class="hero container">
        <div class="hero-copy">
          <a class="announcement" href="${releaseUrl}" target="_blank" rel="noreferrer">
            <span class="announcement-mark"></span>
            <span>r0 ${version} is available</span>
            <span class="announcement-arrow">→</span>
          </a>

          <div class="hero-kicker">// a desktop IDE for AI-assisted software development.</div>
          <h1>Code with focus.<br /><span>AI in context.</span></h1>

          <p class="lede">
            r0 brings your editor, AI workspace, Git tools, and terminal into one open-source desktop app. Ask questions about your codebase, plan a change, or let an agent work with your approval.
          </p>

          <div class="download-command">
            <div class="download-command-copy">
              <span class="command-mark">$</span>
              <span>Windows x64 installer <span class="command-muted">· ${version}</span></span>
            </div>
            <a href="${windowsSetupUrl}" target="_blank" rel="noreferrer" aria-label="Download the latest r0 Windows installer">
              Download <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div class="hero-links">
            <a href="${repoUrl}" target="_blank" rel="noreferrer">GitHub repository <span aria-hidden="true">↗</span></a>
            <a href="${releaseUrl}" target="_blank" rel="noreferrer">All release assets <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <div class="hero-visual">
          <div class="visual-caption">
            <span>r0 / YOUR DEVELOPMENT WORKSPACE</span>
            <span>PRODUCT PREVIEW</span>
          </div>
          <div class="showreel-window" id="showreel">
            <div class="window-chrome">
              <span class="showreel-dots" aria-hidden="true"><i></i><i></i><i></i></span>
              <span class="window-label">r0 · desktop IDE</span>
              <span class="window-status">ADSHKUMAR / R0</span>
            </div>
            <div class="showreel-picture">
              <button
                class="screenshot-button showreel-button"
                type="button"
                data-image-src="${screenshots[0].image}"
                data-image-alt="${screenshots[0].imageAlt}"
                aria-label="View full-size screenshot: ${screenshots[0].imageTitle}"
              >
                <img src="${screenshots[0].image}" alt="${screenshots[0].imageAlt}" fetchpriority="high" />
                <span class="screenshot-zoom" aria-hidden="true">VIEW FULL SIZE ↗</span>
              </button>
            </div>
            <div class="showreel-tabs" role="group" aria-label="Choose an r0 screenshot">
              ${screenshots
                .map(
                  (item, index) => `
                    <button
                      class="showreel-tab"
                      type="button"
                      data-showcase-index="${index}"
                      aria-label="Show ${item.imageTitle} screenshot"
                      aria-pressed="${index === 0}"
                    >
                      <span>0${index + 1}</span>${item.imageTitle}
                    </button>
                  `,
                )
                .join('')}
            </div>
            <div class="typing-demo">
              <div class="typing-demo-header">
                <span class="typing-demo-label"><i></i> WORKFLOW PREVIEW</span>
                <span class="typing-demo-mode" id="typing-demo-mode">ASK</span>
              </div>
              <div class="typing-demo-prompt">
                <span class="typing-demo-prefix">r0 &gt;</span>
                <span id="typing-demo-text"></span><span class="typing-caret" aria-hidden="true"></span>
              </div>
              <div class="typing-demo-answer" aria-live="polite">
                <span aria-hidden="true">↳</span><span id="typing-demo-answer"></span>
              </div>
            </div>
          </div>
          <p class="showreel-note">Your r0 screenshots · Ask, Plan, and Agent demos follow your project workflow.</p>
        </div>

        <div class="hero-stats" aria-label="Project highlights">
          <div><strong>Ask · Plan · Agent</strong><span>AI modes</span></div>
          <div><strong>Tauri 2 + Rust</strong><span>Desktop app</span></div>
          <div><strong>Git + terminal</strong><span>Built in</span></div>
          <div><strong>Open source</strong><span>Made in public</span></div>
        </div>
      </section>

      <section id="features" class="section container">
        <div class="section-head">
          <div class="eyebrow">Made for your development workflow</div>
          <h2>Built to keep your development workflow together.</h2>
        </div>

        <div class="feature-grid">
          ${featureSections
            .map(
              (feature, index) => `
                <article class="feature-card">
                  <div class="feature-card-top">
                    <span class="feature-number">0${index + 1}</span>
                    <span class="feature-meta">${feature.meta}</span>
                  </div>
                  <h3>${feature.title}</h3>
                  <div class="feature-kicker">${feature.kicker}</div>
                  <p>${feature.text}</p>
                </article>
              `,
            )
            .join('')}
        </div>
      </section>

      <section id="download" class="download section container">
        <div class="download-panel">
          <div class="download-header">
            <div>
              <div class="eyebrow">Installation</div>
              <h2>Get started with r0.</h2>
            </div>
            <a class="button button-primary" href="${windowsSetupUrl}" target="_blank" rel="noreferrer">
              Download for Windows
            </a>
          </div>

          <div class="download-grid">
            <div class="download-copy">
              <p>
                The latest verified Windows release provides a direct installer for x64 systems. Use the primary setup file for the fastest path to installation, or choose the MSI option if your workflow requires it.
              </p>
              <div class="download-links">
                <a class="button button-secondary" href="${windowsSetupUrl}" target="_blank" rel="noreferrer">NSIS setup</a>
                <a class="button button-secondary" href="${releaseUrl}" target="_blank" rel="noreferrer">MSI &amp; release assets</a>
                <a class="text-link" href="${releaseUrl}" target="_blank" rel="noreferrer">View release notes</a>
              </div>
            </div>

            <div class="meta-box">
              <div>
                <span>Current stable version</span>
                <strong>${version}</strong>
              </div>
              <div>
                <span>Platform</span>
                <strong>Windows x64</strong>
              </div>
              <div>
                <span>Source</span>
                <strong>GitHub releases</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="install section container">
        <div class="section-head narrow">
          <div class="eyebrow">Quick setup</div>
          <h2>Install in a few steps.</h2>
        </div>

        <div class="install-layout">
          <div class="install-list">
            ${installSteps
              .map(
                (step, index) => `
                  <div class="install-step">
                    <span>${index + 1}</span>
                    <p>${step}</p>
                  </div>
                `,
              )
              .join('')}
          </div>

          <aside class="info-card">
            <h3>Important notes</h3>
            <ul>
              <li>Use the latest release for the newest build and verified installer assets.</li>
              <li>AI features require a provider configuration and any required API keys or local service access.</li>
              <li>macOS and Linux support is not currently published as a release artifact in the project’s GitHub release workflow.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section id="open-source" class="section container">
        <div class="section-head narrow">
          <div class="eyebrow">Open source</div>
          <h2>Review the code, follow the project, and contribute.</h2>
        </div>

        <div class="source-panel">
          <div class="source-head">
            <div class="source-icon">⌂</div>
            <div>
              <h3>r0 on GitHub</h3>
              <p>The source code, roadmap updates, issues, and release history are all public on GitHub.</p>
            </div>
          </div>

          <div class="source-links">
            ${sourceLinks
              .map(
                (link) => `
                  <a href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>
                `,
              )
              .join('')}
          </div>
        </div>
      </section>

      <section class="cta-wrap container">
        <div class="cta-panel">
          <div>
            <div class="eyebrow">Ready to build</div>
            <h2>Bring your next project into clearer focus.</h2>
          </div>
          <a class="button button-primary" href="${windowsSetupUrl}" target="_blank" rel="noreferrer">
            Download for Windows
          </a>
        </div>
      </section>
    </main>

    <dialog class="image-dialog" id="image-preview" aria-label="Full-size r0 screenshot">
      <div class="image-dialog-header">
        <span>r0 / screenshot preview</span>
        <button class="image-dialog-close" type="button" aria-label="Close screenshot preview">CLOSE <span aria-hidden="true">×</span></button>
      </div>
      <img class="image-dialog-content" alt="" />
    </dialog>

    <footer class="site-footer">
      <div class="container footer-wrap">
        <img src="${wordmarkUrl}" alt="r0" />
        <p>Built for developers who want AI assistance without leaving their workflow.</p>
        <a href="${repoUrl}" target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </footer>
  `;

  const revealTargets = app.querySelectorAll<HTMLElement>(
    '.hero-copy > *, .hero-stats > div, .hero-visual, .feature-card, .download-panel, .install-step, .info-card, .source-panel, .cta-panel',
  );

  revealTargets.forEach((target, index) => {
    target.classList.add('reveal');
    target.style.setProperty('--reveal-delay', `${(index % 4) * 75}ms`);
  });

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('motion-ready');

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -36px 0px' },
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
  }

  const imageDialog = app.querySelector<HTMLDialogElement>('#image-preview');
  const dialogImage = imageDialog?.querySelector<HTMLImageElement>('.image-dialog-content');
  const closeDialogButton = imageDialog?.querySelector<HTMLButtonElement>('.image-dialog-close');
  const showreelImageButton = app.querySelector<HTMLButtonElement>('.showreel-button');
  const showreelImage = showreelImageButton?.querySelector<HTMLImageElement>('img');
  const showreelTabs = app.querySelectorAll<HTMLButtonElement>('.showreel-tab');
  const typingMode = app.querySelector<HTMLElement>('#typing-demo-mode');
  const typingText = app.querySelector<HTMLElement>('#typing-demo-text');
  const typingAnswer = app.querySelector<HTMLElement>('#typing-demo-answer');
  const typingAnswerContainer = app.querySelector<HTMLElement>('.typing-demo-answer');
  const demoWindow = app.querySelector<HTMLElement>('.showreel-window');
  const demoTypingEnabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let showreelInView = false;
  let currentShowreelIndex = 0;
  let currentDemoIndex = 0;
  let typingTimers: number[] = [];

  const selectShowreelImage = (index: number) => {
    currentShowreelIndex = (index + screenshots.length) % screenshots.length;
    const selectedSection = screenshots[currentShowreelIndex];

    if (showreelImageButton && showreelImage && showreelImageButton.dataset.imageSrc !== selectedSection.image) {
      showreelImageButton.dataset.imageSrc = selectedSection.image;
      showreelImageButton.dataset.imageAlt = selectedSection.imageAlt;
      showreelImageButton.setAttribute('aria-label', `View full-size screenshot: ${selectedSection.imageTitle}`);
      showreelImageButton.classList.add('is-changing');
      showreelImage.onload = () => showreelImageButton.classList.remove('is-changing');
      showreelImage.onerror = () => showreelImageButton.classList.remove('is-changing');
      showreelImage.src = selectedSection.image;
      showreelImage.alt = selectedSection.imageAlt;
      if (showreelImage.complete) {
        window.requestAnimationFrame(() => showreelImageButton.classList.remove('is-changing'));
      }
    }

    showreelTabs.forEach((tab, tabIndex) => {
      tab.setAttribute('aria-pressed', String(tabIndex === currentShowreelIndex));
      tab.classList.remove('is-progressing');
    });
    const activeTab = showreelTabs[currentShowreelIndex];
    if (activeTab) {
      void activeTab.offsetWidth;
      activeTab.classList.add('is-progressing');
    }
  };

  const renderTypingDemo = (index: number) => {
    currentDemoIndex = (index + workflowDemos.length) % workflowDemos.length;
    const demo = workflowDemos[currentDemoIndex];

    if (!typingMode || !typingText || !typingAnswer) return;

    typingTimers.forEach((timer) => window.clearTimeout(timer));
    typingTimers = [];
    typingMode.textContent = demo.mode;
    typingMode.dataset.mode = demo.mode.toLowerCase();
    typingText.textContent = '';
    typingAnswer.textContent = '';
    typingAnswerContainer?.setAttribute('aria-live', 'off');

    if (!demoTypingEnabled) {
      typingText.textContent = demo.prompt;
      typingAnswer.textContent = demo.answer;
      typingAnswerContainer?.setAttribute('aria-live', 'polite');
      return;
    }

    const type = (element: HTMLElement, text: string, delay: number, step: number, done?: () => void) => {
      let position = 0;
      const writeNext = () => {
        position = Math.min(position + step, text.length);
        element.textContent = text.slice(0, position);
        if (position < text.length) {
          typingTimers.push(window.setTimeout(writeNext, delay));
        } else {
          done?.();
        }
      };
      writeNext();
    };

    type(typingText, demo.prompt, 32, 1, () => {
      typingTimers.push(
        window.setTimeout(
          () =>
            type(typingAnswer, demo.answer, 13, 2, () => {
              typingAnswerContainer?.setAttribute('aria-live', 'polite');
            }),
          480,
        ),
      );
    });
  };

  showreelTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const index = Number(tab.dataset.showcaseIndex);
      if (Number.isInteger(index)) selectShowreelImage(index);
    });
  });

  let showreelInterval = 0;
  const stopShowreel = () => {
    window.clearInterval(showreelInterval);
    showreelInterval = 0;
  };
  const startShowreel = () => {
    if (!demoTypingEnabled || !showreelInView || showreelInterval || demoWindow?.matches(':hover, :focus-within')) return;
    selectShowreelImage(currentShowreelIndex);
    showreelInterval = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        selectShowreelImage(currentShowreelIndex + 1);
        renderTypingDemo(currentDemoIndex + 1);
      }
    }, 7000);
  };

  demoWindow?.addEventListener('mouseenter', stopShowreel);
  demoWindow?.addEventListener('mouseleave', startShowreel);
  demoWindow?.addEventListener('focusin', stopShowreel);
  demoWindow?.addEventListener('focusout', (event) => {
    if (!(event.relatedTarget instanceof Node) || !demoWindow.contains(event.relatedTarget)) startShowreel();
  });

  if (demoTypingEnabled && demoWindow && 'IntersectionObserver' in window) {
    const showreelObserver = new IntersectionObserver(
      ([entry]) => {
        showreelInView = entry.isIntersecting;
        if (showreelInView) startShowreel();
        else stopShowreel();
      },
      { threshold: 0.15 },
    );
    showreelObserver.observe(demoWindow);
  } else if (demoTypingEnabled && demoWindow) {
    showreelInView = true;
    startShowreel();
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') startShowreel();
    else stopShowreel();
  });

  renderTypingDemo(0);

  app.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;

    const imageButton = event.target.closest<HTMLButtonElement>('.screenshot-button');

    if (imageButton && imageDialog && dialogImage) {
      dialogImage.src = imageButton.dataset.imageSrc ?? '';
      dialogImage.alt = imageButton.dataset.imageAlt ?? '';
      imageDialog.showModal();
    }
  });

  closeDialogButton?.addEventListener('click', () => imageDialog?.close());
  imageDialog?.addEventListener('click', (event) => {
    if (event.target === imageDialog) imageDialog.close();
  });
}
