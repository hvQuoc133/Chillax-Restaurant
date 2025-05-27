// ===== Chillax Restaurant Header JS =====
// --- Navbar Submenu & Mobile Functionality ---
function initMobileSubmenuBehavior() {
  // 1. Event toggle submenu on mobile
  document.querySelectorAll('.dropdown-submenu > a').forEach(link => {
    link.replaceWith(link.cloneNode(true));
  });
  document.querySelectorAll('.dropdown-submenu > a').forEach(link => {
    link.addEventListener('click', function (e) {
      if (window.innerWidth < 992) {
        e.preventDefault();
        e.stopPropagation();
        // Close submenu 
        document.querySelectorAll('.dropdown-submenu .dropdown-menu').forEach(menu => {
          if (menu !== this.nextElementSibling) menu.classList.remove('show');
        });
        // Toggle submenu on/hide
        const submenu = this.nextElementSibling;
        if (submenu) submenu.classList.toggle('show');
      }
    });
  });

  // 2. Close all submenus when clicking outside
  document.addEventListener('click', function (e) {
    if (window.innerWidth < 992 && !e.target.closest('.dropdown-submenu')) {
      document.querySelectorAll('.dropdown-submenu .dropdown-menu').forEach(menu => {
        menu.classList.remove('show');
      });
    }
  });

  // 3. Add click event to dropdown items
  document.querySelectorAll('.dropdown-menu .dropdown-item').forEach(link => {
    link.addEventListener('click', function (e) {
      if (window.innerWidth < 992) {
        if (link.nextElementSibling && link.nextElementSibling.classList.contains('dropdown-menu')) {
          return; //
        }
        e.preventDefault();

        // Close all submenu and navbar-collapse
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
          menu.classList.remove('show');
        });
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
            const collapseInstance = bootstrap.Collapse.getOrCreateInstance(navbarCollapse, { toggle: false });
            collapseInstance.hide();
          } else {
            navbarCollapse.classList.remove('show');
          }
        }
        setTimeout(() => {
          const href = this.getAttribute('href');
          if (href && href !== '#' && href !== '') {
            window.location.href = href;
          }
        }, 200);
      }
    });
  });
}

// --- Navbar Toggle Rotate ---
function initNavbarToggleRotate() {
  const toggler = document.querySelector(".navbar-toggler");
  const target = document.querySelector("#navbarSupportedContent");

  if (toggler && target) {
    toggler.addEventListener("click", function () {
      toggler.classList.toggle("rotate");
    });

    target.addEventListener("hidden.bs.collapse", function () {
      toggler.classList.remove("rotate");
    });

    target.addEventListener("shown.bs.collapse", function () {
      toggler.classList.add("rotate");
    });
  }
}

// --- Navbar Scroll Shadow ---
function initNavbarScroll() {
  window.addEventListener("scroll", function () {
    const navbar = document.getElementById("mainNavbar");
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  });
}

// --- Scroll To Top Button ---
function initScrollToTopBtn() {
  const mybutton = document.getElementById("scrollToTopBtn");
  if (!mybutton) return;

  window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  });

  mybutton.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
}

// --- Language Switcher ---
function initLanguageSwitcher() {
  const savedLang = localStorage.getItem('language') || 'vi';
  loadLanguage(savedLang);

  document.querySelectorAll('.lang-switcher img').forEach(img => {
    img.addEventListener('click', () => {
      const lang = img.getAttribute('alt') === 'Vietnamese' ? 'vi' : 'en';
      loadLanguage(lang);
    });
  });
}

function loadLanguage(lang) {
  fetch(`lang/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (data[key]) {
          el.textContent = data[key];
        }
      });
      localStorage.setItem('language', lang);
    });
}

// --- Set Active Nav Item ---
function setActiveNavItem() {
  const currentPage = window.location.pathname.split('/').pop(); // select current page
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// --- Zoom Images Modal ---
let galleryImages = [];
let currentIndex = 0;

// Call this function to initialize the gallery modal
function initGalleryModal() {
  galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
  galleryImages.forEach((img, idx) => {
    img.onclick = function(e) {
      e.stopPropagation();
      openModalWithIndex(idx);
    }
  });
}

function openModalWithIndex(idx) {
  currentIndex = idx;
  openModal(galleryImages[idx].src);
}

function openModal(src) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  modal.style.display = "flex";
  modalImg.src = src;
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}

// Next/Prev with modal
function nextImage() {
  if (galleryImages.length === 0) return;
  currentIndex = (currentIndex + 1) % galleryImages.length;
  openModal(galleryImages[currentIndex].src);
}
function prevImage() {
  if (galleryImages.length === 0) return;
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  openModal(galleryImages[currentIndex].src);
}

// Initialize modal events
document.addEventListener("DOMContentLoaded", initGalleryModal);
// --- Init All Header JS ---
function initHeaderJS() {
  initMobileSubmenuBehavior();
  initNavbarToggleRotate();
  initNavbarScroll();
  initLanguageSwitcher();
  initScrollToTopBtn();
}

// --- Load Header DOM (fetch) ---
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('header');
  if (!container) {
    console.error("Không tìm thấy phần tử #header trong DOM.");
    return;
  }

  fetch('header.html')
    .then(res => res.text())
    .then(html => {
      container.innerHTML = html;
      initHeaderJS();
      setActiveNavItem();
    })
    .catch(err => console.error("Lỗi khi tải header:", err));
});

// --- Load Language On Startup (default EN for fallback) ---
fetch('lang/en.json')
  .then(res => res.json())
  .then(data => {
    Object.keys(data).forEach(key => {
      if (key.startsWith('_')) return;
      const el = document.querySelector(`[data-i18n="${key}"]`);
      if (el) el.textContent = data[key];
    });
  });

function closeAllParentDropdowns(element) {
  let parent = element.closest('.dropdown');
  while (parent) {
    const toggle = parent.querySelector('.dropdown-toggle');
    if (toggle && window.bootstrap && window.bootstrap.Dropdown) {
      const instance = window.bootstrap.Dropdown.getInstance(toggle);
      if (instance) instance.hide();
    }
    parent = parent.parentElement ? parent.parentElement.closest('.dropdown') : null;
  }
}

function initDropdownCloseOnClick() {
  document.querySelectorAll('.dropdown-menu .dropdown-item').forEach(link => {
    link.addEventListener('click', function () {
      closeAllParentDropdowns(this);
    });
  });
}