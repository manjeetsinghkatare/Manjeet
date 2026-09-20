/**
 * ==========================================================================
 * MANJEET SINGH — RESUME DATA CONFIGURATION
 * ==========================================================================
 * Matches the official uploaded Resume PDF exactly.
 * ==========================================================================
 */

const RESUME_DATA = {
  personal: {
    name: "Manjeet Singh",
    email: "manjeetsinghkatare@gmail.com",
    phone: "+91 8878014861",
    location: "Gwalior, India 474006",
    linkedin: "https://www.linkedin.com/in/manjeet-singh-katare/",
    linkedinLabel: "Manjeet Singh Katare"
  },

  careerObjective: "MBA candidate specializing in Marketing and HR, bringing real-world experience in SEO, digital branding, and Meta Ads. Ready to use creative skills and practical marketing knowledge to run successful campaigns and deliver real results. Seeking an entry level Digital Marketing Content Marketing role.",

  education: [
    {
      degree: "Master of Business Administration (MBA)",
      institution: "Prestige Institute of Management (Gwalior, MP)",
      specialization: "Specialization - Marketing & HR",
      period: "Aug 2025 – Present"
    },
    {
      degree: "Bachelor of Business Administration (BBA)",
      institution: "Vikrant University (Gwalior, MP)",
      specialization: "Specialization - Marketing",
      period: "August 2022 – July 2025"
    },
    {
      degree: "Diploma in Computer Application (DCA)",
      institution: "Makhanlal Chaturvedi National University (Bhopal, MP)",
      period: "May 2023 – December 2024"
    },
    {
      degree: "Senior Secondary Certificate (12th – PCB Stream)",
      institution: "St. Paul Convent School (MP Board)",
      period: "June 2021 – March 2022"
    }
  ],

  professionalExperience: [
    {
      role: "Content Writing & Digital Marketing Intern",
      company: "Youthmonk",
      location: "Rajkot, Gujarat | Remote",
      period: "June 2026 – Sep 2026",
      bullets: [
        "Managed website development, keyword research, and on-page/off-page SEO submissions for 5+ businesses, resulting in improved search visibility and organic rankings.",
        "Created SEO-friendly blogs, articles, and viral social media posts across Instagram, Facebook, X, and LinkedIn to boost brand engagement."
      ]
    },
    {
      role: "Digital Marketing Intern / Freelance Associate",
      company: "VedAlex",
      location: "Jaipur, Rajasthan | Remote",
      period: "Oct 2023 – Aug 2025",
      bullets: [
        "Executed Meta and Google Ads campaigns and effective SEO strategies to rank the company high on Google and manage 10K+ followers.",
        "Designed 30+ promotional posters and marketing creatives using Canva and Photoshop, increasing product reach by 40% and engagement by 35%."
      ]
    }
  ],

  keySkills: {
    tools: [
      "Canva",
      "Adobe Photoshop",
      "Adobe Premiere Pro",
      "Adobe After Effects",
      "MS Excel",
      "Meta Ads Manager",
      "Google Analytics"
    ],
    digitalMarketing: [
      "SMM",
      "SEO",
      "Content Writing",
      "Copywriting",
      "Content Marketing",
      "Meta & Google Ads"
    ],
    softSkills: [
      "Communication",
      "Creativity",
      "Teamwork",
      "Problem Solving",
      "Adaptability",
      "Time Management"
    ]
  },

  certifications: [
    {
      title: "Google Ads Search Certification",
      issuer: "Google",
      details: "Optimizing search campaigns for targeted traffic."
    },
    {
      title: "Digital Marketing Certification",
      issuer: "HubSpot",
      details: "Trained in SEO, social strategy, and analytics."
    },
    {
      title: "Inbound Marketing Certification",
      issuer: "HubSpot",
      details: "Focused on content creation and lead nurturing."
    },
    {
      title: "Meta Blueprint (Digital Marketing Associate)",
      issuer: "Meta",
      details: "Executing and analyzing ad campaigns."
    }
  ],

  achievements: [
    "Created and run a personal YouTube channel producing music remixes, EDM tracks, montages, and Adobe After Effects tutorials. Completed freelance graphic design projects using Adobe Photoshop, Lightroom, Premiere Pro, and After Effects."
  ],

  extracurricular: [
    "Represented Vikrant University in inter-university events and anchoring activities.",
    "Participated in inter-university art competitions at Amity, Jiwaji, and ITM University."
  ],

  interests: [
    "Graphic Design",
    "Gaming",
    "Working Out",
    "Automotive Mechanics & Driving"
  ],

  languages: [
    "English (Professional)",
    "Hindi (Native)"
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RESUME_DATA;
}
