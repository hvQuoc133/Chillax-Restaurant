// ===== Chillax Restaurant Header JS =====

// --- Navbar Submenu & Mobile Functionality ---
function initMobileSubmenuBehavior() {
  // 1. Toggle submenu (Châu Âu, Châu Á) trên mobile
  document.querySelectorAll('.dropdown-submenu > a').forEach(link => {
    // Xóa sự kiện cũ trước khi gắn mới (nếu header fetch nhiều lần)
    link.replaceWith(link.cloneNode(true));
  });
  document.querySelectorAll('.dropdown-submenu > a').forEach(link => {
    link.addEventListener('click', function (e) {
      if (window.innerWidth < 992) {
        e.preventDefault();
        e.stopPropagation();
        // Đóng tất cả các submenu khác
        document.querySelectorAll('.dropdown-submenu .dropdown-menu').forEach(menu => {
          if (menu !== this.nextElementSibling) menu.classList.remove('show');
        });
        // Toggle submenu hiện/ẩn
        const submenu = this.nextElementSibling;
        if (submenu) submenu.classList.toggle('show');
      }
    });
  });

  // 2. Đóng submenu khi click ra ngoài trên mobile
  document.addEventListener('click', function (e) {
    if (window.innerWidth < 992 && !e.target.closest('.dropdown-submenu')) {
      document.querySelectorAll('.dropdown-submenu .dropdown-menu').forEach(menu => {
        menu.classList.remove('show');
      });
    }
  });

  // 3. Khi click vào item submenu (món ăn...), đóng luôn navbar-collapse rồi chuyển trang
  document.querySelectorAll('.dropdown-submenu .dropdown-menu .dropdown-item').forEach(link => {
    link.addEventListener('click', function (e) {
      if (window.innerWidth < 992) {
        e.preventDefault();

        // Đóng tất cả submenu
        document.querySelectorAll('.dropdown-submenu .dropdown-menu').forEach(menu => {
          menu.classList.remove('show');
        });

        // Đóng navbar-collapse (menu mobile)
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
            const collapseInstance = bootstrap.Collapse.getOrCreateInstance(navbarCollapse, {toggle: false});
            collapseInstance.hide();
          } else {
            navbarCollapse.classList.remove('show');
          }
        }

        // Chuyển trang sau 200ms cho mượt
        setTimeout(() => {
          window.location.href = this.getAttribute('href');
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
function openModal(src) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  modal.style.display = "flex";
  modalImg.src = src;
}
function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}

// --- Init All Header JS ---
function initHeaderJS() {
  initMobileSubmenuBehavior();   // Xử lý submenu mobile (đa cấp, đóng menu khi chọn)
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