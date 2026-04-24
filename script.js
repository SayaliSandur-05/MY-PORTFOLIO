// Projects data
const projectsData = [
  {
    title: "Family Website",
    role: "HTML/CSS | Web Design",
    description: "Designed and developed a personal website to showcase family details and events, applying HTML/CSS fundamentals. Responsive layout with modern UI, custom animations, and easy navigation. Hosted as a static site to preserve memories.",
    image: "files/family.png",
    videoUrl: null
  },
  {
    title: "Floor Cleaning Robot",
    role: "IoT | Hardware + Logic",
    description: "Built a prototype robot for automated floor cleaning, integrating basic hardware control (Arduino Uno) and programming logic for navigation, obstacle detection, and efficient cleaning patterns. Watch the demo video below.",
    image: "files/cleaning.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    title: "PharmaGuard – Supply Chain App",
    role: "Fraud Detection | Blockchain",
    description: "Developed an application to detect and trace frauds in medicine supply chains, ensuring transparency and security in pharmaceutical distribution. Implements smart contract concepts for tamper-proof record keeping.",
    image: "files/pharmaguard.jpg",
    videoUrl: null
  },
  {
    title: "Future of Technology Poster",
    role: "Creative Design | Infographic",
    description: "Created a visually engaging poster highlighting upcoming trends and innovations in technology, including AI, quantum computing, and sustainable tech. Used graphic design tools to convey complex ideas with clarity and impact.",
    image: "files/future.jpg",
    videoUrl: null
  }
];

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  projectsData.forEach(proj => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <img class="project-img" src="${proj.image}" alt="${proj.title}">
      <div class="project-content">
        <h3>${proj.title}</h3>
        <div class="project-tag">${proj.role}</div>
        <div class="project-description">${proj.description.substring(0, 100)}${proj.description.length > 100 ? '...' : ''}</div>
        <div class="explore-link"><i class="fas fa-arrow-right"></i> Click to explore</div>
      </div>
    `;
    card.addEventListener('click', () => openModal(proj));
    grid.appendChild(card);
  });
}

const modal = document.getElementById('projectModal');
const modalImg = document.getElementById('modalImg');
const modalVideo = document.getElementById('modalVideo');
const modalTitle = document.getElementById('modalTitle');
const modalRole = document.getElementById('modalRole');
const modalDesc = document.getElementById('modalDesc');

function openModal(proj) {
  modalImg.style.display = 'none';
  modalVideo.style.display = 'none';
  if (modalVideo) modalVideo.pause();
  if (modalVideo) modalVideo.src = '';
  if (proj.videoUrl) {
    modalVideo.src = proj.videoUrl;
    modalVideo.style.display = 'block';
    modalVideo.load();
    modalVideo.onerror = () => {
      modalVideo.style.display = 'none';
      modalImg.src = proj.image;
      modalImg.style.display = 'block';
    };
  } else {
    modalImg.src = proj.image;
    modalImg.style.display = 'block';
  }
  modalTitle.textContent = proj.title;
  modalRole.textContent = proj.role;
  modalDesc.textContent = proj.description;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
  if (modalVideo) {
    modalVideo.pause();
    modalVideo.src = '';
  }
}

document.querySelector('.close-modal')?.addEventListener('click', closeModal);
window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

// Smooth scroll and active nav
const sections = ['about', 'whoami', 'whatiknow', 'resume', 'projects', 'sports', 'contact'];
const navLinks = document.querySelectorAll('.nav-link');

function setActiveNav() {
  let current = '';
  const scrollPos = window.scrollY + 100;
  for (let sec of sections) {
    const element = document.getElementById(sec);
    if (element) {
      const offsetTop = element.offsetTop;
      const offsetBottom = offsetTop + element.offsetHeight;
      if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
        current = sec;
        break;
      }
    }
  }
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === current) link.classList.add('active');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('data-section');
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

window.addEventListener('scroll', setActiveNav);
window.addEventListener('load', () => {
  setActiveNav();
  renderProjects();
});

// PDF download
const pdfPath = "files/resume.pdf";
function downloadPDF() {
  const link = document.createElement('a');
  link.href = pdfPath;
  link.download = "Sayali_Sandur_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
document.querySelectorAll('#resumeCvBtn, #resumeDownloadBtnDetailed').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    downloadPDF();
  });
});

// Profile photo upload
const profileImg = document.getElementById('profilePhoto');
if (profileImg) {
  profileImg.style.cursor = 'pointer';
  profileImg.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => profileImg.src = ev.target.result;
        reader.readAsDataURL(file);
      }
    };
    input.click();
  });
}

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('✓ Thank you! I will connect soon.');
    contactForm.reset();
  });
}