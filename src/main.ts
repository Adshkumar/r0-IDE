import './style.css';

const repoUrl = 'https://github.com/Adshkumar/r0';
const releasesUrl = `${repoUrl}/releases`;
const latestReleaseUrl = `${releasesUrl}/latest`;
const downloadUrl = `${latestReleaseUrl}/download/r0-latest-setup.exe`;
const docsUrl = `${repoUrl}/tree/main/docs`;
const version = 'v0.2.10';
const wordmarkUrl = '/r0-wordmark.svg';
const screenshots = [
  {
    title: 'The editor',
    image: '/r0-editor-finance.png',
    alt: 'r0 showing a project file tree, open code editor tabs, syntax-highlighted code, and an integrated terminal',
    caption: 'Editor, project files, and terminal in one workspace.',
  },
  {
    title: 'AI in context',
    image: '/r0-ai-panel.png',
    alt: 'r0 with its Ask, Plan, and Agent assistant panel open beside the code editor',
    caption: 'Ask, Plan, and Agent alongside your project.',
  },
  {
    title: 'Git and history',
    image: '/r0-git-panel.png',
    alt: 'r0 Git panel with commit controls, working tree changes, and commit history',
    caption: 'Review changes, commit, and browse repository history.',
  },
];

const aiWorkflowCards = [
  {
    number: '01',
    meta: 'AI WORKFLOW',
    title: 'AI Assistance in Your Workspace',
    subtitle: 'Ask, plan, or work with an agent',
    text: 'Use Ask for questions about your project, Plan to outline a change, and Agent for coding tasks. Connect a supported cloud provider or compatible local model endpoint.',
  },
  {
    number: '02',
    meta: 'EDITOR · AI',
    title: 'From Prompts to Code',
    subtitle: 'Review actions before they run',
    text: 'Agent can inspect project files, propose file edits, and run shell commands. r0 asks you to approve these actions before carrying them out.',
  },
  {
    number: '03',
    meta: 'EDITOR · COMPLETIONS',
    title: 'Suggestions While You Code',
    subtitle: 'See AI completions in the editor',
    text: 'AI-powered ghost-text completions appear inline as you write. Accept a suggestion from the editor, or keep typing and let it update with your code.',
  },
  {
    number: '04',
    meta: 'TERMINAL · COMMANDS',
    title: 'Work With Your Development Tools',
    subtitle: 'Keep commands close to your code',
    text: 'Run project commands in the integrated terminal, open multiple terminal tabs, and switch between your code and command output in the same workspace.',
  },
  {
    number: '05',
    meta: 'PROJECTS · WORKSPACE',
    title: 'A Workspace for Your Projects',
    subtitle: 'Pick up where you left off',
    text: 'Browse project files, search the workspace, and reopen recent projects. r0 also saves your session, including open tabs, editor positions, and workspace layout.',
  },
];

const stories = [
  {
    id: 'editor',
    number: '01',
    label: 'EDITOR',
    title: 'A workspace built around your code.',
    text: 'Open a project and work across files, tabs, and an integrated terminal. Browse the file tree, search the workspace, and keep your code in view while you build.',
    points: ['Project file navigation', 'Editor tabs and syntax highlighting', 'Find, replace, and formatting'],
  },
  {
    id: 'ai-assistant',
    number: '02',
    label: 'AI WORKFLOW',
    title: 'Move from an idea to an implementation.',
    text: 'Ask questions about your workspace, explore a structured plan, or use Agent for coding tasks. Agent file edits and shell commands require your approval.',
    points: ['Ask about code in context', 'Plan a change before making it', 'Approve Agent actions'],
  },
  {
    id: 'terminal',
    number: '03',
    label: 'TERMINAL',
    title: 'Keep your development loop close.',
    text: 'Run commands from the project workspace without leaving the editor. r0 supports multiple integrated terminal tabs for the tools your project already uses.',
    points: ['Multiple terminal tabs', 'Project-local commands', 'A shared view of code and output'],
  },
  {
    id: 'code-intelligence',
    number: '05',
    label: 'CODE INTELLIGENCE',
    title: 'Understand your code at a glance.',
    text: 'CodeMirror 6 powers the editor, with language support, completions, diagnostics, and code search for the languages your project uses.',
    points: ['JavaScript, TypeScript, Rust, Python', 'HTML, CSS, JSON, SQL, Markdown, YAML', 'Autocomplete, diagnostics, and search'],
  },
  {
    id: 'personalization',
    number: '06',
    label: 'PERSONALIZATION',
    title: 'Make the workspace yours.',
    text: 'Choose a built-in editor theme to suit your setup, or discover contributed themes through Open VSX extensions.',
    points: ['r0 Dark and r0 Light', 'Dracula, GitHub Dark, and Cobalt2', 'Open VSX extension support'],
  },
  {
    id: 'live-workflow',
    number: '07',
    label: 'LIVE WORKFLOW',
    title: 'Build, run, and inspect your work.',
    text: 'Preview local HTML in r0, inspect image files in the editor, and run your project with commands in the integrated terminal.',
    points: ['Local HTML preview', 'Image previews', 'Terminal-led project workflows'],
  },
  {
    id: 'workspace',
    number: '08',
    label: 'WORKSPACE',
    title: 'Pick up where you left off.',
    text: 'Reopen recent projects, find files across your workspace, and use the command palette to move through common tasks. Add relevant files to AI conversations for more useful context.',
    points: ['Recent projects', 'Workspace search and command palette', 'Multiple files as AI context'],
  },
];

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  const renderStoryCard = (story: (typeof stories)[number]) => `
    <article class="story-card" id="${story.id}">
      <div class="story-card-top"><span class="story-card-number">${story.number}</span><span class="story-card-meta">${story.label}</span></div>
      <h3>${story.title}</h3>
      <p class="story-card-description">${story.text}</p>
      ${story.id === 'personalization'
        ? `<div class="theme-swatches" aria-label="Five built-in themes">
            <div><i class="theme-preview swatch-r0-dark" aria-hidden="true"></i><span>r0 Dark</span></div>
            <div><i class="theme-preview swatch-r0-light" aria-hidden="true"></i><span>r0 Light</span></div>
            <div><i class="theme-preview swatch-dracula" aria-hidden="true"></i><span>Dracula</span></div>
            <div><i class="theme-preview swatch-github" aria-hidden="true"></i><span>GitHub Dark</span></div>
            <div><i class="theme-preview swatch-cobalt" aria-hidden="true"></i><span>Cobalt2</span></div>
          </div>`
        : `<ul class="story-card-details">${story.points.map((point) => `<li>${point}</li>`).join('')}</ul>`}
    </article>`;

  app.innerHTML = `
    <header class="topbar">
      <div class="container nav-wrap">
        <a href="#top" class="brand" aria-label="r0 home">
          <img src="${wordmarkUrl}" alt="r0" />
        </a>
        <button class="menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="site-navigation">
          <span></span><span></span>
        </button>
        <nav class="site-nav" id="site-navigation" aria-label="Main navigation">
          <a href="#features">Product</a>
          <a href="#ai-workflow">AI workflow</a>
          <a href="${repoUrl}" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </nav>
        <a class="button button-primary nav-download" href="${downloadUrl}" target="_blank" rel="noreferrer">Download <span aria-hidden="true">↗</span></a>
      </div>
    </header>

    <main id="top">
      <section class="hero container">
        <div class="hero-copy">
          <p class="eyebrow">// THE AI-POWERED DESKTOP IDE</p>
          <h1>Your ideas. Your code.<br /><span>One focused workspace.</span></h1>
          <p class="hero-lede">r0 brings your coding workflow, integrated development tools, Git, and AI assistance together in a desktop IDE built to help you turn ideas into working software.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="${downloadUrl}" target="_blank" rel="noreferrer">Download for Windows <span aria-hidden="true">↗</span></a>
            <a class="button button-secondary" href="${repoUrl}" target="_blank" rel="noreferrer">View on GitHub <span aria-hidden="true">↗</span></a>
          </div>
          <p class="release-note"><span class="status-dot"></span> Latest release ${version} <span aria-hidden="true">·</span> Windows x64</p>
        </div>

        <section class="product-metrics" aria-labelledby="product-metrics-title">
          <div class="product-metrics-top">
            <h2 id="product-metrics-title"><b>R0</b> / PRODUCT AT A GLANCE</h2>
            <span>DESKTOP IDE&nbsp; · &nbsp;${version.toUpperCase()}</span>
          </div>
          <div class="product-metrics-grid">
            <article class="product-metric">
              <p>HOST MEMORY</p>
              <h3>LIVE</h3>
              <span>See used and total system memory in the r0 status panel.</span>
            </article>
            <article class="product-metric">
              <p>AI WORKFLOWS</p>
              <h3>03</h3>
              <span>Ask&nbsp; · &nbsp;Plan&nbsp; · &nbsp;Agent</span>
            </article>
            <article class="product-metric">
              <p>PROJECT WORKSPACE</p>
              <h3>MULTI-ROOT</h3>
              <span>Bring multiple project folders into one synced workspace.</span>
            </article>
            <article class="product-metric">
              <p>VERSION CONTROL</p>
              <h3>NATIVE GIT</h3>
              <span>Review changes, diffs, branches, history, commits, and pushes.</span>
            </article>
            <article class="product-metric">
              <p>DEVELOPMENT TOOLS</p>
              <h3>INTEGRATED</h3>
              <span>Run project shells in the built-in terminal.</span>
            </article>
            <article class="product-metric">
              <p>EDITOR ENGINE</p>
              <h3>CODEMIRROR 6</h3>
              <span>Language support, completions, diagnostics, and code search.</span>
            </article>
          </div>
        </section>

        <div class="hero-product">
          <div class="product-label"><span>R0 / THE DEVELOPMENT WORKSPACE</span><span>01 — 03 / PRODUCT VIEWS</span></div>
          <div class="product-frame">
            <div class="frame-bar"><span class="frame-dots" aria-hidden="true"><i></i><i></i><i></i></span><span>r0&nbsp; · &nbsp;desktop IDE</span><span>TAURI / WINDOWS</span></div>
            <figure class="hero-shot">
              <button class="screenshot-button hero-screenshot" type="button" data-image-src="${screenshots[0].image}" data-image-alt="${screenshots[0].alt}" aria-label="View full-size screenshot: ${screenshots[0].title}">
                <img src="${screenshots[0].image}" alt="${screenshots[0].alt}" fetchpriority="high" />
                <span class="screenshot-zoom" aria-hidden="true">VIEW FULL SIZE ↗</span>
              </button>
              <figcaption id="hero-caption">${screenshots[0].caption}</figcaption>
            </figure>
            <div class="product-tabs" role="group" aria-label="Choose a product screenshot">
              ${screenshots.map((item, index) => `<button type="button" data-showcase-index="${index}" aria-pressed="${index === 0}"><span>0${index + 1}</span>${item.title}</button>`).join('')}
            </div>
          </div>
        </div>
      </section>

      <section class="ai-catalog" id="ai-workflow" aria-labelledby="ai-catalog-title">
        <div class="ai-catalog-inner">
          <div class="ai-catalog-heading">
            <p class="ai-catalog-eyebrow">// AI, INSIDE THE WORKFLOW</p>
            <h2 id="ai-catalog-title">A more connected way<br />to work with code.</h2>
            <p>From contextual questions to approved changes, keep AI and development tools close to the project.</p>
          </div>
          <div class="ai-card-grid">
            ${aiWorkflowCards.map((card) => `
              <article class="ai-card">
                <div class="ai-card-top"><span class="ai-card-number">${card.number}</span><span class="ai-card-meta">${card.meta}</span></div>
                <h3>${card.title}</h3>
                <p class="ai-card-subtitle">${card.subtitle}</p>
                <p class="ai-card-description">${card.text}</p>
              </article>`).join('')}
          </div>
        </div>
      </section>

      <section class="feature-intro container" id="features">
        <p class="eyebrow">01 — 08&nbsp; / &nbsp;THE WORKFLOW</p>
        <h2>Everything you need to stay<br />close to the work.</h2>
        <p>One workspace for editing, understanding, running, and reviewing your project.</p>
      </section>

      <section class="container stories" aria-label="r0 product features">
        ${stories.slice(0, 3).map(renderStoryCard).join('')}
      </section>

      <section class="git-showcase" id="git" aria-labelledby="git-showcase-title">
        <div class="git-showcase-inner">
          <div class="git-showcase-heading">
            <p class="git-showcase-index"><span>[04]</span><br />/ GIT</p>
            <div>
              <h2 id="git-showcase-title">Working tree, Git &amp; GitHub integration.</h2>
              <p>Review local changes directly in r0. Inspect diffs, browse commit history, manage branches, and commit or push without leaving your workspace.</p>
            </div>
          </div>
          <figure class="git-product-frame">
            <div class="git-frame-bar">
              <span>r0 / SOURCE CONTROL</span>
              <span>WORKING TREE&nbsp; · &nbsp;HISTORY&nbsp; · &nbsp;DIFFS</span>
            </div>
            <button class="screenshot-button git-screenshot" type="button" data-image-src="/r0-git-panel.png" data-image-alt="${screenshots[2].alt}" aria-label="View full-size screenshot: r0 Git panel">
              <img src="/r0-git-panel.png" alt="${screenshots[2].alt}" loading="lazy" />
              <span class="screenshot-zoom" aria-hidden="true">VIEW FULL SIZE ↗</span>
            </button>
            <figcaption>
              <span>R0 / LOCAL GIT</span>
              <span>Changes, commit controls, and history in one panel.</span>
              <span>COMMIT&nbsp; · &nbsp;PUSH&nbsp; · &nbsp;BRANCH</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section class="more-features-heading container" aria-labelledby="more-features-title">
        <p class="more-features-index"><span>[05]</span><br />/ PRODUCT</p>
        <div>
          <h2 id="more-features-title">Tools for your code.<br /><span>Room to make it yours.</span></h2>
          <p>Editor intelligence, live previews, and workspace details that keep the rest of your development flow within reach.</p>
        </div>
      </section>

      <section class="container stories" aria-label="More r0 product features">
        ${stories.slice(3).map(renderStoryCard).join('')}
      </section>

      <section class="download-section container" id="download">
        <div class="download-panel">
          <div>
            <p class="eyebrow">GET STARTED&nbsp; / &nbsp;WINDOWS X64</p>
            <h2>Ready to build with r0?</h2>
            <p>Get the latest available Windows release and start building in r0.</p>
          </div>
          <div class="download-actions">
            <a class="button button-primary" href="${downloadUrl}" target="_blank" rel="noreferrer">Download for Windows <span aria-hidden="true">↗</span></a>
            <a class="text-link" href="${releasesUrl}" target="_blank" rel="noreferrer">View all releases <span aria-hidden="true">↗</span></a>
            <span class="download-version">LATEST&nbsp; / &nbsp;${version}</span>
          </div>
        </div>
      </section>
    </main>

    <dialog class="image-dialog" id="image-preview" aria-label="Full-size r0 screenshot">
      <div class="image-dialog-header">
        <span>r0 / product screenshot</span>
        <button class="image-dialog-close" type="button" aria-label="Close screenshot preview">CLOSE <span aria-hidden="true">×</span></button>
      </div>
      <img class="image-dialog-content" alt="" />
    </dialog>

    <footer class="site-footer">
      <div class="container footer-main">
        <div class="footer-brand">
          <a href="#top" aria-label="r0 home"><img src="${wordmarkUrl}" alt="r0" /></a>
          <p>A desktop IDE for AI-assisted software development.</p>
        </div>
        <div class="footer-links">
          <a href="${repoUrl}" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          <a href="${releasesUrl}" target="_blank" rel="noreferrer">Releases <span aria-hidden="true">↗</span></a>
          <a href="${docsUrl}" target="_blank" rel="noreferrer">Documentation <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div class="container footer-bottom"><span>OPEN SOURCE&nbsp; / &nbsp;MADE FOR BUILDING</span><a href="#top">BACK TO TOP ↑</a></div>
    </footer>
  `;

  const revealTargets = app.querySelectorAll<HTMLElement>(
    '.hero-copy, .hero-product, .product-metric, .ai-catalog-heading, .ai-card, .feature-intro, .story-card, .git-showcase-heading, .git-product-frame, .more-features-heading, .download-panel',
  );

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('motion-ready');
    revealTargets.forEach((element, index) => {
      element.classList.add('reveal');
      if (element.matches('.product-metric, .ai-card, .story-card')) {
        element.style.setProperty('--reveal-delay', `${(index % 3) * 65}ms`);
      }
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });

    revealTargets.forEach((element) => revealObserver.observe(element));
  }

  const menuToggle = app.querySelector<HTMLButtonElement>('.menu-toggle');
  const siteNav = app.querySelector<HTMLElement>('#site-navigation');
  const closeMenu = () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation menu');
    siteNav?.classList.remove('is-open');
  };

  menuToggle?.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    menuToggle.setAttribute('aria-label', isExpanded ? 'Open navigation menu' : 'Close navigation menu');
    siteNav?.classList.toggle('is-open', !isExpanded);
  });

  siteNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const heroScreenshotButton = app.querySelector<HTMLButtonElement>('.hero-screenshot');
  const heroScreenshot = heroScreenshotButton?.querySelector<HTMLImageElement>('img');
  const heroCaption = app.querySelector<HTMLElement>('#hero-caption');
  const showcaseTabs = app.querySelectorAll<HTMLButtonElement>('[data-showcase-index]');

  showcaseTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const index = Number(tab.dataset.showcaseIndex);
      const screenshot = screenshots[index];
      if (!screenshot || !heroScreenshot || !heroScreenshotButton) return;

      heroScreenshotButton.dataset.imageSrc = screenshot.image;
      heroScreenshotButton.dataset.imageAlt = screenshot.alt;
      heroScreenshotButton.setAttribute('aria-label', `View full-size screenshot: ${screenshot.title}`);
      heroScreenshot.src = screenshot.image;
      heroScreenshot.alt = screenshot.alt;
      if (heroCaption) heroCaption.textContent = screenshot.caption;
      showcaseTabs.forEach((item, itemIndex) => item.setAttribute('aria-pressed', String(itemIndex === index)));
    });
  });

  const imageDialog = app.querySelector<HTMLDialogElement>('#image-preview');
  const dialogImage = imageDialog?.querySelector<HTMLImageElement>('.image-dialog-content');
  const closeDialogButton = imageDialog?.querySelector<HTMLButtonElement>('.image-dialog-close');

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && imageDialog?.open) imageDialog.close();
  });

  app.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const imageButton = event.target.closest<HTMLButtonElement>('.screenshot-button');
    if (!imageButton || !imageDialog || !dialogImage) return;
    dialogImage.src = imageButton.dataset.imageSrc ?? '';
    dialogImage.alt = imageButton.dataset.imageAlt ?? '';
    imageDialog.showModal();
  });

  closeDialogButton?.addEventListener('click', () => imageDialog?.close());
  imageDialog?.addEventListener('click', (event) => {
    if (event.target === imageDialog) imageDialog.close();
  });
}
