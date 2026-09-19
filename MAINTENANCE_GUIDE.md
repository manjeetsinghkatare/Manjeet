# Maintenance & Deployment Guide: Manjeet Singh Katare Portfolio

This guide explains how your website is structured for effortless future updates, how to deploy it on **GitHub + Vercel**, and the **simplest way to update your resume in seconds without touching any website code or redesigning anything**.

---

## 🏛️ How the System is Structured

Your website is built with a **decoupled data architecture** so that your resume and main website are completely separated:

```
Manjeet PROMPT/
├── index.html               <-- Main Portfolio Website (Stable, no frequent edits needed)
├── resume.html              <-- Printable ATS Resume (Dynamic viewer)
├── data/
│   ├── resume-data.js       <-- ⚡ YOUR MASTER RESUME FILE (Edit this to update your resume!)
│   └── resume.json          <-- Standard JSON export of your resume data
├── assets/
│   ├── docs/
│   │   └── Manjeet_Singh_Resume.pdf  <-- Exported PDF
│   └── images/              <-- Profile photo, banner, logos, certificates
└── css/ & js/               <-- Styling and interaction engines
```

### Why this structure saves you time:
1. **Zero HTML Hunting**: You never need to search through 1,500 lines of complex HTML in `index.html` just to add a new certificate or update a date.
2. **Zero Layout Breakage**: You cannot accidentally break CSS styles, mobile navigation, or image grids.
3. **Instant Auto-Render**: `resume.html` automatically reads `data/resume-data.js` and renders everything dynamically.

---

## 🚀 How to Deploy on GitHub & Vercel (1-Click Free Hosting)

Vercel provides free, high-speed global hosting with automatic SSL certificates (`https://`).

### Step 1: Push to GitHub
1. Create a new repository on [GitHub.com](https://github.com/new) (e.g., `portfolio-manjeet`).
2. Upload or push this project folder (`Manjeet PROMPT`) to your new repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/portfolio-manjeet.git
   git push -u origin main
   ```
   *(Or use GitHub Desktop if you prefer a visual interface).*

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up/log in with your GitHub account.
2. Click **"Add New..."** ➔ **"Project"**.
3. Select your `portfolio-manjeet` repository from the list.
4. Keep all default settings (Framework Preset: *Other*, Root Directory: `./`).
5. Click **"Deploy"**.
6. **Done!** Within 15 seconds, your website is live with a fast URL like `https://portfolio-manjeet.vercel.app` (you can also attach a custom `.com` or `.in` domain anytime for free).

---

## ⚡ The Simplest Way to Update Your Resume After Deployment

Once deployed, **you do not need to install anything or run any commands**. You can update your resume directly from your web browser (even on your phone!):

### 30-Second Browser Workflow:
1. Open your repository on **GitHub.com**.
2. Click on the folder **`data/`** ➔ click on **`resume-data.js`**.
3. Click the **✏️ (Pencil / Edit file)** icon at the top right.
4. Make your updates:
   - **Adding a new certificate**: Scroll to `certifications: [...]` and paste:
     ```javascript
     {
       title: "Your New Certification Name",
       issuer: "Google / HubSpot / Coursera",
       date: "Month 2026",
       id: "Credential ID: 12345678"
     },
     ```
   - **Adding a new job/internship**: Scroll to `experience: [...]` and paste:
     ```javascript
     {
       role: "Your Job Title",
       company: "Company Name",
       location: "City / Remote",
       period: "Month Year – Present",
       meta: "Full-Time / Internship",
       bullets: [
         "Key achievement or metric...",
         "Responsibility or project led..."
       ],
       skills: ["Skill 1", "Skill 2", "Skill 3"]
     },
     ```
   - **Updating skills**: Simply add your new skills into the corresponding string in `skills: [...]`.
5. Scroll to the bottom and click the green **"Commit changes"** button.
6. **Vercel will automatically rebuild and deploy your updated resume in ~15 seconds!**
   - Your live resume at `https://your-portfolio.vercel.app/resume.html` will immediately show your new certificates and experience.

---

## 🔒 Public "Download Resume" Setting

As requested, **all public "Download Resume" buttons on the main website (`index.html`) have been removed**.

- Visitors cannot download your PDF automatically from the main page.
- You have a clean, printable online resume at:  
  **`https://your-portfolio.vercel.app/resume.html`**
- When you apply for a role, you can share this URL directly with recruiters or open it yourself and click **"Print / Save as PDF"** to generate a fresh ATS PDF whenever needed.

### Want to re-enable a public "Download Resume" button later?
If you ever decide to add a public download button back to the main website, simply open `index.html` and uncomment the designated snippet in any of these 3 locations:
1. **Header Navigation (line ~88)**: Uncomment `<a href="assets/docs/Manjeet_Singh_Resume.pdf" ...>PDF</a>`
2. **Mobile Menu Drawer (line ~125)**: Uncomment `<a href="assets/docs/Manjeet_Singh_Resume.pdf" ...>Download Resume PDF</a>`
3. **Hero Section (line ~166)**: Uncomment `<a href="assets/docs/Manjeet_Singh_Resume.pdf" ...>Download PDF</a>`

---

## 📋 Copy-Paste Cheatsheet for `data/resume-data.js`

### New Certificate Template
```javascript
{
  title: "Certification Title",
  issuer: "Issuing Organization",
  date: "Month Year",
  id: "Credential ID / Score (Optional)"
},
```

### New Experience Template
```javascript
{
  role: "Role Title",
  company: "Organization Name",
  location: "Location / Remote",
  period: "Start Month Year – End Month Year",
  meta: "Internship / Full-time",
  bullets: [
    "Quantified outcome or primary responsibility.",
    "Tools used and strategic impact achieved."
  ],
  skills: ["Tool 1", "Tool 2", "Skill 3"]
},
```

### New Project Template
```javascript
{
  title: "Project Name",
  organization: "Affiliated Institution / Brand",
  period: "Year",
  description: "One-paragraph summary of problem, methodology, and outcome."
},
```
