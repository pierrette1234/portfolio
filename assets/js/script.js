// ── HAMBURGER MENU ──────────────────────────────────────────
document.documentElement.classList.add('js');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

// ── LIEN ACTIF DANS LA NAVIGATION ────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const parcoursLink = document.querySelector('.nav-links a[href="#parcours"]');
const parcoursContainer = document.getElementById('parcours');

function updateActiveNav() {
  let current = '';
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    const isParcoursSection = ['formation', 'experience'].includes(current);
    const href = link.getAttribute('href');
    const isActive = href === `#${current}` || (isParcoursSection && link === parcoursLink);
    link.classList.toggle('is-active', isActive);
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('load', updateActiveNav);

// ── APPARITION DES CONTENUS AU DÉFILEMENT ────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.skill-card, .case-study, .timeline-item').forEach((element) => {
  revealObserver.observe(element);
});

// ── TYPING EFFECT ON HERO NAME ───────────────────────────────
const year = new Date().getFullYear();
const footerText = document.querySelector('footer p');
if (footerText) {
  footerText.innerHTML =
    `&copy; ${year} DANSOU Fifamè Pierrette &nbsp;·&nbsp; Portfolio personnel &nbsp;·&nbsp; Conçu avec <span style="color:var(--accent)">passion</span>`;
}

// ── GALERIE DES CAPTURES ──────────────────────────────────────
const galleryImages = [
  ['assets/images/soutenances/accueil.png', 'Accueil et fonctionnalités'],
  ['assets/images/soutenances/connexion-admin.png', 'Accès sécurisé'],
  ['assets/images/soutenances/filieres.png', 'Référentiel des filières'],
  ['assets/images/soutenances/centres.png', 'Centres et surveillants'],
  ['assets/images/soutenances/enseignants.png', 'Enseignants et encadreurs'],
  ['assets/images/soutenances/etudiants.png', 'Étudiants et inscriptions'],
  ['assets/images/soutenances/sujets.png', 'Sujets et mémoires'],
  ['assets/images/soutenances/deliberations.png', 'Délibérations et résultats']
];
const galleryModal = document.getElementById('galleryModal');
const galleryImage = document.getElementById('galleryImage');
const galleryCaption = document.getElementById('galleryCaption');
let galleryIndex = 0;

function showGalleryImage(index) {
  galleryIndex = (index + galleryImages.length) % galleryImages.length;
  galleryImage.src = galleryImages[galleryIndex][0];
  galleryImage.alt = galleryImages[galleryIndex][1];
  galleryCaption.textContent = `${galleryImages[galleryIndex][1]} · ${galleryIndex + 1}/${galleryImages.length}`;
}
function openGallery(index) {
  showGalleryImage(index);
  galleryModal.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeGallery() {
  galleryModal.hidden = true;
  document.body.style.overflow = '';
}
document.querySelectorAll('.gallery-trigger, .gallery-more').forEach((button) => {
  button.addEventListener('click', () => openGallery(Number(button.dataset.galleryIndex)));
});
document.querySelector('.gallery-close')?.addEventListener('click', closeGallery);
document.querySelector('.gallery-prev')?.addEventListener('click', () => showGalleryImage(galleryIndex - 1));
document.querySelector('.gallery-next')?.addEventListener('click', () => showGalleryImage(galleryIndex + 1));
galleryModal?.addEventListener('click', (event) => {
  if (event.target === galleryModal) closeGallery();
});
document.addEventListener('keydown', (event) => {
  if (galleryModal?.hidden) return;
  if (event.key === 'Escape') closeGallery();
  if (event.key === 'ArrowLeft') showGalleryImage(galleryIndex - 1);
  if (event.key === 'ArrowRight') showGalleryImage(galleryIndex + 1);
});
