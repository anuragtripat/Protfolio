/* ============================================================
   MAIN.JS — Anurag Tripathi Portfolio
   Sections:
     1. Nav — scrolled border + active link highlight
     2. Hamburger — mobile menu toggle
     3. Scroll Reveal — IntersectionObserver with stagger
     4. Smooth anchor offset — accounts for fixed nav height
   ============================================================ */


/* ── 1. NAV SCROLLED STATE + ACTIVE LINK ────────────────────── */

const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');

/**
 * Mark nav as scrolled (shows bottom border) when page
 * is scrolled past 30 px.
 */
function handleNavScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}

/**
 * Highlight the nav link whose section is currently
 * in the upper third of the viewport.
 */
function updateActiveLink() {
  const scrollMid = window.scrollY + window.innerHeight * 0.35;

  navLinks.forEach(link => {
    const targetId = link.getAttribute('href').slice(1); // strip '#'
    const section  = document.getElementById(targetId);
    if (!section) return;

    const { offsetTop, offsetHeight } = section;
    const inView =
      scrollMid >= offsetTop &&
      scrollMid < offsetTop + offsetHeight;

    link.classList.toggle('active', inView);
  });
}

window.addEventListener('scroll', () => {
  handleNavScroll();
  updateActiveLink();
}, { passive: true });

// Run once on load
handleNavScroll();
updateActiveLink();


/* ── 2. HAMBURGER MENU (MOBILE) ─────────────────────────────── */

const hamburger    = document.getElementById('hamburger');
const mobileLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = mobileLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close menu when a link is tapped
mobileLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Close menu when tapping outside
document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) {
    mobileLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});


/* ── 3. SCROLL REVEAL ────────────────────────────────────────── */

/**
 * Elements with class="reveal" start invisible (set via CSS).
 * When they enter the viewport they receive class="visible"
 * which triggers the CSS fade-up transition.
 *
 * Siblings inside the same parent are staggered by 80 ms each
 * so a row of cards animates in sequence rather than all at once.
 */

const revealEls = document.querySelectorAll('.reveal');

/** Returns the stagger index of an element among its
 *  `.reveal` siblings within the same parent. */
function getSiblingIndex(el) {
  const siblings = Array.from(el.parentElement.querySelectorAll(':scope > .reveal'));
  return siblings.indexOf(el);
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el    = entry.target;
    const index = getSiblingIndex(el);
    const delay = index * 80; // ms between siblings

    setTimeout(() => el.classList.add('visible'), delay);
    revealObserver.unobserve(el);
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));


/* ── 4. SMOOTH ANCHOR SCROLL WITH NAV OFFSET ────────────────── */

/**
 * Native scroll-behavior: smooth doesn't account for
 * the fixed navbar height. This intercepts anchor clicks
 * and adds the navbar's height as an offset.
 */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const navHeight = navbar.offsetHeight;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});
