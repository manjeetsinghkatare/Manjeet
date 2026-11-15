# Reusable WordPress Publishing Guide
## How to Write & Publish Interactive Articles on Your Portfolio

Your portfolio website now features an **Advanced Interactive Blog Engine**. Any article you write and publish on your WordPress website (`manjeetsdigitalmarketingblog.wordpress.com`) will **automatically inherit all interactive features** without needing to write custom code or edit website files.

---

## 1. Zero-Effort Automatic Features (Requires No Special Action)

When you publish standard content in WordPress, the portfolio's engine automatically performs the following:

| Feature | How It Works in WordPress | Portfolio Experience |
| :--- | :--- | :--- |
| **Interactive Table of Contents** | Add regular **Heading 2 (`<h2>`)** and **Heading 3 (`<h3>`)** blocks | A sticky Table of Contents is automatically built on the right sidebar with smooth scrolling, heading anchors, and real-time scroll tracking (ScrollSpy). |
| **Authentic Software Brand Logos** | Just type the name of any tool (e.g., *WordPress*, *HubSpot*, *Google Analytics*, *Semrush*, *Ahrefs*, *Canva*, *Google Search Console*, *Meta Ads Manager*, *Looker Studio*) | Automatically injects the **authentic official SVG brand logo** alongside the name with official brand colors and links to official websites (`target="_blank" rel="noopener noreferrer"`). |
| **Responsive Data Tables** | Insert a standard WordPress **Table block** | Automatically wrapped with responsive scroll, row count indicators, mobile drag indicators, and an expand/collapse toggle. |
| **Mandatory Featured Poster** | Set a 16:9 Featured Image in WordPress post settings | Automatically optimized with high fetch priority and used as the article's hero banner and listing card. |
| **Reading Progress Bar** | Any article length | Displays a subtle gradient reading progress bar at the very top of the page. |
| **Floating Back to Top Button** | Any article length | Appears automatically as readers scroll down, complete with a circular SVG percentage ring. |
| **Social Share & Copy Link** | Automatic | One-click share buttons for LinkedIn, X (Twitter), WhatsApp, and Copy Link with a toast notification. |
| **Related Articles** | Automatic | Recommends relevant articles at the bottom of the page. |

---

## 2. Interactive Clickable Topics (Accordion & Tabbed Mode)

To create interactive topics where detailed paragraphs remain hidden until clicked:

### Method A: The Native WordPress "Details" Block (Recommended for Accordions)
1. In the WordPress Gutenberg editor, click the **`+`** button and search for **Details**.
2. Type your topic title in the summary bar (e.g., *"Topic 1: Informational Intent Strategy"*).
3. Type your detailed paragraphs, lists, or tables inside the collapsible body.
4. Publish your post.
5. **Result on Portfolio:** Renders as a modern interactive card with smooth expansion, rotating chevron indicators, and category badges.

---

### Method B: Tabbed Switcher (Pill Tabs)
To display tabs side-by-side (like *Topic 1*, *Topic 2*, *Topic 3*) where clicking one tab shows its content and hides the others:
1. In WordPress, add a **Custom HTML** block.
2. Paste this simple template:

```html
<div class="topic-tabs-container">
  <div class="topic-tabs-nav" role="tablist">
    <button type="button" class="topic-tab-btn is-active" role="tab">Topic 1: Keyword Research</button>
    <button type="button" class="topic-tab-btn" role="tab">Topic 2: Technical Audits</button>
    <button type="button" class="topic-tab-btn" role="tab">Topic 3: Conversion Tracking</button>
  </div>
  <div class="topic-tab-panels">
    <div class="topic-tab-panel is-active" role="tabpanel">
      <h4>Topic 1 Breakdown</h4>
      <p>Write your detailed content for Topic 1 here. Initially visible.</p>
    </div>
    <div class="topic-tab-panel" role="tabpanel">
      <h4>Topic 2 Breakdown</h4>
      <p>Write your detailed content for Topic 2 here. Appears when Topic 2 is clicked.</p>
    </div>
    <div class="topic-tab-panel" role="tabpanel">
      <h4>Topic 3 Breakdown</h4>
      <p>Write your detailed content for Topic 3 here. Appears when Topic 3 is clicked.</p>
    </div>
  </div>
</div>
```

---

## 3. Executive Takeaways / TL;DR Summary Box

To add a summary box at the start of your article:
1. In WordPress, add a **Custom HTML** block.
2. Paste this snippet:

```html
<div class="article-takeaways-box">
  <div class="takeaways-header">
    <div class="takeaways-icon-badge">★</div>
    <h3 class="takeaways-title">Key Executive Takeaways</h3>
  </div>
  <ul class="takeaways-list">
    <li>First major data point or strategic finding.</li>
    <li>Second actionable recommendation.</li>
    <li>Third measurable result or campaign benchmark.</li>
  </ul>
</div>
```

---

## 4. Recognized Marketing Software & Tools (Auto-Linked)

Whenever you mention any of the following tools in your article paragraphs, they will automatically open their official websites in a new tab:
- **WordPress** (`https://wordpress.org/`)
- **HubSpot** (`https://www.hubspot.com/`)
- **Google Analytics / GA4** (`https://analytics.google.com/`)
- **Google Search Console / GSC** (`https://search.google.com/search-console/about`)
- **Semrush** (`https://www.semrush.com/`)
- **Ahrefs** (`https://ahrefs.com/`)
- **Canva** (`https://www.canva.com/`)
- **Google Ads** (`https://ads.google.com/`)
- **Meta Ads Manager / Meta Ads** (`https://adsmanager.facebook.com/`)
- **Conversions API / Meta CAPI** (`https://developers.facebook.com/docs/marketing-api/conversions-api/`)
- **Screaming Frog** (`https://www.screamingfrog.co.uk/seo-spider/`)
- **Looker Studio** (`https://lookerstudio.google.com/`)
- **Microsoft Power BI** (`https://powerbi.microsoft.com/`)
- **Figma** (`https://www.figma.com/`)
- **Mailchimp** (`https://mailchimp.com/`)
- **Zapier** (`https://zapier.com/`)
- **Adobe Premiere Pro** (`https://www.adobe.com/products/premiere.html`)
- **After Effects** (`https://www.adobe.com/products/aftereffects.html`)
- **LinkedIn Campaign Manager** (`https://business.linkedin.com/marketing-solutions/ads`)

*(No video links or unwanted YouTube popups are included).*

---

## 5. Publishing Checklist

1. **Title**: Add a clear, intent-driven headline.
2. **Headings**: Use `<h2>` for main sections and `<h3>` for sub-sections.
3. **Featured Image**: Set a 16:9 featured image in WordPress post settings.
4. **Category**: Assign a category (e.g., *Organic SEO*, *Performance Ads*, *Healthcare SEO*, *Creative Strategy*).
5. **Excerpt**: Write a concise 2-sentence summary.
6. **Hit Publish**: Your portfolio updates immediately!
