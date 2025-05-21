// Init Dropdown Touch
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

// Mobile hover nav item
function initMobileHoverNav() {
  const dropdowns = document.querySelectorAll('.nav-item.dropdown');

  dropdowns.forEach(drop => {
    drop.addEventListener('click', function (e) {
      e.stopPropagation(); // Ngừng sự kiện b bubbling
      const menu = drop.querySelector('.dropdown-menu');

      if (menu) {
        const isOpen = menu.classList.contains('show');
        // Nếu dropdown đã mở, đóng lại, nếu không mở thì mở
        if (isOpen) {
          menu.classList.remove('show');
        } else {
          menu.classList.add('show');
        }
      }
    });
  });

  // Đảm bảo rằng mọi dropdown sẽ đóng lại khi click ra ngoài
  document.addEventListener('click', function () {
    dropdowns.forEach(drop => {
      const menu = drop.querySelector('.dropdown-menu');
      if (menu) {
        menu.classList.remove('show');
      }
    });
  });
}

// Dropdown nav item
function initSubmenuDropdown() {
  const submenuToggles = document.querySelectorAll('.dropdown-submenu > a');

  submenuToggles.forEach(toggle => {
      toggle.addEventListener('click', function (e) {
          e.preventDefault(); // Ngừng hành động mặc định của liên kết
          e.stopPropagation(); // Ngừng sự kiện lan tỏa

          const submenu = this.nextElementSibling; // Lấy menu con

          // Đảm bảo rằng không có menu con nào khác đang mở
          document.querySelectorAll('.dropdown-submenu .dropdown-menu').forEach(menu => {
              if (menu !== submenu) {
                  menu.classList.remove('show'); // Đóng tất cả các menu con khác
              }
          });

          // Toggle hiển thị menu con đã click
          submenu.classList.toggle('show');
      });
  });

  // Đóng tất cả submenu khi click ra ngoài
  document.addEventListener('click', function (e) {
      if (!e.target.closest('.dropdown-submenu')) {
          document.querySelectorAll('.dropdown-submenu .dropdown-menu').forEach(menu => {
              menu.classList.remove('show');
          });
      }
  });
}

// Mobile dropdown toggle
function initMobileDropdown() {
  const dropdowns = document.querySelectorAll('.nav-item.dropdown');

  dropdowns.forEach(drop => {
    drop.addEventListener('click', function (e) {
      e.stopPropagation(); // Ngừng sự kiện b bubbling
      const menu = drop.querySelector('.dropdown-menu');

      if (menu) {
        const isOpen = menu.classList.contains('show');
        // Nếu dropdown đã mở, đóng lại, nếu không mở thì mở
        if (isOpen) {
          menu.classList.remove('show');
        } else {
          menu.classList.add('show');
        }
      }
    });
  });

  // Dropdown submenu toggle for mobile
  const submenuToggles = document.querySelectorAll('.dropdown-submenu > a');
  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      e.preventDefault(); // Ngừng hành động mặc định của liên kết
      e.stopPropagation(); // Ngừng sự kiện lan tỏa

      const submenu = this.nextElementSibling; // Lấy menu con

      // Toggle hiển thị menu con đã click
      submenu.classList.toggle('show');
    });
  });

  // Đảm bảo rằng mọi dropdown sẽ đóng lại khi click ra ngoài
  document.addEventListener('click', function () {
    dropdowns.forEach(drop => {
      const menu = drop.querySelector('.dropdown-menu');
      if (menu) {
        menu.classList.remove('show');
      }
    });
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
  initSubmenuDropdown(); // Xử lý dropdown submenu
  initMobileDropdown();  // Xử lý dropdown cho mobile
  initDropdownTouch();
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
  
  fetch('header.html')
    .then(res => res.text())
    .then(html => {
      container.innerHTML = html;
      initHeaderJS();       // Call functions 
      setActiveNavItem();   // active nav item

      // Gắn sự kiện đóng dropdown khi chọn
      document.querySelectorAll('.dropdown-menu a').forEach(link => {
        link.addEventListener('click', () => {
          const dropdown = link.closest('.dropdown');
          if (dropdown) {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) {
              let instance = bootstrap.Dropdown.getInstance(toggle);
              if (!instance) {
                instance = new bootstrap.Dropdown(toggle);
              }
              instance.hide(); // Đóng dropdown
            }
          }
        });
      });
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
  
    fetch('header.html') 
      .then(res => res.text())
      .then(html => {
        container.innerHTML = html;
        initHeaderJS();       // Call functions 
        setActiveNavItem();   // active nav item
      })
      .catch(err => console.error("Lỗi khi tải header:", err));
  });
  