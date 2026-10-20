import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import './site-pages.css';

const repository = 'https://github.com/Adshkumar/r0';
const releasePage = `${repository}/releases/latest`;
const releaseTag = 'v0.18.0';
const releaseBase = `${repository}/releases/download/${releaseTag}`;

type ReleaseAsset = {
  name: string;
  size: number;
  browser_download_url: string;
};

type Release = {
  tag_name: string;
  published_at: string;
  html_url: string;
  assets: ReleaseAsset[];
};

const fallbackArtifactData: Array<readonly [string, number]> = [
  ['R0_0.18.0_x64-setup.exe', 21663169],
  ['R0_0.18.0_arm64-setup.exe', 19388621],
  ['R0_0.18.0_x64_en-US.msi', 29059733],
  ['R0_0.18.0_arm64_en-US.msi', 26856085],
  ['R0_0.18.0_x64.dmg', 32516639],
  ['R0_0.18.0_aarch64.dmg', 31293134],
  ['R0_0.18.0_amd64.deb', 34320986],
  ['R0_0.18.0_arm64.deb', 35760498],
  ['R0-0.18.0-1.x86_64.rpm', 34323021],
  ['R0-0.18.0-1.aarch64.rpm', 35763144],
  ['R0_0.18.0_amd64.AppImage', 109480440],
  ['R0_0.18.0_aarch64.AppImage', 108849672],
  ['R0_0.18.0_linux-x86_64.tar.gz', 30860484],
  ['R0_0.18.0_linux-aarch64.tar.gz', 29715197],
];

const fallbackAssets: ReleaseAsset[] = fallbackArtifactData.map(([name, size]) => ({
  name,
  size,
  browser_download_url: `${releaseBase}/${name}`,
}));

const fallbackRelease: Release = {
  tag_name: releaseTag,
  published_at: '2026-10-20T12:47:57Z',
  html_url: `${repository}/releases/tag/${releaseTag}`,
  assets: fallbackAssets,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseRelease(value: unknown): Release {
  if (!isRecord(value) || typeof value.tag_name !== 'string' ||
    typeof value.published_at !== 'string' || typeof value.html_url !== 'string' ||
    !Array.isArray(value.assets)) {
    throw new Error('GitHub returned release data in an unexpected format.');
  }

  const releaseUrl = new URL(value.html_url);
  if (releaseUrl.hostname !== 'github.com' ||
    !releaseUrl.pathname.startsWith('/Adshkumar/r0/releases/')) {
    throw new Error('GitHub returned an unexpected release URL.');
  }

  const assets = value.assets.flatMap((asset): ReleaseAsset[] => {
    if (!isRecord(asset) || typeof asset.name !== 'string' ||
      typeof asset.size !== 'number' || typeof asset.browser_download_url !== 'string') {
      return [];
    }

    try {
      const url = new URL(asset.browser_download_url);
      if (url.hostname !== 'github.com' ||
        !url.pathname.startsWith('/Adshkumar/r0/releases/download/')) {
        return [];
      }
    } catch {
      return [];
    }

    return [{
      name: asset.name,
      size: asset.size,
      browser_download_url: asset.browser_download_url,
    }];
  });

  if (!assets.length) {
    throw new Error('The latest GitHub release did not include usable download assets.');
  }

  return {
    tag_name: value.tag_name,
    published_at: value.published_at,
    html_url: value.html_url,
    assets,
  };
}

type GuideSection = {
  id: string;
  title: string;
  search: string;
  body: ReactNode;
};

type Guide = {
  path: string;
  title: string;
  description: string;
  group: string;
  sections: GuideSection[];
};

function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState('copied');
    } catch (error) {
      console.error('Unable to copy this code example.', error);
      setCopyState('failed');
    }
  }

  return (
    <div className="docs-code">
      {label && <span className="docs-code-label">{label}</span>}
      <button type="button" className="docs-copy" onClick={copyCode}>
        {copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Copy failed' : 'Copy'}
      </button>
      <pre><code>{code}</code></pre>
      {copyState === 'failed' && (
        <span className="docs-copy-status" role="status">Select and copy the code manually.</span>
      )}
    </div>
  );
}

const guides: Guide[] = [
  {
    path: '/docs',
    title: 'Documentation',
    description: 'Install r0, learn the workspace, and find practical guides for its editor and built-in development tools.',
    group: 'Overview',
    sections: [
      {
        id: 'start-here',
        title: 'Start here',
        search: 'getting started first launch open folder project editor files save',
        body: (
          <>
            <p>Start with the installation guide for your operating system, then open a project folder in r0. The getting-started guide walks through the main workspace and everyday editing flow.</p>
            <p><a href="/docs/getting-started">Read: Getting started</a> · <a href="/docs/installation">Read: Installation</a></p>
          </>
        ),
      },
      {
        id: 'product-guides',
        title: 'Product guides',
        search: 'editor language server AI agents git terminal database extensions themes settings configuration',
        body: (
          <>
            <p>Read dedicated guides for r0's settings, editor, AI agents, source control, integrated terminal, database viewers, extensions, and keyboard navigation.</p>
            <ul>
              <li><a href="/docs/settings">Settings reference</a> · <a href="/docs/editor">Editor and language tools</a></li>
              <li><a href="/docs/ai">AI and agents</a> · <a href="/docs/keymaps">Keymaps and Vim</a></li>
              <li><a href="/docs/git-integration">Git</a> · <a href="/docs/github-integration">GitHub</a> · <a href="/docs/terminal">Terminal</a></li>
              <li><a href="/docs/database">Database tools</a> · <a href="/docs/extensions">Extensions and themes</a> · <a href="/docs/collaboration">Accounts and collaboration</a></li>
            </ul>
            <p><a href="/docs/features">Browse verified feature summary</a> · <a href="/docs/configuration">Configuration overview</a></p>
          </>
        ),
      },
      {
        id: 'help',
        title: 'Help and project information',
        search: 'troubleshooting FAQ release history changelog contribution license privacy',
        body: (
          <>
            <p>Find troubleshooting steps, frequently asked questions, the latest published release notes, and ways to contribute through the project repository.</p>
            <p><a href="/docs/troubleshooting">Troubleshooting</a> · <a href="/docs/faq">FAQ</a> · <a href="/changelog">Changelog</a> · <a href="/contributing">Contributing</a></p>
          </>
        ),
      },
    ],
  },
  {
    path: '/docs/getting-started',
    title: 'Getting started',
    description: 'Install r0, open a project, and get oriented in the editor.',
    group: 'Overview',
    sections: [
      {
        id: 'launch',
        title: 'Launch r0',
        search: 'download install launch first run Windows Linux macOS',
        body: <p>Install the build for your operating system from the <a href="/download">download page</a>, then launch r0 from your applications list. The first launch may take a little longer while the desktop application starts.</p>,
      },
      {
        id: 'open-project',
        title: 'Open a project',
        search: 'open existing folder project workspace file explorer',
        body: <p>Open a project folder using the file-open controls in the application. The file explorer shows the selected workspace; choose a file to open it in the editor. r0 works with local projects and also includes remote workspace tools for supported setups.</p>,
      },
      {
        id: 'edit-and-save',
        title: 'Edit and save',
        search: 'code editor syntax highlighting language server save files',
        body: <p>Edit a file in the central editor and save your changes using the normal editor controls. Syntax highlighting is provided by the editor, while language-server features depend on the language server and tooling available for the project.</p>,
      },
      {
        id: 'continue',
        title: 'Continue with a guide',
        search: 'AI Git terminal database features configuration',
        body: <p>See the <a href="/docs/features">feature guide</a> for the tools included in r0, or open <a href="/docs/configuration">configuration</a> to learn about AI connections, settings, and themes.</p>,
      },
    ],
  },
  {
    path: '/docs/installation',
    title: 'Installation',
    description: 'Choose a verified r0 release package for Windows, macOS, or Linux.',
    group: 'Overview',
    sections: [
      {
        id: 'windows',
        title: 'Windows',
        search: 'Windows x64 ARM64 setup exe MSI installation',
        body: (
          <>
            <p>Use the x64 installer on most PCs or the ARM64 installer on Windows on ARM. Both `.exe` setup packages and `.msi` packages are published. Select the matching architecture on the <a href="/download">download page</a>, open the downloaded package, and follow the installer prompts.</p>
            <p>Windows minimum-version requirements are not specified in the project documentation. If the installer fails, see <a href="/docs/troubleshooting">troubleshooting</a> and report the error through GitHub Issues.</p>
          </>
        ),
      },
      {
        id: 'macos',
        title: 'macOS',
        search: 'macOS Apple silicon aarch64 Intel x64 dmg install applications minimum version',
        body: (
          <>
            <p>Download the `.dmg` matching your Mac: `aarch64` for Apple silicon or `x64` for Intel. Open the disk image and move r0 into Applications. The Tauri bundle configuration sets macOS 10.15 as the minimum supported version.</p>
            <p>Use the <a href="/download">download page</a> to get the current stable assets. The repository configuration names a Developer ID signing identity; notarization status is not documented here.</p>
          </>
        ),
      },
      {
        id: 'linux',
        title: 'Linux',
        search: 'Linux Debian Ubuntu deb Fedora rpm AppImage tar.gz WebKitGTK 4.1 x86_64 aarch64',
        body: (
          <>
            <p>Choose a package matching your distribution and CPU architecture. The release includes `.deb`, `.rpm`, AppImage, and portable `.tar.gz` builds for supported architectures.</p>
            <ul>
              <li>Debian or Ubuntu: install the matching `.deb` package with your package manager.</li>
              <li>Fedora or another RPM-based distribution: install the matching `.rpm` package with your package manager.</li>
              <li>AppImage: make the downloaded file executable, then launch it.</li>
              <li>Portable archive: extract the matching archive and run the `r0` executable from the extracted directory.</li>
            </ul>
            <p>The portable archive requires system WebKitGTK 4.1 libraries. Consult your distribution's package documentation for package-manager syntax and dependencies.</p>
          </>
        ),
      },
      {
        id: 'verify-and-update',
        title: 'Verify downloads and update',
        search: 'SHA256 checksum signature update automatic settings check for updates uninstall',
        body: (
          <>
            <p>Release assets include `SHA256SUMS.txt` and signatures for supported packages. Verify a downloaded file against the published checksums before installing if you need an integrity check.</p>
            <p>r0 checks for updates after startup and periodically. To check manually, open <strong>Settings → General → Check for updates</strong>. Uninstall through your operating system's normal application management flow.</p>
            <p><a href="/download">Get the current installers</a> · <a href={`${repository}/releases`}>Browse all releases</a></p>
          </>
        ),
      },
    ],
  },
  {
    path: '/docs/features',
    title: 'Features',
    description: 'A guide to the capabilities present in the r0 source tree and release.',
    group: 'Overview',
    sections: [
      {
        id: 'editing',
        title: 'Code editing and language support',
        search: 'CodeMirror syntax highlighting language servers LSP Vim keybindings search formatting lint',
        body: <p>The editor uses CodeMirror with syntax highlighting, search, Vim keybindings, and language-server protocol support. Language-server capabilities require a compatible server and project tooling; supported language packs and services are listed in the source repository.</p>,
      },
      {
        id: 'ai-agents',
        title: 'AI coding agents',
        search: 'AI agents provider API keys chat models context tools permissions agent integrations',
        body: <p>r0 includes agent chat and integrations for supported providers and agent tools. Available models, authentication methods, permissions, and features vary by integration. Configure a provider in the app before starting a session; provider use may send prompts and selected project context to that provider.</p>,
      },
      {
        id: 'git',
        title: 'Git and GitHub',
        search: 'source control Git changes diff staging commit push GitHub repositories',
        body: <p>The source-control interface exposes repository status, diffs, staging, commits, and related Git operations. GitHub integrations provide additional repository workflows. A Git installation and appropriate repository credentials may be needed for some operations.</p>,
      },
      {
        id: 'terminal',
        title: 'Integrated terminal',
        search: 'terminal shell commands project developer tools local run',
        body: <p>The terminal feature opens shell sessions within the project workspace so you can run your own development commands. Your shell and installed tools determine which commands are available.</p>,
      },
      {
        id: 'data-and-tools',
        title: 'Databases, extensions, and more',
        search: 'database SQLite PostgreSQL MySQL MongoDB Redis DuckDB extensions themes Docker debugger browser remote collaboration',
        body: <p>The source includes database viewers and connection support, extensions and themes, Docker and debugger modules, browser tools, remote-workspace support, and collaboration features. Availability can depend on platform, external services, credentials, or additional tools. Consult the application and repository for the requirements of a specific integration.</p>,
      },
      {
        id: 'limits',
        title: 'Requirements and limitations',
        search: 'limitations experimental platform dependencies capabilities',
        body: <p>This is a fast-moving desktop application. Not every integration is available on every platform, and some tools require external programs or accounts. The <a href="/download">release page</a> and the product's current settings are the source of truth for what is available in a particular build.</p>,
      },
    ],
  },
  {
    path: '/docs/configuration',
    title: 'Configuration',
    description: 'Find the settings and external setup points that are verified in r0.',
    group: 'Overview',
    sections: [
      {
        id: 'application-settings',
        title: 'Application settings',
        search: 'settings preferences theme fonts keyboard shortcuts updates general',
        body: <p>Use the in-app Settings view to adjust available application preferences, appearance, editor behavior, and integrations. The exact options depend on the installed build. The updater can be checked from <strong>Settings → General → Check for updates</strong>.</p>,
      },
      {
        id: 'ai-connections',
        title: 'AI connections',
        search: 'AI provider connections authentication API keys model provider privacy',
        body: <p>Configure the AI provider or agent you intend to use in the application's AI settings. Provider availability, authentication, and model options are integration-specific. Review each provider's data terms before sharing prompts or project context; this site does not claim that AI requests remain on-device.</p>,
      },
      {
        id: 'language-tools',
        title: 'Language tools',
        search: 'language server LSP extensions project formatter lint tools configure dependencies',
        body: <p>Language-server, formatter, and linter behavior depends on the corresponding tooling and project configuration. Install and configure the tools required by your project, then use the editor's diagnostics and language features where available.</p>,
      },
      {
        id: 'configuration-help',
        title: 'Find more detail',
        search: 'configuration file environment variable service URLs secrets logs',
        body: <p>Project-level build and service configuration is documented in the public source tree. Do not put credentials in a shared project file. If a setting or configuration location is not exposed by the application, consult the repository or ask through GitHub Issues rather than guessing a file path.</p>,
      },
    ],
  },
  {
    path: '/docs/settings',
    title: 'Settings',
    description: 'A detailed guide to the settings groups and preferences available in the r0 desktop application.',
    group: 'Overview',
    sections: [
      {
        id: 'find-settings',
        title: 'Find a setting',
        search: 'settings search categories app code AI account advanced settings',
        body: <p>Open the Settings view in r0 and search by setting name to find a preference. Settings are organized into app, code, AI, account, and advanced groups. Options can differ by platform, access, and managed policy.</p>,
      },
      {
        id: 'general',
        title: 'General',
        search: 'update stable beta channels check for updates command line CLI import setup',
        body: <p>General settings include the update channel, update checks, and install or uninstall controls for the r0 command-line launcher. The app also includes an editor-settings import flow. See <a href="/docs/updates">Updates and release channels</a>.</p>,
      },
      {
        id: 'appearance',
        title: 'Appearance',
        search: 'theme color themes custom JSON icon theme UI font size density OS light dark reduce motion menu bar transparency',
        body: <p>Choose a registered color theme and icon theme, sync light and dark appearance with the operating system, or import a custom theme JSON. Appearance controls also include UI font and density, tab icons, close buttons, reduced motion, menu-bar presentation, and window transparency where supported.</p>,
      },
      {
        id: 'notifications',
        title: 'Notifications',
        search: 'notifications preferences desktop alert agent finish GitHub actions',
        body: <p>Notification preferences control supported application notifications. AI agent and GitHub notification behavior also depends on their corresponding settings and integrations.</p>,
      },
      {
        id: 'editor-files',
        title: 'Editor and files',
        search: 'editor font size line height tab size wrap line numbers whitespace indentation minimap outline inlay hints code lens semantic tokens sticky scroll brackets cursor save external editor hidden files file explorer',
        body: <p>Editor settings include font family, size and line height, tab size, wrapping, line numbers, whitespace and indentation guides, minimap and outline, bracket highlighting, cursor behavior, sticky scroll, inlay hints, CodeLens, and semantic tokens. File and tab settings include auto-save, maximum open tabs, file-tree sorting, visibility patterns, hidden and Git-ignored files, and delete confirmation. See <a href="/docs/editor">Editor and language tools</a>.</p>,
      },
      {
        id: 'git',
        title: 'Git',
        search: 'Git status refresh untracked staged diff split unified blame gutter changes folder discard confirmation sidebar',
        body: <p>Git settings cover automatic status refresh, untracked files, staged-first ordering, discard confirmation, split or unified diffs, opening diffs directly, file-tree status decorations, inline blame, Git gutter markers, and source-control panel layout. See <a href="/docs/git-integration">Git integration</a>.</p>,
      },
      {
        id: 'terminal',
        title: 'Terminal',
        search: 'terminal shell default profile font scrollback shell integration notifications cursor contrast',
        body: <p>Terminal settings include the default shell and profile, font, line height and spacing, scrollback, shell integration, command notifications, cursor style and blinking, and minimum contrast. See <a href="/docs/terminal">Terminal and shells</a>.</p>,
      },
      {
        id: 'language-keyboard',
        title: 'Language and keyboard',
        search: 'language auto detection formatter lint format save autocomplete parameter hints keybindings Vim relative line numbers',
        body: <p>Choose a default language or allow automatic detection. Configure format-on-save, lint-on-save, completion, and parameter hints. Keyboard settings include shortcut presets, editable keybindings, Vim mode, and relative line numbers. See <a href="/docs/editor">Editor and language tools</a> and <a href="/docs/keymaps">Keymaps and Vim</a>.</p>,
      },
      {
        id: 'ai',
        title: 'AI and agent settings',
        search: 'AI provider model API keys custom endpoint Ollama inline completion agent rules skills notifications MCP servers',
        body: <p>AI settings are divided into general AI, models, tab completion, agents, and MCP servers. Configure providers, feature-specific models, supported custom endpoints, or Ollama; manage agent rules, skills, and notifications. Credentials are stored separately from agent configuration. See <a href="/docs/ai">AI and agents</a>.</p>,
      },
      {
        id: 'account-collaboration',
        title: 'Account, sharing, and collaboration',
        search: 'account sharing collaboration enterprise managed mode policy extension allowlist organization',
        body: <p>Account, sharing, and collaboration are distinct settings areas. Their availability depends on the build and connected services. Enterprise-managed mode can apply policy to preferences and extension allowlists. See <a href="/docs/collaboration">Accounts and collaboration</a>.</p>,
      },
      {
        id: 'advanced',
        title: 'Advanced and privacy',
        search: 'advanced telemetry reset settings data privacy defaults managed policy',
        body: <p>Advanced settings include a local telemetry preference and an action to reset preferences. Back up personal configuration before resetting. The repository does not publish a privacy policy; review <a href="/docs/faq#privacy">the privacy FAQ</a> and the terms of any integrations you use.</p>,
      },
      {
        id: 'unavailable-setting',
        title: 'When a setting is unavailable',
        search: 'disabled setting hidden enterprise policy build platform permissions troubleshooting',
        body: <p>A preference can be hidden or disabled because it does not apply to the current platform or because enterprise policy manages it. Check for a newer build and consult your administrator where managed mode applies. If it still does not take effect, see <a href="/docs/troubleshooting">Troubleshooting</a>.</p>,
      },
    ],
  },
  {
    path: '/docs/editor',
    title: 'Editor and language tools',
    description: 'A practical guide to editing files, language servers, formatting, and diagnostics.',
    group: 'Code and workflow',
    sections: [
      {
        id: 'editing-files',
        title: 'Edit files',
        search: 'open file project explorer code tabs save auto save editor',
        body: <p>Open files from the project explorer or quick-open controls. Work across editor tabs and save changes using the file controls. Auto-save and tab behavior are configurable in <a href="/docs/settings#editor-files">Settings → Editor and files</a>.</p>,
      },
      {
        id: 'language-support',
        title: 'Syntax and language support',
        search: 'CodeMirror syntax highlighting language extensions LSP language servers',
        body: <p>The CodeMirror editor provides syntax support, and r0 includes language-server protocol integration. Rich language features require a compatible language server and project tooling. Extension-provided support varies by language and extension.</p>,
      },
      {
        id: 'formatting-diagnostics',
        title: 'Formatting, linting, and diagnostics',
        search: 'format on save lint on save formatter diagnostics errors completion parameter hints',
        body: <p>Configure format-on-save, lint-on-save, completion, parameter hints, inlay hints, and diagnostics in the editor settings. Formatter and linter availability depends on installed project tools; r0 does not bundle every language tool.</p>,
      },
      {
        id: 'editor-preferences',
        title: 'Editor preferences',
        search: 'font line height tab size wrap whitespace minimap outline cursor sticky scroll',
        body: <p>Adjust font, line height, tab size, word wrap, whitespace, minimap, outline, cursor, and other display preferences in <a href="/docs/settings#editor-files">Editor and files settings</a>. Keybinding and Vim options are covered in <a href="/docs/keymaps">Keymaps and Vim</a>.</p>,
      },
    ],
  },
  {
    path: '/docs/ai',
    title: 'AI and agents',
    description: 'Configure AI integrations and understand the agent workspace and its requirements.',
    group: 'Code and workflow',
    sections: [
      {
        id: 'connect-provider',
        title: 'Connect a provider',
        search: 'AI model providers API keys credential secure storage custom endpoint Ollama',
        body: <p>Open AI settings to configure a supported provider and model, add credentials, or set up a supported custom endpoint or Ollama connection. Provider and model availability is integration-specific. Never put credentials in a shared project file or public issue.</p>,
      },
      {
        id: 'agent-sessions',
        title: 'Start an agent session',
        search: 'AI agents chat prompts context project tools permissions plans edits review',
        body: <p>Use the AI workspace to start a conversation with a configured agent. Agents can use supported project tools; review tool permissions and proposed changes before accepting them. Capabilities depend on the selected provider, agent, and workspace configuration.</p>,
      },
      {
        id: 'completions',
        title: 'Completions and inline assistance',
        search: 'AI completion autocomplete inline edit model settings',
        body: <p>Tab completion and inline-edit assistance have settings separate from the default chat model. Configure feature-specific providers and models in <a href="/docs/settings#ai">Settings → AI</a>.</p>,
      },
      {
        id: 'agent-customization',
        title: 'Rules, skills, and MCP servers',
        search: 'agent user rules skills MCP servers context capabilities',
        body: <p>AI settings include user rules, skills, and MCP server configuration. MCP servers expose external tools to agents; only configure servers you trust, and keep credentials in secure storage.</p>,
      },
      {
        id: 'ai-privacy',
        title: 'Data and privacy',
        search: 'AI provider data privacy prompts project context external',
        body: <p>When you use an external AI provider, prompts and any project context you include may be sent to that provider. Review its data terms and r0's integration settings before use. This documentation does not claim provider requests stay local.</p>,
      },
    ],
  },
  {
    path: '/docs/git-integration',
    title: 'Git integration',
    description: 'Review local repository changes, diffs, staging, and commits from r0.',
    group: 'Code and workflow',
    sections: [
      {
        id: 'repository-status',
        title: 'View repository status',
        search: 'Git repository branch source control changed files status',
        body: <p>Open the source-control view in a project containing a Git repository to inspect status and changed files. Git must be available for local repository operations.</p>,
      },
      {
        id: 'review-stage',
        title: 'Review and stage changes',
        search: 'diff unified split stage unstaged staged file gutter blame decorations',
        body: <p>Review diffs before committing and stage the changes you want to include. Git settings control diff layout, file status decorations, inline blame, and whether selecting a changed file opens its diff.</p>,
      },
      {
        id: 'commit-changes',
        title: 'Commit changes',
        search: 'Git commit message staged changes local commit',
        body: <p>Enter a commit message and create a commit from the staged changes. Inspect the selected files before committing. Git identity must be configured for commit operations.</p>,
      },
      {
        id: 'git-preferences',
        title: 'Git preferences',
        search: 'Settings Git refresh confirmation panel layout source control',
        body: <p>Configure refresh behavior, staged ordering, discard confirmation, and panel layout in <a href="/docs/settings#git">Settings → Git</a>. GitHub-specific repository surfaces are covered in <a href="/docs/github-integration">GitHub integration</a>.</p>,
      },
    ],
  },
  {
    path: '/docs/github-integration',
    title: 'GitHub integration',
    description: 'Configure GitHub credentials and learn about the repository surfaces available in r0.',
    group: 'Code and workflow',
    sections: [
      {
        id: 'github-credentials',
        title: 'Connect GitHub',
        search: 'GitHub authenticate token credentials gh CLI OAuth repositories permissions',
        body: <p>Use the GitHub credential controls in the application to configure an available authentication source. r0 supports more than one credential source; the selected credential affects which repositories are accessible. Never share access tokens.</p>,
      },
      {
        id: 'github-surfaces',
        title: 'Repository surfaces',
        search: 'GitHub pull requests issues actions releases deployments sidebar',
        body: <p>The codebase includes GitHub surfaces for pull requests, issues, actions, releases, and deployments. Availability depends on authentication, repository permissions, and the current build.</p>,
      },
      {
        id: 'github-access',
        title: 'Access troubleshooting',
        search: 'GitHub credentials organization repository permissions authentication error',
        body: <p>Confirm that the configured credential is valid and authorized for the repository. Organization approval requirements or missing permissions may prevent access. See <a href="/docs/troubleshooting#network">Network and integration troubleshooting</a>.</p>,
      },
    ],
  },
  {
    path: '/docs/terminal',
    title: 'Terminal and shells',
    description: 'Run project commands in an integrated shell and configure terminal behavior.',
    group: 'Code and workflow',
    sections: [
      {
        id: 'open-terminal',
        title: 'Open a terminal',
        search: 'terminal tab shell commands project workspace local',
        body: <p>Open the terminal panel to start a shell session alongside your project. The commands available depend on your selected shell and installed development tools.</p>,
      },
      {
        id: 'shell-profile',
        title: 'Choose a shell and profile',
        search: 'default shell profile shell integration command marks directory tracking notifications',
        body: <p>Terminal settings let you choose the default shell and profile and configure shell integration and command notifications. The available shells depend on your operating system and installed programs.</p>,
      },
      {
        id: 'terminal-display',
        title: 'Adjust terminal behavior',
        search: 'terminal font size line height letter spacing scrollback contrast cursor blinking',
        body: <p>Configure terminal font, line height, letter spacing, scrollback, minimum contrast, and cursor style. Some keyboard and cursor behaviors are platform-specific. See <a href="/docs/settings#terminal">Terminal settings</a>.</p>,
      },
      {
        id: 'terminal-help',
        title: 'Troubleshooting',
        search: 'terminal shell not found start failure command PATH errors',
        body: <p>If a shell does not start, confirm it is installed and available to the application. If a command is missing, install the tool using its official instructions or fix the project environment path.</p>,
      },
    ],
  },
  {
    path: '/docs/database',
    title: 'Database tools',
    description: 'Open supported database files or configure a connection to inspect data.',
    group: 'Code and workflow',
    sections: [
      {
        id: 'database-support',
        title: 'Supported database workflows',
        search: 'database viewer SQLite PostgreSQL MySQL MongoDB Redis DuckDB SQL provider',
        body: <p>The repository contains database viewers and connection code for SQLite, PostgreSQL, MySQL, MongoDB, Redis, and DuckDB. Connection methods and external prerequisites vary by provider. Check the installed build and connection dialog for currently supported options.</p>,
      },
      {
        id: 'open-database',
        title: 'Open a database',
        search: 'open SQLite DuckDB file connect saved network database credentials',
        body: <p>Use the database controls to open a supported local database file or configure a connection. Follow the connection dialog for provider-specific fields. Keep passwords and connection secrets out of project files and screenshots.</p>,
      },
      {
        id: 'inspect-data',
        title: 'Inspect schemas and data',
        search: 'database table schema query SQL data grid history export',
        body: <p>Supported viewers provide provider-specific data and schema inspection, with SQL query tools for applicable providers. Query features differ between database types; verify provider-specific behavior in its viewer.</p>,
      },
      {
        id: 'database-help',
        title: 'Connection troubleshooting',
        search: 'database connection failed credentials network provider driver',
        body: <p>Check the host, port, database name, credentials, network access, and provider prerequisites. Include the provider and a sanitized error in a <a href="https://github.com/Adshkumar/r0/issues">GitHub issue</a>; never include passwords or private connection strings.</p>,
      },
    ],
  },
  {
    path: '/docs/extensions',
    title: 'Extensions and themes',
    description: 'Customize r0 with its extension system, language support, color themes, and icon themes.',
    group: 'Code and workflow',
    sections: [
      {
        id: 'extensions',
        title: 'Extensions',
        search: 'install extension languages snippets themes database AI integration agent',
        body: <p>The repository includes an extension system and extension UI. Use the application's extension view to browse available categories and the actions shown for each extension. Availability depends on the extension source and application version.</p>,
      },
      {
        id: 'color-themes',
        title: 'Color and icon themes',
        search: 'theme registry custom theme JSON upload icon themes Appearance settings',
        body: <p>Choose from registered color and icon themes in Appearance settings. The settings UI supports importing and managing custom color themes in JSON format.</p>,
      },
      {
        id: 'managed-environments',
        title: 'Managed environments',
        search: 'enterprise policy extension allowlist managed mode',
        body: <p>Enterprise-managed settings can restrict extensions or require an allowlist. If an extension cannot be installed or enabled, check with your administrator before changing managed settings.</p>,
      },
      {
        id: 'extension-help',
        title: 'Extension troubleshooting',
        search: 'extension installation errors compatibility troubleshooting',
        body: <p>Check the extension's compatibility and stated requirements. Report reproducible problems in <a href="https://github.com/Adshkumar/r0/issues">GitHub Issues</a> with the extension name, r0 version, and sanitized diagnostics.</p>,
      },
    ],
  },
  {
    path: '/docs/keymaps',
    title: 'Keymaps and Vim',
    description: 'Choose a keyboard-shortcut preset, edit bindings, and enable Vim mode.',
    group: 'Code and workflow',
    sections: [
      {
        id: 'keybinding-presets',
        title: 'Choose a keybinding preset',
        search: 'keyboard shortcuts presets VS Code JetBrains Sublime Xcode Atom Emacs Zed',
        body: <p>Keyboard settings provide presets for VS Code, JetBrains, Sublime, Xcode, Atom, Emacs, and Zed, as well as a no-preset option. Select a preset and use the keybindings editor to inspect the available actions.</p>,
      },
      {
        id: 'edit-shortcuts',
        title: 'Edit shortcuts',
        search: 'keyboard shortcut editor customize keybindings conflict',
        body: <p>Use the keybindings settings to find and change shortcuts. Check existing bindings before assigning a key combination so you do not overwrite an action you rely on.</p>,
      },
      {
        id: 'vim-mode',
        title: 'Enable Vim mode',
        search: 'Vim mode relative line numbers editor settings',
        body: <p>Turn on Vim mode in keyboard settings. Relative line numbers for Vim mode can be configured in editor settings. See <a href="/docs/settings#editor-files">Editor and files settings</a>.</p>,
      },
    ],
  },
  {
    path: '/docs/collaboration',
    title: 'Accounts and collaboration',
    description: 'Understand the account, sharing, collaboration, and managed settings areas.',
    group: 'Project',
    sections: [
      {
        id: 'account-sharing',
        title: 'Account and sharing',
        search: 'account sign in share project workspace service settings',
        body: <p>Account and sharing are separate settings areas in the application. Their availability depends on the installed build, connected services, and account permissions.</p>,
      },
      {
        id: 'collaboration',
        title: 'Collaboration',
        search: 'collaboration sessions invite remote collaborators settings',
        body: <p>Collaboration settings and UI are present in the codebase. Availability may depend on the enabled feature and its service; check the current build and its settings for requirements.</p>,
      },
      {
        id: 'managed-settings',
        title: 'Managed settings',
        search: 'enterprise managed mode policies extension allowlist organization administrator',
        body: <p>Enterprise controls include managed mode, policy enforcement, and extension allowlists. Contact your organization administrator if managed settings prevent a change.</p>,
      },
    ],
  },
  {
    path: '/docs/updates',
    title: 'Updates and release channels',
    description: 'Check for application updates, choose an available channel, and verify release downloads.',
    group: 'Project',
    sections: [
      {
        id: 'automatic-updates',
        title: 'Automatic update checks',
        search: 'updates startup periodic update install download progress errors',
        body: <p>r0 checks for updates after startup and periodically. When a compatible release is available, the application offers it for download and installation. Network failures are reported as failures rather than successful checks.</p>,
      },
      {
        id: 'manual-updates',
        title: 'Check manually',
        search: 'settings General Check for updates update channel stable beta',
        body: <p>Open <strong>Settings → General → Check for updates</strong> to run a manual check. The update-channel setting includes stable and beta options; a channel only provides releases that have actually been published.</p>,
      },
      {
        id: 'release-integrity',
        title: 'Release notes and verification',
        search: 'GitHub release version checksum SHA256SUMS signature latest stable prerelease',
        body: <p>Confirm that an asset matches your platform and architecture. Published releases include a checksum file and updater signatures. See <a href="/download">Downloads</a> for package links and <a href="/changelog">Changelog</a> for verified notes.</p>,
      },
    ],
  },
  {
    path: '/docs/troubleshooting',
    title: 'Troubleshooting',
    description: 'Practical checks for installation, startup, project tools, and network integrations.',
    group: 'Project',
    sections: [
      {
        id: 'installer',
        title: 'Installer or package does not open',
        search: 'installation failure installer Windows macOS Linux package architecture error',
        body: <p>Confirm that you downloaded the package for your operating system and CPU architecture. Re-download from the <a href="/download">verified release list</a>, compare the file to `SHA256SUMS.txt` if needed, and record the installer error. Do not disable operating-system security protections as a general fix.</p>,
      },
      {
        id: 'startup',
        title: 'Application does not start',
        search: 'startup crash launch logs corrupted installation runtime operating system',
        body: <p>Confirm that your operating system meets the published requirements and that the installation completed. On Linux, the portable archive specifically requires WebKitGTK 4.1. If the issue persists, include your r0 version, operating system, architecture, and relevant application logs in a GitHub issue.</p>,
      },
      {
        id: 'tools',
        title: 'Language tools or terminal commands are unavailable',
        search: 'LSP language server terminal shell executable PATH tools project',
        body: <p>Language servers, formatters, linters, and terminal commands may need to be installed separately. Check that the required tool is installed and visible to the environment used by r0, then review the project's configuration and the tool's own diagnostics.</p>,
      },
      {
        id: 'network',
        title: 'AI, GitHub, or update connection fails',
        search: 'network API key provider GitHub authentication update error connection',
        body: <p>Check network access, provider credentials, and any integration-specific configuration. r0 reports update-check failures rather than treating them as a successful check. Do not post API keys or other secrets in logs or issue reports.</p>,
      },
      {
        id: 'report',
        title: 'Report a reproducible problem',
        search: 'report bug GitHub issues reproduction steps version operating system',
        body: <p>Search existing <a href={`${repository}/issues`}>GitHub issues</a> first. If the problem is new, include steps to reproduce it, the r0 version, platform, architecture, and relevant sanitized logs. Remove secrets, personal data, and private project content.</p>,
      },
    ],
  },
  {
    path: '/docs/faq',
    title: 'Frequently asked questions',
    description: 'Answers about platforms, AI, updates, licensing, privacy, and project support.',
    group: 'Project',
    sections: [
      {
        id: 'platforms',
        title: 'Which platforms are available?',
        search: 'Windows macOS Linux x64 ARM64 platforms',
        body: <p>Published releases include Windows, macOS, and Linux assets for multiple architectures. See the <a href="/download">download page</a> for the currently published packages.</p>,
      },
      {
        id: 'ai',
        title: 'Does r0 require an AI account?',
        search: 'AI providers account API key agent integrations',
        body: <p>AI integrations are optional. The available authentication method depends on the provider or agent you choose; consult that integration's settings in the application.</p>,
      },
      {
        id: 'updates',
        title: 'How do I update r0?',
        search: 'update automatic manually settings latest version',
        body: <p>r0 checks for updates after startup and periodically. You can also check through <strong>Settings → General → Check for updates</strong>. Download packages are available on the <a href="/download">download page</a>.</p>,
      },
      {
        id: 'license',
        title: 'What license is r0 released under?',
        search: 'license copyright Apache MIT source reuse terms',
        body: <p>GitHub currently reports no repository license file. Do not assume reuse or redistribution terms; check the <a href={repository}>repository</a> or ask the maintainer for clarification.</p>,
      },
      {
        id: 'privacy',
        title: 'What happens to my code and prompts?',
        search: 'privacy telemetry AI provider project data code prompts policy',
        body: <p>The repository does not publish a privacy policy. AI providers and connected services may receive data you send to them. Review the settings and terms for each integration before sharing project context.</p>,
      },
      {
        id: 'support',
        title: 'Where can I ask for help?',
        search: 'support help issue bug discussion GitHub contribute',
        body: <p>Report bugs and ask questions through the project's <a href={`${repository}/issues`}>GitHub Issues</a> or <a href={`${repository}/discussions`}>Discussions</a>.</p>,
      },
    ],
  },
];

const docsNavigation = [
  {
    group: 'Overview',
    items: [
      { path: '/docs', title: 'Documentation' },
      { path: '/docs/getting-started', title: 'Getting started' },
      { path: '/docs/installation', title: 'Installation' },
      { path: '/docs/features', title: 'Features' },
      { path: '/docs/settings', title: 'Settings reference' },
      { path: '/docs/configuration', title: 'Configuration' },
    ],
  },
  {
    group: 'Code and workflow',
    items: [
      { path: '/docs/editor', title: 'Editor and language tools' },
      { path: '/docs/keymaps', title: 'Keymaps and Vim' },
      { path: '/docs/git-integration', title: 'Git integration' },
      { path: '/docs/github-integration', title: 'GitHub integration' },
      { path: '/docs/terminal', title: 'Terminal and shells' },
      { path: '/docs/database', title: 'Database tools' },
      { path: '/docs/ai', title: 'AI and agents' },
      { path: '/docs/extensions', title: 'Extensions and themes' },
      { path: '/docs/collaboration', title: 'Accounts and collaboration' },
    ],
  },
  {
    group: 'Project',
    items: [
      { path: '/docs/updates', title: 'Updates and releases' },
      { path: '/docs/troubleshooting', title: 'Troubleshooting' },
      { path: '/docs/faq', title: 'FAQ' },
      { path: '/changelog', title: 'Changelog' },
      { path: '/contributing', title: 'Contributing' },
      { path: '/about', title: 'About r0' },
    ],
  },
];

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    if (menuOpen) {
      document.querySelector<HTMLElement>('.site-mobile-nav a')?.focus();
      const closeOnOutsideClick = (event: PointerEvent) => {
        if (event.target instanceof Node && !header.current?.contains(event.target)) {
          setMenuOpen(false);
        }
      };
      document.addEventListener('pointerdown', closeOnOutsideClick);
      return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
    }
  }, [menuOpen]);

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && menuOpen) {
      setMenuOpen(false);
      menuButton.current?.focus();
    }
  }

  return (
    <header ref={header} className="site-header" onKeyDown={handleKeyDown}>
      <div className="site-container site-header-inner">
        <a href="/" className="site-brand" aria-label="r0 home">
          <img src="/r0-wordmark-dark.svg" alt="r0" />
        </a>
        <nav className="site-desktop-nav" aria-label="Main navigation">
          <a href="/#features">Features</a>
          <a href="/docs">Documentation</a>
          <a href="/changelog">Changelog</a>
          <a href={repository} target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
        <a className="site-download-button" href="/download">Download</a>
        <button
          ref={menuButton}
          type="button"
          className="site-menu-button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="site-mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>
      </div>
      <nav className="site-mobile-nav" id="site-mobile-nav" aria-label="Mobile navigation" hidden={!menuOpen}>
          <a href="/#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="/docs" onClick={() => setMenuOpen(false)}>Documentation</a>
          <a href="/changelog" onClick={() => setMenuOpen(false)}>Changelog</a>
          <a href={repository} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>GitHub</a>
          <a href="/download" onClick={() => setMenuOpen(false)}>Download</a>
      </nav>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer-grid">
        <div className="site-footer-brand">
          <a href="/" aria-label="r0 home"><img src="/r0-wordmark-dark.svg" alt="r0" /></a>
          <p>A cross-platform desktop code editor.</p>
        </div>
        <div>
          <h2>Product</h2>
          <a href="/download">Download</a>
          <a href="/#features">Features</a>
          <a href="/changelog">Changelog</a>
        </div>
        <div>
          <h2>Documentation</h2>
          <a href="/docs">Overview</a>
          <a href="/docs/installation">Installation</a>
          <a href="/docs/troubleshooting">Troubleshooting</a>
        </div>
        <div>
          <h2>Project</h2>
          <a href={repository} target="_blank" rel="noopener noreferrer">GitHub repository</a>
          <a href={`${repository}/releases`} target="_blank" rel="noopener noreferrer">Releases</a>
          <a href={`${repository}/issues`} target="_blank" rel="noopener noreferrer">Issues and support</a>
          <a href="/contributing">Contributing</a>
        </div>
      </div>
      <div className="site-container site-footer-bottom">
        <span>© {new Date().getFullYear()} r0</span>
        <a href="/about">About this project</a>
      </div>
    </footer>
  );
}

function SiteLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  useEffect(() => {
    document.title = `${title} · r0`;
    const descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    descriptionMeta?.setAttribute('content', description);

    const canonicalUrl = `https://r0-ide.vercel.app${window.location.pathname}`;
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.append(canonical);
    }
    canonical.href = canonicalUrl;

    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    ogTitle?.setAttribute('content', `${title} · r0`);
    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    ogDescription?.setAttribute('content', description);
    const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    ogUrl?.setAttribute('content', canonicalUrl);
  }, [title, description]);

  return (
    <div className="site-page">
      <a className="site-skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </div>
  );
}

function DocsSearch() {
  const [query, setQuery] = useState('');
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const results = terms.length
    ? guides.flatMap((guide) => guide.sections.flatMap((section) => {
      const searchable = `${guide.title} ${guide.description} ${section.title} ${section.search}`.toLowerCase();
      return terms.every((term) => searchable.includes(term))
        ? [{ href: `${guide.path}#${section.id}`, page: guide.title, heading: section.title, summary: guide.description }]
        : [];
    })).slice(0, 8)
    : [];

  return (
    <div className="docs-search">
      <label htmlFor="docs-search-input">Search documentation</label>
      <input
        id="docs-search-input"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
        placeholder="Search guides…"
        autoComplete="off"
      />
      {terms.length > 0 && (
        <div className="docs-search-results" role="region" aria-label="Search results" aria-live="polite">
          {results.length ? (
            <ul>
              {results.map((result) => (
                <li key={result.href}>
                  <a href={result.href}>
                    <strong>{result.heading}</strong>
                    <span>{result.page} · {result.summary}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : <p>No matching guide or heading. Try a broader search.</p>}
        </div>
      )}
    </div>
  );
}

function DocsSidebar({ currentPath }: { currentPath: string }) {
  return (
    <aside className="docs-sidebar" aria-label="Documentation navigation">
      <DocsSearch />
      <details className="docs-navigation" open>
        <summary>Documentation menu</summary>
        <nav aria-label="Documentation">
          {docsNavigation.map((group) => (
            <div className="docs-nav-group" key={group.group}>
              <h2>{group.group}</h2>
              {group.items.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  aria-current={item.path === currentPath ? 'page' : undefined}
                >
                  {item.title}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </details>
    </aside>
  );
}

function DocumentationPage({ guide }: { guide: Guide }) {
  const guideIndex = guides.findIndex(({ path }) => path === guide.path);
  const previous = guideIndex > 0 ? guides[guideIndex - 1] : undefined;
  const next = guideIndex >= 0 ? guides[guideIndex + 1] : undefined;

  return (
    <SiteLayout title={guide.title} description={guide.description}>
      <section className="site-container docs-page">
        <div className="docs-breadcrumbs"><a href="/">Home</a><span>/</span><a href="/docs">Docs</a>{guide.path !== '/docs' && <><span>/</span><span>{guide.title}</span></>}</div>
        <div className="docs-layout">
          <DocsSidebar currentPath={guide.path} />
          <article className="docs-article">
            <p className="site-eyebrow">r0 documentation</p>
            <h1>{guide.title}</h1>
            <p className="docs-intro">{guide.description}</p>
            {guide.sections.map((section) => (
              <section className="docs-section" id={section.id} key={section.id}>
                <h2><a href={`#${section.id}`} aria-label={`Link to ${section.title}`}>#</a>{section.title}</h2>
                {section.body}
              </section>
            ))}
            <nav className="docs-pager" aria-label="Documentation pages">
              {previous ? <a href={previous.path}><span>Previous</span>{previous.title}</a> : <span />}
              {next ? <a href={next.path}><span>Next</span>{next.title}</a> : <span />}
            </nav>
          </article>
          <aside className="docs-toc" aria-label="On this page">
            <p>On this page</p>
            {guide.sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}

function formatSize(bytes: number) {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function artifactPlatform(name: string) {
  if (/setup\.exe$|\.msi$/i.test(name)) return 'Windows';
  if (/\.dmg$|\.app\.tar\.gz$/i.test(name)) return 'macOS';
  return 'Linux';
}

function artifactArchitecture(name: string) {
  return /arm64|aarch64/i.test(name) ? 'ARM64' : 'x64';
}

function artifactFormat(name: string) {
  if (/\.exe$/i.test(name)) return 'Setup · EXE';
  if (/\.msi$/i.test(name)) return 'Installer · MSI';
  if (/\.dmg$/i.test(name)) return 'Disk image · DMG';
  if (/\.deb$/i.test(name)) return 'Debian package';
  if (/\.rpm$/i.test(name)) return 'RPM package';
  if (/\.appimage$/i.test(name)) return 'AppImage';
  return 'Portable archive';
}

function DownloadPage() {
  const [release, setRelease] = useState(fallbackRelease);
  const [releaseError, setReleaseError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    let timedOut = false;
    const timeout = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 8000);

    fetch('https://api.github.com/repos/Adshkumar/r0/releases/latest', {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`GitHub returned HTTP ${response.status}.`);
        }
        setRelease(parseRelease(await response.json()));
        setReleaseError('');
      })
      .catch((error: unknown) => {
        if (!active) return;
        console.error('Unable to retrieve the latest r0 release.', error);
        setReleaseError(timedOut
          ? 'GitHub release details timed out. The verified v0.18.0 downloads are shown below; check GitHub for newer releases.'
          : 'Live release details could not be loaded. The verified v0.18.0 downloads are shown below; check GitHub for newer releases.');
      })
      .finally(() => {
        window.clearTimeout(timeout);
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const artifacts = release.assets.filter((asset) =>
    /\.(exe|msi|dmg|deb|rpm|appimage|tar\.gz)$/i.test(asset.name),
  );
  const platforms = ['Windows', 'macOS', 'Linux'];
  const releaseDate = new Date(release.published_at);
  const formattedDate = Number.isNaN(releaseDate.valueOf())
    ? 'Release date unavailable'
    : new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'UTC' }).format(releaseDate);

  return (
    <SiteLayout
      title="Download"
      description="Download r0 for Windows, macOS, or Linux. Choose a verified stable installer or package for your architecture."
    >
      <section className="site-container standard-page download-page">
        <div className="site-eyebrow">Verified stable release · {release.tag_name}</div>
        <h1>Download r0</h1>
        <p className="standard-page-lede">Choose the package for your operating system and processor. Every download below is linked to a published GitHub release asset.</p>
        <div className="release-meta">
          <span>{loading ? 'Checking latest stable release…' : `Published ${formattedDate}`}</span>
          <a href={release.html_url} target="_blank" rel="noopener noreferrer">Release notes</a>
          <a href={`${repository}/releases`} target="_blank" rel="noopener noreferrer">All releases</a>
        </div>
        {releaseError && <p className="release-warning" role="status">{releaseError}</p>}
        <div className="download-platforms">
          {platforms.map((platform) => {
            const platformArtifacts = artifacts.filter(({ name }) => artifactPlatform(name) === platform);
            return (
              <section className="download-platform" key={platform} aria-labelledby={`platform-${platform}`}>
                <div className="download-platform-heading">
                  <h2 id={`platform-${platform}`}>{platform}</h2>
                  <span>{platformArtifacts.length} packages</span>
                </div>
                {platformArtifacts.length ? (
                  <ul>
                    {platformArtifacts.map((asset) => (
                      <li key={asset.name}>
                        <div>
                          <strong>{artifactArchitecture(asset.name)} <span>·</span> {artifactFormat(asset.name)}</strong>
                          <code>{asset.name}</code>
                        </div>
                        <div className="download-asset-action">
                          <span>{formatSize(asset.size)}</span>
                          <a href={asset.browser_download_url}>Download</a>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No compatible package is published for this platform in this release. See <a href={release.html_url}>release assets</a>.</p>
                )}
              </section>
            );
          })}
        </div>
        <div className="download-notes">
          <h2>Checksums and installation help</h2>
          <p>Release assets include SHA-256 checksums and signatures. The published checksum file is <a href={release.assets.find(({ name }) => name === 'SHA256SUMS.txt')?.browser_download_url ?? release.html_url}>SHA256SUMS.txt</a>.</p>
          <p>For platform-specific steps and requirements, see <a href="/docs/installation">installation documentation</a>. Linux portable archives require WebKitGTK 4.1.</p>
        </div>
      </section>
    </SiteLayout>
  );
}

function ChangelogPage() {
  return (
    <SiteLayout
      title="Changelog"
      description="Release notes and verified changes in the r0 desktop editor."
    >
      <section className="site-container standard-page">
        <p className="site-eyebrow">Project releases</p>
        <h1>Changelog</h1>
        <p className="standard-page-lede">Release history is maintained in GitHub Releases. This summary reflects the latest stable release verified for this site.</p>
        <article className="release-entry">
          <div className="release-entry-meta"><span>Latest stable</span><time dateTime="2026-10-20">October 20, 2026</time></div>
          <h2><a href={`${repository}/releases/tag/v0.18.0`}>r0 v0.18.0</a></h2>
          <ul>
            <li>Fixed Windows installer branding and upgrade behavior.</li>
            <li>Improved command-palette navigation and release checks.</li>
            <li>Fixed extension icons and terminal retry initialization.</li>
            <li>Updated Windows installer publisher verification.</li>
          </ul>
          <a href={`${repository}/releases/tag/v0.18.0`}>Read full release notes</a>
        </article>
        <p className="standard-page-links"><a className="site-primary-button" href={releasePage}>View all releases</a></p>
      </section>
    </SiteLayout>
  );
}

function ContributingPage() {
  return (
    <SiteLayout
      title="Contributing"
      description="How to report issues and build r0 from its public source repository."
    >
      <section className="site-container standard-page">
        <p className="site-eyebrow">Project participation</p>
        <h1>Contributing</h1>
        <p className="standard-page-lede">The project welcomes bug reports and contributions. The repository README directs users to GitHub Issues and Discussions; no separate contribution guide is published in the repository.</p>
        <section className="standard-section">
          <h2>Report a bug or ask a question</h2>
          <p>Search existing reports, then open an <a href={`${repository}/issues`}>issue</a> or start a <a href={`${repository}/discussions`}>discussion</a>. Include reproducible steps and remove credentials, private code, and other sensitive information.</p>
        </section>
        <section className="standard-section">
          <h2>Build from source</h2>
          <p>The project README lists Node.js 24, Bun 1.3.14, and Rust as development prerequisites. From a clone of the repository:</p>
          <CodeBlock label="Shell" code={`git clone ${repository}.git\ncd r0\nbun setup\nbun dev`} />
          <p><code>bun setup</code> installs dependencies and checks platform-native requirements. The native desktop build may require additional platform-specific tools.</p>
        </section>
        <p className="standard-page-links"><a className="site-primary-button" href={repository}>Open the repository</a></p>
      </section>
    </SiteLayout>
  );
}

function AboutPage() {
  return (
    <SiteLayout
      title="About r0"
      description="About r0, a cross-platform desktop code editor built with Tauri, Rust, and React."
    >
      <section className="site-container standard-page">
        <p className="site-eyebrow">About the project</p>
        <h1>r0 is a desktop code editor</h1>
        <p className="standard-page-lede">Built with Tauri, Rust, and React, r0 brings code editing, language tooling, AI agent integrations, Git, a terminal, and additional developer tools into one desktop workspace.</p>
        <section className="standard-section">
          <h2>Project details</h2>
          <ul>
            <li>Platforms: Windows, macOS, and Linux release packages.</li>
            <li>Current verified stable release: v0.18.0.</li>
            <li>Source repository: <a href={repository}>Adshkumar/r0 on GitHub</a>.</li>
            <li>License: GitHub currently reports no repository license file. Confirm reuse terms with the maintainer.</li>
          </ul>
        </section>
        <p className="standard-page-links"><a className="site-primary-button" href="/download">Get r0</a><a href={repository}>Explore the source</a></p>
      </section>
    </SiteLayout>
  );
}

function NotFoundPage() {
  return (
    <SiteLayout title="Page not found" description="The page you requested could not be found.">
      <section className="site-container standard-page not-found">
        <p className="site-eyebrow">404 · Not found</p>
        <h1>This page isn’t here.</h1>
        <p className="standard-page-lede">The link may have changed. Start from the homepage or browse the current documentation.</p>
        <p className="standard-page-links"><a className="site-primary-button" href="/">Go to r0 home</a><a href="/docs">Browse documentation</a></p>
      </section>
    </SiteLayout>
  );
}

export default function SitePages({ pathname }: { pathname: string }) {
  const path = pathname.replace(/\/+$/, '') || '/';
  const guide = guides.find((item) => item.path === path);

  if (guide) return <DocumentationPage guide={guide} />;
  if (path === '/download') return <DownloadPage />;
  if (path === '/changelog') return <ChangelogPage />;
  if (path === '/contributing') return <ContributingPage />;
  if (path === '/about') return <AboutPage />;
  return <NotFoundPage />;
}
