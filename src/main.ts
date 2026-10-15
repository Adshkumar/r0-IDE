import './style.css';

const repoUrl = 'https://github.com/Adshkumar/r0';
const websiteRepoUrl = 'https://github.com/Adshkumar/r0-IDE';
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

const workflowSteps = [
  {
    title: 'Open project',
    image: screenshots[0],
    description: 'Choose a project folder and open it as your r0 workspace.',
    action: 'Use the project picker to open a folder on your machine.',
    result: 'The project appears in the workspace, ready to browse and edit.',
  },
  {
    title: 'Explore files',
    image: screenshots[0],
    description: 'Browse the project tree or search files and code.',
    action: 'Open files from the sidebar or use workspace search.',
    result: 'The file you choose opens in an editor tab.',
  },
  {
    title: 'Edit code',
    image: screenshots[0],
    description: 'Work in a syntax-aware editor with tabs and code navigation.',
    action: 'Edit the open file; use language support, formatting, and completions.',
    result: 'Your changes stay in the project and appear in the Git working tree.',
  },
  {
    title: 'Use AI assistance',
    image: screenshots[1],
    description: 'Ask a question, make a read-only plan, or work with Agent.',
    action: 'Choose a mode, enter a prompt, and select relevant project context.',
    result: 'Read responses as they stream in; review proposed edits before they are applied.',
  },
  {
    title: 'Run commands',
    image: screenshots[0],
    description: 'Use a project-local shell in the integrated terminal.',
    action: 'Open a terminal tab and run the command your project needs.',
    result: 'See command output alongside your editor and files.',
  },
  {
    title: 'Review changes',
    image: screenshots[2],
    description: 'Inspect the working tree and review file diffs.',
    action: 'Open Source Control and select a changed file or hunk.',
    result: 'See what changed before you decide to commit.',
  },
  {
    title: 'Commit & push',
    image: screenshots[2],
    description: 'Commit local changes and push them to your remote.',
    action: 'Enter a commit message, commit the reviewed changes, then push.',
    result: 'Your commit is recorded in local history and can be pushed to the remote.',
  },
];

const stories = [
  {
    id: 'editor',
    number: '01',
    label: 'EDITOR',
    title: 'A workspace built around your code.',
    text: 'Open a project and work across files, tabs, and an integrated terminal. Browse the file tree, search the workspace, and keep your code in view while you build.',
    how: 'Open a folder, browse the file tree, and switch between editor tabs.',
    result: 'Your selected project files open together in one editor workspace.',
    points: ['Project file navigation', 'Editor tabs and syntax highlighting', 'Find, replace, and formatting'],
  },
  {
    id: 'ai-assistant',
    number: '02',
    label: 'AI WORKFLOW',
    title: 'Move from an idea to an implementation.',
    text: 'Ask questions about your workspace, explore a structured plan, or use Agent for coding tasks. Agent file edits and shell commands require your approval.',
    how: 'Choose Ask, Plan, or Agent, then enter a prompt and relevant context.',
    result: 'Get a response or plan; review proposed edits and approve gated actions.',
    points: ['Ask about code in context', 'Plan a change before making it', 'Approve Agent actions'],
  },
  {
    id: 'terminal',
    number: '03',
    label: 'TERMINAL',
    title: 'Keep your development loop close.',
    text: 'Run commands from the project workspace without leaving the editor. r0 supports multiple integrated terminal tabs for the tools your project already uses.',
    how: 'Open a terminal tab and run a command from the project directory.',
    result: 'Read the shell output without leaving your code workspace.',
    points: ['Multiple terminal tabs', 'Project-local commands', 'A shared view of code and output'],
  },
  {
    id: 'code-intelligence',
    number: '05',
    label: 'CODE INTELLIGENCE',
    title: 'Understand your code at a glance.',
    text: 'CodeMirror 6 powers the editor, with language support, completions, diagnostics, and code search for the languages your project uses.',
    how: 'Edit a supported language and use its editor completions, diagnostics, or search.',
    result: 'Code is highlighted and supported language tools are available in the editor.',
    points: ['JavaScript, TypeScript, Rust, Python', 'HTML, CSS, JSON, SQL, Markdown, YAML', 'Autocomplete, diagnostics, and search'],
  },
  {
    id: 'personalization',
    number: '06',
    label: 'PERSONALIZATION',
    title: 'Make the workspace yours.',
    text: 'Choose a built-in editor theme to suit your setup, or discover contributed themes through Open VSX extensions.',
    how: 'Choose an editor theme in settings or install a contributed theme.',
    result: 'The editor updates to use your selected theme.',
    points: ['r0 Dark and r0 Light', 'Dracula, GitHub Dark, and Cobalt2', 'Open VSX extension support'],
  },
  {
    id: 'live-workflow',
    number: '07',
    label: 'LIVE WORKFLOW',
    title: 'Build, run, and inspect your work.',
    text: 'Preview local HTML in r0, inspect image files in the editor, and run your project with commands in the integrated terminal.',
    how: 'Open a local HTML or image file, or run the project in the terminal.',
    result: 'View supported previews or inspect the output of your project command.',
    points: ['Local HTML preview', 'Image previews', 'Terminal-led project workflows'],
  },
  {
    id: 'workspace',
    number: '08',
    label: 'WORKSPACE',
    title: 'Pick up where you left off.',
    text: 'Reopen recent projects, find files across your workspace, and use the command palette to move through common tasks. Add relevant files to AI conversations for more useful context.',
    how: 'Reopen a recent project, search the workspace, or use the command palette.',
    result: 'Return to project files and common actions from the same workspace.',
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
      <div class="story-how-result">
        <p><span>USE</span>${story.how}</p>
        <p><span>RESULT</span>${story.result}</p>
      </div>
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
          <a href="#workflow">Workflow</a>
          <a href="#ai-workflow">AI workflow</a>
          <a href="${repoUrl}" target="_blank" rel="noreferrer">r0 GitHub <span aria-hidden="true">↗</span></a>
        </nav>
        <a class="button button-primary nav-download" href="${downloadUrl}" target="_blank" rel="noreferrer">Download <span aria-hidden="true">↗</span></a>
      </div>
    </header>

    <main id="top">
      <section class="hero container">
        <div class="hero-copy">
          <p class="eyebrow">// THE AI-POWERED DESKTOP IDE</p>
          <h1>Your ideas. Your code.<br /><span>One focused workspace.</span></h1>
          <p class="hero-lede">r0 is a desktop IDE for exploring projects, editing code, working with AI, running commands, and reviewing Git changes in one workspace.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="${downloadUrl}" target="_blank" rel="noreferrer">Download for Windows <span aria-hidden="true">↗</span></a>
            <a class="button button-secondary" href="${repoUrl}" target="_blank" rel="noreferrer">View on GitHub <span aria-hidden="true">↗</span></a>
          </div>
          <p class="release-note"><span class="status-dot"></span> Windows x64 <span aria-hidden="true">·</span> Installer from official releases</p>
        </div>

        <section class="product-metrics" aria-labelledby="product-metrics-title">
          <div class="product-metrics-top">
            <h2 id="product-metrics-title"><b>R0</b> / PRODUCT AT A GLANCE</h2>
            <span>DESKTOP IDE&nbsp; · &nbsp;${version.toUpperCase()}</span>
          </div>
          <div class="product-metrics-grid">
            <article class="product-metric">
              <p>AI WORKFLOWS</p>
              <h3>ASK / PLAN / AGENT</h3>
              <span>Choose a mode for questions, read-only planning, or coding tasks.</span>
            </article>
            <article class="product-metric">
              <p>CODE EDITOR</p>
              <h3>CODEMIRROR 6</h3>
              <span>Language support, completions, diagnostics, and code search.</span>
            </article>
            <article class="product-metric">
              <p>VERSION CONTROL</p>
              <h3>LOCAL GIT</h3>
              <span>Review diffs, browse history, commit changes, and push.</span>
            </article>
            <article class="product-metric">
              <p>PROJECT FILES</p>
              <h3>EXPLORE &amp; SEARCH</h3>
              <span>Browse the project tree and find files or code in the workspace.</span>
            </article>
            <article class="product-metric">
              <p>INTEGRATED TERMINAL</p>
              <h3>RUN COMMANDS</h3>
              <span>Work with a project shell alongside your code.</span>
            </article>
            <article class="product-metric">
              <p>PREVIEWS</p>
              <h3>HTML + IMAGES</h3>
              <span>Preview local HTML and inspect image files in the editor.</span>
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

      <section class="workflow-section container" id="workflow" aria-labelledby="workflow-title">
        <div class="section-heading">
          <p class="eyebrow">01 — 07&nbsp; / &nbsp;THE DEVELOPMENT LOOP</p>
          <h2 id="workflow-title">From project folder<br /><span>to a pushed commit.</span></h2>
          <p>Follow a practical path through r0. Select a step to see how it works and the relevant application view.</p>
        </div>
        <div class="workflow-steps" role="group" aria-label="Development workflow steps">
          ${workflowSteps.map((step, index) => `
            <button class="workflow-step" type="button" data-workflow-index="${index}" aria-pressed="${index === 0}" aria-controls="workflow-detail">
              <span class="workflow-step-number">0${index + 1}</span>
              <span class="workflow-step-title">${step.title}</span>
              <span class="workflow-step-arrow" aria-hidden="true">${index === workflowSteps.length - 1 ? '' : '→'}</span>
            </button>`).join('')}
        </div>
        <div class="workflow-detail" id="workflow-detail" aria-live="polite">
          <div class="workflow-detail-copy">
            <p class="eyebrow" id="workflow-step-label">STEP 01&nbsp; / &nbsp;OPEN PROJECT</p>
            <h3 id="workflow-step-description">${workflowSteps[0].description}</h3>
            <dl class="workflow-outcomes">
              <div><dt>USE</dt><dd id="workflow-step-action">${workflowSteps[0].action}</dd></div>
              <div><dt>RESULT</dt><dd id="workflow-step-result">${workflowSteps[0].result}</dd></div>
            </dl>
          </div>
          <figure class="workflow-product-frame">
            <button class="screenshot-button" id="workflow-screenshot" type="button" data-image-src="${workflowSteps[0].image.image}" data-image-alt="${workflowSteps[0].image.alt}" aria-label="View full-size screenshot: ${workflowSteps[0].image.title}">
              <img src="${workflowSteps[0].image.image}" alt="${workflowSteps[0].image.alt}" loading="lazy" />
              <span class="screenshot-zoom" aria-hidden="true">VIEW FULL SIZE ↗</span>
            </button>
            <figcaption id="workflow-image-caption">${workflowSteps[0].image.caption}</figcaption>
          </figure>
        </div>
      </section>

      <section class="ai-catalog" id="ai-workflow" aria-labelledby="ai-catalog-title">
        <div class="ai-catalog-inner">
          <div class="ai-catalog-heading">
            <p class="ai-catalog-eyebrow">// WHAT HAPPENS WHEN YOU ASK</p>
            <h2 id="ai-catalog-title">AI assistance, with you<br />in the review loop.</h2>
            <p>r0 streams a conversation through your selected model provider. The mode you choose controls what r0 asks the model to do.</p>
          </div>
          <div class="ai-explainer">
            <ol class="ai-flow" aria-label="AI assistance flow">
              <li><span>01</span><h3>Developer input</h3><p>Enter a prompt and conversation. Add project files or context where relevant.</p></li>
              <li><span>02</span><h3>AI processing</h3><p>r0 sends the conversation and mode-specific context to your configured provider and model.</p></li>
              <li><span>03</span><h3>Suggested output</h3><p>Read a streamed answer, a Plan outline, or Agent tool activity in the AI panel.</p></li>
              <li><span>04</span><h3>Developer review</h3><p>Review suggested edits in a diff. File writes and shell commands ask for approval before running.</p></li>
            </ol>
            <figure class="ai-product-frame">
              <div class="ai-product-frame-bar"><span>R0 / AI ASSISTANCE</span><span>ASK&nbsp; · &nbsp;PLAN&nbsp; · &nbsp;AGENT</span></div>
              <button class="screenshot-button" type="button" data-image-src="${screenshots[1].image}" data-image-alt="${screenshots[1].alt}" aria-label="View full-size screenshot: ${screenshots[1].title}">
                <img src="${screenshots[1].image}" alt="${screenshots[1].alt}" loading="lazy" />
                <span class="screenshot-zoom" aria-hidden="true">VIEW FULL SIZE ↗</span>
              </button>
              <figcaption>Ask for explanations, outline a plan, or use Agent for a coding task.</figcaption>
            </figure>
          </div>
          <p class="ai-provider-note"><span>MODEL PROVIDERS</span> Choose a supported cloud provider or configure a compatible local model. The model selected in r0 receives the request.</p>
          <div class="ai-mode-notes" aria-label="AI modes">
            <p><strong>ASK</strong><span>Answer questions; proposed code changes are shown for per-hunk review.</span></p>
            <p><strong>PLAN</strong><span>Explore the project and return a structured plan without writing code.</span></p>
            <p><strong>AGENT</strong><span>Can read and search files. File writes, edits, and shell commands require approval.</span></p>
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
              <h2 id="git-showcase-title">Working tree, Git &amp; remote push.</h2>
              <p>Review local changes directly in r0. Inspect diffs, browse commit history, manage branches, and push commits to your configured remote.</p>
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

      <details class="more-features-details container" data-responsive-details open>
        <summary class="more-features-summary">
          <span class="more-features-index"><span>[05]</span> / PRODUCT</span>
          <span class="more-features-summary-copy">
            <strong>Tools for your code. <span>Room to make it yours.</span></strong>
            <small>Editor intelligence, live previews, and workspace details.</small>
          </span>
          <span class="more-features-toggle" aria-hidden="true">MORE&nbsp; <b>+</b></span>
        </summary>
        <section class="stories more-features-stories" aria-label="More r0 product features">
          ${stories.slice(3).map(renderStoryCard).join('')}
        </section>
      </details>

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
            <span class="download-version">OFFICIAL WINDOWS INSTALLER&nbsp; / &nbsp;LATEST</span>
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
          <a href="${websiteRepoUrl}" target="_blank" rel="noreferrer">Website source <span aria-hidden="true">↗</span></a>
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
    if (event.key !== 'Escape' || menuToggle?.getAttribute('aria-expanded') !== 'true') return;
    closeMenu();
    menuToggle.focus();
  });

  const mobileLayout = window.matchMedia('(max-width: 700px)');
  const responsiveDetails = app.querySelectorAll<HTMLDetailsElement>('[data-responsive-details]');
  const updateResponsiveDetails = () => {
    responsiveDetails.forEach((details) => {
      details.open = !mobileLayout.matches;
    });
  };
  updateResponsiveDetails();
  mobileLayout.addEventListener('change', updateResponsiveDetails);

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

  const workflowButtons = app.querySelectorAll<HTMLButtonElement>('[data-workflow-index]');
  const workflowLabel = app.querySelector<HTMLElement>('#workflow-step-label');
  const workflowDescription = app.querySelector<HTMLElement>('#workflow-step-description');
  const workflowAction = app.querySelector<HTMLElement>('#workflow-step-action');
  const workflowResult = app.querySelector<HTMLElement>('#workflow-step-result');
  const workflowScreenshotButton = app.querySelector<HTMLButtonElement>('#workflow-screenshot');
  const workflowScreenshot = workflowScreenshotButton?.querySelector<HTMLImageElement>('img');
  const workflowImageCaption = app.querySelector<HTMLElement>('#workflow-image-caption');

  workflowButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.workflowIndex);
      const step = workflowSteps[index];
      if (!step || !workflowLabel || !workflowDescription || !workflowAction || !workflowResult
        || !workflowScreenshotButton || !workflowScreenshot || !workflowImageCaption) return;

      workflowLabel.textContent = `STEP 0${index + 1} / ${step.title.toUpperCase()}`;
      workflowDescription.textContent = step.description;
      workflowAction.textContent = step.action;
      workflowResult.textContent = step.result;
      workflowScreenshotButton.dataset.imageSrc = step.image.image;
      workflowScreenshotButton.dataset.imageAlt = step.image.alt;
      workflowScreenshotButton.setAttribute('aria-label', `View full-size screenshot: ${step.image.title}`);
      workflowScreenshot.src = step.image.image;
      workflowScreenshot.alt = step.image.alt;
      workflowImageCaption.textContent = step.image.caption;
      workflowButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
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
