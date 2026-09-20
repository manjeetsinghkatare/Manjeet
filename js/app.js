/**
 * MANJEET SINGH KATARE — PROFESSIONAL PORTFOLIO
 * Application Scripts & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initPortfolioFilters();
  initModalLightbox();
  initContactForm();
  initScrollSpy();
});

/* ==========================================================================
   1. Theme Management (Light / Dark Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (!themeToggleBtn) return;

  const currentTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  setTheme(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Listen to OS theme changes if user hasn't explicitly chosen
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

function setTheme(theme) {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
      themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
    }
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
      themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
    }
  }
}

/* ==========================================================================
   2. Mobile Menu Drawer
   ========================================================================== */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburgerBtn || !mobileDrawer) return;

  function toggleMenu() {
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      mobileDrawer.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerBtn.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      `;
      document.body.style.overflow = '';
    } else {
      mobileDrawer.classList.add('open');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      hamburgerBtn.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
      document.body.style.overflow = 'hidden';
    }
  }

  hamburgerBtn.addEventListener('click', toggleMenu);

  const drawerLinks = mobileDrawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('open')) {
        toggleMenu();
      }
    });
  });
}

/* ==========================================================================
   3. Portfolio Filtering Logic
   ========================================================================== */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || cardCategory.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* ==========================================================================
   4. Modal / Lightbox System Data Dictionary
   ========================================================================== */
const projectDetails = {
  // --- Digital Marketing & SEO Work ---
  'youthmonk-seo': {
    title: '5+ Business Websites: Multi-Sector SEO, Blog Publishing & Backlinking',
    category: 'Digital Marketing & Organic SEO',
    org: 'Agency Client Portfolio (Youthmonk)',
    role: 'Content Writing & Digital Marketing Intern (June 16 – Sep 16, 2026)',
    tools: 'Google Search Console, Keyword Planner, High-DA Backlinks, Blog Publishing, Technical SEO',
    outcome: 'Ranked 5+ commercial client websites on page 1 of Google search, driving continuous keyword growth and qualified inbound leads.',
    image: 'assets/images/work/seo_multi_business_analytics.jpg',
    desc: 'Delivered comprehensive organic search marketing across 5+ commercial client businesses. Key activities included on-page and technical website SEO audits, targeted keyword research, structuring and publishing regular SEO-optimized blog posts, building authoritative external backlinks and directory citations, and monitoring organic ranking trajectories to maintain steady keyword growth.'
  },
  'dermatology-seo': {
    title: 'Dermatology & Clinical Skincare: Digital Marketing, SEO & Backlinking',
    category: 'Healthcare SEO & Digital Marketing',
    org: 'Confidential Healthcare Client (Dermatology Sector)',
    role: 'Digital Marketing & SEO Associate',
    tools: 'On-Page SEO, Medical Backlinking, Search Console, Local Citation Building, Content Marketing',
    outcome: 'Significantly improved organic search discovery for specialized skincare treatments and generated steady qualified consultation inquiries.',
    image: 'assets/images/work/dermatology_skincare_clinic.jpg',
    desc: 'Executed an end-to-end digital marketing and search optimization program for a specialized dermatology and clinical skincare practice. Core responsibilities included identifying high-intent treatment queries, optimizing on-page service pages, acquiring high-quality healthcare backlinks, managing local business citations, and publishing informative skincare content designed to guide prospective patients through consultation booking.'
  },
  'prp-hair-creative': {
    title: 'Dermatology & Clinical Skincare: Digital Marketing, SEO & Backlinking',
    category: 'Healthcare SEO & Digital Marketing',
    org: 'Confidential Healthcare Client (Dermatology Sector)',
    role: 'Digital Marketing & SEO Associate',
    tools: 'On-Page SEO, Medical Backlinking, Search Console, Local Citation Building, Content Marketing',
    outcome: 'Significantly improved organic search discovery for specialized skincare treatments and generated steady qualified consultation inquiries.',
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
  'mumbai-coworking': {
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
  'body-contouring': {
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
    role: 'Digital Marketing & Lead Generation Intern / Associate (Oct 2023 – Aug 2025)',
    tools: 'Meta Ads Manager, Google Ads, Organic SEO, Canva, Photoshop',
    outcome: 'Managed community of 10K+ followers; increased product reach by 40% and engagement by 35% with 30+ creatives.',
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
    title: 'TATA GenAI Powered Data Analytics Job Simulation',
    category: 'Data Analytics & AI',
    org: 'TATA Group (via Forage)',
    role: 'Simulation Participant',
    tools: 'Generative AI, Exploratory Data Analysis, Delinquency Prediction, Executive Data Storytelling',
    outcome: 'Certificate of Completion (Sep 9, 2026) | Verification Code: 6aa122bd72c3c3711160afc1',
    image: 'assets/images/certificates/tata_genai_analytics.jpg',
    desc: 'Completed practical tasks in exploratory data analysis and risk profiling, predicting delinquency with AI models, formulating business reports, and implementing an AI-driven collections strategy.'
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
  'cert-nptel-advertising': {
    title: 'Advertising & Promotions Management (Elite)',
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
    desc: 'Formally recognized for 3 months of exceptional practical contributions in blogging, SEO backlinking, content marketing, and social media management. Commended for responsibility, sincerity, coordination, and attention to detail.'
  },
  'cert-vedalex': {
    title: 'VedAlex Lead Generation Internship Certificate',
    category: 'Official Corporate Experience',
    org: 'VedAlex World Class Products Pvt. Ltd. (Jaipur)',
    role: 'Digital Marketing & Lead Generation Intern',
    tools: 'Meta Ads, Google Ads, Organic SEO, Social Management, Graphic Design',
    outcome: 'Official Certificate signed by Vinki Walia (Senior General Manager)',
    image: 'assets/images/certificates/vedalex_internship.png',
    desc: 'Certified 6-month internship orchestrating paid advertising campaigns, managing a community of 10K+ followers, and designing 30+ promotional creatives.'
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
    desc: 'Completed intensive 30-day curriculum mastering business intelligence visualization, data modeling, and management report creation.'
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
   5. Modal / Lightbox Interactivity
   ========================================================================== */
function initModalLightbox() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const triggerElements = document.querySelectorAll('[data-project-id]');

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

  triggerElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = el.getAttribute('data-project-id');
      openModal(id);
    });

    // Keyboard accessibility
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id = el.getAttribute('data-project-id');
        openModal(id);
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. Contact Form Functionality
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
    const subject = document.getElementById('formSubject').value.trim() || 'Inquiry from Portfolio Website';
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in your name, email, and message.', 'error');
      return;
    }

    const emailBody = `Hi Manjeet,\n\n${message}\n\nFrom: ${name} (${email})`;
    const mailtoUrl = `mailto:manjeetsinghkatare@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoUrl;

    showToast('Opening your default email client to send the message...', 'success');
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const name = document.getElementById('formName').value.trim() || 'Visitor';
      const email = document.getElementById('formEmail').value.trim() || 'Not provided';
      const message = document.getElementById('formMessage').value.trim();

      if (!message) {
        showToast('Please enter a message to copy.', 'error');
        return;
      }

      const formattedText = `From: ${name} <${email}>\n\nMessage:\n${message}`;

      navigator.clipboard.writeText(formattedText).then(() => {
        showToast('Message copied to clipboard! You can paste it into any app.', 'success');
      }).catch(() => {
        showToast('Unable to copy automatically. Please select the text and copy manually.', 'error');
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
    }, 5000);
  }
}

/* ==========================================================================
   7. Scroll Spy for Navigation Active State
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
    rootMargin: '-20% 0px -70% 0px'
  });

  sections.forEach(section => observer.observe(section));
}
