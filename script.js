// ATS CV Builder Data & Reactive State Controller - Exact User Template Match

const defaultData = {
  font: "'Times New Roman', Times, serif",
  personal: {
    name: "MUHAMMAD SULTHAN NADHIF PAMUNGKAS, S.Kom",
    location: "Bekasi Timur, West Java, Indonesia",
    phone: "081383618261",
    email: "sultannadhif22@gmail.com",
    portfolio: "https://portofolionadhif.lovable.app"
  },
  summary: "Information Technology graduate from Universitas Darma Persada (GPA 3.68/4.00) with hands-on internship experience as an IT Programmer at Toyota Motor Manufacturing Indonesia (TMMIN) and a strong background in web development. Proficient in HTML, CSS, JavaScript, PHP, MySQL, and REST API integration, with additional expertise in UI/UX design and workflow automation. Seeking opportunities as a Junior Web Developer, Full-Stack Developer, or IT Officer to deliver responsive, user-oriented digital solutions, while applying strong troubleshooting, technical support, and problem-solving skills.",
  experience: [
    {
      company: "Toyota Motor Manufacturing Indonesia (TMMIN) – Sunter 1, Indonesia",
      role: "Internship - QCC PBOD Secretariat & IT Programmer (April 2025 - June 2025)",
      bullets: [
        "Analyzed QCC PBOD Secretariat operational workflows to identify and resolve bottlenecks in data processing, reporting, and document management.",
        "Developed a centralized web-based QCC Portal for end-to-end data, document, and assessment management.",
        "Implemented automated workflows, real-time data validation, interactive analytics dashboards, and digital assessment features to boost overall processing efficiency by ~80% and eliminate manual errors.",
        "Integrated Python-based data analysis scripts into the web platform to automate complex evaluation metrics, problem-solving, and data-driven decision-making."
      ]
    },
    {
      company: "Freelance Project",
      role: "Web & Application Developer (2022 - Present)",
      bullets: [
        "Engineered a production-ready real-time Japanese-to-multilingual voice translation web application (Node.js, Express, Socket.IO, Groq AI API, Web Audio TTS) designed for factory floor communication at Ninomiya Co., Ltd. (Japan).",
        "Architected \"The Local Feed\", a custom full-stack news portal and local UMKM directory for the Cirebon region built with HTML5, CSS3, JavaScript, custom PHP REST APIs, MySQL, and automated AI news processing (Groq AI & cPanel Cron Jobs).",
        "Developed multi-platform web and mobile applications using PHP, Flutter, Visual Basic.Net, and Firebase.",
        "Built application prototypes, digital catalog systems, and IoT-based real-time monitoring dashboards.",
        "Delivered responsive, user-oriented digital solutions tailored for academic milestones and freelance client requirements."
      ]
    }
  ],
  education: [
    {
      institution: "Universitas Darma Persada (2022 - 2025)",
      degree: "Bachelor of Information Technology - GPA 3.68 / 4.00"
    }
  ],
  skills: [
    "Web & Application Development (HTML, CSS, JavaScript, PHP, Flutter, Python, Visual Basic.Net)",
    "UI/UX & Graphic Design (Figma, Photoshop, Affinity, Blender 3D)",
    "Video Editing & Multimedia (Adobe Premiere, Adobe Photoshop, Affinity, CapCut, Filmora)",
    "Data Analysis, analytical thinking & Attention to Detail",
    "Problem Solving, Communication & Team Collaboration",
    "Microsoft Office (Word, Excel)"
  ],
  certificates: [
    "Certificate Cisco - IT Essentials, CCNAv7: Introduction to Network, Pengenalan Cyber Security, Junior Cybersecurity Analyst Career Path, Partner: NDG Linux Essentials, Partner: NDG Linux Unhatched",
    "LPIA-EPT (English Proficiency Test)",
    "Basic Safety Awareness - TOYOTA"
  ],
  languages: [
    "Indonesia (Native), English (Intermediate)"
  ]
};

// Current App State
let cvData = JSON.parse(localStorage.getItem('ats_cv_data_exact')) || JSON.parse(JSON.stringify(defaultData));

document.addEventListener('DOMContentLoaded', () => {
  initControls();
  renderCV();
});

function initControls() {
  // Font Selector
  const fontSelect = document.getElementById('fontSelect');
  if (fontSelect) {
    fontSelect.value = cvData.font || "'Times New Roman', Times, serif";
    fontSelect.addEventListener('change', (e) => {
      cvData.font = e.target.value;
      localStorage.setItem('ats_cv_data_exact', JSON.stringify(cvData));
      renderCV();
    });
  }
}

// RENDER ATS PAPER (Harvard / Standard ATS Format)
function renderCV() {
  const paper = document.getElementById('atsPaper');
  if (!paper) return;

  paper.style.fontFamily = cvData.font || "'Times New Roman', Times, serif";

  const p = cvData.personal;
  let contactItems = [];
  if (p.location) contactItems.push(escapeHtml(p.location));
  if (p.phone) contactItems.push(`HP: ${escapeHtml(p.phone)}`);
  if (p.email) contactItems.push(`Email: <a href="mailto:${escapeHtml(p.email)}">${escapeHtml(p.email)}</a>`);

  let html = `
    <!-- Header Section -->
    <div class="ats-header">
      <div class="ats-name">${escapeHtml(p.name)}</div>
      <div class="ats-contact">
        ${contactItems.join(' | ')} |
      </div>
      ${p.portfolio ? `<div class="ats-portfolio">Portfolio : <a href="${escapeHtml(p.portfolio)}" target="_blank">${escapeHtml(p.portfolio)}</a></div>` : ''}
    </div>
  `;

  // Summary Section
  if (cvData.summary) {
    html += `
      <div class="ats-section">
        <div class="ats-section-title">SUMMARY</div>
        <p class="ats-summary-text">${escapeHtml(cvData.summary)}</p>
      </div>
    `;
  }

  // Experience Section
  if (cvData.experience && cvData.experience.length > 0) {
    html += `
      <div class="ats-section">
        <div class="ats-section-title">EXPERIENCE</div>
        ${cvData.experience.map(exp => `
          <div class="ats-entry">
            <div class="ats-org">${escapeHtml(exp.company)}</div>
            <div class="ats-role">${escapeHtml(exp.role)}</div>
            ${exp.bullets && exp.bullets.length > 0 ? `
              <ul class="ats-bullets">
                ${exp.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  // Education Section
  if (cvData.education && cvData.education.length > 0) {
    html += `
      <div class="ats-section">
        <div class="ats-section-title">EDUCATION</div>
        ${cvData.education.map(edu => `
          <div class="ats-entry">
            <div class="ats-org">${escapeHtml(edu.institution)}</div>
            <div class="ats-role">${escapeHtml(edu.degree)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // 2-Column Section for SKILLS & CERTIFICATES
  html += `
    <div class="ats-grid-2col">
      <!-- Skills Column -->
      <div class="ats-section">
        <div class="ats-section-title">SKILLS</div>
        <ul class="ats-bullets">
          ${cvData.skills.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
        </ul>
      </div>

      <!-- Certificates Column -->
      <div class="ats-section">
        <div class="ats-section-title">CERTIFICATES</div>
        <ul class="ats-bullets">
          ${cvData.certificates.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;

  // Languages Section
  if (cvData.languages && cvData.languages.length > 0) {
    html += `
      <div class="ats-section">
        <div class="ats-section-title">LANGUAGES</div>
        <ul class="ats-bullets">
          ${cvData.languages.map(l => `<li>${escapeHtml(l)}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  paper.innerHTML = html;
}

function printATSCV() {
  window.print();
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

