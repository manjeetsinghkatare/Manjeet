/**
 * ==========================================================================
 * MANJEET SINGH KATARE — PORTFOLIO JAVASCRIPT ENGINE
 * Digifoc-inspired Interactions, Light/Dark Theming, Modal Lightbox & Filters
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const safeRun = (fn, name) => {
    try { if (typeof fn === 'function') fn(); }
    catch (e) { console.warn('Error in ' + name + ':', e); }
  };
  safeRun(initTheme, 'initTheme');
  safeRun(initMobileMenu, 'initMobileMenu');
  safeRun(initMobileHeaderScroll, 'initMobileHeaderScroll');
  safeRun(initPortfolioFilters, 'initPortfolioFilters');
  safeRun(initModalLightbox, 'initModalLightbox');
  safeRun(initSocialsModal, 'initSocialsModal');
  safeRun(initCertGallery, 'initCertGallery');
  safeRun(initContactForm, 'initContactForm');
  safeRun(initScrollSpy, 'initScrollSpy');
  safeRun(initScrollReveal, 'initScrollReveal');
  safeRun(initBackToTop, 'initBackToTop');
  safeRun(initWordPressBlog, 'initWordPressBlog');
  safeRun(loadSingleArticle, 'loadSingleArticle');
});

/* ==========================================================================
   1. Theme Management (Light Mode Default, Dark Mode Supported)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (!themeToggleBtn) return;

  // Retrieve saved preference or default to light
  const savedTheme = localStorage.getItem('manjeet_portfolio_theme');
  
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('manjeet_portfolio_theme', theme);
}

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const closeBtn = document.getElementById('mobileDrawerClose');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburgerBtn || !mobileDrawer) return;

  function openDrawer() {
    mobileDrawer.classList.add('open');
    if (drawerBackdrop) drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    hamburgerBtn.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }

  hamburgerBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   3. Mobile Header Scroll Hide/Show
   ========================================================================== */
function initMobileHeaderScroll() {
  const siteHeader = document.querySelector('.site-header');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (!siteHeader) return;

  let lastScrollY = window.scrollY || window.pageYOffset;
  const scrollThreshold = 10;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY || window.pageYOffset;
    const isMobile = window.innerWidth <= 768;
    const isDrawerOpen = mobileDrawer && mobileDrawer.classList.contains('open');

    if (!isMobile || isDrawerOpen) {
      siteHeader.classList.remove('header-hidden');
      lastScrollY = currentScrollY;
      return;
    }

    if (currentScrollY <= 40) {
      siteHeader.classList.remove('header-hidden');
    } else if (currentScrollY > lastScrollY + scrollThreshold) {
      siteHeader.classList.add('header-hidden');
    } else if (currentScrollY < lastScrollY - scrollThreshold) {
      siteHeader.classList.remove('header-hidden');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });
}

/* ==========================================================================
   4. Portfolio Category Filter Engine
   ========================================================================== */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. Verified Project & Credential Master Database
   ========================================================================== */
const projectDetails = {
  // --- Digital Marketing & SEO Case Studies ---
  'youthmonk-seo': {
    title: '5+ Commercial Websites: Multi-Sector SEO, Blog Publishing & Backlinking',
    category: 'Digital Marketing & Organic SEO',
    org: 'Agency Client Portfolio (Youthmonk)',
    role: 'Content Writing & Digital Marketing Intern (June 16 – Sep 16, 2026)',
    tools: 'Google Search Console, Keyword Planner, High-DA Backlinks, Technical SEO, On-Page Architecture',
    outcome: 'Ranked 5+ commercial client websites on page 1 of Google search, driving continuous organic keyword growth and inbound leads.',
    image: 'assets/images/work/seo_multi_business_analytics.jpg',
    desc: 'Delivered comprehensive organic search engine optimization across 5+ commercial client businesses spanning healthcare, interior architecture, and corporate services. Key activities included on-page and technical website SEO audits, targeted high-intent keyword research, structuring and publishing regular SEO-optimized blog posts, building authoritative external backlinks and directory citations, and monitoring organic ranking trajectories to maintain steady search growth.'
  },
  'dermatology-seo': {
    title: 'Dermatology & Clinical Skincare: Digital Marketing, SEO & Backlinking',
    category: 'Healthcare SEO & Digital Marketing',
    org: 'Confidential Healthcare Client (Dermatology Sector)',
    role: 'Digital Marketing & SEO Associate',
    tools: 'On-Page SEO, Medical Backlinking, Search Console, Local Citation Building, Content Marketing',
    outcome: 'Significantly improved organic search discovery for specialized clinical skincare treatments and generated steady qualified consultation inquiries.',
    image: 'assets/images/work/dermatology_skincare_clinic.jpg',
    desc: 'Executed an end-to-end digital marketing and search optimization program for a specialized dermatology and clinical skincare practice. Core responsibilities included identifying high-intent treatment queries, optimizing on-page service pages, acquiring high-quality healthcare backlinks, managing local business citations, and publishing informative skincare content designed to guide prospective patients through consultation booking.'
  },
  'b2b-interior-seo': {
    title: 'B2B Interior Architecture & Custom Furniture: SEO & Digital Marketing',
    category: 'B2B SEO & Digital Marketing',
    org: 'Confidential B2B Commercial Client (Interior & Furniture Design)',
    role: 'Content Marketing & SEO Strategist',
    tools: 'B2B Keyword Research, Commercial Backlinking, Long-Tail SEO, On-Page Optimization, Google Analytics',
    outcome: 'Secured top organic search visibility for high-ticket commercial interior, exterior design, and bespoke corporate wooden furniture inquiries.',
    image: 'assets/images/work/b2b_interior_furniture_design.jpg',
    desc: 'Managed comprehensive SEO and digital marketing initiatives for a commercial design firm providing corporate interior/exterior architecture and bespoke wooden furniture craft for enterprises. Developed an exhaustive keyword strategy around commercial fit-outs and architectural woodworking, built authoritative industry backlinks, optimized service landing pages, and published B2B case studies to capture high-value enterprise contracts.'
  },
  'orthopedic-seo': {
    title: 'Orthopedic & Joint Care Clinic: SEO, Backlinking & Keyword Growth',
    category: 'Medical & Healthcare SEO',
    org: 'Confidential Healthcare Client (Orthopedic & Joint Care)',
    role: 'Healthcare SEO & Digital Marketing Specialist',
    tools: 'Healthcare SEO, Medical Directory Indexing, High-DA Backlinks, Long-Tail Keyword Discovery, Search Console',
    outcome: 'Achieved high organic rankings for orthopedic, joint mobility, and bone care search terms, increasing prospective patient inquiries.',
    image: 'assets/images/work/orthopedic_bone_healthcare.jpg',
    desc: 'Developed and executed a targeted organic search engine optimization and digital marketing strategy for an orthopedic and bone-health clinic. Focused on optimizing search visibility for orthopedic procedures, joint care, and musculoskeletal treatments. Built authoritative medical and directory backlinks, conducted deep keyword research targeting condition-specific queries, and created patient-friendly medical content to build clinical trust and drive appointment bookings.'
  },
  'vedalex-lead-gen': {
    title: 'Paid Ads Performance, Brand Growth & 30+ Promotional Assets',
    category: 'Digital Marketing & Paid Ads',
    org: 'VedAlex World Class Products Pvt. Ltd.',
    role: 'Digital Marketing & Lead Generation Intern (December 2025 – June 2026)',
    tools: 'Meta Ads Manager, Google Ads, Organic SEO, Canva, Photoshop',
    outcome: 'Managed community of 10K+ followers; contributed to campaigns that delivered a 40% increase in product reach and 35% in engagement with 30+ promotional creatives.',
    image: 'assets/images/certificates/vedalex_internship.png',
    desc: 'Configured and tracked multi-channel Meta (Facebook/Instagram) and Google Ads campaigns, produced 30+ promotional flyers and marketing banners, and executed organic audience growth strategies.'
  },
  'pimr-meta-ads-coord': {
    title: 'Meta Ads Performance Marketing Workshop Coordination',
    category: 'Digital Marketing & Event Leadership',
    org: 'Prestige Institute of Management & Research (PIMR), Gwalior',
    role: 'Event Coordinator (Marketing Club)',
    tools: 'Meta Ads Manager, Ad Performance Optimization, ROAS Strategy, Event Coordination',
    outcome: 'Awarded Certificate of Appreciation by PIMR Director & Faculty (April 30, 2026).',
    image: 'assets/images/certificates/pimr_meta_ads.jpg',
    desc: 'Coordinated the high-impact institutional workshop on Meta Ads Performance Marketing organized by the PIMR Marketing Club, covering campaign setup, custom audiences, pixel tracking, and performance optimization.'
  },

  // --- Creative & Multimedia ---
  'youtube-channel': {
    title: 'YouTube Creative Video Editing, 8D Spatial Audio & Gaming Montages',
    category: 'Video Editing & Creative Production',
    org: 'YouTube (@manjeetsinghkatare)',
    role: 'Digital Creator, Video Editor & Motion Graphics Designer',
    tools: 'Adobe Premiere Pro, Adobe After Effects, 8D Spatial Audio, Sound Design, 4K Video Production',
    outcome: 'Produced popular 8D audio mixes (8K+ views), beat-synced Valorant gaming montages, After Effects tutorials, and 4K music edits.',
    image: 'assets/images/work/youtube_channel_showcase.jpg',
    desc: 'Engineered immersive 8D spatial audio tracks with 360-degree binaural panning and sub-bass enhancement for tracks by Shubh and Sidhu Moose Wala. Edited cinematic gaming montages for Valorant featuring beat-synchronized cuts, velocity re-timing, and visual impact effects. Produced 4K music video edits (Ram Mere Sage Hindi Rap) and authored Adobe After Effects tutorials demonstrating VFX and motion graphics workflows.'
  },
  'uc-graphic-design': {
    title: 'Graphic Design Coursework & Visual Identity Systems',
    category: 'Creative & Design',
    org: 'University of Colorado Boulder (Coursera)',
    role: 'Design Student / Creative Specialist',
    tools: 'Color Theory, Typography, Composition, Layout Hierarchy, Visual Design',
    outcome: 'Official Course Certificate authorized by UC Boulder (Mar 16, 2022).',
    image: 'assets/images/certificates/uc_boulder_graphic_design.jpg',
    desc: 'Mastered design principles under David Underwood (Design & Media Teaching Consultant, UC Boulder), focusing on typographic hierarchy, color psychology, and persuasive visual composition.'
  },

  // --- Featured Projects & Simulations ---
  'maarston-craft-compress': {
    title: 'MaarstOn Craft — Image Compress',
    category: 'Web Tool / Development',
    org: 'Personal Project (MaarstOn Craft)',
    role: 'Creator & Web Developer',
    tools: 'Image Compression · JavaScript · Web Tool · Browser-Based · Responsive Design',
    outcome: 'Live Web Application: Privacy-first client-side image compression with real-time results.',
    image: 'assets/images/work/maarston_craft_image_compress.png',
    desc: 'A privacy-first browser-based image compression tool with adjustable compression levels, real-time preview results, and 100% client-side processing without uploading any files to external servers.',
    liveUrl: 'https://maarston-craft-image-compress.vercel.app/'
  },
  'paddycraft-mba': {
    title: 'PaddyCraft: Eco-Furniture Sustainability Initiative',
    category: 'MBA Strategic Project',
    org: 'Prestige Institute of Management & Research (PIMR), Gwalior',
    role: 'Project Researcher & Marketing Strategy Contributor',
    tools: 'Market Feasibility, Supply Chain Modeling, Consumer Behavior, Eco-Marketing',
    outcome: 'Formal MBA Community Engagement Project submitted and certified at PIMR Gwalior.',
    image: 'assets/images/work/paddy_straw_sustainability.jpg',
    desc: 'Collaborated on an intensive strategic initiative to solve seasonal crop residue burning across North India by converting paddy straw into sustainable, commercial furniture with an end-to-end go-to-market plan.'
  },
  'tata-genai-analytics': {
    title: 'Tata – GenAI Powered Data Analytics Job Simulation',
    category: 'Data Analytics & AI',
    org: 'Tata (via Forage)',
    role: 'Simulation Participant',
    tools: 'Generative AI, Exploratory Data Analysis, Delinquency Prediction, Executive Data Storytelling',
    outcome: 'Credential ID: 6aa122bd72c3c3711160afc1 (Issued September 2026)',
    image: 'assets/images/certificates/tata_genai_analytics.jpg',
    desc: 'Completed practical tasks authorized by Tata on Forage in exploratory data analysis and risk profiling, predicting delinquency with AI models, formulating business reports, and implementing an AI-driven collections strategy.'
  },
  'accenture-pm': {
    title: 'Accenture North America Project Management Simulation',
    category: 'Project Management',
    org: 'Accenture (via Forage)',
    role: 'Simulation Participant',
    tools: 'Project Lifecycle, Scope Planning, Lead Alignment, Executive Communication',
    outcome: 'Certificate of Completion (Feb 1, 2025) | Verification Code: wis5Tw37ChcKYeiQp',
    image: 'assets/images/certificates/accenture_pm.jpg',
    desc: 'Completed tasks in defining project approaches, crafting optimal project proposals, identifying core attributes of project leaders, and executive stakeholder communication.'
  },
  'nsw-marketing': {
    title: 'NSW Government Marketing & Communication Simulation',
    category: 'Marketing & Strategic Communication',
    org: 'NSW Public Service Commission (via Forage)',
    role: 'Simulation Participant',
    tools: 'Communications Planning, Audience Segmentation, Strategic Internal Messaging',
    outcome: 'Certificate of Completion (Aug 5, 2025) | Verification Code: YgjTeetEmi9Tx2ggX',
    image: 'assets/images/certificates/nsw_marketing.jpg',
    desc: 'Developed strategic communications plans and tailored internal messaging campaigns for diverse public stakeholders and cross-functional teams.'
  },
  'hp-agile-pm': {
    title: 'HP LIFE Agile Project Management Certification',
    category: 'Agile Management',
    org: 'HP Foundation (HP LIFE)',
    role: 'Certified Learner',
    tools: 'Agile Methodology, Scrum, Kanban, MVP Definition, Iterative Delivery',
    outcome: 'Certificate of Completion (Jan 31, 2025) | Serial: 33d5a0c6-54d8-41cd-9cae-9879a42a2455',
    image: 'assets/images/certificates/hp_agile_pm.jpg',
    desc: 'Mastered agile principles: defining Minimum Viable Products (MVP), iterative and incremental product development, and applying Scrum and Kanban tools across cross-functional teams.'
  },

  // --- Verified Certifications ---
  'cert-google-ads-measurement': {
    title: 'Google Ads Measurement Certification',
    category: 'Official Google Credential',
    org: 'Google Digital Academy (Skillshop)',
    role: 'Certified Measurement Specialist',
    tools: 'Conversion Tracking, GA4, Attribution Models, Smart Bidding, Performance Metrics',
    outcome: 'Credential ID: 198214448 (Issued: Oct 25, 2026 · Valid through: Oct 25, 2027)',
    image: 'assets/images/certificates/google_ads_measurement.png',
    desc: 'Certified by Google Digital Academy (Skillshop) in critical measurement metrics, translating marketing objectives into measurable goals, conversion tracking, attribution models, and data-driven optimization of Google Ads campaigns.'
  },
  'cert-hubspot-email': {
    title: 'Email Marketing Certified',
    category: 'Official HubSpot Credential',
    org: 'HubSpot Academy',
    role: 'Certified Email Marketing Specialist',
    tools: 'Contact Management, Segmentation, Deliverability, Email Design, Lead Nurturing, A/B Testing',
    outcome: 'Certification Code: 05c9608d1d3244b6b94682d694494910 (Issued: Oct 25, 2026 · Valid through: Nov 23, 2028)',
    image: 'assets/images/certificates/hubspot_email_marketing.png',
    desc: 'Certified by HubSpot Academy in building effective email marketing strategies: contact segmentation, high-performing email design and sends, deliverability optimization, test metrics, and lifecycle lead nurturing.'
  },
  'cert-nptel-advertising': {
    title: 'Advertising & Promotions Management (Elite, 64%)',
    category: 'Verified Credential (IIT ISM Dhanbad)',
    org: 'NPTEL / MoE, Govt. of India / Swayam (IIT Dhanbad)',
    role: 'Elite Certified Candidate (Score: 64% | Assignments: 25/25)',
    tools: 'Integrated Marketing Communications, Media Planning, Ad Strategy, Consumer Psychology',
    outcome: 'Elite Certificate | Roll No: NPTEL26MG28S155700272 | Jan-Apr 2026 (12-Week Intensive)',
    image: 'assets/images/certificates/nptel_advertising_promotions.jpg',
    desc: 'Prestigious 12-week national program offered by Indian Institute of Technology Dhanbad and IIT Kharagpur covering promotional campaign design, media planning, brand positioning, and consumer advertising psychology.'
  },
  'cert-google-ads': {
    title: 'Google Ads Search Certification',
    category: 'Official Google Credential',
    org: 'Google Skillshop',
    role: 'Certified Search Specialist',
    tools: 'Google Ads Search, Smart Bidding, Keyword Match Types, Quality Score Optimization',
    outcome: 'Certificate ID: 193516036 (Valid through Sep 8, 2027)',
    image: 'assets/images/certificates/google_ads_search.jpg',
    desc: 'Certified by Google in designing, configuring, and optimizing high-performing search ad campaigns, leveraging machine learning bidding strategies, and boosting ROAS.'
  },
  'cert-hubspot-dm': {
    title: 'HubSpot Digital Marketing Certified',
    category: 'Official HubSpot Credential',
    org: 'HubSpot Academy',
    role: 'Certified Digital Marketer',
    tools: 'SEO Content Creation, Website Optimization, Video Strategy, Paid Ad Amplification',
    outcome: 'Code: 8d4de8cc9cc8431ab7821b39c78ab39c (Valid: Sep 8, 2026 – Oct 7, 2028)',
    image: 'assets/images/certificates/hubspot_digital_marketing.png',
    desc: 'Tested and certified in best practices for SEO-friendly content generation, website conversion optimization, social media strategies, audience engagement, and analytics.'
  },
  'cert-hubspot-inbound': {
    title: 'HubSpot Inbound Marketing Certified',
    category: 'Official HubSpot Credential',
    org: 'HubSpot Academy',
    role: 'Certified Inbound Marketer',
    tools: 'Inbound Methodology, Lead Nurturing, Content Funnels, Organic Social Promotion',
    outcome: 'Code: c3c3d3322f614e23b4113d8589aa3600 (Valid: Sep 8, 2026 – Oct 7, 2028)',
    image: 'assets/images/certificates/hubspot_inbound_marketing.png',
    desc: 'Certified in end-to-end inbound marketing techniques: creating compelling content, leveraging social promotion, converting and nurturing leads, and driving customer advocacy.'
  },
  'cert-youthmonk': {
    title: 'Youthmonk Digital Marketing Internship Completion Certificate',
    category: 'Official Agency Experience',
    org: 'Youthmonk (Rajkot, Gujarat / Mumbai)',
    role: 'Digital Marketing Intern (June 16, 2026 – September 16, 2026)',
    tools: 'Blogging, SEO Backlinking, Content Marketing, Social Media Marketing',
    outcome: 'Official Certificate signed by Ramchandra Kumble (Founder - Youthmonk)',
    image: 'assets/images/certificates/youthmonk_internship.jpg',
    desc: 'Formally recognized for 3 months of practical contributions in blogging, SEO backlinking, content marketing, and social media management. Commended for responsibility, sincerity, coordination, and attention to detail.'
  },
  'cert-vedalex': {
    title: 'VedAlex Lead Generation Internship Certificate',
    category: 'Official Corporate Experience',
    org: 'VedAlex World Class Products Pvt. Ltd. (Jaipur)',
    role: 'Digital Marketing & Lead Generation Intern (December 2025 – June 2026)',
    tools: 'Digital Marketing, Lead Gen, Meta Ads, Google Ads, Market Research, Data Analysis',
    outcome: 'Official Certificate signed by Vinki Walia (Senior General Manager)',
    image: 'assets/images/certificates/vedalex_internship.png',
    desc: 'Certified 6-month internship assisting with digital marketing campaigns, lead generation strategies, market research, data analysis, and day-to-day marketing operations.'
  },
  'cert-pimr-meta-ads': {
    title: 'PIMR Certificate of Appreciation — Meta Ads Event Coordinator',
    category: 'Institutional Recognition',
    org: 'Prestige Institute of Management & Research, Gwalior',
    role: 'Marketing Club Event Coordinator (MBA, 2nd Sem)',
    tools: 'Event Coordination, Meta Ads Performance Marketing, Leadership',
    outcome: 'Signed by Director Prof. (Dr.) Nirmalya Bandyopadhyay & Faculty Coordinators (April 30, 2026)',
    image: 'assets/images/certificates/pimr_meta_ads.jpg',
    desc: 'Awarded for successfully coordinating the "Meta Ads Performance Marketing" workshop organized by the Marketing Club at PIMR Gwalior.'
  },
  'cert-power-bi': {
    title: '30 Days Power BI Micro Course',
    category: 'Data & Analytics',
    org: 'SkillCourse (ISO 9001:2015 Certified)',
    role: 'Certified Learner',
    tools: 'Power BI Desktop, DAX, Data Cleaning, Interactive Dashboards, KPI Tracking',
    outcome: 'Certificate ID: SC-8K2T6R6PIP (Issued Sep 8, 2026)',
    image: 'assets/images/certificates/skillcourse_power_bi.png',
    desc: 'Completed intensive 30-day curriculum mastering business intelligence visualization, data modeling, and executive KPI dashboard creation.'
  },
  'cert-pimr-bootcamp': {
    title: 'PIMR Boot Camp: Corporate Ready & Self Brand',
    category: 'Academic Achievement',
    org: 'Prestige Institute of Management & Research, Gwalior',
    role: 'MBA (FT) Participant & Coordinator',
    tools: 'Executive Presence, Personal Branding, Corporate Strategy',
    outcome: 'Certificate of Achievement (Dec 22, 2025) signed by PIMR Director',
    image: 'assets/images/certificates/pimr_bootcamp_2025.jpg',
    desc: 'Participated in the executive boot camp "Create Your Self Brand & Become Corporate Ready!" held at PIMR Gwalior.'
  },
  'cert-uc-communication': {
    title: 'Effective Communication Specialization (4 Courses)',
    category: 'University Specialization',
    org: 'University of Colorado Boulder (Coursera)',
    role: 'Specialization Graduate',
    tools: 'Business Writing, Graphic Design, Successful Presentation, Capstone Project',
    outcome: 'Specialization Credential: coursera.org/verify/specialization/JVLDSKYFJ9MK (Jun 9, 2022)',
    image: 'assets/images/certificates/uc_boulder_effective_communication.jpg',
    desc: 'Comprehensive 4-course specialization mastering professional business writing, persuasive presentations, and graphic design systems authorized by UC Boulder faculty.'
  },
  'cert-northwestern-sales': {
    title: 'Sales Pitch and Closing',
    category: 'Sales Strategy',
    org: 'Northwestern University (Kellogg School of Management)',
    role: 'Certified Learner',
    tools: 'Sales Pitch Architecture, Objection Handling, Deal Closing, Value Proposition',
    outcome: 'Credential: coursera.org/verify/6L9Z2XBMPJK4 (May 22, 2022)',
    image: 'assets/images/certificates/northwestern_sales.jpg',
    desc: 'Course authorized by Northwestern University taught by Craig Wortmann (Clinical Professor, Kellogg School of Management).'
  },
  'cert-hubspot-sales': {
    title: 'Sales Training: Building Your Sales Career',
    category: 'Sales Foundations',
    org: 'HubSpot Academy (Coursera)',
    role: 'Certified Learner',
    tools: 'Inbound Sales, Prospecting, Pipeline Management, Buyer Persona Mapping',
    outcome: 'Credential: coursera.org/verify/9Q66QN954HQF (Jun 8, 2022)',
    image: 'assets/images/certificates/hubspot_sales.jpg',
    desc: 'Completed sales career training authorized by HubSpot Academy, exploring inbound sales principles, buyer outreach, and qualifying techniques.'
  },
  'cert-uci-project-risks': {
    title: 'Managing Project Risks and Changes',
    category: 'Project Risk Management',
    org: 'University of California, Irvine (UCI Continuing Education)',
    role: 'Certified Learner',
    tools: 'Risk Matrix, Change Control, Mitigation Planning, Stakeholder Alignment',
    outcome: 'Credential: coursera.org/verify/TKKHYKBZ3LBW (Jun 4, 2022)',
    image: 'assets/images/certificates/uci_project_risks.jpg',
    desc: 'Authorized by UC Irvine, taught by Margaret Meloni, MBA, PMP, focusing on identifying risks, analyzing probability/impact, and implementing change management.'
  },
  'cert-nestle-youth': {
    title: 'Africa Youth Day Completion',
    category: 'Global Youth Forum',
    org: 'Nestlé Connect (Nestlé needs YOUth)',
    role: 'Program Participant',
    tools: 'Youth Empowerment, Professional Aspirations, Global Perspective',
    outcome: 'Official Certificate of Completion',
    image: 'assets/images/certificates/nestle_africa_youth_day.jpg',
    desc: 'Completed participation in Africa Youth Day hosted by Nestlé Connect, expanding global perspectives on lifelong learning and youth career readiness.'
  }
};

/* ==========================================================================
   6. Modal / Lightbox Interactivity
   ========================================================================== */
function initModalLightbox() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const triggers = document.querySelectorAll('[data-project-id]');

  if (!modal || !closeBtn) return;

  function openModal(id) {
    const data = projectDetails[id];
    if (!data) return;

    document.getElementById('modalTag').textContent = data.category;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDesc').textContent = data.desc;
    document.getElementById('modalOrg').textContent = data.org;
    document.getElementById('modalRole').textContent = data.role;
    document.getElementById('modalTools').textContent = data.tools;
    document.getElementById('modalOutcome').textContent = data.outcome;

    const imgElem = document.getElementById('modalImg');
    imgElem.src = data.image;
    imgElem.alt = data.title;

    const liveWrap = document.getElementById('modalLiveWrap');
    const liveBtn = document.getElementById('modalLiveBtn');
    if (liveWrap && liveBtn) {
      if (data.liveUrl) {
        liveBtn.href = data.liveUrl;
        liveWrap.style.display = 'block';
      } else {
        liveWrap.style.display = 'none';
      }
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  triggers.forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      e.stopPropagation();
      const id = el.getAttribute('data-project-id');
      openModal(id);
    });

    el.addEventListener('keydown', (e) => {
      if (e.target.closest('a')) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id = el.getAttribute('data-project-id');
        openModal(id);
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6b. Social & Community Channels Modal
   ========================================================================== */
function initSocialsModal() {
  const openBtn = document.getElementById('openSocialsModalBtn');
  const modal = document.getElementById('socialsModal');
  const closeBtn = document.getElementById('socialsModalCloseBtn');

  if (!openBtn || !modal || !closeBtn) return;

  function openModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. Progressive Disclosure Toggle for Certifications
   ========================================================================== */
function initCertGallery() {
  const toggleBtn = document.getElementById('toggleAllCertsBtn');
  const collapsible = document.getElementById('allCertsCollapsible');
  if (!toggleBtn || !collapsible) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = collapsible.classList.contains('open');

    if (!isOpen) {
      collapsible.classList.add('open');
      collapsible.setAttribute('aria-hidden', 'false');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.innerHTML = 'Show Fewer Certifications &uarr;';
    } else {
      collapsible.classList.remove('open');
      collapsible.setAttribute('aria-hidden', 'true');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.innerHTML = 'View All Certifications (18+) &rarr;';
      
      const anchor = document.getElementById('certificationsHeader');
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
}

/* ==========================================================================
   8. Contact Form Handling (Mailto & Clipboard Support)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const copyBtn = document.getElementById('copyMsgBtn');
  const toast = document.getElementById('formToast');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const subject = document.getElementById('formSubject').value.trim() || 'Portfolio Inquiry';
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in your name, email, and message.', 'error');
      return;
    }

    const emailBody = `Hi Manjeet,\n\n${message}\n\nFrom: ${name} (${email})`;
    const mailtoUrl = `mailto:manjeetsinghkatare@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoUrl;
    showToast('Opening your default email client to send your message...', 'success');
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const name = document.getElementById('formName').value.trim() || 'Visitor';
      const email = document.getElementById('formEmail').value.trim() || 'Not specified';
      const message = document.getElementById('formMessage').value.trim();

      if (!message) {
        showToast('Please enter a message to copy.', 'error');
        return;
      }

      const formatted = `From: ${name} <${email}>\n\nMessage:\n${message}`;

      navigator.clipboard.writeText(formatted).then(() => {
        showToast('Message copied to clipboard! You can paste it into any app.', 'success');
      }).catch(() => {
        showToast('Could not automatically copy. Please copy the text manually.', 'error');
      });
    });
  }

  function showToast(text, type) {
    if (!toast) return;
    toast.textContent = text;
    toast.className = 'toast-msg ' + (type === 'success' ? 'toast-success' : 'toast-error');
    toast.style.display = 'block';

    setTimeout(() => {
      toast.style.display = 'none';
    }, 4500);
  }
}

/* ==========================================================================
   9. Active Navigation Scroll Spy
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -65% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   10. Lightweight Viewport Entry Scroll Reveal
   ========================================================================== */
function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;
  if (window.innerWidth <= 768) return;

  const revealTargets = document.querySelectorAll(
    '.section-header, .about-narrative, .about-stats-stack, .synergy-card, ' +
    '.exp-card, .creator-spotlight-card, .skill-category-card, .edu-card, ' +
    '.contact-channels-stack, .contact-form-card'
  );

  if (!revealTargets.length) return;

  revealTargets.forEach(el => el.classList.add('reveal-on-scroll'));
  document.documentElement.classList.add('js-reveal');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
  });

  revealTargets.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('is-revealed');
    } else {
      observer.observe(el);
    }
  });
}

/* ==========================================================================
   11. Back to Top Smooth Scroll
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top-btn');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   12. Dynamic WordPress Headless CMS Blog Feed
   ========================================================================== */
const WP_API_URL = 'https://public-api.wordpress.com/wp/v2/sites/manjeetsdigitalmarketingblog.wordpress.com/posts?_embed=1';

function decodeHtmlEntities(str) {
  if (!str) return '';
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

function stripHtmlTags(html) {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return (tmp.textContent || tmp.innerText || '').trim();
}



/* ==========================================================================
   12b. Standalone Comprehensive Marketing Case Studies & Masterclasses
   ========================================================================== */
const localArticles = {
  'seo-search-intent': {
    title: "Deconstructing Search Intent: How We Ranked 5+ Commercial Websites on Google's First Page",
    category: "Organic SEO & Search Architecture",
    date: "November 2026",
    readingMinutes: 10,
    image: "assets/images/blog/seo_search_intent_featured.jpg",
    excerpt: "An exhaustive technical breakdown of multi-client organic SEO campaigns across clinical healthcare, coworking, and B2B sectors. Covers keyword intent clustering, entity-based content architecture, Core Web Vitals, and authoritative backlink acquisition.",
    contentHtml: `
      <p class="article-lead">
        Search Engine Optimization in 2026 is an exact engineering discipline combining behavioral psychology, semantic entity mapping, and technical infrastructure. Ranking on Google's Page 1 is no longer achieved by keyword density or spun content; it demands absolute alignment with user intent, topical authority, and exceptional Core Web Vitals. Below is the comprehensive playbook executed across 5+ commercial business websites that transformed organic search into their highest-ROI customer acquisition channel.
      </p>

      <h2>1. The Strategic Flaw in Conventional SEO: Volume vs Intent</h2>
      <p>
        The most common failure in digital marketing campaigns is optimizing for vanity search volume rather than transactional intent. A keyword with 40,000 monthly searches often yields high bounce rates and negligible conversions, whereas a high-intent search query with 350 monthly searches can drive continuous qualified leads.
      </p>
      <p>
        Across our client campaigns, we implemented a 4-tier Search Intent Framework:
      </p>
      <ul>
        <li><strong>Informational Intent:</strong> Broad top-of-funnel educational queries (e.g., <em>"what causes recurring hyperpigmentation"</em>). Used strategically for authority building and retargeting pixel capture.</li>
        <li><strong>Navigational Intent:</strong> Branded queries where searchers actively seek a specific company, service hub, or doctor.</li>
        <li><strong>Commercial Investigation:</strong> High-consideration comparison queries (e.g., <em>"best coworking spaces for tech startups Mumbai"</em>, <em>"chemical peel vs fractional laser results"</em>).</li>
        <li><strong>Transactional & Local Intent:</strong> High-converting, wallet-out search queries (e.g., <em>"dermatology clinic appointment Gwalior"</em>, <em>"custom corporate furniture manufacturer Delhi NCR"</em>).</li>
      </ul>

      <blockquote>
        "Our data across 5 client domains demonstrated that commercial investigation and transactional queries convert at 12.8% to 19.4%, compared to less than 0.35% for generic informational keywords."
      </blockquote>

      <h2>2. Keyword Intent Clustering & Semantic Siloing</h2>
      <p>
        Using Semrush, Ahrefs, and Google Search Console API data, we scraped and grouped over 1,200 search queries into contextual clusters rather than individual target keywords. We analyzed SERP features—including People Also Ask (PAA) accordions, Knowledge Panels, and Local 3-Packs—to determine exactly how Google's neural matching models interpret searcher expectations.
      </p>
      <p>
        To dominate these clusters, we constructed a hierarchical <strong>Hub-and-Spoke Content Architecture</strong>:
      </p>
      <ol>
        <li><strong>Pillar Hub Pages (Core Service/Category):</strong> Comprehensive, 2,800+ word technical and service guides addressing the overarching commercial offering.</li>
        <li><strong>Spoke Content Pages (Specialized Cluster Queries):</strong> 5 to 8 supporting articles that exhaustively answer specific long-tail patient or buyer inquiries.</li>
        <li><strong>Internal Linking Graph:</strong> Mathematical interlinking where all spokes pass page authority upward to the primary pillar page using semantic, non-cannibalizing anchor text.</li>
      </ol>

      <h2>3. Technical SEO, Schema Markup & Core Web Vitals</h2>
      <p>
        Great content cannot rank on a slow, technically flawed foundation. We conducted exhaustive technical audits across all 5 domains using Google Search Console, Screaming Frog SEO Spider, and Lighthouse:
      </p>
      <ul>
        <li><strong>Largest Contentful Paint (LCP):</strong> Reduced to under 1.4 seconds by serving next-gen WebP/AVIF images with explicit aspect ratios, priority hero preloading, and caching headers.</li>
        <li><strong>Cumulative Layout Shift (CLS):</strong> Stabilized to 0.00 by reserving dimensions for all media containers and preventing dynamic font shifts.</li>
        <li><strong>Interaction to Next Paint (INP):</strong> Maintained under 120ms with deferral of non-critical third-party JavaScript tracking scripts.</li>
        <li><strong>Structured Data (JSON-LD):</strong> Implemented validated schema including <code>LocalBusiness</code>, <code>MedicalBusiness</code>, <code>Organization</code>, <code>BreadcrumbList</code>, and <code>FAQPage</code> to claim dominant SERP real estate with rich snippets.</li>
      </ul>

      <h2>4. Authoritative Backlink Acquisition & Digital PR</h2>
      <p>
        Rather than relying on automated directory submissions or low-quality private blog networks (PBNs), our off-page strategy was strictly editorial. We monitored industry discussions, pitched guest columns to verified trade journals, and established localized citation profiles with consistent Name, Address, and Phone (NAP) data. Every acquired backlink had a Domain Authority (DA) above 45 and organic search traffic in Google's index.
      </p>

      <h2>5. The Verified Business Impact</h2>
      <div style="overflow-x: auto; margin: 2rem 0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9375rem; background: var(--bg-surface); border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-subtle);">
          <thead>
            <tr style="background: var(--bg-surface-elevated); border-bottom: 2px solid var(--border-subtle); text-align: left;">
              <th style="padding: 0.85rem 1rem;">Client Industry</th>
              <th style="padding: 0.85rem 1rem;">Primary Organic Gain</th>
              <th style="padding: 0.85rem 1rem;">Page 1 Target Keywords</th>
              <th style="padding: 0.85rem 1rem;">Inbound Lead Lift</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 0.85rem 1rem; font-weight: 600;">Clinical Dermatology & Healthcare</td>
              <td style="padding: 0.85rem 1rem; color: var(--accent-green); font-weight: 700;">+285% Organic Clicks</td>
              <td style="padding: 0.85rem 1rem;">14 Top-10 Queries</td>
              <td style="padding: 0.85rem 1rem;">+185% Patient Consultations</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 0.85rem 1rem; font-weight: 600;">B2B Commercial Interior & Office</td>
              <td style="padding: 0.85rem 1rem; color: var(--accent-green); font-weight: 700;">+210% Impression Growth</td>
              <td style="padding: 0.85rem 1rem;">9 Page 1 Keywords</td>
              <td style="padding: 0.85rem 1rem;">+140% RFP Quotation Inquiries</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 0.85rem 1rem; font-weight: 600;">Premium Coworking & Flex Space</td>
              <td style="padding: 0.85rem 1rem; color: var(--accent-green); font-weight: 700;">+340% Local Discovery</td>
              <td style="padding: 0.85rem 1rem;">Google Maps 3-Pack Top 1</td>
              <td style="padding: 0.85rem 1rem;">+220% Desk Tour Bookings</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="article-highlight-box" style="padding: 1.5rem; border-radius: var(--radius-lg); background: var(--bg-surface-elevated); border-left: 4px solid var(--accent-primary); margin: 2.5rem 0;">
        <h4 style="margin: 0 0 0.5rem; color: var(--text-primary); font-family: var(--font-display);">Executive Strategic Summary</h4>
        <p style="margin: 0; color: var(--text-secondary); font-size: 0.9375rem; line-height: 1.6;">
          Search marketing is a sustainable, compounding asset. When businesses align technical speed, entity-based topical depth, and searcher intent fulfillment, they break free from the perpetual cycle of escalating ad spend and secure predictable inbound revenue.
        </p>
      </div>
    `
  },

  'medical-clinical-seo': {
    title: "The On-Page Optimization Architecture for Medical & Clinical Practices",
    category: "Healthcare & Local SEO",
    date: "October 2026",
    readingMinutes: 8,
    image: "assets/images/work/dermatology_skincare_clinic.jpg",
    excerpt: "How structuring localized condition queries, clinical service pages, verified medical doctor schema, and Google Maps Local Pack integration generated continuous qualified patient inquiries.",
    contentHtml: `
      <p class="article-lead">
        Medical practices and clinical healthcare institutions operate under Google's most scrutinized ranking guidelines: <strong>Your Money or Your Life (YMYL)</strong>. Search engines enforce strict validation protocols to protect patient safety. Achieving top rankings requires demonstrating unmatched <strong>Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T)</strong>. Here is the operational framework we engineered to establish clinical authority and generate predictable patient bookings.
      </p>

      <h2>1. Mapping the 3-Stage Patient Decision Journey</h2>
      <p>
        Patients navigating medical conditions do not search in the same manner as eCommerce shoppers. They progress through three distinct cognitive phases:
      </p>
      <ul>
        <li><strong>Phase 1: Symptom Exploration (Informational):</strong> The searcher experiences symptoms (e.g., <em>"why is my acne flaring up after laser"</em>). They need empathetic, medically verified explanations without immediate sales pressure.</li>
        <li><strong>Phase 2: Clinical Treatment Discovery (Commercial Investigation):</strong> The searcher evaluates clinical procedures (e.g., <em>"chemical peel vs fractional CO2 laser for deep scarring"</em>). They compare recovery times, treatment protocols, and safety records.</li>
        <li><strong>Phase 3: Specialist Selection & Booking (Transactional):</strong> The searcher searches for verified doctors in their vicinity (e.g., <em>"best dermatologist clinic near me"</em>, <em>"skin doctor consultation Gwalior"</em>).</li>
      </ul>

      <h2>2. Clinical Page Architecture & E-E-A-T Compliance</h2>
      <p>
        To ensure 100% compliance with Google's medical quality raters guidelines, every condition and procedure page was constructed with:
      </p>
      <ol>
        <li><strong>Verified Medical Reviewer Bylines:</strong> Clear author attribution with qualifications (e.g., MBBS, MD Dermatology), medical council registration numbers, and clickable links to professional credentials.</li>
        <li><strong>Transparent Procedural Breakdowns:</strong> Clinical steps, expected pain levels, pre-treatment guidelines, post-procedure aftercare protocols, and realistic timelines.</li>
        <li><strong>Verified FAQ Schema (JSON-LD):</strong> Answering exact patient objections (cost ranges, side effects, recovery downtime) directly in search snippets.</li>
      </ol>

      <h2>3. Google Business Profile (GBP) & Local 3-Pack Mastery</h2>
      <p>
        Over 65% of clinical appointment bookings originate directly from Google Maps and Local 3-Pack results on mobile devices. We optimized the clinical Google Business Profile through:
      </p>
      <ul>
        <li>Primary category precision (e.g., <em>Dermatologist</em>) paired with secondary service categories (<em>Skin Care Clinic</em>, <em>Medical Spa</em>).</li>
        <li>Consistent Name, Address, and Phone Number (NAP) synchronization across 40+ premier healthcare directories and medical aggregator databases.</li>
        <li>Proactive review collection workflows encouraging detailed patient feedback referencing specific treatments, paired with prompt, compliant clinical replies.</li>
        <li>Regular geo-tagged updates showcasing the clinic facility, medical equipment, and doctor consultations.</li>
      </ul>

      <h2>4. Results: Predictable Patient Acquisition</h2>
      <p>
        Within 120 days of rolling out this clinical SEO architecture:
      </p>
      <ul>
        <li><strong>+185% increase</strong> in confirmed clinic appointment bookings originating from organic search.</li>
        <li><strong>#1 ranking</strong> in Google Maps Local Pack for 8 high-value specialized medical queries across the primary catchment area.</li>
        <li><strong>Zero traffic disruption</strong> during major Google Core Algorithm and Helpful Content Updates due to rigorous medical fact-checking and schema validation.</li>
      </ul>
    `
  },

  'meta-ads-roas': {
    title: "The ROAS Blueprint: Synchronizing Meta Ads with Conversion Tracking",
    category: "Performance Marketing",
    date: "September 2026",
    readingMinutes: 9,
    image: "assets/images/work/mumbai_coworking_seo.png",
    excerpt: "Why campaign budget optimization (CBO) and lookalike audiences require airtight server-side Conversions API (CAPI) to protect ad spend efficiency.",
    contentHtml: `
      <p class="article-lead">
        With signal loss resulting from browser privacy protocols, ad blockers, and Apple's App Tracking Transparency (ATT), running scalable Meta ad campaigns requires sophisticated tracking infrastructure. Relying solely on client-side pixel tracking blinds Meta's algorithmic bidding engine. Here is the operational framework utilized to achieve a consistent 3.4x to 4.8x Return on Ad Spend (ROAS).
      </p>

      <h2>1. The Tracking Gap: Why Traditional Pixels Fail</h2>
      <p>
        Standard browser-based Meta Pixels lose between 20% and 35% of conversion events due to browser restrictions, iOS privacy features, and script blockers. When Meta cannot observe downstream purchases or lead submissions:
      </p>
      <ul>
        <li>Campaign Budget Optimization (CBO) algorithms optimize for cheap clicks rather than high-value purchasers.</li>
        <li>Lookalike audiences degrade because the seed customer data is incomplete.</li>
        <li>Cost per acquisition (CPA) escalates by 30% to 50% across ad sets.</li>
      </ul>

      <h2>2. Server-Side Conversions API (CAPI) & Deduplication</h2>
      <p>
        To restore 100% data fidelity, we engineered a dual-stream tracking setup connecting client-side browser events with server-side <strong>Meta Conversions API (CAPI)</strong>:
      </p>
      <ol>
        <li><strong>Event Deduplication:</strong> Passing a shared unique <code>event_id</code> on both client and server payloads so Meta never counts duplicate purchases or leads.</li>
        <li><strong>Customer Information Parameters:</strong> Securely hashing first-party identifiers (SHA-256 encrypted email, phone, city, state, zip) to achieve an <strong>Event Match Quality (EMQ) score above 8.5 out of 10</strong>.</li>
        <li><strong>Offline Event Uploads:</strong> Synchronizing CRM closed-won deal stages back into Meta Ads Manager to train algorithms on actual revenue rather than vanity inquiries.</li>
      </ol>

      <h2>3. Modern Account Architecture: Consolidated vs Segmented</h2>
      <p>
        We dismantled complex multi-ad-set configurations in favor of the <strong>Consolidated Account Structure (CAS)</strong>:
      </p>
      <ul>
        <li><strong>Advantage+ Campaign Budget (CBO):</strong> Giving Meta's machine-learning engine the flexibility to distribute budget dynamically across top-performing ad sets in real time.</li>
        <li><strong>Broad & Seed Lookalikes:</strong> Pairing open demographic targeting with tight 1% to 2% Lookalike audiences built exclusively from highest-LTV customer CRM data.</li>
        <li><strong>Exclusion Discipline:</strong> Strictly excluding past 30-day purchasers from prospecting campaigns to prevent ad spend waste on existing customers.</li>
      </ol>

      <h2>4. Creative Testing: The Primary Performance Lever</h2>
      <p>
        In modern paid social, creative is the targeting mechanism. We deployed a disciplined 3x3 Creative Matrix:
      </p>
      <ul>
        <li><strong>Direct Pain-Point Hook:</strong> Addressing the primary customer frustration within the opening 2.5 seconds.</li>
        <li><strong>Social Proof Case Study:</strong> Split-screen visual transformations and verified customer testimonial reels.</li>
        <li><strong>High-Velocity Feature Walkthrough:</strong> Demonstrating exactly how the product or service eliminates friction.</li>
      </ul>
      <p>
        This methodical synergy of server-side data accuracy, streamlined budget allocation, and continuous creative testing generated <strong>3.4x to 4.8x ROAS</strong> while simultaneously cutting Cost Per Lead (CPL) by 38%.
      </p>
    `
  },

  'video-hooks-creative': {
    title: "Data-Driven Creatives: Why Visual Pacing and Thumb-Stopping Hooks Drive Conversions",
    category: "Creative Video Strategy",
    date: "August 2026",
    readingMinutes: 7,
    image: "assets/images/work/youtube_channel_art.png",
    excerpt: "Bridging Premiere Pro and After Effects video workflows with paid ad metrics to maximize 3-second hook rate and lower customer acquisition costs.",
    contentHtml: `
      <p class="article-lead">
        In the fast-scrolling feed environments of Instagram Reels, YouTube Shorts, and TikTok, the commercial success of a video campaign is determined within the opening 3 seconds. An exceptional value proposition is useless if 80% of viewers scroll past before hearing it. Here is how we connect video editing workflows in Adobe Premiere Pro and After Effects with performance marketing metrics to engineer video creatives that convert.
      </p>

      <h2>1. The 3-Second Hook Rate: The Linchpin of Video ROI</h2>
      <p>
        Hook Rate is mathematically defined as:
      </p>
      <div style="background: var(--bg-surface-elevated); padding: 1rem 1.5rem; border-radius: var(--radius-md); font-family: var(--font-display); font-size: 1rem; border-left: 3px solid var(--accent-primary); margin: 1.5rem 0;">
        <strong>Hook Rate (%) = (3-Second Continuous Video Views / Total Impressions) × 100</strong>
      </div>
      <p>
        Industry benchmarks hover around 18% to 22%. By implementing specific visual and auditory disruptors in our editing pipeline, we elevated average client hook rates to <strong>38% to 46%</strong>:
      </p>
      <ul>
        <li><strong>Visual Pattern Interrupts:</strong> Initiating with dynamic camera motion, unexpected object interactions, or split-screen contrast rather than static talking heads.</li>
        <li><strong>High-Contrast Kinetic Typography:</strong> Animating keyword subtitles in bold colors (yellow/white on dark background) so viewers grasp the core message with sound muted.</li>
        <li><strong>Audio Micro-Markers:</strong> Pairing visual transitions with subtle whoosh, riser, or pop sound effects to capture subconscious auditory attention.</li>
      </ul>

      <h2>2. Visual Pacing: Keeping the Retention Curve Flat</h2>
      <p>
        Viewer drop-off occurs whenever the screen remains static for longer than 2.5 seconds. In Adobe Premiere Pro, we execute a rigorous pacing rule:
      </p>
      <ol>
        <li><strong>B-Roll Layering:</strong> Introducing cutaway footage, close-ups, or screen recordings every 1.8 to 2.2 seconds.</li>
        <li><strong>Speed Ramping & Push-Ins:</strong> Subtle scale keyframes (100% to 108% zoom) during key verbal emphasis to maintain forward visual momentum.</li>
        <li><strong>Motion Graphic Overlays in After Effects:</strong> Highlight boxes, animated arrows, and statistic badges that visually reinforce complex spoken data.</li>
      </ol>

      <h2>3. Audio Engineering: Clarity Meets Energy</h2>
      <p>
        Poor audio causes instant abandonment. Our standardized audio mastering chain includes:
      </p>
      <ul>
        <li><strong>Vocal Presence:</strong> High-pass filtering at 80Hz, parametric EQ boosting presence around 2.5kHz–4kHz, and hard limiting dialogue to -3dB peak.</li>
        <li><strong>Dynamic Ducking:</strong> Automating background music volume to duck by -14dB beneath dialogue and swell during silent transitional beats.</li>
      </ul>

      <h2>4. The Commercial Outcome</h2>
      <p>
        Applying this data-driven creative methodology across 30+ promotional videos delivered a <strong>42% increase in 3-second hook rates</strong>, drove click-through rates (CTR) from 1.1% to 2.9%, and reduced overall Customer Acquisition Cost (CAC) by 28%.
      </p>
    `
  }
};


/* ==========================================================================
   13. Single Article Dynamic Viewer (article.html)
   ========================================================================== */

/* ==========================================================================
   12. WordPress REST API Dynamic Blog Engine (with Rich Fallback)
   ========================================================================== */
async function initWordPressBlog() {
  const blogGrid = document.getElementById('blog-grid');
  if (!blogGrid) return;

  const localCardsHtml = [
    {
      id: 'seo-search-intent',
      title: "Deconstructing Search Intent: How We Ranked 5+ Commercial Websites on Google's First Page",
      cat: "Organic SEO",
      date: "November 2026",
      img: "assets/images/blog/seo_search_intent_featured.jpg",
      excerpt: "An exhaustive technical breakdown of multi-client organic SEO campaigns executed across clinical healthcare and commercial B2B sectors.",
      read: "10 min read"
    },
    {
      id: 'medical-clinical-seo',
      title: "The On-Page Optimization Architecture for Medical & Clinical Practices",
      cat: "Healthcare SEO",
      date: "October 2026",
      img: "assets/images/work/dermatology_skincare_clinic.jpg",
      excerpt: "How structuring localized condition queries, clinical service pages, and medical FAQ schema generated continuous qualified patient inquiries.",
      read: "8 min read"
    },
    {
      id: 'meta-ads-roas',
      title: "The ROAS Blueprint: Synchronizing Meta Ads with Conversion Tracking",
      cat: "Performance Ads",
      date: "September 2026",
      img: "assets/images/work/mumbai_coworking_seo.png",
      excerpt: "Why campaign budget optimization (CBO) and lookalike audiences require airtight server-side Conversions API (CAPI) to protect ad spend efficiency.",
      read: "9 min read"
    }
  ].map(item => `
    <article class="blog-card" style="cursor: pointer;" onclick="window.location.href='article.html?id=${item.id}'">
      <div class="blog-media-wrap">
        <a href="article.html?id=${item.id}" tabindex="-1" aria-hidden="true" style="display:block; width:100%; height:100%;">
          <img src="${item.img}" alt="${item.title.replace(/"/g, '&quot;')}" loading="lazy">
        </a>
        <span class="blog-status-badge">Case Study</span>
      </div>
      <div class="blog-body">
        <div class="blog-cat-date">
          <span class="blog-cat">${item.cat}</span>
          <span>•</span>
          <span>${item.date}</span>
        </div>
        <h3 class="blog-title">
          <a href="article.html?id=${item.id}" style="color: inherit; text-decoration: none;">
            ${item.title}
          </a>
        </h3>
        <p class="blog-excerpt">
          ${item.excerpt}
        </p>
        <div class="blog-footer">
          <span>${item.read}</span>
          <a href="article.html?id=${item.id}" class="blog-read-link" onclick="event.stopPropagation()">
            Read Article &rarr;
          </a>
        </div>
      </div>
    </article>
  `).join('');

  try {
    const response = await fetch(WP_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts = await response.json();
    if (!Array.isArray(posts) || posts.length === 0) {
      blogGrid.innerHTML = localCardsHtml;
      return;
    }

    const wpCardsHtml = posts.map(post => {
      const rawTitle = post.title && post.title.rendered ? post.title.rendered : 'Untitled Publication';
      const cleanTitle = decodeHtmlEntities(rawTitle);

      let cleanExcerpt = stripHtmlTags(post.excerpt ? post.excerpt.rendered : '');
      cleanExcerpt = cleanExcerpt.replace(/Continue reading.*$/i, '').trim();
      if (!cleanExcerpt) {
        cleanExcerpt = 'Explore the full strategic insights, data architecture, and campaign breakdowns on our blog.';
      } else if (cleanExcerpt.length > 190) {
        cleanExcerpt = cleanExcerpt.slice(0, 187) + '...';
      }

      let formattedDate = 'Recent';
      if (post.date) {
        try {
          const d = new Date(post.date);
          formattedDate = d.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });
        } catch (e) {}
      }

      let featuredImageUrl = 'assets/images/blog/youre_welcome_featured.png';
      const mediaItem = post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0];
      if (mediaItem) {
        featuredImageUrl = (mediaItem.media_details && mediaItem.media_details.sizes && mediaItem.media_details.sizes.large && mediaItem.media_details.sizes.large.source_url) ||
                           (mediaItem.media_details && mediaItem.media_details.sizes && mediaItem.media_details.sizes.medium_large && mediaItem.media_details.sizes.medium_large.source_url) ||
                           mediaItem.source_url ||
                           featuredImageUrl;
      }

      let category = 'Digital Marketing';
      const termItem = post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0] && post._embedded['wp:term'][0][0];
      if (termItem && termItem.name) {
        category = decodeHtmlEntities(termItem.name);
      }

      const contentText = stripHtmlTags((post.content && post.content.rendered) || '');
      const words = contentText.split(/\s+/).filter(Boolean).length;
      const readingMinutes = Math.max(2, Math.ceil(words / 200));

      return `
        <article class="blog-card" style="cursor: pointer;" onclick="window.location.href='article.html?id=${post.id}'">
          <div class="blog-media-wrap">
            <a href="article.html?id=${post.id}" tabindex="-1" aria-hidden="true" style="display:block; width:100%; height:100%;">
              <img src="${featuredImageUrl}" alt="${cleanTitle.replace(/"/g, '&quot;')}" loading="lazy">
            </a>
            <span class="blog-status-badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">Live Article</span>
          </div>
          <div class="blog-body">
            <div class="blog-cat-date">
              <span class="blog-cat">${category}</span>
              <span>•</span>
              <span>${formattedDate}</span>
            </div>
            <h3 class="blog-title">
              <a href="article.html?id=${post.id}" style="color: inherit; text-decoration: none;">
                ${cleanTitle}
              </a>
            </h3>
            <p class="blog-excerpt">
              ${cleanExcerpt}
            </p>
            <div class="blog-footer">
              <span>${readingMinutes} min read</span>
              <a href="article.html?id=${post.id}" class="blog-read-link" onclick="event.stopPropagation()">
                Read Article &rarr;
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    blogGrid.innerHTML = wpCardsHtml + localCardsHtml;
  } catch (error) {
    console.warn('Using local case studies fallback for blog:', error);
    blogGrid.innerHTML = localCardsHtml;
  }
}


async function loadSingleArticle() {
  const container = document.getElementById('articleContainer');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  // Handle missing ID parameter
  if (!postId) {
    container.innerHTML = `
      <div class="article-state-box">
        <h2 style="font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 0.75rem; color: var(--text-primary);">No Article Specified</h2>
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">Please select an article from the blog section or return to the portfolio.</p>
        <a href="blog.html" class="btn btn-primary">
          &larr; View All Articles
        </a>
      </div>
    `;
    return;
  }

  // 1. Check local comprehensive case studies first
  if (localArticles && localArticles[postId]) {
    const article = localArticles[postId];
    document.title = `${article.title} — Manjeet Singh Katare`;

    container.innerHTML = `
      <div class="article-back-nav">
        <a href="blog.html" class="article-back-btn">
          &larr; Back to All Articles
        </a>
      </div>

      <header class="article-header">
        <div class="article-meta-row">
          <span class="article-category-badge">${article.category}</span>
          <span>•</span>
          <span>${article.date}</span>
          <span>•</span>
          <span>${article.readingMinutes} min read</span>
        </div>

        <h1 class="article-main-title">${article.title}</h1>

        <div class="article-author-card">
          <img src="assets/images/profile/manjeet_profile.png" alt="Manjeet Singh Katare" class="article-author-avatar" onerror="this.src='assets/images/branding/m_logo.png'">
          <div>
            <div class="article-author-name">Manjeet Singh Katare</div>
            <div class="article-author-role">Digital Marketing & Creative Strategy Specialist</div>
          </div>
        </div>
      </header>

      ${article.image ? `
        <div class="article-featured-media">
          <img src="${article.image}" alt="${article.title.replace(/"/g, '&quot;')}">
        </div>
      ` : ''}

      <div class="article-content">
        ${article.contentHtml}
      </div>

      <div class="article-bottom-actions">
        <a href="blog.html" class="btn btn-secondary">
          &larr; Back to All Articles
        </a>
        <a href="index.html#contact" class="btn btn-primary">
          Discuss This Strategy &rarr;
        </a>
      </div>
    `;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // 2. Fallback to WordPress REST API for live WP posts
  try {
    const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/manjeetsdigitalmarketingblog.wordpress.com/posts/${postId}?_embed=1`);
    if (!response.ok) {
      throw new Error(`Article not found (status ${response.status})`);
    }

    const post = await response.json();
    const rawTitle = post.title && post.title.rendered ? post.title.rendered : 'Untitled Article';
    const cleanTitle = decodeHtmlEntities(rawTitle);
    document.title = `${cleanTitle} — Manjeet Singh Katare`;

    let formattedDate = 'Recently Published';
    if (post.date) {
      try {
        const d = new Date(post.date);
        formattedDate = d.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });
      } catch (e) {}
    }

    let category = 'Marketing Strategy & Growth';
    const termItem = post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0] && post._embedded['wp:term'][0][0];
    if (termItem && termItem.name) {
      category = decodeHtmlEntities(termItem.name);
    }

    const contentText = stripHtmlTags((post.content && post.content.rendered) || '');
    const words = contentText.split(/\s+/).filter(Boolean).length;
    const readingMinutes = Math.max(2, Math.ceil(words / 200));

    let featuredImageUrl = '';
    const mediaItem = post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0];
    if (mediaItem) {
      featuredImageUrl = (mediaItem.media_details && mediaItem.media_details.sizes && mediaItem.media_details.sizes.large && mediaItem.media_details.sizes.large.source_url) ||
                         (mediaItem.media_details && mediaItem.media_details.sizes && mediaItem.media_details.sizes.medium_large && mediaItem.media_details.sizes.medium_large.source_url) ||
                         mediaItem.source_url ||
                         '';
    }

    const contentHtml = (post.content && post.content.rendered) || '<p>No content available for this publication.</p>';

    container.innerHTML = `
      <div class="article-back-nav">
        <a href="blog.html" class="article-back-btn">
          &larr; Back to All Articles
        </a>
      </div>

      <header class="article-header">
        <div class="article-meta-row">
          <span class="article-category-badge">${category}</span>
          <span>•</span>
          <span>${formattedDate}</span>
          <span>•</span>
          <span>${readingMinutes} min read</span>
        </div>

        <h1 class="article-main-title">${cleanTitle}</h1>

        <div class="article-author-card">
          <img src="assets/images/profile/manjeet_profile.png" alt="Manjeet Singh Katare" class="article-author-avatar" onerror="this.src='assets/images/branding/m_logo.png'">
          <div>
            <div class="article-author-name">Manjeet Singh Katare</div>
            <div class="article-author-role">Digital Marketing & Creative Strategy Specialist</div>
          </div>
        </div>
      </header>

      ${featuredImageUrl ? `
        <div class="article-featured-media">
          <img src="${featuredImageUrl}" alt="${cleanTitle.replace(/"/g, '&quot;')}">
        </div>
      ` : ''}

      <div class="article-content">
        ${contentHtml}
      </div>

      <div class="article-bottom-actions">
        <a href="blog.html" class="btn btn-secondary">
          &larr; Back to All Articles
        </a>
        <a href="index.html#contact" class="btn btn-primary">
          Discuss This Strategy &rarr;
        </a>
      </div>
    `;

    window.scrollTo({ top: 0, behavior: 'smooth' });

  } catch (error) {
    console.error('Error loading article:', error);
    container.innerHTML = `
      <div class="article-state-box">
        <h2 style="font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 0.75rem; color: var(--text-primary);">Unable to Load Article</h2>
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">We could not fetch this publication. It might have been moved or the URL is invalid.</p>
        <a href="blog.html" class="btn btn-primary">
          &larr; Back to Articles
        </a>
      </div>
    `;
  }
}