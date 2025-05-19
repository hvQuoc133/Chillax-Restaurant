// Dropdown nav item
function initDropdownTouch() {
  document.querySelectorAll('.nav-item.dropdown').forEach(function (el) {
    el.addEventListener('touchstart', function () {
      let menu = el.querySelector('.dropdown-menu');
      if (menu) {
        menu.classList.toggle('show');
      }
    });
  });
}

function initMobileHoverNav() {
  const dropdowns = document.querySelectorAll('.nav-item.dropdown');

  dropdowns.forEach(drop => {
    drop.addEventListener('click', function (e) {
      e.stopPropagation();
      drop.classList.toggle('show');
    });
  });

  document.addEventListener('click', function () {
    dropdowns.forEach(drop => drop.classList.remove('show'));
  });
}

// Toggle Rotate
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

// Navbar scroll
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

// Btn on top
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

// Change language
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

// Call all function
function initHeaderJS() {
  initDropdownTouch();
  initMobileHoverNav();
  initNavbarToggleRotate();
  initNavbarScroll();
  initLanguageSwitcher();
  initScrollToTopBtn();
}

// Zoom images
function openModal(src) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  modal.style.display = "flex";
  modalImg.src = src;
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}

// Load header DOM 
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('header');

  if (!container) {
    console.error("Không tìm thấy phần tử #header trong DOM.");
    return;
  }

  fetch('/Chillax-Restaurant/header.html')
    .then(res => res.text())
    .then(html => {
      container.innerHTML = html;
      initHeaderJS();
    })
    .catch(err => console.error("Lỗi khi tải header:", err));
});

// Load language 
fetch('lang/en.json')
  .then(res => res.json())
  .then(data => {
    Object.keys(data).forEach(key => {
      if (key.startsWith('_')) return;

      const el = document.querySelector(`[data-i18n="${key}"]`);
      if (el) el.textContent = data[key];
    });
  });

// Set active nav item
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
  
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('header');
    if (!container) {
      console.error("Không tìm thấy phần tử #header trong DOM.");
      return;
    }
  
    fetch('/Chillax-Restaurant/header.html') 
      .then(res => res.text())
      .then(html => {
        container.innerHTML = html;
        initHeaderJS();       // Call functions 
        setActiveNavItem();   // active nav item
      })
      .catch(err => console.error("Lỗi khi tải header:", err));
  });