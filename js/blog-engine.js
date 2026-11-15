/**
 * ADVANCED INTERACTIVE BLOG & ARTICLE ENGINE
 * Handles:
 * 1. Automatic Table of Contents (TOC) with ScrollSpy active tracking
 * 2. Interactive Clickable Topics (Tabbed Switcher & Accordion mode)
 * 3. Software & Tool Auto-Linker (Opens official websites in new tabs)
 * 4. Expandable & Responsive Interactive Data Tables
 * 5. Reading Progress Bar & Dynamic Reading Time Calculator
 * 6. Floating Back to Top Button with SVG Progress Ring
 * 7. Social Share Suite with Clipboard Toast
 * 8. Related Articles Recommendation Engine
 * 9. Blog Listing Filter Pills & Instant Live Search
 */

(function () {
  'use strict';

  /* ==========================================================================
     Registry of Official Software, Tools & Marketing Platforms (Authentic SVGs)
     All logos are authentic brand SVG assets stored locally in assets/images/logos/
     ========================================================================== */
  function getBrandLogoImg(filename, brandName) {
    return '<img src="assets/images/logos/' + filename + '" alt="' + brandName + ' logo" class="brand-svg-logo" width="16" height="16" loading="lazy" onerror="this.style.display=\'none\'">';
  }

  const TOOL_REGISTRY = [
    {
      name: 'Google Search Console',
      aliases: ['Google Search Console', 'Search Console', 'GSC'],
      url: 'https://search.google.com/search-console/about',
      svgIcon: getBrandLogoImg('google-search-console.svg', 'Google Search Console')
    },
    {
      name: 'Google Analytics',
      aliases: ['Google Analytics 4', 'Google Analytics', 'GA4'],
      url: 'https://analytics.google.com/',
      svgIcon: getBrandLogoImg('google-analytics.svg', 'Google Analytics')
    },
    {
      name: 'Google Tag Manager',
      aliases: ['Google Tag Manager', 'GTM'],
      url: 'https://tagmanager.google.com/',
      svgIcon: getBrandLogoImg('google-tag-manager.svg', 'Google Tag Manager')
    },
    {
      name: 'Google Ads',
      aliases: ['Google Ads', 'AdWords', 'Google AdWords'],
      url: 'https://ads.google.com/',
      svgIcon: getBrandLogoImg('google-ads.svg', 'Google Ads')
    },
    {
      name: 'Meta Ads Manager',
      aliases: ['Meta Ads Manager', 'Facebook Ads Manager', 'Meta Ads', 'Facebook Ads'],
      url: 'https://adsmanager.facebook.com/',
      svgIcon: getBrandLogoImg('meta.svg', 'Meta Ads Manager')
    },
    {
      name: 'Conversions API',
      aliases: ['Conversions API', 'Meta CAPI', 'Server-Side CAPI'],
      url: 'https://developers.facebook.com/docs/marketing-api/conversions-api/',
      svgIcon: getBrandLogoImg('meta.svg', 'Conversions API')
    },
    {
      name: 'WordPress',
      aliases: ['WordPress', 'WordPress.com', 'WordPress.org'],
      url: 'https://wordpress.org/',
      svgIcon: getBrandLogoImg('wordpress.svg', 'WordPress')
    },
    {
      name: 'HubSpot',
      aliases: ['HubSpot'],
      url: 'https://www.hubspot.com/',
      svgIcon: getBrandLogoImg('hubspot.svg', 'HubSpot')
    },
    {
      name: 'Semrush',
      aliases: ['Semrush', 'SEMrush'],
      url: 'https://www.semrush.com/',
      svgIcon: getBrandLogoImg('semrush.svg', 'Semrush')
    },
    {
      name: 'Ahrefs',
      aliases: ['Ahrefs'],
      url: 'https://ahrefs.com/',
      svgIcon: getBrandLogoImg('ahrefs.svg', 'Ahrefs')
    },
    {
      name: 'Canva',
      aliases: ['Canva'],
      url: 'https://www.canva.com/',
      svgIcon: getBrandLogoImg('canva.svg', 'Canva')
    },
    {
      name: 'Figma',
      aliases: ['Figma'],
      url: 'https://www.figma.com/',
      svgIcon: getBrandLogoImg('figma.svg', 'Figma')
    },
    {
      name: 'Looker Studio',
      aliases: ['Looker Studio', 'Google Data Studio'],
      url: 'https://lookerstudio.google.com/',
      svgIcon: getBrandLogoImg('looker-studio.svg', 'Looker Studio')
    },
    {
      name: 'Microsoft Power BI',
      aliases: ['Microsoft Power BI', 'Power BI'],
      url: 'https://powerbi.microsoft.com/',
      svgIcon: getBrandLogoImg('power-bi.svg', 'Microsoft Power BI')
    },
    {
      name: 'Screaming Frog',
      aliases: ['Screaming Frog SEO Spider', 'Screaming Frog'],
      url: 'https://www.screamingfrog.co.uk/seo-spider/',
      svgIcon: getBrandLogoImg('screaming-frog.svg', 'Screaming Frog')
    },
    {
      name: 'Mailchimp',
      aliases: ['Mailchimp'],
      url: 'https://mailchimp.com/',
      svgIcon: getBrandLogoImg('mailchimp.svg', 'Mailchimp')
    },
    {
      name: 'Zapier',
      aliases: ['Zapier'],
      url: 'https://zapier.com/',
      svgIcon: getBrandLogoImg('zapier.svg', 'Zapier')
    },
    {
      name: 'Adobe Premiere Pro',
      aliases: ['Adobe Premiere Pro', 'Premiere Pro', 'Adobe Premiere'],
      url: 'https://www.adobe.com/products/premiere.html',
      svgIcon: getBrandLogoImg('adobe-premiere.svg', 'Adobe Premiere Pro')
    },
    {
      name: 'After Effects',
      aliases: ['Adobe After Effects', 'After Effects'],
      url: 'https://www.adobe.com/products/aftereffects.html',
      svgIcon: getBrandLogoImg('adobe-after-effects.svg', 'Adobe After Effects')
    },
    {
      name: 'LinkedIn Campaign Manager',
      aliases: ['LinkedIn Campaign Manager', 'LinkedIn Ads'],
      url: 'https://business.linkedin.com/marketing-solutions/ads',
      svgIcon: getBrandLogoImg('linkedin.svg', 'LinkedIn')
    },
    {
      name: 'YouTube',
      aliases: ['YouTube'],
      url: 'https://www.youtube.com/',
      svgIcon: getBrandLogoImg('youtube.svg', 'YouTube')
    },
    {
      name: 'TikTok',
      aliases: ['TikTok Ads', 'TikTok'],
      url: 'https://ads.tiktok.com/',
      svgIcon: getBrandLogoImg('tiktok.svg', 'TikTok')
    },
    {
      name: 'Webflow',
      aliases: ['Webflow'],
      url: 'https://webflow.com/',
      svgIcon: getBrandLogoImg('webflow.svg', 'Webflow')
    },
    {
      name: 'Shopify',
      aliases: ['Shopify'],
      url: 'https://www.shopify.com/',
      svgIcon: getBrandLogoImg('shopify.svg', 'Shopify')
    }
  ];

  /* ==========================================================================
     1. Software & External Tool Auto-Linker
     Safely parses text nodes and wraps brand names with authentic SVG logos.
     ========================================================================== */
  function autoLinkMarketingTools(rootElement) {
    if (!rootElement) return;

    // Build regex map sorted by name length descending (e.g. "Google Search Console" before "Google")
    const toolsSorted = [];
    TOOL_REGISTRY.forEach(tool => {
      tool.aliases.forEach(alias => {
        toolsSorted.push({ alias, url: tool.url, name: tool.name, svgIcon: tool.svgIcon });
      });
    });
    toolsSorted.sort((a, b) => b.alias.length - a.alias.length);

    // Track linked occurrences per tool to avoid over-linking (max 2 links per tool per article)
    const linkCount = {};

    function traverseTextNodes(node) {
      if (!node) return;

      // Skip elements that should never be modified
      const tag = node.parentElement ? node.parentElement.tagName.toLowerCase() : '';
      if (['a', 'button', 'code', 'pre', 'script', 'style', 'input', 'textarea', 'h1', 'h2', 'h3'].includes(tag)) {
        return;
      }
      if (node.parentElement && node.parentElement.closest('.tool-link, .toc-card, .article-meta-row')) {
        return;
      }

      if (node.nodeType === Node.TEXT_NODE) {
        let text = node.nodeValue;
        if (!text || text.trim().length < 3) return;

        for (const tool of toolsSorted) {
          if ((linkCount[tool.name] || 0) >= 2) continue;

          // Word-boundary match, case-sensitive or smart match
          const escaped = tool.alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`\\b(${escaped})\\b`, 'i');
          const match = text.match(regex);

          if (match && match.index !== undefined) {
            const matchedText = match[0];
            const before = text.slice(0, match.index);
            const after = text.slice(match.index + matchedText.length);

            const linkEl = document.createElement('a');
            linkEl.href = tool.url;
            linkEl.target = '_blank';
            linkEl.rel = 'noopener noreferrer';
            linkEl.className = 'tool-link brand-tool-link';
            linkEl.title = `Visit official ${tool.name} website (opens in new tab)`;
            linkEl.innerHTML = `${tool.svgIcon}<span>${matchedText}</span><svg class="tool-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`;

            const frag = document.createDocumentFragment();
            if (before) frag.appendChild(document.createTextNode(before));
            frag.appendChild(linkEl);
            if (after) frag.appendChild(document.createTextNode(after));

            const parent = node.parentNode;
            if (parent) {
              parent.replaceChild(frag, node);
              linkCount[tool.name] = (linkCount[tool.name] || 0) + 1;
            }
            return; // stop checking this text node since it's split
          }
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Create static array of children to prevent live collection mutation bugs
        const children = Array.from(node.childNodes);
        children.forEach(child => traverseTextNodes(child));
      }
    }

    traverseTextNodes(rootElement);
  }

  /* ==========================================================================
     2. Interactive Clickable Topics (Tabbed Switcher & Accordion Mode)
     ========================================================================== */
  function enhanceInteractiveTopics(container) {
    if (!container) return;

    // A. Tabbed Topics Switcher (.topic-tabs-container or .interactive-topics[data-mode="tabs"])
    const tabbedContainers = container.querySelectorAll('.topic-tabs-container, .interactive-topics[data-mode="tabs"]');
    tabbedContainers.forEach((tabsWrapper, idx) => {
      const items = tabsWrapper.querySelectorAll('.topic-item, .topic-tab-panel');
      if (items.length === 0) return;

      // If wrapper isn't fully structured yet, structure it
      let nav = tabsWrapper.querySelector('.topic-tabs-nav');
      let panelsWrapper = tabsWrapper.querySelector('.topic-tab-panels');

      if (!nav) {
        nav = document.createElement('div');
        nav.className = 'topic-tabs-nav';
        nav.setAttribute('role', 'tablist');

        panelsWrapper = document.createElement('div');
        panelsWrapper.className = 'topic-tab-panels';

        items.forEach((item, itemIdx) => {
          const title = item.getAttribute('data-title') || `Topic ${itemIdx + 1}`;
          const tabBtn = document.createElement('button');
          tabBtn.type = 'button';
          tabBtn.className = `topic-tab-btn ${itemIdx === 0 ? 'is-active' : ''}`;
          tabBtn.setAttribute('role', 'tab');
          tabBtn.setAttribute('aria-selected', itemIdx === 0 ? 'true' : 'false');
          tabBtn.innerHTML = `<span>${title}</span>`;

          item.className = `topic-tab-panel ${itemIdx === 0 ? 'is-active' : ''}`;
          item.setAttribute('role', 'tabpanel');

          tabBtn.addEventListener('click', () => {
            nav.querySelectorAll('.topic-tab-btn').forEach(b => {
              b.classList.remove('is-active');
              b.setAttribute('aria-selected', 'false');
            });
            panelsWrapper.querySelectorAll('.topic-tab-panel').forEach(p => p.classList.remove('is-active'));

            tabBtn.classList.add('is-active');
            tabBtn.setAttribute('aria-selected', 'true');
            item.classList.add('is-active');
          });

          nav.appendChild(tabBtn);
          panelsWrapper.appendChild(item);
        });

        tabsWrapper.innerHTML = '';
        tabsWrapper.className = 'topic-tabs-container';
        tabsWrapper.appendChild(nav);
        tabsWrapper.appendChild(panelsWrapper);
      } else {
        // Already structured, attach listeners
        const buttons = nav.querySelectorAll('.topic-tab-btn');
        const panels = panelsWrapper.querySelectorAll('.topic-tab-panel');
        buttons.forEach((btn, bIdx) => {
          btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('is-active'));
            panels.forEach(p => p.classList.remove('is-active'));
            btn.classList.add('is-active');
            if (panels[bIdx]) panels[bIdx].classList.add('is-active');
          });
        });
      }
    });

    // B. Enhance Native Gutenberg <details> Blocks & Accordion items
    const detailsBlocks = container.querySelectorAll('details.wp-block-details, .interactive-accordion-item');
    detailsBlocks.forEach(details => {
      const summary = details.querySelector('summary');
      if (summary && !summary.querySelector('.accordion-icon')) {
        const icon = document.createElement('span');
        icon.className = 'accordion-icon';
        icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
        summary.appendChild(icon);
      }
    });

    // C. Interactive Tree Flashcard Architecture (.tree-architecture-wrapper)
    const treeWrappers = container.querySelectorAll('.tree-architecture-wrapper');
    treeWrappers.forEach(wrapper => {
      const childNodes = wrapper.querySelectorAll('.tree-child-node');
      const consoleBox = wrapper.querySelector('.tree-details-console');
      const panels = wrapper.querySelectorAll('.tree-console-panel');

      childNodes.forEach(btn => {
        btn.addEventListener('click', () => {
          const targetId = btn.getAttribute('data-child-id');
          const brandColor = btn.getAttribute('data-brand-color') || '#FF4B12';

          childNodes.forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');

          if (consoleBox) {
            consoleBox.style.setProperty('--brand-color', brandColor);
            consoleBox.style.setProperty('--brand-color-opacity', brandColor + '25');
            consoleBox.style.borderColor = brandColor;
            consoleBox.style.boxShadow = `0 24px 60px -12px ${brandColor}35, 0 8px 24px rgba(0, 0, 0, 0.04), inset 0 1.5px 2px rgba(255, 255, 255, 0.9)`;
          }

          panels.forEach(p => {
            if (p.getAttribute('data-panel-id') === targetId) {
              p.classList.add('is-active');
            } else {
              p.classList.remove('is-active');
            }
          });
        });
      });
    });
  }

  /* ==========================================================================
     3. Expandable & Responsive Interactive Data Tables
     ========================================================================== */
  function enhanceDataTables(container) {
    if (!container) return;

    const tables = container.querySelectorAll('table');
    tables.forEach((table, index) => {
      // If already wrapped, skip
      if (table.parentElement && table.parentElement.classList.contains('table-scroll-container')) {
        return;
      }

      const rowsCount = table.querySelectorAll('tbody tr').length;
      const colsCount = (table.querySelector('thead tr') || table.querySelector('tr'))?.children.length || 0;

      const wrapper = document.createElement('div');
      wrapper.className = 'table-interactive-wrapper';

      const toolbar = document.createElement('div');
      toolbar.className = 'table-header-toolbar';
      toolbar.innerHTML = `
        <div class="table-title-hint">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="9" y1="21" x2="9" y2="9"></line>
          </svg>
          <span>Data Table (${rowsCount} rows • ${colsCount} columns)</span>
        </div>
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <span style="font-size:0.75rem; color:var(--text-muted);">Scroll horizontally if needed &rarr;</span>
          ${rowsCount > 6 ? `<button type="button" class="table-expand-toggle" data-expanded="false">View All</button>` : ''}
        </div>
      `;

      const scrollBox = document.createElement('div');
      scrollBox.className = 'table-scroll-container';

      table.parentNode.insertBefore(wrapper, table);
      scrollBox.appendChild(table);
      wrapper.appendChild(toolbar);
      wrapper.appendChild(scrollBox);

      // Handle row collapse/expand if table has many rows
      if (rowsCount > 6) {
        const tbodyRows = Array.from(table.querySelectorAll('tbody tr'));
        tbodyRows.slice(5).forEach(r => (r.style.display = 'none'));

        const toggleBtn = toolbar.querySelector('.table-expand-toggle');
        if (toggleBtn) {
          toggleBtn.addEventListener('click', () => {
            const isExp = toggleBtn.getAttribute('data-expanded') === 'true';
            if (isExp) {
              tbodyRows.slice(5).forEach(r => (r.style.display = 'none'));
              toggleBtn.textContent = 'View All';
              toggleBtn.setAttribute('data-expanded', 'false');
            } else {
              tbodyRows.forEach(r => (r.style.display = ''));
              toggleBtn.textContent = 'Show Less';
              toggleBtn.setAttribute('data-expanded', 'true');
            }
          });
        }
      }
    });
  }

  /* ==========================================================================
     4. Table of Contents Generator & ScrollSpy
     ========================================================================== */
  function generateTableOfContents(contentContainer, tocTargetEl) {
    if (!contentContainer || !tocTargetEl) return;

    const headings = contentContainer.querySelectorAll('h2, h3');
    if (headings.length < 2) {
      const tocInline = document.getElementById('articleTocInline');
      if (tocInline) tocInline.style.display = 'none';
      return;
    }

    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';

    headings.forEach((heading, idx) => {
      // Create slug id if not present
      if (!heading.id) {
        const slug = heading.textContent
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '') || `section-${idx + 1}`;
        heading.id = slug;
      }

      const isH3 = heading.tagName.toLowerCase() === 'h3';
      const item = document.createElement('li');
      item.className = `toc-item ${isH3 ? 'level-3' : 'level-2'}`;

      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.className = 'toc-link';
      link.textContent = heading.textContent.trim();

      link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.getElementById(heading.id);
        if (target) {
          const headerOffset = 95;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Update active link immediately
          tocList.querySelectorAll('.toc-link').forEach(l => l.classList.remove('is-active'));
          link.classList.add('is-active');

          // Update URL hash without jumping
          history.pushState(null, null, `#${heading.id}`);
        }
      });

      item.appendChild(link);
      tocList.appendChild(item);
    });

    tocTargetEl.innerHTML = '';
    tocTargetEl.appendChild(tocList);

    // ScrollSpy: highlight active heading as user scrolls
    initScrollSpy(headings, tocList);
  }

  function initScrollSpy(headings, tocList) {
    if (!headings || headings.length === 0 || !tocList) return;

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.pageYOffset + 120;
          let currentHeadingId = null;

          headings.forEach(heading => {
            if (heading.offsetTop <= scrollPos) {
              currentHeadingId = heading.id;
            }
          });

          if (currentHeadingId) {
            tocList.querySelectorAll('.toc-link').forEach(link => {
              if (link.getAttribute('href') === `#${currentHeadingId}`) {
                link.classList.add('is-active');
              } else {
                link.classList.remove('is-active');
              }
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ==========================================================================
     5. Reading Progress Bar & Floating Back to Top Button
     ========================================================================== */
  function initReadingProgressAndFab() {
    let progressBar = document.getElementById('readingProgressBar');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.id = 'readingProgressBar';
      document.body.prepend(progressBar);
    }

    let fab = document.getElementById('backToTopFab');
    if (!fab) {
      fab = document.createElement('button');
      fab.id = 'backToTopFab';
      fab.type = 'button';
      fab.className = 'back-to-top-fab';
      fab.setAttribute('aria-label', 'Back to top of article');
      fab.innerHTML = `
        <svg class="progress-ring" viewBox="0 0 48 48">
          <circle class="progress-ring-circle" cx="24" cy="24" r="22"></circle>
        </svg>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="19" x2="12" y2="5"></line>
          <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
      `;
      document.body.appendChild(fab);

      fab.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    const circle = fab.querySelector('.progress-ring-circle');
    const circumference = 2 * Math.PI * 22; // ~138.2

    function updateScrollProgress() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;

      // Update top progress bar
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }

      // Update FAB visibility and circular SVG ring
      if (fab && circle) {
        if (scrollTop > 350) {
          fab.classList.add('is-visible');
        } else {
          fab.classList.remove('is-visible');
        }
        const offset = circumference - (progress / 100) * circumference;
        circle.style.strokeDashoffset = offset;
      }
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();
  }

  /* ==========================================================================
     6. Social Share Bar & Clipboard Toast
     ========================================================================== */
  function initSocialShare(articleTitle, articleUrl) {
    const title = encodeURIComponent(articleTitle || document.title);
    const url = encodeURIComponent(articleUrl || window.location.href);

    const shareLinkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    const shareTwitter = `https://twitter.com/intent/tweet?text=${title}&url=${url}&via=manjeetkatare`;
    const shareWhatsapp = `https://api.whatsapp.com/send?text=${title}%20${url}`;

    // Look for share container
    const shareContainers = document.querySelectorAll('.article-interaction-bar');
    shareContainers.forEach(container => {
      container.innerHTML = `
        <div class="share-group">
          <span class="share-label">Share:</span>
          <a href="${shareLinkedin}" target="_blank" rel="noopener noreferrer" class="share-btn share-linkedin" title="Share on LinkedIn" aria-label="Share on LinkedIn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="${shareTwitter}" target="_blank" rel="noopener noreferrer" class="share-btn share-twitter" title="Share on X (Twitter)" aria-label="Share on X (Twitter)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="${shareWhatsapp}" target="_blank" rel="noopener noreferrer" class="share-btn share-whatsapp" title="Share on WhatsApp" aria-label="Share on WhatsApp">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          </a>
          <button type="button" class="share-btn share-copy" title="Copy Article Link" aria-label="Copy Article Link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
          </button>
        </div>
        <div style="font-size:0.875rem; color:var(--text-muted);">
          <span>By Manjeet Singh Katare</span>
        </div>
      `;

      const copyBtn = container.querySelector('.share-copy');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('✓ Article link copied to clipboard!');
          }).catch(() => {
            showToast('Article link: ' + window.location.href);
          });
        });
      }
    });
  }

  function showToast(message) {
    let toast = document.getElementById('blogToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'blogToast';
      toast.className = 'blog-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  /* ==========================================================================
     7. Dynamic Related Articles Recommendation Engine
     ========================================================================== */
  function renderRelatedArticles(currentId, container) {
    if (!container) return;

    // Available catalog of in-depth publications
    const catalog = [
      {
        id: 'complete-digital-marketing-guide',
        title: "The Complete Digital Marketing Guide (2026): 8 Core Disciplines from Brand-Building to Performance Ads",
        cat: "Growth & Strategy",
        date: "November 2026",
        img: "assets/images/blog/complete_digital_marketing_guide.svg",
        read: "14 min read",
        excerpt: "A comprehensive roadmap deconstructing 8 core disciplines: Content, SEO & GEO, Social, Email, WhatsApp, Landers, Paid Ads, and Affiliates."
      },
      {
        id: 'digital-marketing-salary-in-india',
        title: "Digital Marketing Salary in India: 2026 Comprehensive Career & Compensation Guide",
        cat: "Career Intelligence",
        date: "November 2026",
        img: "assets/images/blog/digital_marketing_salary_in_india.svg",
        read: "11 min read",
        excerpt: "The complete compensation guide covering salary ranges across freshers, mid-level performance marketers, and leadership roles in India."
      },
      {
        id: 'seo-search-intent',
        title: "Deconstructing Search Intent: How We Ranked 5+ Commercial Websites on Google's First Page",
        cat: "Organic SEO",
        date: "November 2026",
        img: "assets/images/blog/seo_search_intent_featured.jpg",
        read: "10 min read",
        excerpt: "An exhaustive technical breakdown of multi-client organic SEO campaigns across clinical healthcare and B2B sectors."
      },
      {
        id: 'medical-clinical-seo',
        title: "The On-Page Optimization Architecture for Medical & Clinical Practices",
        cat: "Healthcare SEO",
        date: "October 2026",
        img: "assets/images/work/dermatology_skincare_clinic.jpg",
        read: "8 min read",
        excerpt: "How structuring localized condition queries, clinical service pages, and medical FAQ schema generated qualified patient inquiries."
      },
      {
        id: 'meta-ads-roas',
        title: "The ROAS Blueprint: Synchronizing Meta Ads with Conversion Tracking",
        cat: "Performance Ads",
        date: "September 2026",
        img: "assets/images/work/mumbai_coworking_seo.jpg",
        read: "9 min read",
        excerpt: "Why campaign budget optimization (CBO) and lookalike audiences require airtight server-side Conversions API (CAPI)."
      },
      {
        id: 'video-hooks-creative',
        title: "Data-Driven Creatives: Why Visual Pacing and Thumb-Stopping Hooks Drive Conversions",
        cat: "Creative Strategy",
        date: "August 2026",
        img: "assets/images/work/youtube_channel_art.png",
        read: "7 min read",
        excerpt: "Bridging Premiere Pro and After Effects video workflows with paid ad metrics to maximize 3-second hook rate."
      }
    ];

    // Filter out current article and take 2 items
    const related = catalog.filter(item => item.id !== currentId).slice(0, 2);
    if (related.length === 0) return;

    const section = document.createElement('section');
    section.className = 'related-articles-section';
    section.innerHTML = `
      <div class="related-section-header">
        <div>
          <span class="section-kicker" style="font-size: 0.75rem;">Continue Reading</span>
          <h3 class="related-section-title">Related Strategies &amp; Case Studies</h3>
        </div>
        <a href="blog.html" class="btn btn-secondary btn-sm">
          <span>All Articles &rarr;</span>
        </a>
      </div>
      <div class="related-grid">
        ${related.map(item => `
          <article class="blog-card" style="cursor: pointer;" onclick="window.location.href='article.html?id=${item.id}'">
            <div class="blog-media-wrap">
              <img src="${item.img}" alt="${item.title.replace(/"/g, '&quot;')}" loading="lazy">
              <span class="blog-status-badge">${item.cat}</span>
            </div>
            <div class="blog-body">
              <div class="blog-cat-date">
                <span class="blog-cat">${item.cat}</span>
                <span>•</span>
                <span>${item.date}</span>
              </div>
              <h4 class="blog-title" style="font-size: 1.05rem;">
                <a href="article.html?id=${item.id}" style="color: inherit; text-decoration: none;">
                  ${item.title}
                </a>
              </h4>
              <p class="blog-excerpt">${item.excerpt}</p>
              <div class="blog-footer">
                <span>${item.read}</span>
                <a href="article.html?id=${item.id}" class="blog-read-link" onclick="event.stopPropagation()">Read Article &rarr;</a>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    `;

    container.appendChild(section);
  }

  /* ==========================================================================
     8. Blog Archive Filter & Search Engine (for blog.html)
     ========================================================================== */
  function initBlogListingFilters() {
    const filterPills = document.querySelectorAll('.blog-filter-pill');
    const searchInput = document.querySelector('.blog-search-input');
    const blogCards = document.querySelectorAll('.blog-grid .blog-card');

    if (blogCards.length === 0) return;

    let activeCategory = 'all';
    let searchQuery = '';

    function filterCards() {
      let visibleCount = 0;

      blogCards.forEach(card => {
        const cat = (card.querySelector('.blog-cat')?.textContent || '').toLowerCase();
        const title = (card.querySelector('.blog-title')?.textContent || '').toLowerCase();
        const excerpt = (card.querySelector('.blog-excerpt')?.textContent || '').toLowerCase();

        const matchesCat = activeCategory === 'all' || cat.includes(activeCategory);
        const matchesQuery = !searchQuery || title.includes(searchQuery) || excerpt.includes(searchQuery) || cat.includes(searchQuery);

        if (matchesCat && matchesQuery) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // No results state check
      let emptyMsg = document.getElementById('blogEmptyFilterMsg');
      if (visibleCount === 0) {
        if (!emptyMsg) {
          emptyMsg = document.createElement('div');
          emptyMsg.id = 'blogEmptyFilterMsg';
          emptyMsg.style.cssText = 'grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-secondary);';
          emptyMsg.innerHTML = `
            <p style="font-size: 1.15rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem;">No matching articles found</p>
            <p style="font-size: 0.9375rem;">Try searching for a different keyword or select another category filter.</p>
          `;
          const grid = document.querySelector('.blog-grid');
          if (grid) grid.appendChild(emptyMsg);
        }
        emptyMsg.style.display = 'block';
      } else if (emptyMsg) {
        emptyMsg.style.display = 'none';
      }
    }

    if (filterPills.length > 0) {
      filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
          filterPills.forEach(p => p.classList.remove('is-active'));
          pill.classList.add('is-active');
          activeCategory = pill.getAttribute('data-filter') || 'all';
          filterCards();
        });
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', e => {
        searchQuery = e.target.value.trim().toLowerCase();
        filterCards();
      });
    }
  }

  /* ==========================================================================
     8b. Image Optimization & Lazy Loading Enforcer
     ========================================================================== */
  function enforceImagePerformance(container) {
    if (!container) return;
    const images = container.querySelectorAll('img');
    images.forEach(img => {
      if (!img.getAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      if (!img.getAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }
    });

    // Ensure the primary cover poster has high priority
    const featuredPoster = document.querySelector('.article-featured-media img');
    if (featuredPoster) {
      featuredPoster.setAttribute('fetchpriority', 'high');
      featuredPoster.setAttribute('loading', 'eager');
      featuredPoster.setAttribute('decoding', 'async');
    }
  }

  /* ==========================================================================
     9. Main Post-Processing Hook (Called after article HTML is loaded)
     ========================================================================== */
  window.enhanceArticlePostDOM = function (articleId, articleTitle) {
    const content = document.querySelector('.article-content');
    if (!content) return;

    // 1. Enforce image lazy loading and performance
    enforceImagePerformance(content);

    // 2. Auto-link external marketing tools & software with authentic SVG logos
    autoLinkMarketingTools(content);

    // 3. Enhance clickable topics (tab switchers and accordions)
    enhanceInteractiveTopics(content);

    // 4. Enhance tables with responsive wrappers and full-view toggle
    enhanceDataTables(content);

    // 5. Generate Table of Contents
    const tocTarget = document.getElementById('articleTocList');
    if (tocTarget) {
      generateTableOfContents(content, tocTarget);
    }

    // 6. Init Social Share Suite
    initSocialShare(articleTitle, window.location.href);

    // 7. Init Related Articles
    const relatedContainer = document.getElementById('relatedArticlesSlot');
    if (relatedContainer) {
      renderRelatedArticles(articleId, relatedContainer);
    }

    // 8. Init Top Reading Progress & FAB
    initReadingProgressAndFab();
  };

  // Auto-init for blog listing if on blog.html
  document.addEventListener('DOMContentLoaded', () => {
    initReadingProgressAndFab();
    initBlogListingFilters();
  });

  // Delegated click handler for tree architecture flashcards
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.tree-child-node');
    if (!btn) return;
    const wrapper = btn.closest('.tree-architecture-wrapper');
    if (!wrapper) return;

    const targetId = btn.getAttribute('data-child-id');
    const brandColor = btn.getAttribute('data-brand-color') || '#FF4B12';
    const childBtns = wrapper.querySelectorAll('.tree-child-node');
    const consoleBox = wrapper.querySelector('.tree-details-console');
    const panels = wrapper.querySelectorAll('.tree-console-panel');

    childBtns.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    if (consoleBox) {
      consoleBox.style.setProperty('--brand-color', brandColor);
      consoleBox.style.setProperty('--brand-color-opacity', brandColor + '25');
      consoleBox.style.borderColor = brandColor;
      consoleBox.style.boxShadow = `0 24px 60px -12px ${brandColor}35, 0 8px 24px rgba(0, 0, 0, 0.04), inset 0 1.5px 2px rgba(255, 255, 255, 0.9)`;
    }

    panels.forEach(p => {
      if (p.getAttribute('data-panel-id') === targetId) {
        p.classList.add('is-active');
      } else {
        p.classList.remove('is-active');
      }
    });
  });
})();
