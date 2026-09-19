# How to Update & Edit Your Resume in 30 Seconds

This guide explains how you can easily make updates to your resume whenever you earn a new certificate, start a new role, or want to tweak bullet points — **without any programming knowledge or complicated build tools**.

---

## 📄 How Your Resume Works

Your portfolio uses two connected resume files:
1. **`resume.html`** (The Master Editable Resume):
   - A clean, modern, ATS-friendly HTML file formatted specifically for print and digital viewing.
   - You can edit the text directly using any simple editor (like Notepad, VS Code, or Notepad++).
2. **`assets/docs/Manjeet_Singh_Resume.pdf`** (The Downloadable PDF):
   - The exact PDF file downloaded whenever someone clicks **"Download Resume"** on your website.

---

## ⚡ Step-by-Step: Updating Your Resume

### Step 1: Open `resume.html` to Edit
- Right-click `resume.html` in your project folder `c:\Users\manje\OneDrive\Desktop\Manjeet PROMPT\resume.html`.
- Choose **Open with** -> **Notepad** (or **VS Code**).
- Locate the section you want to change:
  - **Summary**: Look for `<p class="summary-text">...</p>`
  - **Experience**: Look for `<div class="item-group">...</div>`
  - **Certifications**: Look for `<div class="cert-entry">...</div>`
  - **Skills**: Look for `<div class="skill-items">...</div>`
- Update your text, dates, numbers, or bullet points.
- Press **Ctrl + S** to save the file.

---

### Step 2: Export to PDF in Your Browser
1. Double-click `resume.html` to open it in **Google Chrome** or **Microsoft Edge** (or visit `http://localhost:5000/resume.html` if your server is running).
2. Click the blue **"Print / Save as PDF"** button at the top right (or press **Ctrl + P** on your keyboard).
3. In the Print window:
   - **Destination**: Select **Save as PDF** (or **Microsoft Print to PDF**).
   - **Layout**: Portrait.
   - **Margins**: Default (or None/Minimum).
   - **Options**: Check **"Background graphics"** (so badge colors render nicely).
4. Click **Save**.
5. Save the file directly as:
   `c:\Users\manje\OneDrive\Desktop\Manjeet PROMPT\assets\docs\Manjeet_Singh_Resume.pdf`
   *(Click "Yes" to replace the existing file).*

---

### Step 3: Verify Your Website
- Open your portfolio website (`index.html` or `http://localhost:5000/`).
- Click **"Resume"** or **"Download Resume"**.
- Your downloaded PDF will now reflect your latest updates!
- Recruiters can also view your live printable resume directly at:
  `http://localhost:5000/resume.html`

---

## 💡 Quick Tips
- **Adding a new bullet point**: Copy one `<li>...</li>` line and paste it right below, then edit the text.
- **Adding a new certificate**: Copy one `<div class="cert-entry">...</div>` block in the Certifications section, paste it, and type the title, issuer, and date.
- **Clean formatting**: Keep bullet points concise (1 to 2 lines per bullet) so your printed PDF stays neat and balanced.
