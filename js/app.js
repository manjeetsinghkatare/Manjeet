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
  'complete-digital-marketing-guide': {
    title: "The Complete Digital Marketing Guide (2026): 8 Core Disciplines from Brand-Building to Performance Ads",
    category: "Growth & Strategy",
    date: "November 2026",
    readingMinutes: 14,
    image: "assets/images/blog/complete_digital_marketing_guide.svg",
    excerpt: "A comprehensive beginner-to-advanced roadmap deconstructing Content Marketing, SEO & GEO, Social Media, Email, WhatsApp Conversational Channels, Landing Pages, Paid Ads, and Affiliate loops.",
    contentHtml: `
      <!-- Executive Summary / The Short Answer Box -->
      <div class="article-takeaways-box" id="summary">
        <div class="takeaways-header">
          <div class="takeaways-icon-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <h3 class="takeaways-title">Executive Summary: The 2026 Digital Marketing Blueprint</h3>
        </div>
        <ul class="takeaways-list">
          <li><strong>The Two Halves of Marketing:</strong> Every modern marketing discipline divides into either <em>Brand-Building</em> (slow, compounding, owned audience equity) or <em>Performance Marketing</em> (fast, measurable, rented attention). Sustainable brands use paid performance for rapid cash flow while building organic brand equity to lower customer acquisition costs over time.</li>
          <li><strong>The 8 Core Disciplines:</strong> True growth does not come from isolated tactics. It connects Content Marketing, SEO &amp; GEO, Social Media, Email Marketing, WhatsApp Conversational Channels, Websites/Landers, Performance Ads, and Affiliate Engines into a single compounding chain.</li>
          <li><strong>The 2026 Generative Engine Shift (GEO):</strong> Search marketing is no longer just ranking for 10 blue links in Google Search Console. It requires Generative Engine Optimization (GEO) to ensure your brand is directly cited by AI answer engines like ChatGPT, Perplexity, Claude, and Google AI Overviews.</li>
          <li><strong>Rent vs. Own:</strong> Algorithms on Instagram, LinkedIn, and TikTok are rented property. Your email newsletter and WhatsApp direct channels are the only digital distribution assets your business genuinely owns and controls.</li>
          <li><strong>The Beginner Roadmap:</strong> Start with content and social media to master audience empathy and hook writing. Build an owned email list immediately. Convert traffic on a high-speed landing page, and only deploy paid Meta Ads or Google Ads once your unit economics and conversion paths are mathematically verified.</li>
        </ul>
      </div>

      <p class="article-lead">
        Digital marketing in 2026 is no longer about isolated tricks, chasing random viral hacks, or blasting generic promotional posts across social media. Today, growth is engineered as an interconnected ecosystem. When customer discovery, search visibility, owned relationship channels, and paid conversion engines work together, your marketing compounds exponentially. Below is the definitive, beginner-to-advanced roadmap deconstructing all 8 core disciplines of modern digital marketing.
      </p>

      <!-- Embedded 12-Hour Masterclass Video -->
      <!-- SECTION 1: THE WHOLE FIELD ON ONE MAP -->
      <h2 id="big-picture">1. The Whole Field on One Map: The 8 Core Disciplines</h2>
      <p>
        Before diving into technical tactics, examine the entire landscape at once. Every discipline below represents an independent field that professionals build entire careers around. Do not attempt to master all eight simultaneously. Instead, understand who each channel reaches, how customers flow through them, and how AI is transforming each one.
      </p>

      <!-- Interactive Tabbed Switcher for the 8 Disciplines -->
      
    <div class="tree-architecture-wrapper" data-diagram-id="disciplines">
      <div class="tree-diagram-container">
        <div>
          <div class="tree-node-card tree-parent-node">
            <div class="tree-node-logo-glow">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=hubspot.com" alt="Digital Marketing" class="tree-logo-img" width="32" height="32" loading="lazy" />
            </div>
            <div class="tree-node-text">
              <h4>Digital Marketing</h4>
              <span>LONG-TERM BRAND & TRUST BUILDING</span>
            </div>
          </div>
        </div>
        <div class="tree-vertical-trunk"></div>
        <div class="tree-children-grid cols-4">
          
      <button type="button" class="tree-node-card tree-child-node is-active" style="--brand-color: #FF4B12;" data-child-id="content" data-brand-color="#FF4B12">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=wordpress.org" alt="Content Marketing Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
          </div>
          <span class="tree-child-name">Content Marketing</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #4285F4;" data-child-id="seo" data-brand-color="#4285F4">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=google.com" alt="SEO/GEO Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
          </div>
          <span class="tree-child-name">SEO/GEO</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #E1306C;" data-child-id="social" data-brand-color="#E1306C">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=instagram.com" alt="Social Media Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
          </div>
          <span class="tree-child-name">Social Media</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #FFE01B;" data-child-id="email" data-brand-color="#FFE01B">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=mailchimp.com" alt="Email Marketing Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
          </div>
          <span class="tree-child-name">Email Marketing</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #25D366;" data-child-id="chat" data-brand-color="#25D366">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=whatsapp.com" alt="WhatsApp & Chat Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
          </div>
          <span class="tree-child-name">WhatsApp & Chat</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #1700FF;" data-child-id="website" data-brand-color="#1700FF">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=webflow.com" alt="Websites & Landers Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
          </div>
          <span class="tree-child-name">Websites & Landers</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #10b981;" data-child-id="performance-marketing" data-brand-color="#10b981">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=facebook.com" alt="Performance Ads Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
          </div>
          <span class="tree-child-name">Performance Ads</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #8b5cf6;" data-child-id="affiliate" data-brand-color="#8b5cf6">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=amazon.com" alt="Affiliate Marketing Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
          </div>
          <span class="tree-child-name">Affiliate Marketing</span>
        </div>
      </button>
        </div>
      </div>
      <div class="tree-details-console" style="--brand-color: #FF4B12; --brand-color-opacity: #FF4B1225;">
        
      <div class="tree-console-panel is-active" data-panel-id="content">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=wordpress.org" alt="Content Marketing Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
            </div>
            <h4 class="tree-console-name">Content Marketing</h4>
          </div>
          <span class="tree-console-role" style="color: #FF4B12;">The Storyteller</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>VISITOR MINDSET STATE</h5>
            <p>Looking for guides, educational articles, or entertainment.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>CORE CHANNELS & FORMATS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Blog posts</span>
<span class="tree-placement-tag">podcast channels</span>
<span class="tree-placement-tag">video tutorials</span>
<span class="tree-placement-tag">eBooks</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>PRIMARY BRAND PURPOSE</h5>
            <p class="tree-use-case-text">Share helpful stories and guides to teach people about your niche and earn their trust.</p>
          </div>
          
        <div class="tree-ai-section">
          <h5>AI IMPACT</h5>
          <p class="tree-ai-text">AI writes content outlines, drafts copies, and formats articles in seconds, shifting the marketer's role from bulk copywriting to editing, positioning, and content direction.</p>
        </div>
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="seo">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=google.com" alt="SEO/GEO Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
            </div>
            <h4 class="tree-console-name">SEO/GEO</h4>
          </div>
          <span class="tree-console-role" style="color: #4285F4;">The Visibility Booster</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>VISITOR MINDSET STATE</h5>
            <p>Searching Google for quick answers or solutions.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>CORE CHANNELS & FORMATS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Google Search</span>
<span class="tree-placement-tag">Google Maps (GMB)</span>
<span class="tree-placement-tag">Bing</span>
<span class="tree-placement-tag">AI search tools</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>PRIMARY BRAND PURPOSE</h5>
            <p class="tree-use-case-text">Help your website show up for free when people search for topics related to your product.</p>
          </div>
          
        <div class="tree-ai-section">
          <h5>AI IMPACT</h5>
          <p class="tree-ai-text">With Search Generative Experience (SGE) and LLM search engines answering queries directly, marketing has shifted from keyword-stuffing to semantic SEO and Generative Engine Optimization (GEO).</p>
        </div>
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="social">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=instagram.com" alt="Social Media Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
            </div>
            <h4 class="tree-console-name">Social Media</h4>
          </div>
          <span class="tree-console-role" style="color: #E1306C;">The Community Builder</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>VISITOR MINDSET STATE</h5>
            <p>Scrolling feeds for updates, trending videos, and chats.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>CORE CHANNELS & FORMATS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Instagram Feed/Reels</span>
<span class="tree-placement-tag">LinkedIn</span>
<span class="tree-placement-tag">YouTube</span>
<span class="tree-placement-tag">TikTok</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>PRIMARY BRAND PURPOSE</h5>
            <p class="tree-use-case-text">Post behind-the-scenes content, share updates, and talk directly to your community.</p>
          </div>
          
        <div class="tree-ai-section">
          <h5>AI IMPACT</h5>
          <p class="tree-ai-text">AI tools generate visual concepts, write scripts, and brainstorm hooks at scale. The marketer's core focus has shifted to raw, authentic human storytelling and personal branding.</p>
        </div>
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="email">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=mailchimp.com" alt="Email Marketing Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
            </div>
            <h4 class="tree-console-name">Email Marketing</h4>
          </div>
          <span class="tree-console-role" style="color: #FFE01B;">The Relationship Nurturer</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>VISITOR MINDSET STATE</h5>
            <p>Checking the personal inbox for updates and newsletters.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>CORE CHANNELS & FORMATS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Subscriber Inbox (welcome newsletters</span>
<span class="tree-placement-tag">weekly guides)</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>PRIMARY BRAND PURPOSE</h5>
            <p class="tree-use-case-text">Send helpful guides and direct discounts directly to people who subscribed to your list.</p>
          </div>
          
        <div class="tree-ai-section">
          <h5>AI IMPACT</h5>
          <p class="tree-ai-text">AI parses subscriber behaviors to dynamically segment lists, craft hyper-personalized subject lines, and schedule emails at optimal individual send-times.</p>
        </div>
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="chat">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=whatsapp.com" alt="WhatsApp & Chat Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
            </div>
            <h4 class="tree-console-name">WhatsApp & Chat</h4>
          </div>
          <span class="tree-console-role" style="color: #25D366;">The Instant Helper</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>VISITOR MINDSET STATE</h5>
            <p>Chatting with friends, looking for instant customer support.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>CORE CHANNELS & FORMATS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">WhatsApp Business chat</span>
<span class="tree-placement-tag">SMS</span>
<span class="tree-placement-tag">website chat widgets</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>PRIMARY BRAND PURPOSE</h5>
            <p class="tree-use-case-text">Answer product queries instantly to help shoppers decide to make a purchase.</p>
          </div>
          
        <div class="tree-ai-section">
          <h5>AI IMPACT</h5>
          <p class="tree-ai-text">Intelligent LLM conversational agents handle support, lead qualification, and customer questions 24/7 with human-like comprehension, replacing simple rule-based templates.</p>
        </div>
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="website">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=webflow.com" alt="Websites & Landers Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
            </div>
            <h4 class="tree-console-name">Websites & Landers</h4>
          </div>
          <span class="tree-console-role" style="color: #1700FF;">The Digital Home</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>VISITOR MINDSET STATE</h5>
            <p>Looking to purchase, evaluating pricing, reading company history.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>CORE CHANNELS & FORMATS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Homepage</span>
<span class="tree-placement-tag">landing pages</span>
<span class="tree-placement-tag">product pages</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>PRIMARY BRAND PURPOSE</h5>
            <p class="tree-use-case-text">The main online space where customers can look at your work, view prices, and make orders.</p>
          </div>
          
        <div class="tree-ai-section">
          <h5>AI IMPACT</h5>
          <p class="tree-ai-text">AI-first design lets you generate custom layout code and styling from natural language prompts, allowing marketers to launch, test, and iterate landing pages in minutes.</p>
        </div>
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="performance-marketing">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=facebook.com" alt="Performance Ads Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
            </div>
            <h4 class="tree-console-name">Performance Ads</h4>
          </div>
          <span class="tree-console-role" style="color: #10b981;">The Speed Scaler</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>VISITOR MINDSET STATE</h5>
            <p>Highly targeted audiences ready to buy, discover, or take specific actions.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>CORE CHANNELS & FORMATS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Meta Ads</span>
<span class="tree-placement-tag">Google Search Ads</span>
<span class="tree-placement-tag">YouTube Ads</span>
<span class="tree-placement-tag">LinkedIn campaigns</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>PRIMARY BRAND PURPOSE</h5>
            <p class="tree-use-case-text">Run paid ad campaigns to systematically scale your traffic, acquire leads, and generate direct revenue.</p>
          </div>
          
        <div class="tree-ai-section">
          <h5>AI IMPACT</h5>
          <p class="tree-ai-text">Smart optimization algorithms like Meta Advantage+ and Google PMax handle targeting and budget allocation. The human moat is now creatives, angles, and speed.</p>
        </div>
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="affiliate">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=amazon.com" alt="Affiliate Marketing Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
            </div>
            <h4 class="tree-console-name">Affiliate Marketing</h4>
          </div>
          <span class="tree-console-role" style="color: #8b5cf6;">The Commission Engine</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>VISITOR MINDSET STATE</h5>
            <p>Trusting a recommendation from a creator, blogger, or comparison site they already follow.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>CORE CHANNELS & FORMATS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Review blogs</span>
<span class="tree-placement-tag">YouTube "best of" videos</span>
<span class="tree-placement-tag">coupon sites</span>
<span class="tree-placement-tag">creator link-in-bio</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>PRIMARY BRAND PURPOSE</h5>
            <p class="tree-use-case-text">Pay partners a commission only when their referral leads to a sale, so you scale reach without paying upfront.</p>
          </div>
          
        <div class="tree-ai-section">
          <h5>AI IMPACT</h5>
          <p class="tree-ai-text">AI now drafts entire comparison articles and review scripts and tracks partner performance at scale, so the marketer's edge shifts to picking trustworthy partners and structuring fair commission deals.</p>
        </div>
        </div>
      </div>
      </div>
    </div>

      <!-- SECTION 2: BRAND-BUILDING VS PERFORMANCE -->
      <h2 id="brand-vs-performance">2. The Two Halves: Brand-Building vs. Performance Marketing</h2>
      <p>
        Every single digital marketing channel leans into one of two fundamental operating models: <strong>Brand-Building</strong> (slow, compounding, equity-driven) or <strong>Performance Marketing</strong> (fast, measurable, attribution-driven). Understanding which half you are executing determines what success looks like and prevents premature panic.
      </p>

      <!-- Comparative Data Table -->
      <div class="table-scroll-container">
        <table class="data-table" style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
          <thead>
            <tr style="background: var(--bg-surface-elevated, rgba(255,255,255,0.05)); border-bottom: 2px solid var(--border-subtle);">
              <th style="padding: 0.85rem 1rem; text-align: left; font-weight: 700; color: var(--text-primary);">Dimension</th>
              <th style="padding: 0.85rem 1rem; text-align: left; font-weight: 700; color: #818cf8;">Brand-Building (Organic)</th>
              <th style="padding: 0.85rem 1rem; text-align: left; font-weight: 700; color: #34d399;">Performance Marketing (Paid)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 0.85rem 1rem; font-weight: 600; color: var(--text-primary);">Core Objective</td>
              <td style="padding: 0.85rem 1rem; color: var(--text-secondary);">Earn long-term trust, authority, and organic brand recall.</td>
              <td style="padding: 0.85rem 1rem; color: var(--text-secondary);">Buy targeted attention and immediate measurable conversions today.</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 0.85rem 1rem; font-weight: 600; color: var(--text-primary);">Primary Channels</td>
              <td style="padding: 0.85rem 1rem; color: var(--text-secondary);">Content marketing, Organic SEO, GEO, organic social, email newsletters.</td>
              <td style="padding: 0.85rem 1rem; color: var(--text-secondary);">Google Search Ads, Meta Ads Manager, shopping ads, retargeting landers.</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 0.85rem 1rem; font-weight: 600; color: var(--text-primary);">Speed to Impact</td>
              <td style="padding: 0.85rem 1rem; color: var(--text-secondary);">Slow (3 to 12 months to compound significantly).</td>
              <td style="padding: 0.85rem 1rem; color: var(--text-secondary);">Immediate (Traffic starts within 15 minutes of campaign launch).</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 0.85rem 1rem; font-weight: 600; color: var(--text-primary);">Measurement Rigor</td>
              <td style="padding: 0.85rem 1rem; color: var(--text-secondary);">Challenging day-to-day attribution; pays off through compounded authority.</td>
              <td style="padding: 0.85rem 1rem; color: var(--text-secondary);">Mathematical attribution: every rupee is tied to CPA, CPL, and ROAS.</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 0.85rem 1rem; font-weight: 600; color: var(--text-primary);">Audience Ownership</td>
              <td style="padding: 0.85rem 1rem; color: var(--text-secondary);">High ownership (You own your email subscribers and brand reputation).</td>
              <td style="padding: 0.85rem 1rem; color: var(--text-secondary);">Rented attention (Traffic stops the moment ad spend is paused).</td>
            </tr>
            <tr>
              <td style="padding: 0.85rem 1rem; font-weight: 600; color: var(--text-primary);">Strategic Synergy</td>
              <td style="padding: 0.85rem 1rem; color: var(--text-secondary);">Lowers paid acquisition costs by boosting click-through rates and brand trust.</td>
              <td style="padding: 0.85rem 1rem; color: var(--text-secondary);">Provides immediate cash flow and rapid creative data to inform organic content.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        The most successful companies do not debate which side is better. They use performance marketing to validate offers and generate immediate cash flow, and they reinvest a portion of that revenue into brand-building and SEO to permanently lower their blended Customer Acquisition Cost (CAC) over time.
      </p>

      <!-- SECTION 3: CONTENT MARKETING -->
      <h2 id="content-marketing">3. Content Marketing: Earning Attention by Being Useful</h2>
      <p>
        Content marketing is the craft of earning customer attention by being genuinely helpful instead of paying to interrupt people. A technical blog post answering a complex problem, an unedited video tutorial walking through a campaign setup, or a downloadable checklist: that is content marketing. It is the slowest channel to produce results, but it compounds harder than any other asset.
      </p>
      <p>
        <strong>The Fundamental Trap:</strong> Beginners invariably make content about themselves, their accolades, and their products. Exceptional content is focused exclusively on the prospect's pain point. Only after you have delivered undeniable value do you present your product as the natural implementation step.
      </p>

      <!-- Interactive Tabbed Switcher for Content Formats -->
      
    <div class="tree-architecture-wrapper" data-diagram-id="content">
      <div class="tree-diagram-container">
        <div>
          <div class="tree-node-card tree-parent-node">
            <div class="tree-node-logo-glow">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=hubspot.com" alt="Content Marketing" class="tree-logo-img" width="32" height="32" loading="lazy" />
            </div>
            <div class="tree-node-text">
              <h4>Content Marketing</h4>
              <span>SHARING VALUE TO BUILD TRUST</span>
            </div>
          </div>
        </div>
        <div class="tree-vertical-trunk"></div>
        <div class="tree-children-grid cols-5">
          
      <button type="button" class="tree-node-card tree-child-node is-active" style="--brand-color: #ef4444;" data-child-id="video" data-brand-color="#ef4444">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=youtube.com" alt="Video Content Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
          </div>
          <span class="tree-child-name">Video Content</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #3b82f6;" data-child-id="written" data-brand-color="#3b82f6">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=wordpress.org" alt="Written Content Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
          </div>
          <span class="tree-child-name">Written Content</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #10b981;" data-child-id="social" data-brand-color="#10b981">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=instagram.com" alt="Social Media Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
          </div>
          <span class="tree-child-name">Social Media</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #f59e0b;" data-child-id="email" data-brand-color="#f59e0b">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=substack.com" alt="Email Newsletters Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
          </div>
          <span class="tree-child-name">Email Newsletters</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #1db954;" data-child-id="audio" data-brand-color="#1db954">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=spotify.com" alt="Audio & Podcasts Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
          </div>
          <span class="tree-child-name">Audio & Podcasts</span>
        </div>
      </button>
        </div>
      </div>
      <div class="tree-details-console" style="--brand-color: #ef4444; --brand-color-opacity: #ef444425;">
        
      <div class="tree-console-panel is-active" data-panel-id="video">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=youtube.com" alt="Video Content Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
            </div>
            <h4 class="tree-console-name">Video Content</h4>
          </div>
          <span class="tree-console-role" style="color: #ef4444;">The most important format today</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>CORE OBJECTIVE</h5>
            <p>People watch videos daily to learn and make choices. Making short and long videos builds deep trust faster than anything else.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>KEY ACTION ITEMS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">YouTube (Long videos)</span>
<span class="tree-placement-tag">Instagram Reels (Short)</span>
<span class="tree-placement-tag">YouTube Shorts</span>
<span class="tree-placement-tag">Product demonstrations</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>SIMPLE EXAMPLE</h5>
            <p class="tree-use-case-text">Film a short 2-minute video showing your product in action or explaining a quick lesson. People see your face, hear your voice, and trust your business immediately.</p>
          </div>
          
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="written">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=wordpress.org" alt="Written Content Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
            </div>
            <h4 class="tree-console-name">Written Content</h4>
          </div>
          <span class="tree-console-role" style="color: #3b82f6;">Answering questions in detail</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>CORE OBJECTIVE</h5>
            <p>Write simple, helpful guides and articles on your website so people can find you when they search online.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>KEY ACTION ITEMS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Helpful blog articles</span>
<span class="tree-placement-tag">Step-by-step guides</span>
<span class="tree-placement-tag">Question and answer lists</span>
<span class="tree-placement-tag">Client stories</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>SIMPLE EXAMPLE</h5>
            <p class="tree-use-case-text">Write a step-by-step guide explaining a common question your customers have. When someone searches Google for that question, your article shows up with the answer.</p>
          </div>
          
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="social">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=instagram.com" alt="Social Media Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
            </div>
            <h4 class="tree-console-name">Social Media</h4>
          </div>
          <span class="tree-console-role" style="color: #10b981;">Sharing quick tips where people scroll</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>CORE OBJECTIVE</h5>
            <p>Publish short, interesting tips and visual posts on social platforms where your target audience scrolls daily.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>KEY ACTION ITEMS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">LinkedIn text posts</span>
<span class="tree-placement-tag">Instagram slide images</span>
<span class="tree-placement-tag">Quick industry updates</span>
<span class="tree-placement-tag">Replying to comments</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>SIMPLE EXAMPLE</h5>
            <p class="tree-use-case-text">Take one helpful sentence or graphic from your video or article and share it on LinkedIn or Instagram. This helps you reach people who only have a minute to scroll.</p>
          </div>
          
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="email">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=substack.com" alt="Email Newsletters Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
            </div>
            <h4 class="tree-console-name">Email Newsletters</h4>
          </div>
          <span class="tree-console-role" style="color: #f59e0b;">Building a direct and friendly relationship</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>CORE OBJECTIVE</h5>
            <p>Send helpful tips, updates, and stories directly to the inbox of people who voluntarily signed up to hear from you.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>KEY ACTION ITEMS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Weekly tips emails</span>
<span class="tree-placement-tag">Behind-the-scenes stories</span>
<span class="tree-placement-tag">Special product offers</span>
<span class="tree-placement-tag">Personal notes</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>SIMPLE EXAMPLE</h5>
            <p class="tree-use-case-text">Send a simple weekly email to your subscribers with three useful tips. Since you own your email list, you do not have to worry about social media algorithms changing.</p>
          </div>
          
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="audio">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=spotify.com" alt="Audio & Podcasts Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
            </div>
            <h4 class="tree-console-name">Audio & Podcasts</h4>
          </div>
          <span class="tree-console-role" style="color: #1db954;">Building connection during daily routines</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>CORE OBJECTIVE</h5>
            <p>Create audio episodes to share deeper conversations, interviews, and stories that people can listen to while commuting or working.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>KEY ACTION ITEMS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Spotify Podcast</span>
<span class="tree-placement-tag">Apple Podcasts</span>
<span class="tree-placement-tag">Audio lessons</span>
<span class="tree-placement-tag">Guest interviews</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>SIMPLE EXAMPLE</h5>
            <p class="tree-use-case-text">Record a weekly 15-minute conversation discussing a topic in your industry. Listeners hear your insights and build a strong familiarity with your brand over time.</p>
          </div>
          
        </div>
      </div>
      </div>
    </div>

      <!-- Distinction Box -->
      <div style="background: rgba(79, 70, 229, 0.08); border-left: 4px solid #6366f1; padding: 1.25rem 1.5rem; border-radius: 0 var(--radius-md) var(--radius-md) 0; margin: 1.75rem 0;">
        <h4 style="margin: 0 0 0.5rem; color: #a5b4fc; font-family: var(--font-display); font-size: 1rem;">Digital Marketer vs. Performance Marketer in Content</h4>
        <p style="margin-bottom: 0.5rem; font-size: 0.925rem; color: var(--text-secondary);">
          <strong>The Generalist Marketer:</strong> Publishes a blog post whenever inspiration strikes, measures success by vague social likes, and forgets about the piece a week later.
        </p>
        <p style="margin: 0; font-size: 0.925rem; color: var(--text-secondary);">
          <strong>The Performance Marketer:</strong> Selects a proven format, publishes on a disciplined schedule, tracks search rankings in Google Search Console, measures organic assisted conversions in Google Analytics, and repurposes winning topics into high-ROAS paid ads.
        </p>
      </div>

      <!-- SECTION 4: SEO & GEO -->
      <h2 id="seo-geo">4. SEO &amp; GEO: Organic Search Visibility in the AI Era</h2>
      <p>
        <strong>Search Engine Optimization (SEO)</strong> is the discipline of earning top organic rankings when potential customers search for solutions. <strong>Generative Engine Optimization (GEO)</strong> is the 2026 evolution: ensuring your content, statistics, and brand entities are directly ingested and cited by AI response engines like ChatGPT, Google AI Overviews, Perplexity, and Claude.
      </p>
      <p>
        While discovery interfaces have evolved from 10 blue links to conversational AI summaries, the core requirement remains identical: search engines and large language models reward the <em>clearest, most trustworthy, and most comprehensive answer</em> to a user's question.
      </p>

      <!-- Interactive Tabbed Switcher for SEO Pillars -->
      
    <div class="tree-architecture-wrapper" data-diagram-id="seo">
      <div class="tree-diagram-container">
        <div>
          <div class="tree-node-card tree-parent-node">
            <div class="tree-node-logo-glow">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=google.com" alt="Search Engine Optimization" class="tree-logo-img" width="32" height="32" loading="lazy" />
            </div>
            <div class="tree-node-text">
              <h4>Search Engine Optimization</h4>
              <span>FREE ORGANIC DEMAND CAPTURE</span>
            </div>
          </div>
        </div>
        <div class="tree-vertical-trunk"></div>
        <div class="tree-children-grid cols-3">
          
      <button type="button" class="tree-node-card tree-child-node is-active" style="--brand-color: #10b981;" data-child-id="on-page" data-brand-color="#10b981">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <div style="color: #10b981; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg></div>
          </div>
          <span class="tree-child-name">1. On-Page SEO</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #3b82f6;" data-child-id="off-page" data-brand-color="#3b82f6">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <div style="color: #3b82f6; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></div>
          </div>
          <span class="tree-child-name">2. Off-Page SEO</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #f59e0b;" data-child-id="ai-search" data-brand-color="#f59e0b">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <div style="color: #f59e0b; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"></rect><rect width="6" height="6" x="9" y="9" rx="1"></rect><path d="M15 2v2"></path><path d="M15 20v2"></path><path d="M2 15h2"></path><path d="M2 9h2"></path><path d="M20 15h2"></path><path d="M20 9h2"></path><path d="M9 2v2"></path><path d="M9 20v2"></path></svg></div>
          </div>
          <span class="tree-child-name">3. AI Search (GEO)</span>
        </div>
      </button>
        </div>
      </div>
      <div class="tree-details-console" style="--brand-color: #10b981; --brand-color-opacity: #10b98125;">
        
      <div class="tree-console-panel is-active" data-panel-id="on-page">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <div style="color: #10b981; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg></div>
            </div>
            <h4 class="tree-console-name">1. On-Page SEO</h4>
          </div>
          <span class="tree-console-role" style="color: #10b981;">Make your own website easy to read</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>WHAT IT MEANS</h5>
            <p>Organize the words, pictures, and links on your website so search engines can understand what you sell.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>KEY FOCUS AREAS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Clear page titles</span>
<span class="tree-placement-tag">Helpful headings</span>
<span class="tree-placement-tag">Fast loading photos</span>
<span class="tree-placement-tag">Simple page links</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>SIMPLE EXAMPLE</h5>
            <p class="tree-use-case-text">Write simple headings and descriptive text. For example, if you sell cakes in Delhi, your page title should say "Fresh Chocolate Cakes in Delhi" instead of just "Home". This helps Google show your site to local buyers.</p>
          </div>
          
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="off-page">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <div style="color: #3b82f6; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></div>
            </div>
            <h4 class="tree-console-name">2. Off-Page SEO</h4>
          </div>
          <span class="tree-console-role" style="color: #3b82f6;">Get other trusted sites to recommend you</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>WHAT IT MEANS</h5>
            <p>Get other popular websites and social pages to talk about you and link back to your website.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>KEY FOCUS AREAS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Links from other sites</span>
<span class="tree-placement-tag">Social media shares</span>
<span class="tree-placement-tag">Google My Business (Maps)</span>
<span class="tree-placement-tag">Sharing helpful guides</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>SIMPLE EXAMPLE</h5>
            <p class="tree-use-case-text">When another popular blog links to your website, it acts like a vote of trust. Google sees this vote and ranks your website higher because other trusted people recommend you.</p>
          </div>
          
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="ai-search">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <div style="color: #f59e0b; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"></rect><rect width="6" height="6" x="9" y="9" rx="1"></rect><path d="M15 2v2"></path><path d="M15 20v2"></path><path d="M2 15h2"></path><path d="M2 9h2"></path><path d="M20 15h2"></path><path d="M20 9h2"></path><path d="M9 2v2"></path><path d="M9 20v2"></path></svg></div>
            </div>
            <h4 class="tree-console-name">3. AI Search (GEO)</h4>
          </div>
          <span class="tree-console-role" style="color: #f59e0b;">Help AI tools find and quote your site</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>WHAT IT MEANS</h5>
            <p>Write clear, direct answers to common questions so AI search engines (like ChatGPT or Claude) talk about your brand.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>KEY FOCUS AREAS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Short 1-sentence answers</span>
<span class="tree-placement-tag">Simple FAQ lists</span>
<span class="tree-placement-tag">Expert writer bios</span>
<span class="tree-placement-tag">Original facts & numbers</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>SIMPLE EXAMPLE</h5>
            <p class="tree-use-case-text">Instead of long, confusing paragraphs, write simple answers:<br/>"Sourdough bread needs 350ml of water for every 500g of flour."<br/><br/>AI tools can easily read and quote this direct answer when users ask them questions.</p>
          </div>
          
        </div>
      </div>
      </div>
    </div>

      <!-- SECTION 5: SOCIAL MEDIA MARKETING -->
      <h2 id="social-media">5. Social Media Marketing: Platform Architecture &amp; Attention Capture</h2>
      <p>
        Social media marketing is the discipline of building brand affinity on platforms where prospects already spend their leisure time. Unlike search engines where users actively look to buy, social media users are <em>scrolling for distraction</em>. Your mandate is to earn a stop, then earn a follow, then earn trust, and only much later, invite a sale.
      </p>

      <!-- Interactive Tabbed Switcher for Social Platforms -->
      
    <div class="tree-architecture-wrapper" data-diagram-id="social">
      <div class="tree-diagram-container">
        <div>
          <div class="tree-node-card tree-parent-node">
            <div class="tree-node-logo-glow">
              <div style="color: var(--text-primary); width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg></div>
            </div>
            <div class="tree-node-text">
              <h4>Social Media Channels</h4>
              <span>COMMUNITY & VIRAL REACH</span>
            </div>
          </div>
        </div>
        <div class="tree-vertical-trunk"></div>
        <div class="tree-children-grid cols-5">
          
      <button type="button" class="tree-node-card tree-child-node is-active" style="--brand-color: #1877f2;" data-child-id="facebook" data-brand-color="#1877f2">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=facebook.com" alt="Facebook Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
          </div>
          <span class="tree-child-name">Facebook</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #e1306c;" data-child-id="instagram" data-brand-color="#e1306c">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=instagram.com" alt="Instagram Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
          </div>
          <span class="tree-child-name">Instagram</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #ef4444;" data-child-id="youtube" data-brand-color="#ef4444">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=youtube.com" alt="YouTube Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
          </div>
          <span class="tree-child-name">YouTube</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #0a66c2;" data-child-id="linkedin" data-brand-color="#0a66c2">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=linkedin.com" alt="LinkedIn Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
          </div>
          <span class="tree-child-name">LinkedIn</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #000000;" data-child-id="x" data-brand-color="#000000">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=x.com" alt="X (Twitter) Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
          </div>
          <span class="tree-child-name">X (Twitter)</span>
        </div>
      </button>
        </div>
      </div>
      <div class="tree-details-console" style="--brand-color: #1877f2; --brand-color-opacity: #1877f225;">
        
      <div class="tree-console-panel is-active" data-panel-id="facebook">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=facebook.com" alt="Facebook Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
            </div>
            <h4 class="tree-console-name">Facebook</h4>
          </div>
          <span class="tree-console-role" style="color: #1877f2;">Community groups & local reach</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>PLATFORM STRENGTH</h5>
            <p>Facebook is excellent for building local communities and groups where members can interact with each other around shared interests.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>KEY FORMATS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Facebook Groups</span>
<span class="tree-placement-tag">Interactive community</span>
<span class="tree-placement-tag">Local discussion boards</span>
<span class="tree-placement-tag">Short videos</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>ACTIONABLE PLAYBOOK</h5>
            <p class="tree-use-case-text">Create a private Facebook group for local baking enthusiasts to share tips, recipes, and troubleshoot baking problems together.</p>
          </div>
          
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="instagram">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=instagram.com" alt="Instagram Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
            </div>
            <h4 class="tree-console-name">Instagram</h4>
          </div>
          <span class="tree-console-role" style="color: #e1306c;">Bite-sized visual tips</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>PLATFORM STRENGTH</h5>
            <p>Keep Instagram content highly visual and quick. Share simple, helpful tips in an engaging and entertaining format.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>KEY FORMATS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Short-form Reels</span>
<span class="tree-placement-tag">Visual hooks</span>
<span class="tree-placement-tag">Bite-sized design</span>
<span class="tree-placement-tag">High engagement</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>ACTIONABLE PLAYBOOK</h5>
            <p class="tree-use-case-text">Create a 30-second Reel showing a quick "before and after" of a website layout change, using a clean screen recording.</p>
          </div>
          
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="youtube">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=youtube.com" alt="YouTube Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
            </div>
            <h4 class="tree-console-name">YouTube</h4>
          </div>
          <span class="tree-console-role" style="color: #ef4444;">Deep tutorials & teaching</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>PLATFORM STRENGTH</h5>
            <p>Use YouTube to share detailed, step-by-step guides. If you learn something valuable, explain the complete process in a longer format.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>KEY FORMATS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Long-form video</span>
<span class="tree-placement-tag">Step-by-step tutorials</span>
<span class="tree-placement-tag">Over-the-shoulder guides</span>
<span class="tree-placement-tag">Deep skill sharing</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>ACTIONABLE PLAYBOOK</h5>
            <p class="tree-use-case-text">Record a 10-minute video showing exactly how you set up a Meta Ads campaign from scratch, sharing your screen and explanation.</p>
          </div>
          
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="linkedin">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=linkedin.com" alt="LinkedIn Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
            </div>
            <h4 class="tree-console-name">LinkedIn</h4>
          </div>
          <span class="tree-console-role" style="color: #0a66c2;">Technical & industry insights</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>PLATFORM STRENGTH</h5>
            <p>LinkedIn is the place for professional, data-backed writing. Share case studies, technical breakdowns, and direct-response lessons.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>KEY FORMATS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Technical breakdowns</span>
<span class="tree-placement-tag">Case studies</span>
<span class="tree-placement-tag">Text-first posts</span>
<span class="tree-placement-tag">Professional networking</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>ACTIONABLE PLAYBOOK</h5>
            <p class="tree-use-case-text">Write a post detailing how a specific copy adjustment improved click rates by 15% on a client's ad campaign last week.</p>
          </div>
          
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="x">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=x.com" alt="X (Twitter) Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
            </div>
            <h4 class="tree-console-name">X (Twitter)</h4>
          </div>
          <span class="tree-console-role" style="color: #000000;">Real-time conversation & trends</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>PLATFORM STRENGTH</h5>
            <p>X is designed for short, fast updates and joining real-time conversations or debates in your industry.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>KEY FORMATS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Short text updates</span>
<span class="tree-placement-tag">Topic threads</span>
<span class="tree-placement-tag">Real-time discussions</span>
<span class="tree-placement-tag">Industry news</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>ACTIONABLE PLAYBOOK</h5>
            <p class="tree-use-case-text">Post a short thread of 3 quick tips about your daily learning, tagging other specialists to start a discussion.</p>
          </div>
          
        </div>
      </div>
      </div>
    </div>

      <!-- SECTION 6: EMAIL MARKETING -->
      <h2 id="email-marketing">6. Email Marketing: The One Asset You Truly Own</h2>
      <p>
        Social platforms can adjust their algorithms overnight, instantly slashing your reach. In contrast, <strong>your email subscriber list is an asset you fully own and control</strong>. Experienced marketers treat every organic channel as an acquisition funnel designed to convert casual social followers into verified email subscribers.
      </p>

      <!-- Interactive Tabbed Switcher for Email Systems -->
      
    <div class="tree-architecture-wrapper" data-diagram-id="email">
      <div class="tree-diagram-container">
        <div>
          <div class="tree-node-card tree-parent-node">
            <div class="tree-node-logo-glow">
              <div style="color: var(--text-primary); width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg></div>
            </div>
            <div class="tree-node-text">
              <h4>Email Marketing Machine</h4>
              <span>THE ONE CHANNEL YOU ACTUALLY OWN</span>
            </div>
          </div>
        </div>
        <div class="tree-vertical-trunk"></div>
        <div class="tree-children-grid cols-5">
          
      <button type="button" class="tree-node-card tree-child-node is-active" style="--brand-color: #ef4444;" data-child-id="list-building" data-brand-color="#ef4444">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <div style="color: #ef4444; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div>
          </div>
          <span class="tree-child-name">List Building</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #f97316;" data-child-id="segmentation" data-brand-color="#f97316">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <div style="color: #f97316; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></div>
          </div>
          <span class="tree-child-name">Segmentation</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #eab308;" data-child-id="automation" data-brand-color="#eab308">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <div style="color: #eab308; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="8" x="3" y="3" rx="2"></rect><path d="M7 11v4a2 2 0 0 0 2 2h4"></path><rect width="8" height="8" x="13" y="13" rx="2"></rect></svg></div>
          </div>
          <span class="tree-child-name">Automation / Flows</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #3b82f6;" data-child-id="broadcasts" data-brand-color="#3b82f6">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <div style="color: #3b82f6; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg></div>
          </div>
          <span class="tree-child-name">Broadcasts / Campaigns</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #10b981;" data-child-id="deliverability" data-brand-color="#10b981">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <div style="color: #10b981; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg></div>
          </div>
          <span class="tree-child-name">Deliverability</span>
        </div>
      </button>
        </div>
      </div>
      <div class="tree-details-console" style="--brand-color: #ef4444; --brand-color-opacity: #ef444425;">
        
      <div class="tree-console-panel is-active" data-panel-id="list-building">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <div style="color: #ef4444; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div>
            </div>
            <h4 class="tree-console-name">List Building</h4>
          </div>
          <span class="tree-console-role" style="color: #ef4444;">Where it all starts</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>CORE PRINCIPLE</h5>
            <p>You cannot email people who never gave you permission. List building is offering something valuable enough (a free guide, a discount, a checklist) that people willingly hand over their email. A small, permission-based list beats a huge bought one every single time, because these are people who actually want to hear from you.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>ACTION CHECKLIST</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Offer a lead magnet</span>
<span class="tree-placement-tag">Signup forms on your site</span>
<span class="tree-placement-tag">Permission</span>
<span class="tree-placement-tag">never bought lists</span>
<span class="tree-placement-tag">Quality over raw size</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>REAL-WORLD EXAMPLE</h5>
            <p class="tree-use-case-text">A bakery offers “10 easy weekend recipes” in exchange for an email, and grows a list of exactly the people who love baking.</p>
          </div>
          
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="segmentation">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <div style="color: #f97316; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></div>
            </div>
            <h4 class="tree-console-name">Segmentation</h4>
          </div>
          <span class="tree-console-role" style="color: #f97316;">Send the right message</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>CORE PRINCIPLE</h5>
            <p>Not everyone on your list wants the same thing. Segmentation means grouping people by what they care about or what they have done, so a first-time subscriber and a repeat buyer get different emails. This one habit is what separates spammy blasts from emails people actually open.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>ACTION CHECKLIST</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Group by interest</span>
<span class="tree-placement-tag">Group by behavior</span>
<span class="tree-placement-tag">New vs. returning buyers</span>
<span class="tree-placement-tag">Relevant beats frequent</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>REAL-WORLD EXAMPLE</h5>
            <p class="tree-use-case-text">You send new subscribers a welcome story and past buyers a “you might also like” offer. Same list, two very different messages.</p>
          </div>
          
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="automation">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <div style="color: #eab308; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="8" x="3" y="3" rx="2"></rect><path d="M7 11v4a2 2 0 0 0 2 2h4"></path><rect width="8" height="8" x="13" y="13" rx="2"></rect></svg></div>
            </div>
            <h4 class="tree-console-name">Automation / Flows</h4>
          </div>
          <span class="tree-console-role" style="color: #eab308;">Emails that send themselves</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>CORE PRINCIPLE</h5>
            <p>A flow is a sequence of emails that triggers on its own when someone does something. Sign up and a welcome series starts. Abandon a cart and a reminder goes out. You build it once and it runs forever. This is where email quietly makes money without you touching it.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>ACTION CHECKLIST</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Welcome series</span>
<span class="tree-placement-tag">Abandoned-cart reminders</span>
<span class="tree-placement-tag">Post-purchase follow-ups</span>
<span class="tree-placement-tag">Set up once</span>
<span class="tree-placement-tag">runs forever</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>REAL-WORLD EXAMPLE</h5>
            <p class="tree-use-case-text">Someone adds a product, does not buy, and three hours later gets a gentle “still thinking about it?” email that recovers the sale automatically.</p>
          </div>
          
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="broadcasts">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <div style="color: #3b82f6; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg></div>
            </div>
            <h4 class="tree-console-name">Broadcasts / Campaigns</h4>
          </div>
          <span class="tree-console-role" style="color: #3b82f6;">Your one-to-many sends</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>CORE PRINCIPLE</h5>
            <p>Broadcasts are the emails you send on purpose to a group at a specific time: a newsletter, a product launch, a festival offer. Unlike flows, these are timely and manual. They keep your list warm and remind people you exist.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>ACTION CHECKLIST</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Weekly newsletter</span>
<span class="tree-placement-tag">Launch announcements</span>
<span class="tree-placement-tag">Seasonal offers</span>
<span class="tree-placement-tag">Keeps the list warm</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>REAL-WORLD EXAMPLE</h5>
            <p class="tree-use-case-text">A Diwali sale email sent to your whole list on the same morning, driving a spike of orders in a single day.</p>
          </div>
          
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="deliverability">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <div style="color: #10b981; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg></div>
            </div>
            <h4 class="tree-console-name">Deliverability</h4>
          </div>
          <span class="tree-console-role" style="color: #10b981;">Actually reaching the inbox</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>CORE PRINCIPLE</h5>
            <p>None of the above matters if your emails land in spam. Deliverability is the technical health that keeps you in the primary inbox: proper sender setup, a clean list, and content people actually engage with. Ignore it and even your best email reaches nobody.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>ACTION CHECKLIST</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Verify your sender domain</span>
<span class="tree-placement-tag">Keep the list clean</span>
<span class="tree-placement-tag">Avoid spam-trigger words</span>
<span class="tree-placement-tag">Engagement protects reputation</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>REAL-WORLD EXAMPLE</h5>
            <p class="tree-use-case-text">You remove subscribers who have not opened anything in six months, and your open rate jumps because inbox providers now trust you more.</p>
          </div>
          
        </div>
      </div>
      </div>
    </div>

      <!-- SECTION 7: WHATSAPP MARKETING -->
      <h2 id="whatsapp">7. WhatsApp &amp; Conversational Marketing: Real-Time Conversion Engines</h2>
      <p>
        In mobile-first regions like India, Latin America, and Southeast Asia, conversational messaging on WhatsApp has eclipsed traditional email in both open rates (often exceeding 90%) and response velocity. Modern marketing integrates WhatsApp not as a spam channel, but as a frictionless, high-trust conversion touchpoint.
      </p>

      <!-- 4 Strategic Pillar Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
        <div style="background: var(--bg-surface-elevated, rgba(255,255,255,0.03)); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
          <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(37, 211, 102, 0.15); color: #25d366; display: flex; align-items: center; justify-content: center; margin-bottom: 0.75rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <h4 style="margin: 0 0 0.5rem; color: var(--text-primary); font-family: var(--font-display); font-size: 1.05rem;">Instant Support</h4>
          <p style="margin: 0; font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5;">Answer customer objections and pricing queries the second they arise, before purchase momentum evaporates.</p>
        </div>

        <div style="background: var(--bg-surface-elevated, rgba(255,255,255,0.03)); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
          <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(59, 130, 246, 0.15); color: #3b82f6; display: flex; align-items: center; justify-content: center; margin-bottom: 0.75rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"></path></svg>
          </div>
          <h4 style="margin: 0 0 0.5rem; color: var(--text-primary); font-family: var(--font-display); font-size: 1.05rem;">Opt-in Broadcasts</h4>
          <p style="margin: 0; font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5;">Send order updates, tracking alerts, and urgent promotions to opted-in customers with 90%+ read rates.</p>
        </div>

        <div style="background: var(--bg-surface-elevated, rgba(255,255,255,0.03)); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
          <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(245, 158, 11, 0.15); color: #f59e0b; display: flex; align-items: center; justify-content: center; margin-bottom: 0.75rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          </div>
          <h4 style="margin: 0 0 0.5rem; color: var(--text-primary); font-family: var(--font-display); font-size: 1.05rem;">Catalogs &amp; Checkout</h4>
          <p style="margin: 0; font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5;">Allow shoppers to explore products, review variants, and checkout seamlessly without navigating off WhatsApp.</p>
        </div>

        <div style="background: var(--bg-surface-elevated, rgba(255,255,255,0.03)); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
          <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(168, 85, 247, 0.15); color: #a855f7; display: flex; align-items: center; justify-content: center; margin-bottom: 0.75rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect></svg>
          </div>
          <h4 style="margin: 0 0 0.5rem; color: var(--text-primary); font-family: var(--font-display); font-size: 1.05rem;">AI Chat Agents</h4>
          <p style="margin: 0; font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5;">Deploy intelligent agents to qualify leads 24/7, resolve repetitive queries, and route high-value deals to human reps.</p>
        </div>
      </div>

      <!-- SECTION 8: WEBSITES & LANDING PAGES -->
      <h2 id="websites">8. Websites &amp; Landing Pages: Engineering the Conversion Destination</h2>
      <p>
        Driving thousands of visitors via organic SEO or paid ads is futile if your website fails to convert them. A landing page exists for a singular purpose: <strong>to convert attention into an agreed-upon business action</strong>.
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
        <div style="background: var(--bg-surface-elevated, rgba(255,255,255,0.03)); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
          <h4 style="margin: 0 0 0.5rem; color: #38bdf8; font-family: var(--font-display);">1. One Singular Call-to-Action</h4>
          <p style="margin: 0; font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5;">
            Every landing page must ask the visitor to do exactly one thing. Remove navigation menus, external sidebar links, and competing buttons. Minimize decision fatigue.
          </p>
        </div>

        <div style="background: var(--bg-surface-elevated, rgba(255,255,255,0.03)); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
          <h4 style="margin: 0 0 0.5rem; color: #38bdf8; font-family: var(--font-display);">2. Mobile Performance Under 2s</h4>
          <p style="margin: 0; font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5;">
            Over 75% of commercial traffic originates on mobile devices. If your page takes longer than 2.5 seconds to load, over 40% of potential prospects abandon before seeing your offer.
          </p>
        </div>

        <div style="background: var(--bg-surface-elevated, rgba(255,255,255,0.03)); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
          <h4 style="margin: 0 0 0.5rem; color: #38bdf8; font-family: var(--font-display);">3. Strict Message Match</h4>
          <p style="margin: 0; font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5;">
            The headline of your landing page must explicitly mirror the promise made in the ad copy or search snippet. Cognitive dissonance between ad and page kills conversion instantly.
          </p>
        </div>

        <div style="background: var(--bg-surface-elevated, rgba(255,255,255,0.03)); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
          <h4 style="margin: 0 0 0.5rem; color: #38bdf8; font-family: var(--font-display);">4. Built for Continuous A/B Testing</h4>
          <p style="margin: 0; font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5;">
            A landing page is never finished. Systematically isolate one variable at a time (hero headline, social proof badge, form length, offer guarantee) to compound conversion gains.
          </p>
        </div>
      </div>

      <!-- SECTION 9: PERFORMANCE MARKETING (PAID ADS) -->
      <h2 id="performance-ads">9. Performance Marketing: Direct-Response Paid Acquisition</h2>
      <p>
        Performance marketing is the paid, mathematical half of digital marketing. You invest capital to place targeted messaging in front of high-intent audiences, tracking every rupee directly to Cost Per Acquisition (CPA) and Return on Ad Spend (ROAS). Unlike organic channels that require months to mature, paid ads function like a valve you can activate today and pause tomorrow.
      </p>
      <p>
        <strong>The Modern Skillset:</strong> The ad networks (Google Ads, Meta Ads Manager) now automate bidding, placements, and micro-targeting using internal machine learning. The modern performance marketer's competitive advantage lies in <em>creative strategy, airtight conversion tracking (CAPI), and mathematical offer validation</em>.
      </p>

      <!-- Interactive Tabbed Switcher for Paid Placements -->
      
    <div class="tree-architecture-wrapper" data-diagram-id="performance">
      <div class="tree-diagram-container">
        <div>
          <div class="tree-node-card tree-parent-node">
            <div class="tree-node-logo-glow">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=ads.google.com" alt="Performance Marketing" class="tree-logo-img" width="32" height="32" loading="lazy" />
            </div>
            <div class="tree-node-text">
              <h4>Performance Marketing</h4>
              <span>SCALABLE PAID ACQUISITION</span>
            </div>
          </div>
        </div>
        <div class="tree-vertical-trunk"></div>
        <div class="tree-children-grid cols-3">
          
      <button type="button" class="tree-node-card tree-child-node is-active" style="--brand-color: #4285F4;" data-child-id="search-ads" data-brand-color="#4285F4">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=google.com" alt="Search Ads Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
          </div>
          <span class="tree-child-name">Search Ads</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #1877F2;" data-child-id="social-ads" data-brand-color="#1877F2">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=facebook.com" alt="Social Ads Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
          </div>
          <span class="tree-child-name">Social Ads</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #FF9900;" data-child-id="retail-ads" data-brand-color="#FF9900">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=amazon.com" alt="Retail & Shop Ads Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
          </div>
          <span class="tree-child-name">Retail & Shop Ads</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #0084FF;" data-child-id="native-ads" data-brand-color="#0084FF">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=taboola.com" alt="Native Ads Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
          </div>
          <span class="tree-child-name">Native Ads</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #000000;" data-child-id="creator-ads" data-brand-color="#000000">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=tiktok.com" alt="Creator Partner Ads Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
          </div>
          <span class="tree-child-name">Creator Partner Ads</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #E1306C;" data-child-id="affiliate-ads" data-brand-color="#E1306C">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=impact.com" alt="Affiliate Marketing Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
          </div>
          <span class="tree-child-name">Affiliate Marketing</span>
        </div>
      </button>
        </div>
      </div>
      <div class="tree-details-console" style="--brand-color: #4285F4; --brand-color-opacity: #4285F425;">
        
      <div class="tree-console-panel is-active" data-panel-id="search-ads">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=google.com" alt="Search Ads Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
            </div>
            <h4 class="tree-console-name">Search Ads</h4>
          </div>
          <span class="tree-console-role" style="color: #4285F4;">The High-Intent Interceptor</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>BUYER MINDSET</h5>
            <p>Actively searching for a specific product to buy or service to hire.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>PRIMARY AD PLACEMENTS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Google Search paid positions</span>
<span class="tree-placement-tag">Bing Ads results</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>STRATEGIC ADVANTAGE</h5>
            <p class="tree-use-case-text">Show your link at the top of Google when a customer is ready to buy.</p>
          </div>
          
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="social-ads">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=facebook.com" alt="Social Ads Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
            </div>
            <h4 class="tree-console-name">Social Ads</h4>
          </div>
          <span class="tree-console-role" style="color: #1877F2;">The Visual Attention Grabber</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>BUYER MINDSET</h5>
            <p>Scrolling feeds for entertainment, open to discovering new things.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>PRIMARY AD PLACEMENTS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Instagram Reels ads</span>
<span class="tree-placement-tag">TikTok feed ads</span>
<span class="tree-placement-tag">Facebook sponsored posts</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>STRATEGIC ADVANTAGE</h5>
            <p class="tree-use-case-text">Grab attention with visual videos and images to introduce your product.</p>
          </div>
          
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="retail-ads">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=amazon.com" alt="Retail & Shop Ads Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
            </div>
            <h4 class="tree-console-name">Retail & Shop Ads</h4>
          </div>
          <span class="tree-console-role" style="color: #FF9900;">The Storefront Placer</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>BUYER MINDSET</h5>
            <p>Browsing shopping platforms and actively comparing prices.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>PRIMARY AD PLACEMENTS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Amazon sponsored products</span>
<span class="tree-placement-tag">Google Shopping carousel</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>STRATEGIC ADVANTAGE</h5>
            <p class="tree-use-case-text">Show product pictures and prices right next to competing brands.</p>
          </div>
          
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="native-ads">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=taboola.com" alt="Native Ads Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
            </div>
            <h4 class="tree-console-name">Native Ads</h4>
          </div>
          <span class="tree-console-role" style="color: #0084FF;">The Content Recommender</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>BUYER MINDSET</h5>
            <p>Reading blog articles, news sites, or reviews.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>PRIMARY AD PLACEMENTS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">"Recommended Articles" widgets at the bottom of news sites</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>STRATEGIC ADVANTAGE</h5>
            <p class="tree-use-case-text">Promote an interesting blog post that naturally links to your product.</p>
          </div>
          
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="creator-ads">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=tiktok.com" alt="Creator Partner Ads Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
            </div>
            <h4 class="tree-console-name">Creator Partner Ads</h4>
          </div>
          <span class="tree-console-role" style="color: #000000;">The Trusted Voice</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>BUYER MINDSET</h5>
            <p>Watching trusted creators share recommendations and reviews.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>PRIMARY AD PLACEMENTS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Sponsored TikTok videos</span>
<span class="tree-placement-tag">creator-led Instagram Ads</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>STRATEGIC ADVANTAGE</h5>
            <p class="tree-use-case-text">Run paid promotions using a creator's review of your product.</p>
          </div>
          
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="affiliate-ads">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <img src="https://www.google.com/s2/favicons?sz=64&domain=impact.com" alt="Affiliate Marketing Logo" class="tree-logo-img" width="24" height="24" loading="lazy" />
            </div>
            <h4 class="tree-console-name">Affiliate Marketing</h4>
          </div>
          <span class="tree-console-role" style="color: #E1306C;">The Commission Partner</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>BUYER MINDSET</h5>
            <p>Reading top-10 lists, review sites, or comparison blogs.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>PRIMARY AD PLACEMENTS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Independent blog product reviews</span>
<span class="tree-placement-tag">coupon aggregators</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>STRATEGIC ADVANTAGE</h5>
            <p class="tree-use-case-text">Pay external review websites a percentage commission only when they drive a sale.</p>
          </div>
          
        </div>
      </div>
      </div>
    </div>

      <!-- SECTION 10: AFFILIATE MARKETING -->
      <h2 id="affiliate-marketing">10. Affiliate Marketing: Low-Risk Commission Growth Loops</h2>
      <p>
        Affiliate marketing is paying independent creators, publishers, or comparison sites a percentage commission only when their referral results in a verified transaction. You eliminate upfront advertising risk because <em>you pay strictly for confirmed revenue</em>.
      </p>

      <!-- 5-Step Lifecycle -->
      
    <div class="tree-architecture-wrapper" data-diagram-id="affiliate">
      <div class="tree-diagram-container">
        <div>
          <div class="tree-node-card tree-parent-node">
            <div class="tree-node-logo-glow">
              <div style="color: var(--text-primary); width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg></div>
            </div>
            <div class="tree-node-text">
              <h4>Affiliate Engine</h4>
              <span>GET PAID FOR RESULTS, NOT EFFORT</span>
            </div>
          </div>
        </div>
        <div class="tree-vertical-trunk"></div>
        <div class="tree-children-grid cols-5">
          
      <button type="button" class="tree-node-card tree-child-node is-active" style="--brand-color: #ef4444;" data-child-id="find-programs" data-brand-color="#ef4444">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <div style="color: #ef4444; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>
          </div>
          <span class="tree-child-name">Find Programs</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #f97316;" data-child-id="pick-products" data-brand-color="#f97316">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <div style="color: #f97316; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg></div>
          </div>
          <span class="tree-child-name">Pick the Right Products</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #eab308;" data-child-id="create-content" data-brand-color="#eab308">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <div style="color: #eab308; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div>
          </div>
          <span class="tree-child-name">Create Honest Content</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #3b82f6;" data-child-id="track-disclose" data-brand-color="#3b82f6">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <div style="color: #3b82f6; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg></div>
          </div>
          <span class="tree-child-name">Track & Disclose</span>
        </div>
      </button>

      <button type="button" class="tree-node-card tree-child-node " style="--brand-color: #10b981;" data-child-id="scale" data-brand-color="#10b981">
        <div class="tree-child-header">
          <div class="tree-child-logo">
            <div style="color: #10b981; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg></div>
          </div>
          <span class="tree-child-name">Scale What Works</span>
        </div>
      </button>
        </div>
      </div>
      <div class="tree-details-console" style="--brand-color: #ef4444; --brand-color-opacity: #ef444425;">
        
      <div class="tree-console-panel is-active" data-panel-id="find-programs">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <div style="color: #ef4444; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>
            </div>
            <h4 class="tree-console-name">Find Programs</h4>
          </div>
          <span class="tree-console-role" style="color: #ef4444;">Where to start</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>STEP BLUEPRINT</h5>
            <p>Affiliate programs live in two places: big networks (Amazon Associates and India-specific ones) that list thousands of products, and direct programs run by individual brands you already love. Networks are easiest for beginners; direct programs usually pay more. Pick your niche first, then find the programs that fit it.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>EXECUTION POINTS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Big networks vs. direct brands</span>
<span class="tree-placement-tag">Easiest entry: Amazon Associates</span>
<span class="tree-placement-tag">Direct programs pay more</span>
<span class="tree-placement-tag">Pick your niche first</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>PRACTICAL EXAMPLE</h5>
            <p class="tree-use-case-text">A tech reviewer joins Amazon Associates plus a few direct laptop-brand programs, so every product they mention can earn.</p>
          </div>
          
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="pick-products">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <div style="color: #f97316; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg></div>
            </div>
            <h4 class="tree-console-name">Pick the Right Products</h4>
          </div>
          <span class="tree-console-role" style="color: #f97316;">Relevance beats commission</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>STEP BLUEPRINT</h5>
            <p>The biggest beginner mistake is chasing the highest commission instead of the best fit. Promote only products your audience genuinely needs and you would recommend for free. A 5% commission on something they actually buy beats 40% on something they never will.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>EXECUTION POINTS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Fit over commission size</span>
<span class="tree-placement-tag">Only what you would recommend anyway</span>
<span class="tree-placement-tag">Match your audience's real needs</span>
<span class="tree-placement-tag">Trust is the asset</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>PRACTICAL EXAMPLE</h5>
            <p class="tree-use-case-text">A fitness creator promotes a ₹2,000 supplement their followers already ask about, not a random ₹50,000 course nobody wants.</p>
          </div>
          
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="create-content">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <div style="color: #eab308; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div>
            </div>
            <h4 class="tree-console-name">Create Honest Content</h4>
          </div>
          <span class="tree-console-role" style="color: #eab308;">Trust is the product</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>STEP BLUEPRINT</h5>
            <p>Affiliate income comes from content that helps people decide: honest reviews, real comparisons, and tutorials. The word “honest” is the whole game. Show the downsides too. People can feel a fake recommendation, and one burns your credibility for years.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>EXECUTION POINTS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Reviews and comparisons</span>
<span class="tree-placement-tag">Show the downsides too</span>
<span class="tree-placement-tag">Tutorials that solve a problem</span>
<span class="tree-placement-tag">Never fake enthusiasm</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>PRACTICAL EXAMPLE</h5>
            <p class="tree-use-case-text">A “best budget phones under ₹15,000” video that honestly names each phone's weak points earns more, because viewers trust the picks.</p>
          </div>
          
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="track-disclose">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <div style="color: #3b82f6; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg></div>
            </div>
            <h4 class="tree-console-name">Track & Disclose</h4>
          </div>
          <span class="tree-console-role" style="color: #3b82f6;">Stay legal and measurable</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>STEP BLUEPRINT</h5>
            <p>Two non-negotiables. Track: use your unique affiliate links so every sale is credited to you. Disclose: tell your audience clearly that you earn a commission. Disclosure is legally required in most places and, done openly, actually builds trust rather than hurting it.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>EXECUTION POINTS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Use your unique tracking links</span>
<span class="tree-placement-tag">Clearly disclose the commission</span>
<span class="tree-placement-tag">Disclosure builds trust</span>
<span class="tree-placement-tag">Watch which links convert</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>PRACTICAL EXAMPLE</h5>
            <p class="tree-use-case-text">A blogger adds a one-line “this post contains affiliate links” note and sees no drop in clicks, because readers respect the honesty.</p>
          </div>
          
        </div>
      </div>

      <div class="tree-console-panel " data-panel-id="scale">
        <div class="tree-console-header">
          <div class="tree-console-brand">
            <div class="tree-console-logo">
              <div style="color: #10b981; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg></div>
            </div>
            <h4 class="tree-console-name">Scale What Works</h4>
          </div>
          <span class="tree-console-role" style="color: #10b981;">Double down</span>
        </div>
        <div class="tree-console-content">
          <div class="tree-console-section">
            <h5>STEP BLUEPRINT</h5>
            <p>Once you see which content and which products actually convert, pour your energy there. Update your winning posts, make more of what works, and, once you have proof, negotiate higher commission rates directly with the brands you already sell for.</p>
          </div>
          
        <div class="tree-console-section">
          <h5>EXECUTION POINTS</h5>
          <div class="tree-placements-list">
            <span class="tree-placement-tag">Expand your winning content</span>
<span class="tree-placement-tag">Make more of what converts</span>
<span class="tree-placement-tag">Negotiate better rates</span>
<span class="tree-placement-tag">Refresh old winners</span>
          </div>
        </div>
          <div class="tree-console-section">
            <h5>PRACTICAL EXAMPLE</h5>
            <p class="tree-use-case-text">A comparison post that quietly earns every month gets updated yearly and becomes a compounding income source.</p>
          </div>
          
        </div>
      </div>
      </div>
    </div>

      <!-- SECTION 11: HOW CHANNELS FEED EACH OTHER -->
      <h2 id="how-together">11. How the Channels Feed Each Other: The Synergy Flywheel</h2>
      <p>
        The fatal beginner mistake is operating these eight channels in silos: running Facebook Ads that lead to a generic homepage, or posting SEO articles that fail to capture email subscribers. Modern digital marketing succeeds as an <strong>integrated compounding flywheel</strong>:
      </p>

      <!-- Step Cards for the Flywheel -->
      <div style="display: flex; flex-direction: column; gap: 1rem; margin: 1.5rem 0;">
        <div style="display: flex; gap: 1rem; align-items: flex-start; background: var(--bg-surface-elevated, rgba(255,255,255,0.03)); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
          <div style="flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%; background: #4f46e5; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700;">1</div>
          <div>
            <h4 style="margin: 0 0 0.25rem; color: var(--text-primary); font-family: var(--font-display);">Step 1: Attract Qualified Strangers</h4>
            <p style="margin: 0; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">High-value Content Marketing and Organic SEO rank on Google and get cited by AI answer engines, attracting prospective customers actively searching for solutions.</p>
          </div>
        </div>

        <div style="display: flex; gap: 1rem; align-items: flex-start; background: var(--bg-surface-elevated, rgba(255,255,255,0.03)); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
          <div style="flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%; background: #06b6d4; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700;">2</div>
          <div>
            <h4 style="margin: 0 0 0.25rem; color: var(--text-primary); font-family: var(--font-display);">Step 2: Capture into Owned Channels</h4>
            <p style="margin: 0; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">Helpful lead magnets and floating WhatsApp support capture visitors into your owned Email Marketing list and WhatsApp channels, insulating you from future algorithm changes.</p>
          </div>
        </div>

        <div style="display: flex; gap: 1rem; align-items: flex-start; background: var(--bg-surface-elevated, rgba(255,255,255,0.03)); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
          <div style="flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%; background: #10b981; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700;">3</div>
          <div>
            <h4 style="margin: 0 0 0.25rem; color: var(--text-primary); font-family: var(--font-display);">Step 3: Convert on Focused Landing Pages</h4>
            <p style="margin: 0; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">Automated email flows and retargeting ads direct warm leads to high-speed Landing Pages featuring verified client proof, closing sales at predictable conversion rates.</p>
          </div>
        </div>

        <div style="display: flex; gap: 1rem; align-items: flex-start; background: var(--bg-surface-elevated, rgba(255,255,255,0.03)); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
          <div style="flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%; background: #f59e0b; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700;">4</div>
          <div>
            <h4 style="margin: 0 0 0.25rem; color: var(--text-primary); font-family: var(--font-display);">Step 4: Amplify Scale with Paid Ads &amp; Affiliates</h4>
            <p style="margin: 0; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">Revenue generated from conversions is reinvested into Performance Marketing (Meta Ads &amp; Google Search) and Affiliate Partnerships, pouring fuel onto what is already mathematically working.</p>
          </div>
        </div>
      </div>

      <!-- SECTION 12: FAQS (INTERACTIVE ACCORDIONS) -->
      <h2 id="faq">12. Frequently Asked Questions (FAQ)</h2>
      <p>
        Common strategic questions asked by business owners, career switchers, and marketing practitioners navigating the modern digital landscape:
      </p>

      <div class="accordion-group" style="display: flex; flex-direction: column; gap: 0.75rem; margin: 1.5rem 0 2.5rem;">
        <!-- FAQ 1 -->
        <details class="interactive-accordion-item">
          <summary class="accordion-trigger">
            <span class="accordion-title-wrap">
              <span class="accordion-pill-tag">Channel Selection</span>
              <span style="font-weight: 700; color: var(--text-primary);">Which digital marketing channel should a beginner learn first?</span>
            </span>
          </summary>
          <div class="accordion-body">
            <p style="margin: 0; color: var(--text-secondary); line-height: 1.6;">
              Beginners should start with <strong>content marketing</strong> or <strong>social media</strong> because they require virtually zero capital to practice, and the foundational skills—identifying target audience pain points, crafting compelling hooks, and storytelling—carry directly into every other channel. Integrate an owned email list immediately, because it is the only audience asset you permanently control.
            </p>
          </div>
        </details>

        <!-- FAQ 2 -->
        <details class="interactive-accordion-item">
          <summary class="accordion-trigger">
            <span class="accordion-title-wrap">
              <span class="accordion-pill-tag">Career Strategy</span>
              <span style="font-weight: 700; color: var(--text-primary);">Do I need to master all eight channels to succeed professionally?</span>
            </span>
          </summary>
          <div class="accordion-body">
            <p style="margin: 0; color: var(--text-secondary); line-height: 1.6;">
              <strong>No.</strong> In the job market, specialists who drive measurable outcomes command the highest salaries. Understand the overall map so you can collaborate cross-functionally, then go deep on one revenue-tied specialty (such as Performance Marketing or Technical Organic SEO). Attempting to execute all eight channels simultaneously without a team leads to superficial mediocrity.
            </p>
          </div>
        </details>

        <!-- FAQ 3 -->
        <details class="interactive-accordion-item">
          <summary class="accordion-trigger">
            <span class="accordion-title-wrap">
              <span class="accordion-pill-tag">Search & AI</span>
              <span style="font-weight: 700; color: var(--text-primary);">Is SEO obsolete now that AI assistants answer questions directly?</span>
            </span>
          </summary>
          <div class="accordion-body">
            <p style="margin: 0; color: var(--text-secondary); line-height: 1.6;">
              <strong>SEO is not dead; it has evolved.</strong> Keyword stuffing and thin low-effort articles no longer rank. The skill has transformed into Generative Engine Optimization (GEO): providing verifiable data, authentic case experiences, and direct problem-solving that AI models (ChatGPT, Perplexity, Gemini, Google AI Overviews) quote and cite as authoritative source material.
            </p>
          </div>
        </details>

        <!-- FAQ 4 -->
        <details class="interactive-accordion-item">
          <summary class="accordion-trigger">
            <span class="accordion-title-wrap">
              <span class="accordion-pill-tag">Email Strategy</span>
              <span style="font-weight: 700; color: var(--text-primary);">Is email marketing still effective in 2026?</span>
            </span>
          </summary>
          <div class="accordion-body">
            <p style="margin: 0; color: var(--text-secondary); line-height: 1.6;">
              <strong>More valuable than ever.</strong> Email remains the only primary marketing channel completely unmediated by algorithmic whims. Every sudden drop in social media engagement reminds marketers why having an authenticated, direct line to thousands of verified inboxes is the most resilient asset in commerce.
            </p>
          </div>
        </details>

        <!-- FAQ 5 -->
        <details class="interactive-accordion-item">
          <summary class="accordion-trigger">
            <span class="accordion-title-wrap">
              <span class="accordion-pill-tag">Economics</span>
              <span style="font-weight: 700; color: var(--text-primary);">How does affiliate marketing differ from performance marketing?</span>
            </span>
          </summary>
          <div class="accordion-body">
            <p style="margin: 0; color: var(--text-secondary); line-height: 1.6;">
              In performance marketing, you pay upfront for ad impressions and clicks on platforms like Meta Ads Manager or Google Ads, bearing all financial risk if traffic fails to convert. In affiliate marketing, you pay a commission strictly after a confirmed transaction occurs, transferring initial marketing risk entirely to the publishing partner.
            </p>
          </div>
        </details>

        <!-- FAQ 6 -->
        <details class="interactive-accordion-item">
          <summary class="accordion-trigger">
            <span class="accordion-title-wrap">
              <span class="accordion-pill-tag">Starting Budget</span>
              <span style="font-weight: 700; color: var(--text-primary);">What financial investment is required to start practicing digital marketing?</span>
            </span>
          </summary>
          <div class="accordion-body">
            <p style="margin: 0; color: var(--text-secondary); line-height: 1.6;">
              For the organic brand-building channels (content creation, organic SEO, social media, email newsletters, affiliate reviews), the investment is almost purely time and effort. For paid performance advertising, you can test and validate campaigns with as little as ₹100 to ₹500 per day to understand auction mechanics, conversion tracking, and creative testing.
            </p>
          </div>
        </details>
      </div>

      <!-- Author Attribution & Reference Note -->
      <div style="margin-top: 3rem; padding: 1.75rem; border-radius: var(--radius-lg); background: var(--bg-surface-elevated, rgba(255,255,255,0.03)); border: 1px solid var(--border-subtle); display: flex; gap: 1.25rem; align-items: flex-start; flex-wrap: wrap;">
        <div style="flex-shrink: 0; width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #4f46e5, #06b6d4); display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 1.2rem;">
          M
        </div>
        <div style="flex: 1; min-width: 260px;">
          <h4 style="margin: 0 0 0.35rem; color: var(--text-primary); font-family: var(--font-display); font-size: 1.1rem;">About This Masterclass Roadmap</h4>
          <p style="margin: 0 0 0.75rem; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
            Curated and authored by <strong>Manjeet Singh Katare</strong>, Digital Marketing &amp; Creative Strategy Specialist. This publication synthesizes multi-channel campaign architectures with reference to the 2026 digital marketing masterclass published by Piyush Sachdeva at <a href="https://socialmasla.com/blog/complete-digital-marketing-guide/" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); text-decoration: underline;">Social Masla</a>.
          </p>
          <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">
            Need strategic guidance or performance campaign execution for your brand? <a href="index.html#contact" style="color: inherit; text-decoration: underline;">Connect directly for consulting inquiries</a>.
          </p>
        </div>
      </div>
`
  },
  'digital-marketing-salary-in-india': {
    title: "Digital Marketing Salary in India 2026: By Role, Experience and City",
    category: "Growth Infrastructure & Career Intelligence",
    date: "November 2026",
    readingMinutes: 12,
    image: "assets/images/blog/digital_marketing_salary_in_india.svg",
    excerpt: "Real 2026 salary figures for digital marketing in India: by role, by experience, and by city. Which roles pay the most, what freshers really start at, and the exact moves that raise your pay fastest.",
    contentHtml: `
      <!-- Executive Summary / The Short Answer Box -->
      <div class="article-takeaways-box" id="summary">
        <div class="takeaways-header">
          <div class="takeaways-icon-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <h3 class="takeaways-title">The Short Answer: 2026 Compensation Baseline</h3>
        </div>
        <ul class="takeaways-list">
          <li><strong>Entry-Level Starting Reality:</strong> A typical digital marketing fresher starts at <strong>₹2.0 to ₹3.5 LPA (₹17,000–₹29,000/month)</strong>. With verified portfolio campaign proof and Google Ads skills, you start higher at <strong>₹3.5 to ₹5.0 LPA</strong>.</li>
          <li><strong>Mid-Level Trajectory:</strong> Generalists reach <strong>₹4.0 to ₹7.0 LPA</strong> at 3–5 years, but revenue-tied specialists command <strong>₹10.0 to ₹16.0 LPA</strong>.</li>
          <li><strong>Role Beats Years:</strong> The specific role you choose matters 2x to 3x more than years on a resume. Execution roles (SEO, content, social) plateau low, while revenue roles (Performance Marketing and Growth) pay the highest packages in India.</li>
          <li><strong>Pay Follows Proof:</strong> Certificates do not move salary negotiations. Verifiable campaign data in Google Analytics 4 and Meta Ads Manager does.</li>
        </ul>
      </div>

      <p class="article-lead">
        If you search for digital marketing salaries in India, most salary aggregators show a single flat average that is practically useless. In reality, two marketers with the exact same four years of experience can earn ₹4 LPA and ₹16 LPA respectively. This 4x compensation disparity is not accidental. It is determined by how directly your daily work connects to verifiable company revenue. Below is the full, data-backed 2026 breakdown across roles, experience tiers, city hubs, and the levers that scale your income fastest.
      </p>

      <h2>1. Why There Is No Single Number</h2>
      <p>
        Digital marketing compensation in India varies wildly based on four fundamental drivers:
      </p>
      <ul>
        <li><strong>Your Specific Role:</strong> An SEO executive creating directory links and a Performance Marketer managing ₹10 Lakhs in monthly Meta Ads spend operate on completely different commercial planes.</li>
        <li><strong>Your Proof of Results:</strong> Showing a hiring manager a live dashboard with ₹40 Lakhs in verified ROAS beats having 10 generic course certificates.</li>
        <li><strong>Where You Work:</strong> High-growth D2C brands, venture-funded startups, and global marketing agencies pay significantly higher packages than traditional local SMB agencies.</li>
        <li><strong>Your City:</strong> Tier-1 tech hubs offer higher baseline compensation, though high-skill remote professionals now command Tier-1 packages from anywhere in India.</li>
      </ul>

      <h2>2. Digital Marketing Salary by Role (Execution vs Management vs Revenue)</h2>
      <p>
        Across Indian companies, digital marketing roles divide cleanly into three compensation tiers based on how close the work is to revenue:
      </p>

      <!-- Interactive Clickable Topics (Tabbed Switcher Mode) -->
      <div class="topic-tabs-container" id="by-role">
        <div class="topic-tabs-nav" role="tablist">
          <button type="button" class="topic-tab-btn is-active" role="tab">1. Execution Roles (₹3–5 LPA)</button>
          <button type="button" class="topic-tab-btn" role="tab">2. Management Roles (₹5–8 LPA)</button>
          <button type="button" class="topic-tab-btn" role="tab">3. Revenue Roles (₹12–18 LPA)</button>
        </div>
        <div class="topic-tab-panels">
          <div class="topic-tab-panel is-active" role="tabpanel">
            <h4 style="margin: 0 0 0.5rem; color: var(--text-primary); font-family: var(--font-display);">Tier 1: Execution Roles (₹3.0 – ₹5.0 LPA at 3–6 Years)</h4>
            <p style="margin-bottom: 0.75rem;">
              <strong>Core Idea:</strong> Execution roles produce creative and operational output: social media posts, blog articles, email blasts, and keyword lists. These outputs are measured in vanity metrics (reach, impressions, views) that leadership cannot directly tie to cash flow. Furthermore, routine execution is increasingly automated by AI tools.
            </p>
            <p style="margin-bottom: 0.75rem;">
              <strong>Typical 3–6 Year Compensation Averages:</strong>
            </p>
            <ul style="margin-bottom: 0.75rem;">
              <li>SEO Executive: ₹3.2 – ₹3.5 LPA</li>
              <li>Email Marketing Executive: ₹3.6 – ₹4.0 LPA</li>
              <li>Digital Marketing Executive: ₹3.8 – ₹4.2 LPA</li>
              <li>Social Media Executive: ₹3.9 – ₹4.3 LPA</li>
              <li>Content Writer: ₹4.2 – ₹4.7 LPA</li>
            </ul>
            <p style="margin-bottom: 0; font-size: 0.9em; color: var(--text-muted);">
              <em>Example:</em> A social media executive posting daily for three client brands across Canva and Instagram with 4 years of experience earns ~₹4 LPA because leadership cannot verify how many paying customers those posts generated.
            </p>
          </div>

          <div class="topic-tab-panel" role="tabpanel">
            <h4 style="margin: 0 0 0.5rem; color: var(--text-primary); font-family: var(--font-display);">Tier 2: Management Roles (₹5.0 – ₹8.0 LPA at 3–6 Years)</h4>
            <p style="margin-bottom: 0.75rem;">
              <strong>Core Idea:</strong> Management roles plan, coordinate, and oversee cross-channel campaigns across internal executives and external agencies. Compensation rises because you own the delivery roadmap, channel coordination, and reporting in Looker Studio and WordPress.
            </p>
            <p style="margin-bottom: 0.75rem;">
              <strong>Typical 3–6 Year Compensation Averages:</strong>
            </p>
            <ul style="margin-bottom: 0.75rem;">
              <li>Social Media Manager: ₹5.2 – ₹5.7 LPA</li>
              <li>Digital Marketing Manager: ₹6.8 – ₹7.5 LPA</li>
            </ul>
            <p style="margin-bottom: 0; font-size: 0.9em; color: var(--text-muted);">
              <em>Example:</em> A Digital Marketing Manager orchestrating SEO, email campaigns in Mailchimp, and brand social content with a team of 3 executives commands ~₹7 LPA.
            </p>
          </div>

          <div class="topic-tab-panel" role="tabpanel">
            <h4 style="margin: 0 0 0.5rem; color: var(--text-primary); font-family: var(--font-display);">Tier 3: Revenue Roles (₹12.0 – ₹18.0 LPA at 3–6 Years)</h4>
            <p style="margin-bottom: 0.75rem;">
              <strong>Core Idea:</strong> Revenue roles have an immediate, mathematical connection to sales and pipeline growth. Every single rupee spent on Google Ads, Meta Ads Manager, and LinkedIn Campaign Manager is measured against Cost Per Acquisition (CPA) and Return on Ad Spend (ROAS). High salaries are easy for founders to justify because the return is mathematically positive.
            </p>
            <p style="margin-bottom: 0.75rem;">
              <strong>Typical 3–6 Year Compensation Averages:</strong>
            </p>
            <ul style="margin-bottom: 0.75rem;">
              <li>Performance Marketing Manager: <strong>₹11.6 – ₹12.8 LPA</strong></li>
              <li>Growth Manager: <strong>₹16.2 – ₹18.0 LPA</strong></li>
            </ul>
            <p style="margin-bottom: 0; font-size: 0.9em; color: var(--text-muted);">
              <em>Example:</em> A performance marketer who deploys ₹8 Lakhs per month into paid acquisition and reliably generates ₹32 Lakhs in revenue easily justifies a ₹12–15 LPA package during compensation reviews.
            </p>
          </div>
        </div>
      </div>

      <h2>3. Full Salary Breakdown by Role &amp; Experience (2026 Data Table)</h2>
      <p>
        Below is the comprehensive cross-role compensation table based on industry reporting, placement records, and verified corporate payrolls across India:
      </p>

      <!-- Expandable Interactive Data Table -->
      <div class="table-interactive-wrapper" id="by-role-table">
        <div class="table-header-toolbar">
          <div class="table-title-hint">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18"/></svg>
            <span>Role-Wise Experience Progression (₹ LPA)</span>
          </div>
          <button type="button" class="table-expand-toggle">Toggle Full View</button>
        </div>
        <div class="table-scroll-container">
          <table>
            <thead>
              <tr>
                <th>Digital Marketing Job Role</th>
                <th>0–1 Year (Fresher)</th>
                <th>1–3 Years (Junior)</th>
                <th>3–6 Years (Mid-Senior)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>SEO Executive</strong></td>
                <td>₹2.0 – ₹2.2 LPA</td>
                <td>₹2.4 – ₹2.6 LPA</td>
                <td>₹3.2 – ₹3.5 LPA</td>
              </tr>
              <tr>
                <td><strong>Email Marketing Executive</strong></td>
                <td>₹2.2 – ₹2.5 LPA</td>
                <td>₹2.6 – ₹2.9 LPA</td>
                <td>₹3.6 – ₹4.0 LPA</td>
              </tr>
              <tr>
                <td><strong>Digital Marketing Executive</strong></td>
                <td>₹2.5 – ₹2.8 LPA</td>
                <td>₹2.9 – ₹3.2 LPA</td>
                <td>₹3.8 – ₹4.2 LPA</td>
              </tr>
              <tr>
                <td><strong>Social Media Executive</strong></td>
                <td>₹2.6 – ₹2.9 LPA</td>
                <td>₹3.0 – ₹3.3 LPA</td>
                <td>₹3.9 – ₹4.3 LPA</td>
              </tr>
              <tr>
                <td><strong>Content Writer / Strategist</strong></td>
                <td>₹2.7 – ₹3.0 LPA</td>
                <td>₹3.2 – ₹3.5 LPA</td>
                <td>₹4.2 – ₹4.7 LPA</td>
              </tr>
              <tr>
                <td><strong>Social Media Manager</strong></td>
                <td><em>Not an entry role</em></td>
                <td>₹3.6 – ₹4.0 LPA</td>
                <td>₹5.2 – ₹5.7 LPA</td>
              </tr>
              <tr>
                <td><strong>Digital Marketing Manager</strong></td>
                <td><em>Not an entry role</em></td>
                <td>₹5.7 – ₹6.3 LPA</td>
                <td>₹6.8 – ₹7.5 LPA</td>
              </tr>
              <tr style="background: rgba(79, 70, 229, 0.04);">
                <td><strong style="color: var(--accent-primary);">Performance Marketing Manager</strong></td>
                <td><em>Not an entry role</em></td>
                <td style="font-weight: 700; color: var(--accent-primary);">₹8.5 – ₹10.4 LPA</td>
                <td style="font-weight: 800; color: var(--accent-green);">₹11.6 – ₹12.8 LPA</td>
              </tr>
              <tr style="background: rgba(16, 185, 129, 0.04);">
                <td><strong style="color: var(--accent-green);">Growth Manager / Lead</strong></td>
                <td><em>Not an entry role</em></td>
                <td style="font-weight: 700; color: var(--accent-green);">₹12.4 – ₹13.9 LPA</td>
                <td style="font-weight: 800; color: var(--accent-green);">₹16.2 – ₹18.0 LPA</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p style="font-size: 0.875rem; color: var(--text-muted); margin-top: -1rem; margin-bottom: 2rem;">
        *Note: Reported figures represent median benchmarks. Top 10% specialists with proven multi-channel track records command 30% to 50% above these averages.
      </p>

      <h2>4. General Digital Marketing vs Performance Marketing</h2>
      <p>
        The table below shows how compensation diverges across experience milestones depending on whether you follow a generalist track or a performance marketing track:
      </p>

      <!-- Experience Progression Comparison Table -->
      <div class="table-interactive-wrapper" id="by-experience">
        <div class="table-header-toolbar">
          <div class="table-title-hint">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            <span>Career Stage Compensation Divergence</span>
          </div>
          <button type="button" class="table-expand-toggle">Toggle Full View</button>
        </div>
        <div class="table-scroll-container">
          <table>
            <thead>
              <tr>
                <th>Career Level</th>
                <th>Experience</th>
                <th>General Digital Marketing</th>
                <th>Performance Marketing &amp; Growth</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Fresher (No verified proof)</strong></td>
                <td>0–1 Year</td>
                <td>₹2.0 – ₹3.5 LPA</td>
                <td>₹2.5 – ₹4.0 LPA</td>
              </tr>
              <tr>
                <td><strong>Fresher (AI skills + verified portfolio)</strong></td>
                <td>0–1 Year</td>
                <td>₹3.0 – ₹4.0 LPA</td>
                <td style="font-weight: 700; color: var(--accent-primary);">₹3.5 – ₹5.0 LPA</td>
              </tr>
              <tr>
                <td><strong>Junior Specialist</strong></td>
                <td>1–3 Years</td>
                <td>₹3.0 – ₹5.0 LPA</td>
                <td style="font-weight: 700; color: var(--accent-primary);">₹6.0 – ₹12.0 LPA</td>
              </tr>
              <tr>
                <td><strong>Mid-Level / Manager</strong></td>
                <td>3–5 Years</td>
                <td>₹4.0 – ₹7.0 LPA</td>
                <td style="font-weight: 800; color: var(--accent-green);">₹12.0 – ₹20.0 LPA</td>
              </tr>
              <tr>
                <td><strong>Senior Specialist / Lead</strong></td>
                <td>5–8 Years</td>
                <td>₹6.0 – ₹12.0 LPA</td>
                <td style="font-weight: 800; color: var(--accent-green);">₹20.0 – ₹40.0 LPA</td>
              </tr>
              <tr>
                <td><strong>Head of Marketing / VP Growth</strong></td>
                <td>8+ Years</td>
                <td>₹16.0 – ₹28.0 LPA</td>
                <td style="font-weight: 800; color: var(--accent-green);">₹40.0 – ₹70.0+ LPA</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h2>5. Digital Marketing Salary by City in India</h2>
      <p>
        Where your employer is located impacts the baseline budget for marketing talent:
      </p>

      <div class="table-interactive-wrapper" id="by-city">
        <div class="table-header-toolbar">
          <div class="table-title-hint">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>City Benchmarks (0–5 Years Typical Averages)</span>
          </div>
          <button type="button" class="table-expand-toggle">Toggle Full View</button>
        </div>
        <div class="table-scroll-container">
          <table>
            <thead>
              <tr>
                <th>City / Region</th>
                <th>Typical Range (0–5 Years)</th>
                <th>Key Market Context</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Bengaluru</strong></td>
                <td style="font-weight: 700; color: var(--accent-primary);">₹3.7 – ₹4.1 LPA</td>
                <td>Highest average compensation in India. Dense ecosystem of venture-backed startups, SaaS companies, and D2C brands.</td>
              </tr>
              <tr>
                <td><strong>Mumbai</strong></td>
                <td style="font-weight: 700; color: var(--accent-primary);">₹3.6 – ₹4.0 LPA</td>
                <td>Massive concentration of top creative media agencies, entertainment networks, and corporate FMCG headquarters.</td>
              </tr>
              <tr>
                <td><strong>Delhi-NCR (Gurugram / Noida)</strong></td>
                <td>₹3.3 – ₹3.7 LPA</td>
                <td>Highest overall job volume. Gurugram tech corridors significantly outpace old Delhi packages.</td>
              </tr>
              <tr>
                <td><strong>Hyderabad</strong></td>
                <td>₹3.3 – ₹3.7 LPA</td>
                <td>Rapidly expanding B2B tech services, enterprise IT hubs, and international marketing back-offices.</td>
              </tr>
              <tr>
                <td><strong>Pune</strong></td>
                <td>₹3.2 – ₹3.6 LPA</td>
                <td>Strong automotive, IT product, and digital agency cluster with moderate cost-of-living benefits.</td>
              </tr>
              <tr>
                <td><strong>Tier-2 &amp; Remote Roles</strong></td>
                <td>Varies by employer</td>
                <td>Skilled remote performance marketers living in Tier-2 cities easily secure Tier-1 packages by serving global or metro clients.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h2>6. The 5 Ways to Earn (Same Skill, Different Ceilings)</h2>
      <p>
        Digital marketing skills can be monetized in five distinct career models, each with a different risk profile and income ceiling:
      </p>

      <div class="accordion-group" id="paths">
        <details class="interactive-accordion-item" open>
          <summary class="accordion-trigger">
            <div class="accordion-title-wrap">
              <span class="accordion-pill-tag">In-House Brand</span>
              <span>1. Corporate / In-House Job (₹3L – ₹40L+ LPA)</span>
            </div>
          </summary>
          <div class="accordion-body">
            You work as a salaried marketing employee inside a single company. You receive fixed monthly compensation, health benefits, and learn on the company's advertising capital. The income is stable and predictable, scaling from ₹3 LPA as a fresher to ₹40+ LPA as Head of Growth or Chief Marketing Officer.
          </div>
        </details>

        <details class="interactive-accordion-item">
          <summary class="accordion-trigger">
            <div class="accordion-title-wrap">
              <span class="accordion-pill-tag">Fast Learning</span>
              <span>2. Marketing Agency Job (₹2.5L – ₹18L LPA)</span>
            </div>
          </summary>
          <div class="accordion-body">
            Agencies are the best bootcamps in the industry. You manage 4 to 6 brand accounts across diverse industries simultaneously, accelerating your learning curve by 3x. Base salaries are slightly lower than brand-side roles early on, but top media directors and account heads earn competitive six-figure packages.
          </div>
        </details>

        <details class="interactive-accordion-item">
          <summary class="accordion-trigger">
            <div class="accordion-title-wrap">
              <span class="accordion-pill-tag">Independence</span>
              <span>3. Freelance Retainers (₹1L – ₹3L+ Per Month)</span>
            </div>
          </summary>
          <div class="accordion-body">
            Instead of trading 40 hours a week for one salary, you charge 3 to 4 clients a monthly management retainer (₹35,000 to ₹75,000 per brand). Closing just 3 clients on a ₹50,000 retainer generates ₹1.5 Lakhs per month (₹18 LPA) with zero commute and total geographic freedom.
          </div>
        </details>

        <details class="interactive-accordion-item">
          <summary class="accordion-trigger">
            <div class="accordion-title-wrap">
              <span class="accordion-pill-tag">Scale Model</span>
              <span>4. Building an Agency (₹20L – ₹1Cr+ Annually)</span>
            </div>
          </summary>
          <div class="accordion-body">
            You transition from a solo operator to an owner. You hire junior executives to handle execution while you focus on client acquisition, high-level strategy, and retention. Your income shifts from billing for your time to capturing the profit margin across a client portfolio.
          </div>
        </details>

        <details class="interactive-accordion-item">
          <summary class="accordion-trigger">
            <div class="accordion-title-wrap">
              <span class="accordion-pill-tag">Uncapped</span>
              <span>5. Building Your Own D2C / E-commerce Brand</span>
            </div>
          </summary>
          <div class="accordion-body">
            The ultimate expression of digital marketing leverage. Instead of selling other brands' products for a salary or retainer, you use Google Ads, Meta Ads Manager, and Shopify to sell your own physical or digital products. 100% of the profit margin belongs to you.
          </div>
        </details>
      </div>

      <h2>7. Why Performance Marketing Pays the Most</h2>
      <p>
        The reason Performance Marketing Managers earn 2x to 3x more than social media or content specialists comes down to one word: <strong>Attribution</strong>.
      </p>
      <p>
        When an organic social manager asks for a raise, they point to follower growth or video views. The CEO asks: <em>"How much extra cash did that put in our bank account?"</em> The answer is usually ambiguous.
      </p>
      <p>
        When a performance marketer asks for a raise, the conversation is mathematical: <em>"We invested ₹12 Lakhs in Google Ads and Meta Ads this quarter. The dashboard shows ₹52 Lakhs in verified revenue at a 4.3x ROAS, acquiring 1,400 customers at a CPA of ₹850."</em>
      </p>
      <p>
        When your work is undeniably tied to net revenue, high salaries are viewed as an investment rather than an operational expense.
      </p>

      <h2>8. The 5 Levers That Actually Decide Your Pay</h2>
      <p>
        If you want to move from the lower ₹4 LPA bracket into ₹12–18 LPA, focus on these five core career levers:
      </p>
      <ul>
        <li><strong>1. Proven Results Over Credentials:</strong> A two-page PDF case study detailing how you tested ad hooks, improved CTR from 1.1% to 2.8%, and lowered acquisition cost beats any university certificate.</li>
        <li><strong>2. Technical Measurement Depth:</strong> Understanding tracking infrastructure separates senior marketers from beginners. Setting up server-side Conversions API, Google Tag Manager data layers, and custom GA4 events puts you in the top 10% of candidates.</li>
        <li><strong>3. High-Value Industry Niches:</strong> Marketing for high-ticket industries (Fintech, B2B SaaS, Health &amp; Aesthetics, Real Estate) pays significantly more than low-ticket commodity retail because customer lifetime value (LTV) is massive.</li>
        <li><strong>4. AI &amp; Automation Speed:</strong> Marketers who use AI to generate 20 ad hook variations in 10 minutes and use Zapier to automate CRM lead flows in HubSpot do the work of three people and command corresponding pay premiums.</li>
        <li><strong>5. Commercial Ownership &amp; Trust:</strong> Founders pay top dollar to professionals who communicate proactively, take responsibility for missed targets, and solve problems without requiring micromanagement.</li>
      </ul>

      <h2>9. Fresher Salary: What You Really Start At (and How to Start Higher)</h2>
      <p>
        Most freshers enter the job market with zero proof. They apply with generic resumes and get offered ₹15,000 to ₹22,000 per month (₹2.0 to ₹2.6 LPA) for data entry or basic social scheduling.
      </p>
      <p>
        Here is the exact playbook to bypass the entry-level salary trap and start at <strong>₹3.5 to ₹5.0 LPA</strong>:
      </p>
      <ol>
        <li><strong>Run a Live Micro-Budget Ad Test:</strong> Spend ₹1,500 to ₹3,000 of your own money (or for a local shop) running real campaigns on Meta Ads Manager. Learn what it feels like to set budgets, choose audiences, and track conversions.</li>
        <li><strong>Build a Verified Case Study:</strong> Document your experiment: <em>What was the objective? What creatives were tested in Canva? What was the resulting CTR, CPC, and conversion rate?</em></li>
        <li><strong>Master Google Search Console and GA4:</strong> Demonstrate that you can audit a website, find crawl errors, identify ranking queries, and build custom conversion events.</li>
        <li><strong>Target Modern Brands Over Legacy Agencies:</strong> Apply to venture-funded startups, D2C brands, and specialized performance agencies that value commercial capability over pedigree.</li>
      </ol>

      <h2>10. How to Earn More, Faster (The High-Leverage Framework)</h2>
      <p>
        To accelerate your compensation curve, execute these five strategic moves:
      </p>
      <ul>
        <li><strong>Specialise Before You Generalise:</strong> Do not market yourself as someone who does "SEO, Social Media, Graphic Design, and Ads." Market yourself as a specialist in one high-value domain (e.g., <em>Meta Ads Scaling for D2C Brands</em> or <em>Technical SEO for SaaS</em>).</li>
        <li><strong>Report in Revenue, Not Activities:</strong> Never tell a manager <em>"I published 12 posts this week."</em> Tell them: <em>"Our email sequence in Mailchimp recovered ₹85,000 in abandoned carts at a 18% conversion rate."</em></li>
        <li><strong>Build Public Proof:</strong> Share your insights, campaign breakdowns, and learnings publicly on LinkedIn and YouTube. Inbound job offers always carry higher salary negotiation power than outbound applications.</li>
        <li><strong>Switch Roles Every 2–3 Years Early On:</strong> Internal raises at agencies typically hover between 8% and 15%. Moving to a new company with proven case studies regularly yields 35% to 60% compensation jumps.</li>
      </ul>

      <h2>11. Frequently Asked Questions (Career FAQs)</h2>
      <div class="accordion-group" id="faq">
        <details class="interactive-accordion-item" open>
          <summary class="accordion-trigger">
            <div class="accordion-title-wrap">
              <span class="accordion-pill-tag">Starting Pay</span>
              <span>What is the real starting salary for freshers in India?</span>
            </div>
          </summary>
          <div class="accordion-body">
            Freshers with no proof of work start between ₹2.0 LPA and ₹3.5 LPA (₹17,000 to ₹29,000 per month). However, freshers who build a live portfolio with real campaign data, AI workflow skills, and tracking proficiency start significantly higher at ₹3.5 LPA to ₹5.0 LPA (₹28,000 to ₹40,000 per month).
          </div>
        </details>

        <details class="interactive-accordion-item">
          <summary class="accordion-trigger">
            <div class="accordion-title-wrap">
              <span class="accordion-pill-tag">Highest Paid</span>
              <span>Which digital marketing role pays the highest in India?</span>
            </div>
          </summary>
          <div class="accordion-body">
            Growth Managers (₹16–18 LPA at 3–6 years) and Performance Marketing Managers (₹12–15 LPA at 3–6 years) command the highest packages. At leadership levels (8+ years), Heads of Growth and Chief Marketing Officers at funded startups regularly earn ₹40 to ₹70+ LPA including performance bonuses and equity.
          </div>
        </details>

        <details class="interactive-accordion-item">
          <summary class="accordion-trigger">
            <div class="accordion-title-wrap">
              <span class="accordion-pill-tag">Future Outlook</span>
              <span>Is digital marketing still a lucrative career in 2026?</span>
            </div>
          </summary>
          <div class="accordion-body">
            Yes, but only if you focus on revenue generation, data analysis, and technical tracking. Commodity execution roles (basic social media posting and generic content writing) are experiencing heavy wage stagnation due to AI. Marketers who master revenue strategy and AI leverage earn 30% to 50% more than ever.
          </div>
        </details>

        <details class="interactive-accordion-item">
          <summary class="accordion-trigger">
            <div class="accordion-title-wrap">
              <span class="accordion-pill-tag">AI Impact</span>
              <span>Will AI reduce digital marketing salaries?</span>
            </div>
          </summary>
          <div class="accordion-body">
            AI compresses salaries for low-skill manual execution (writing commodity captions, creating basic graphics). However, AI increases compensation for strategic marketers who use AI tooling to double their output velocity, test 5x more creatives, and orchestrate complex funnels.
          </div>
        </details>

        <details class="interactive-accordion-item">
          <summary class="accordion-trigger">
            <div class="accordion-title-wrap">
              <span class="accordion-pill-tag">Degrees</span>
              <span>Is an MBA or marketing degree required to earn ₹15+ LPA?</span>
            </div>
          </summary>
          <div class="accordion-body">
            No. Digital marketing is strictly meritocratic. Hiring managers and founders care exclusively about whether you can generate leads, scale ad spend profitably, and increase revenue. A verified portfolio of case studies consistently beats academic credentials.
          </div>
        </details>
      </div>

      <div class="article-highlight-box" style="padding: 1.5rem; border-radius: var(--radius-lg); background: var(--bg-surface-elevated); border-left: 4px solid var(--accent-primary); margin: 2.5rem 0;">
        <h4 style="margin: 0 0 0.5rem; color: var(--text-primary); font-family: var(--font-display);">Key Takeaway</h4>
        <p style="margin: 0; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.65;">
          Your digital marketing salary in India is fundamentally a reflection of attribution. When you master high-leverage paid channels, technical tracking, and revenue-focused strategy, your earning potential has no artificial ceiling.
        </p>
      </div>
    `
  },
    'seo-search-intent': {
    title: "Deconstructing Search Intent: How We Ranked 5+ Commercial Websites on Google's First Page",
    category: "Organic SEO & Search Architecture",
    date: "November 2026",
    readingMinutes: 10,
    image: "assets/images/blog/seo_search_intent_featured.jpg",
    excerpt: "An exhaustive technical breakdown of multi-client organic SEO campaigns across clinical healthcare, coworking, and B2B sectors. Covers keyword intent clustering, entity-based content architecture, Core Web Vitals, and authoritative backlink acquisition.",
    contentHtml: `
      <!-- Executive Summary / TL;DR Takeaways Box -->
      <div class="article-takeaways-box">
        <div class="takeaways-header">
          <div class="takeaways-icon-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <h3 class="takeaways-title">Executive Strategic Takeaways</h3>
        </div>
        <ul class="takeaways-list">
          <li><strong>Intent Over Volume:</strong> Transactional queries convert at 12.8% to 19.4%, compared to less than 0.35% for vanity keywords.</li>
          <li><strong>Semantic Siloing:</strong> Clustered 1,200+ search terms into a hierarchical Hub-and-Spoke graph using Semrush and Google Search Console.</li>
          <li><strong>Technical Core Web Vitals:</strong> Largest Contentful Paint (LCP) lowered under 1.2s with next-gen image compression and edge caching.</li>
          <li><strong>Commercial Growth:</strong> Generated +285% organic click lift and +185% patient consultation growth across multi-client campaigns.</li>
        </ul>
      </div>

      <p class="article-lead">
        Search Engine Optimization in 2026 is an exact engineering discipline combining behavioral psychology, semantic entity mapping, and technical infrastructure. Ranking on Google's Page 1 is no longer achieved by keyword density or spun content; it demands absolute alignment with user intent, topical authority, and exceptional Core Web Vitals. Below is the comprehensive playbook executed across 5+ commercial business websites that transformed organic search into their highest-ROI customer acquisition channel.
      </p>

      <h2>1. The Strategic Flaw in Conventional SEO: Volume vs Intent</h2>
      <p>
        The most common failure in digital marketing campaigns is optimizing for vanity search volume rather than transactional intent. A keyword with 40,000 monthly searches often yields high bounce rates and negligible conversions, whereas a high-intent search query with 350 monthly searches can drive continuous qualified leads.
      </p>

      <!-- Interactive Clickable Topics (Tabbed Switcher Mode) -->
      <div class="topic-tabs-container">
        <div class="topic-tabs-nav" role="tablist">
          <button type="button" class="topic-tab-btn is-active" role="tab">Topic 1: Informational Intent</button>
          <button type="button" class="topic-tab-btn" role="tab">Topic 2: Commercial Investigation</button>
          <button type="button" class="topic-tab-btn" role="tab">Topic 3: Transactional &amp; Local Intent</button>
        </div>
        <div class="topic-tab-panels">
          <div class="topic-tab-panel is-active" role="tabpanel">
            <h4 style="margin: 0 0 0.5rem; color: var(--text-primary); font-family: var(--font-display);">Topic 1: Informational Intent (Top of Funnel)</h4>
            <p style="margin-bottom: 0.75rem;">
              Broad educational search queries such as <em>"what causes recurring hyperpigmentation"</em> or <em>"how does technical SEO work"</em>. While these queries attract high impressions, they rarely convert into immediate revenue (historical benchmark &lt;0.35% conversion).
            </p>
            <p style="margin-bottom: 0;">
              <strong>Strategic Deployment:</strong> We utilize informational queries strictly for establishing topical entity authority, passing internal link equity upward to commercial pillar hubs, and building first-party retargeting audiences inside Google Analytics and Meta Ads Manager.
            </p>
          </div>

          <div class="topic-tab-panel" role="tabpanel">
            <h4 style="margin: 0 0 0.5rem; color: var(--text-primary); font-family: var(--font-display);">Topic 2: Commercial Investigation (Middle of Funnel)</h4>
            <p style="margin-bottom: 0.75rem;">
              Comparison queries where searchers have recognized a concrete need and are actively evaluating competing solutions (e.g., <em>"best coworking spaces for tech startups Mumbai"</em>, <em>"chemical peel vs fractional laser recovery time"</em>).
            </p>
            <p style="margin-bottom: 0;">
              <strong>Strategic Deployment:</strong> Across 5 client domains, commercial investigation queries converted at <strong>12.8% to 16.4%</strong> when paired with transparent comparison tables, verified client reviews, and downloadable pricing guides authored in WordPress.
            </p>
          </div>

          <div class="topic-tab-panel" role="tabpanel">
            <h4 style="margin: 0 0 0.5rem; color: var(--text-primary); font-family: var(--font-display);">Topic 3: Transactional &amp; Local Intent (Bottom of Funnel)</h4>
            <p style="margin-bottom: 0.75rem;">
              High-converting, wallet-out search queries such as <em>"dermatology clinic appointment Gwalior"</em> or <em>"custom corporate furniture manufacturer Delhi NCR"</em>. Searchers have completed their research and are ready to execute immediate transactions.
            </p>
            <p style="margin-bottom: 0;">
              <strong>Strategic Deployment:</strong> These queries convert at <strong>18% to 24%</strong> directly into phone inquiries, WhatsApp consultations, and scheduled appointments when synchronized with Google Business Profile Local 3-Pack rankings and frictionless booking forms.
            </p>
          </div>
        </div>
      </div>

      <blockquote>
        "Our data across 5 client domains demonstrated that commercial investigation and transactional queries convert at 12.8% to 19.4%, compared to less than 0.35% for generic informational keywords."
      </blockquote>

      <h2>2. Keyword Intent Clustering &amp; Semantic Siloing</h2>
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

      <h2>3. Technical SEO, Schema Markup &amp; Core Web Vitals</h2>
      <p>
        Great content cannot rank on a slow, technically flawed foundation. We conducted exhaustive technical audits across all 5 domains using Google Search Console, Screaming Frog, and Lighthouse:
      </p>

      <!-- Interactive Accordion Group for Technical SEO Breakdown -->
      <div class="accordion-group">
        <details class="interactive-accordion-item" open>
          <summary class="accordion-trigger">
            <div class="accordion-title-wrap">
              <span class="accordion-pill-tag">Core Metric 1</span>
              <span>Largest Contentful Paint (LCP) under 1.2s</span>
            </div>
          </summary>
          <div class="accordion-body">
            Reduced LCP from 3.8s down to 1.15s by converting legacy PNG/JPEG media to modern WebP and AVIF formats, defining explicit width and height aspect ratios, implementing CDN edge caching, and prioritizing critical above-the-fold assets.
          </div>
        </details>

        <details class="interactive-accordion-item">
          <summary class="accordion-trigger">
            <div class="accordion-title-wrap">
              <span class="accordion-pill-tag">Core Metric 2</span>
              <span>Interaction to Next Paint (INP) under 110ms</span>
            </div>
          </summary>
          <div class="accordion-body">
            Maintained ultra-responsive user input response by removing bloated third-party trackers, deferring non-essential scripts until initial scroll, and utilizing lightweight native JavaScript components instead of heavy external frameworks.
          </div>
        </details>

        <details class="interactive-accordion-item">
          <summary class="accordion-trigger">
            <div class="accordion-title-wrap">
              <span class="accordion-pill-tag">Core Metric 3</span>
              <span>Validated Schema Markup &amp; Rich Snippets</span>
            </div>
          </summary>
          <div class="accordion-body">
            Implemented clean JSON-LD structured data for <code>LocalBusiness</code>, <code>MedicalBusiness</code>, <code>BreadcrumbList</code>, and <code>FAQPage</code>. This enabled Google to render expanded accordion FAQ cards and local rating stars directly in search results, doubling organic CTR.
          </div>
        </details>
      </div>

      <h2>4. Authoritative Backlink Acquisition &amp; Digital PR</h2>
      <p>
        Rather than relying on automated directory submissions or low-quality private blog networks (PBNs), our off-page strategy was strictly editorial. We monitored industry discussions, pitched guest columns to verified trade journals, and established localized citation profiles with consistent Name, Address, and Phone (NAP) data. Every acquired backlink had a Domain Authority (DA) above 45 and organic search traffic in Google's index.
      </p>

      <h2>5. The Verified Business Impact</h2>
      <p>
        Here is the multi-quarter performance outcome recorded in Google Search Console and Google Analytics across representative commercial client domains:
      </p>

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
              <td style="padding: 0.85rem 1rem; font-weight: 600;">Clinical Dermatology &amp; Healthcare</td>
              <td style="padding: 0.85rem 1rem; color: var(--accent-green); font-weight: 700;">+285% Organic Clicks</td>
              <td style="padding: 0.85rem 1rem;">14 Top-10 Queries</td>
              <td style="padding: 0.85rem 1rem;">+185% Patient Consultations</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 0.85rem 1rem; font-weight: 600;">B2B Commercial Interior &amp; Office</td>
              <td style="padding: 0.85rem 1rem; color: var(--accent-green); font-weight: 700;">+210% Impression Growth</td>
              <td style="padding: 0.85rem 1rem;">9 Page 1 Keywords</td>
              <td style="padding: 0.85rem 1rem;">+140% RFP Quotation Inquiries</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 0.85rem 1rem; font-weight: 600;">Premium Coworking &amp; Flex Space</td>
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
      <!-- Executive Takeaways -->
      <div class="article-takeaways-box">
        <div class="takeaways-header">
          <div class="takeaways-icon-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <h3 class="takeaways-title">Clinical SEO Key Insights</h3>
        </div>
        <ul class="takeaways-list">
          <li><strong>YMYL &amp; E-E-A-T:</strong> Google enforces strict medical fact validation; doctor council registration bylines are mandatory.</li>
          <li><strong>Mobile 3-Pack Dominance:</strong> 65%+ of clinic calls originate directly from Google Maps and Local 3-Pack results.</li>
          <li><strong>Structured Medical Schema:</strong> MedicalBusiness and Physician JSON-LD claimed rich snippet presence in SERPs.</li>
          <li><strong>Proven Lift:</strong> +185% confirmed patient consultations within 120 days of architectural deployment.</li>
        </ul>
      </div>

      <p class="article-lead">
        Medical practices and clinical healthcare institutions operate under Google's most scrutinized ranking guidelines: <strong>Your Money or Your Life (YMYL)</strong>. Search engines enforce strict validation protocols to protect patient safety. Achieving top rankings requires demonstrating unmatched <strong>Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T)</strong>. Here is the operational framework we engineered to establish clinical authority and generate predictable patient bookings.
      </p>

      <h2>1. Mapping the 3-Stage Patient Decision Journey</h2>
      <p>
        Patients navigating medical conditions do not search in the same manner as eCommerce shoppers. They progress through three distinct cognitive phases:
      </p>

      <!-- Interactive Clickable Topics (Patient Journey) -->
      <div class="topic-tabs-container">
        <div class="topic-tabs-nav" role="tablist">
          <button type="button" class="topic-tab-btn is-active" role="tab">Phase 1: Symptom Exploration</button>
          <button type="button" class="topic-tab-btn" role="tab">Phase 2: Clinical Treatment</button>
          <button type="button" class="topic-tab-btn" role="tab">Phase 3: Specialist Booking</button>
        </div>
        <div class="topic-tab-panels">
          <div class="topic-tab-panel is-active" role="tabpanel">
            <h4 style="margin: 0 0 0.5rem; color: var(--text-primary); font-family: var(--font-display);">Phase 1: Symptom Exploration (Top Funnel)</h4>
            <p>
              The patient experiences distress or physical symptoms (e.g., <em>"why is my acne flaring up after chemical peel"</em>, <em>"early signs of androgenetic alopecia"</em>). At this stage, they require medically backed educational reassurance. We structured condition guides authored by licensed physicians with clear symptom checklists and medical diagrams designed in Canva and Figma.
            </p>
          </div>

          <div class="topic-tab-panel" role="tabpanel">
            <h4 style="margin: 0 0 0.5rem; color: var(--text-primary); font-family: var(--font-display);">Phase 2: Clinical Treatment Discovery (Mid Funnel)</h4>
            <p>
              The patient understands their condition and compares clinical procedures (e.g., <em>"chemical peel vs fractional CO2 laser for deep scarring"</em>, <em>"PRP hair treatment cost vs hair transplant"</em>). We deployed interactive comparison tables breaking down procedure duration, expected pain levels, recovery downtime, and clinical before-and-after case photos.
            </p>
          </div>

          <div class="topic-tab-panel" role="tabpanel">
            <h4 style="margin: 0 0 0.5rem; color: var(--text-primary); font-family: var(--font-display);">Phase 3: Specialist Selection &amp; Booking (Bottom Funnel)</h4>
            <p>
              The searcher evaluates doctors in their vicinity (e.g., <em>"best dermatologist clinic near me"</em>, <em>"skin specialist consultation Gwalior"</em>). We embedded instant one-click WhatsApp appointment buttons, Google Maps location embeds, and doctor qualification credentials, capturing inbound patient leads at a verified <strong>22.4% conversion rate</strong>.
            </p>
          </div>
        </div>
      </div>

      <h2>2. Clinical Page Architecture &amp; E-E-A-T Compliance</h2>
      <p>
        To ensure 100% compliance with Google's medical quality raters guidelines, every condition and procedure page was constructed with:
      </p>

      <div class="accordion-group">
        <details class="interactive-accordion-item" open>
          <summary class="accordion-trigger">
            <div class="accordion-title-wrap">
              <span class="accordion-pill-tag">Protocol 1</span>
              <span>Verified Medical Reviewer Bylines</span>
            </div>
          </summary>
          <div class="accordion-body">
            Clear author attribution displaying medical degrees (MBBS, MD Dermatology), state medical council registration numbers, clinical affiliations, and verified LinkedIn profile links.
          </div>
        </details>

        <details class="interactive-accordion-item">
          <summary class="accordion-trigger">
            <div class="accordion-title-wrap">
              <span class="accordion-pill-tag">Protocol 2</span>
              <span>Transparent Procedural &amp; Recovery Timelines</span>
            </div>
          </summary>
          <div class="accordion-body">
            Detailed clinical procedural steps, expected sensation/pain level ratings, pre-treatment preparations, post-treatment recovery guidelines, and realistic expectation disclaimers.
          </div>
        </details>

        <details class="interactive-accordion-item">
          <summary class="accordion-trigger">
            <div class="accordion-title-wrap">
              <span class="accordion-pill-tag">Protocol 3</span>
              <span>Medical Schema (JSON-LD) Validation</span>
            </div>
          </summary>
          <div class="accordion-body">
            Embedded validated schema including <code>MedicalCondition</code>, <code>MedicalProcedure</code>, <code>Physician</code>, and <code>FAQPage</code> to claim dominant SERP real estate with rich snippets and doctor rating badges.
          </div>
        </details>
      </div>

      <h2>3. Google Business Profile (GBP) &amp; Local 3-Pack Mastery</h2>
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
    image: "assets/images/work/mumbai_coworking_seo.jpg",
    excerpt: "Why campaign budget optimization (CBO) and lookalike audiences require airtight server-side Conversions API (CAPI) to protect ad spend efficiency.",
    contentHtml: `
      <!-- Executive Takeaways -->
      <div class="article-takeaways-box">
        <div class="takeaways-header">
          <div class="takeaways-icon-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <h3 class="takeaways-title">Performance Marketing Core Takeaways</h3>
        </div>
        <ul class="takeaways-list">
          <li><strong>Signal Resilience:</strong> Server-side Conversions API (CAPI) recaptures the 25% to 35% of conversions lost to browser ad blockers.</li>
          <li><strong>Consolidated Architecture:</strong> Merged fragmented ad sets into Advantage+ CBO campaigns, allowing machine learning to allocate capital in real time.</li>
          <li><strong>Event Match Quality (EMQ):</strong> Achieved EMQ score of 8.6/10 using SHA-256 encrypted first-party customer parameters.</li>
          <li><strong>Sustained ROI:</strong> Maintained 3.4x to 4.8x ROAS while cutting Cost Per Lead (CPL) by 38% across multi-month campaigns.</li>
        </ul>
      </div>

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

      <!-- Interactive Topics for Meta Ads Optimization -->
      <div class="topic-tabs-container">
        <div class="topic-tabs-nav" role="tablist">
          <button type="button" class="topic-tab-btn is-active" role="tab">Pillar 1: Server-Side CAPI</button>
          <button type="button" class="topic-tab-btn" role="tab">Pillar 2: Consolidated Structure</button>
          <button type="button" class="topic-tab-btn" role="tab">Pillar 3: 3x3 Creative Matrix</button>
        </div>
        <div class="topic-tab-panels">
          <div class="topic-tab-panel is-active" role="tabpanel">
            <h4 style="margin: 0 0 0.5rem; color: var(--text-primary); font-family: var(--font-display);">Pillar 1: Dual-Stream Conversions API (CAPI)</h4>
            <p>
              We established an airtight dual-stream tracking setup connecting client-side browser events with server-side Meta Conversions API. Passing unique <code>event_id</code> values on both payloads prevents duplicate counting, while securely hashing first-party identifiers (SHA-256 encrypted email, phone, city) elevated our Event Match Quality (EMQ) score to <strong>8.6 out of 10</strong>.
            </p>
          </div>

          <div class="topic-tab-panel" role="tabpanel">
            <h4 style="margin: 0 0 0.5rem; color: var(--text-primary); font-family: var(--font-display);">Pillar 2: Consolidated Account Structure (CAS)</h4>
            <p>
              Rather than maintaining 15 hyper-segmented ad sets that compete against each other in internal auctions, we consolidated ad sets into an <strong>Advantage+ Campaign Budget (CBO)</strong> framework. Meta's machine learning engine receives maximum data density, automatically shifting ad spend in real time toward the ad variations producing the highest revenue.
            </p>
          </div>

          <div class="topic-tab-panel" role="tabpanel">
            <h4 style="margin: 0 0 0.5rem; color: var(--text-primary); font-family: var(--font-display);">Pillar 3: The 3x3 Creative Testing Matrix</h4>
            <p>
              In modern paid advertising, creative is the primary targeting mechanism. We deployed 3 distinct psychological hooks (Direct Pain-Point, Customer Social Proof, and High-Velocity Feature Walkthrough) tested across 3 visual formats (Reels 9:16 video, carousel breakdown, and single high-contrast graphic). This systematic testing loop lowered Customer Acquisition Cost (CAC) by 38%.
            </p>
          </div>
        </div>
      </div>

      <h2>2. Server-Side Conversions API (CAPI) &amp; Deduplication</h2>
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
        <li><strong>Broad &amp; Seed Lookalikes:</strong> Pairing open demographic targeting with tight 1% to 2% Lookalike audiences built exclusively from highest-LTV customer CRM data.</li>
        <li><strong>Exclusion Discipline:</strong> Strictly excluding past 30-day purchasers from prospecting campaigns to prevent ad spend waste on existing customers.</li>
      </ul>

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
      <!-- Executive Takeaways -->
      <div class="article-takeaways-box">
        <div class="takeaways-header">
          <div class="takeaways-icon-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <h3 class="takeaways-title">Video Performance Insights</h3>
        </div>
        <ul class="takeaways-list">
          <li><strong>3-Second Hook Rate:</strong> Hook rate under 25% guarantees unprofitable CPM spend; our target benchmark is 38% to 46%.</li>
          <li><strong>Pacing Rule:</strong> Introduce visual disruptors (B-roll, speed ramps, kinetic typography) every 1.8 to 2.2 seconds.</li>
          <li><strong>Sound-Off Optimization:</strong> 72% of mobile feed viewers watch without audio; high-contrast captions are non-negotiable.</li>
          <li><strong>Commercial Lift:</strong> Delivered a 42% increase in 3-second hook rates and cut Customer Acquisition Cost by 28%.</li>
        </ul>
      </div>

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
        <li><strong>Speed Ramping &amp; Push-Ins:</strong> Subtle scale keyframes (100% to 108% zoom) during key verbal emphasis to maintain forward visual momentum.</li>
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
      id: 'complete-digital-marketing-guide',
      title: "The Complete Digital Marketing Guide (2026): 8 Core Disciplines from Brand-Building to Performance Ads",
      cat: "Growth & Strategy",
      date: "November 2026",
      img: "assets/images/blog/complete_digital_marketing_guide.svg",
      excerpt: "A comprehensive beginner-to-advanced roadmap deconstructing Content, SEO & GEO, Social Media, Email, WhatsApp, Landers, Paid Ads, and Affiliate loops.",
      read: "14 min read"
    },
    {
      id: 'digital-marketing-salary-in-india',
      title: "Digital Marketing Salary in India: 2026 Comprehensive Career & Compensation Guide",
      cat: "Career Intelligence",
      date: "November 2026",
      img: "assets/images/blog/digital_marketing_salary_in_india.svg",
      excerpt: "The definitive 2026 compensation breakdown across freshers, mid-level performance marketers, and growth leads in India.",
      read: "11 min read"
    },
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
      img: "assets/images/work/mumbai_coworking_seo.jpg",
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

  function renderInteractiveArticleView(articleData, targetContainer) {
    targetContainer.innerHTML = `
      <div class="article-back-nav">
        <a href="blog.html" class="article-back-btn">
          &larr; Back to All Articles
        </a>
      </div>

      <header class="article-header">
        <div class="article-meta-row">
          <span class="article-category-badge">${articleData.category}</span>
          <span>•</span>
          <span>${articleData.date}</span>
          <span>•</span>
          <span>${articleData.readingMinutes} min read</span>
        </div>

        <h1 class="article-main-title">${articleData.title}</h1>
      </header>

      ${articleData.image ? `
        <div class="article-featured-media">
          <img src="${articleData.image}" alt="${articleData.title.replace(/"/g, '&quot;')}" loading="lazy">
        </div>
      ` : ''}

      <!-- TABLE OF CONTENTS: Inline, centered above article content. NOT sticky. Scrolls away naturally. -->
      <div class="article-toc-inline" id="articleTocInline">
        <div class="toc-inline-header" id="tocInlineToggle">
          <div class="toc-inline-header-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            <span>Table of Contents</span>
          </div>
          <button type="button" class="toc-inline-toggle-btn" aria-label="Toggle Table of Contents" aria-expanded="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
        </div>
        <div class="toc-inline-body" id="articleTocList"></div>
      </div>

      <!-- FULL-WIDTH CENTERED ARTICLE CONTENT -->
      <div class="article-content">
        ${articleData.contentHtml}
      </div>

      <!-- Social Share & Engagement Suite -->
      <div class="article-interaction-bar"></div>

      <div class="article-bottom-actions">
        <a href="blog.html" class="btn btn-secondary">
          &larr; Back to All Articles
        </a>
        <a href="index.html#contact" class="btn btn-primary">
          Discuss This Strategy &rarr;
        </a>
      </div>

      <!-- Dynamic Related Articles Slot -->
      <div id="relatedArticlesSlot"></div>
    `;

    // Inline TOC Collapse/Expand Toggle
    const tocInline = document.getElementById('articleTocInline');
    const tocInlineToggle = document.getElementById('tocInlineToggle');
    if (tocInlineToggle && tocInline) {
      tocInlineToggle.addEventListener('click', () => {
        tocInline.classList.toggle('is-collapsed');
        const btn = tocInline.querySelector('.toc-inline-toggle-btn');
        if (btn) btn.setAttribute('aria-expanded', !tocInline.classList.contains('is-collapsed'));
      });
    }

    // Trigger DOM post-processing engine (Auto-Linker, Tabs, Accordions, Tables, Progress Bar)
    if (typeof window.enhanceArticlePostDOM === 'function') {
      window.enhanceArticlePostDOM(articleData.id, articleData.title);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 1. Check local comprehensive case studies first
  if (localArticles && localArticles[postId]) {
    const article = localArticles[postId];
    article.id = postId;
    document.title = `${article.title} — Manjeet Singh Katare`;
    renderInteractiveArticleView(article, container);
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

    const wpArticleData = {
      id: postId,
      title: cleanTitle,
      category: category,
      date: formattedDate,
      readingMinutes: readingMinutes,
      image: featuredImageUrl,
      contentHtml: contentHtml
    };

    renderInteractiveArticleView(wpArticleData, container);

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