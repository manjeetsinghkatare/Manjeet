/**
 * ==========================================================================
 * MANJEET SINGH KATARE — PORTFOLIO JAVASCRIPT ENGINE
 * Digifoc-inspired Interactions, Light/Dark Theming, Modal Lightbox & Filters
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initMobileHeaderScroll();
  initPortfolioFilters();
  initModalLightbox();
  initSocialsModal();
  initCertGallery();
  initContactForm();
  initScrollSpy();
  initScrollReveal();
  initBackToTop();
  initWordPressBlog();
  loadSingleArticle();
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

async function initWordPressBlog() {
  const blogGrid = document.getElementById('blog-grid');
  if (!blogGrid) return;

  try {
    const response = await fetch(WP_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts = await response.json();

    if (!Array.isArray(posts) || posts.length === 0) {
      blogGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem; color: var(--text-secondary);">
          <p>No published articles found at the moment. New publications coming soon!</p>
        </div>
      `;
      return;
    }

    const cardsHtml = posts.map(post => {
      // 1. Title (decoded)
      const rawTitle = post.title && post.title.rendered ? post.title.rendered : 'Untitled Publication';
      const cleanTitle = decodeHtmlEntities(rawTitle);

      // 2. Excerpt (cleaned of tags & WordPress trailing read more)
      let cleanExcerpt = stripHtmlTags(post.excerpt ? post.excerpt.rendered : '');
      cleanExcerpt = cleanExcerpt.replace(/Continue reading.*$/i, '').trim();
      if (!cleanExcerpt) {
        cleanExcerpt = 'Explore the full strategic insights, data architecture, and campaign breakdowns on our blog.';
      } else if (cleanExcerpt.length > 190) {
        cleanExcerpt = cleanExcerpt.slice(0, 187) + '...';
      }

      // 3. Date
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

      // 4. Featured Image from _embedded
      let featuredImageUrl = 'assets/images/branding/portfolio_featured_thumbnail.png';
      const mediaItem = post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0];
      if (mediaItem) {
        featuredImageUrl = (mediaItem.media_details && mediaItem.media_details.sizes && mediaItem.media_details.sizes.large && mediaItem.media_details.sizes.large.source_url) ||
                           (mediaItem.media_details && mediaItem.media_details.sizes && mediaItem.media_details.sizes.medium_large && mediaItem.media_details.sizes.medium_large.source_url) ||
                           mediaItem.source_url ||
                           featuredImageUrl;
      }

      // 5. Category from _embedded
      let category = 'Marketing Insights';
      const termItem = post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0] && post._embedded['wp:term'][0][0];
      if (termItem && termItem.name) {
        category = decodeHtmlEntities(termItem.name);
      }

      // 6. Reading Time Calculation
      const contentText = stripHtmlTags((post.content && post.content.rendered) || '');
      const words = contentText.split(/\s+/).filter(Boolean).length;
      const readingMinutes = Math.max(2, Math.ceil(words / 200));

      // 7. Post Link — points strictly to article.html?id=${post.id}
      const postUrl = `article.html?id=${post.id}`;

      return `
        <article class="blog-card">
          <div class="blog-media-wrap">
            <a href="article.html?id=${post.id}" tabindex="-1" aria-hidden="true" style="display:block; width:100%; height:100%;">
              <img src="${featuredImageUrl}" alt="${cleanTitle.replace(/"/g, '&quot;')}" loading="lazy">
            </a>
            <span class="blog-status-badge">Live Article</span>
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
              <span>Reading Time: ${readingMinutes} min read</span>
              <a href="article.html?id=${post.id}" class="blog-read-link" style="color: var(--accent-primary); text-decoration: none; display: inline-flex; align-items: center; gap: 0.25rem;">
                Read Article &rarr;
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    blogGrid.innerHTML = cardsHtml;
  } catch (error) {
    console.error('Error fetching WordPress blog posts:', error);
    blogGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem; color: var(--text-secondary);">
        <p style="margin-bottom: 0.75rem;">Unable to load live articles right now.</p>
        <a href="blog.html" class="btn btn-secondary btn-sm" style="display: inline-flex; margin-top: 0.5rem;">
          <span>Explore Blog Archive</span>
        </a>
      </div>
    `;
  }
}

/* ==========================================================================
   13. Single Article Dynamic Viewer (article.html)
   ========================================================================== */
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
        <a href="index.html#blog" class="btn btn-primary">
          &larr; Back to Portfolio
        </a>
      </div>
    `;
    return;
  }

  try {
    const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/manjeetsdigitalmarketingblog.wordpress.com/posts/${postId}?_embed=1`);
    if (!response.ok) {
      throw new Error(`Article not found (status ${response.status})`);
    }

    const post = await response.json();

    // 1. Title (decoded)
    const rawTitle = post.title && post.title.rendered ? post.title.rendered : 'Untitled Article';
    const cleanTitle = decodeHtmlEntities(rawTitle);
    document.title = `${cleanTitle} — Manjeet Singh Katare`;

    // 2. Date
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

    // 3. Category from embedded taxonomy
    let category = 'Marketing Strategy & Growth';
    const termItem = post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0] && post._embedded['wp:term'][0][0];
    if (termItem && termItem.name) {
      category = decodeHtmlEntities(termItem.name);
    }

    // 4. Reading Time calculation
    const contentText = stripHtmlTags((post.content && post.content.rendered) || '');
    const words = contentText.split(/\s+/).filter(Boolean).length;
    const readingMinutes = Math.max(2, Math.ceil(words / 200));

    // 5. Featured Image
    let featuredImageUrl = '';
    const mediaItem = post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0];
    if (mediaItem) {
      featuredImageUrl = (mediaItem.media_details && mediaItem.media_details.sizes && mediaItem.media_details.sizes.large && mediaItem.media_details.sizes.large.source_url) ||
                         (mediaItem.media_details && mediaItem.media_details.sizes && mediaItem.media_details.sizes.medium_large && mediaItem.media_details.sizes.medium_large.source_url) ||
                         mediaItem.source_url ||
                         '';
    }

    // 6. Full Article HTML Content
    const contentHtml = (post.content && post.content.rendered) || '<p>No content available for this publication.</p>';

    // Render complete responsive article container
    container.innerHTML = `
      <div class="article-back-nav">
        <a href="index.html#blog" class="article-back-btn">
          &larr; Back to Portfolio Articles
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
        <a href="index.html#blog" class="btn btn-secondary">
          &larr; Back to All Articles
        </a>
        <a href="index.html#contact" class="btn btn-primary">
          Discuss This Strategy &rarr;
        </a>
      </div>
    `;

    // Smooth scroll to top of reading area
    window.scrollTo({ top: 0, behavior: 'smooth' });

  } catch (error) {
    console.error('Error loading article:', error);
    container.innerHTML = `
      <div class="article-state-box">
        <h2 style="font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 0.75rem; color: var(--text-primary);">Unable to Load Article</h2>
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">We could not fetch this publication from the WordPress headless backend. It might be unpublished or the ID is invalid.</p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <a href="index.html#blog" class="btn btn-primary">
            &larr; Back to Portfolio
          </a>
          <button onclick="window.location.reload()" class="btn btn-secondary">
            Retry
          </button>
        </div>
      </div>
    `;
  }
}
