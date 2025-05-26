/* Hover underline animation */
document.querySelectorAll('.nav-item.dropdown').forEach(function (el) {
  el.addEventListener('touchstart', function () {
    let menu = el.querySelector('.dropdown-menu');
    if (menu) {
      menu.classList.toggle('show');
    }
  });
});

/* Mobie hover nav */
document.addEventListener("DOMContentLoaded", function () {
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
});

/* rotate toggle header */
document.addEventListener("DOMContentLoaded", function () {
  const toggler = document.querySelector(".navbar-toggler");
  const target = document.querySelector("#navbarSupportedContent");

  toggler.addEventListener("click", function () {
    toggler.classList.toggle("rotate");
  });

  target.addEventListener("hidden.bs.collapse", function () {
    toggler.classList.remove("rotate");
  });

  target.addEventListener("shown.bs.collapse", function () {
    toggler.classList.add("rotate");
  });
});

/* Navbar scroll */
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("mainNavbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* Modal zoom image */
function openModal(src) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  modal.style.display = "flex";
  modalImg.src = src;
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}

/* Language switch */
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
      localStorage.setItem('language', lang); // save language preference
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('language') || 'vi';
  loadLanguage(savedLang);

  document.querySelectorAll('.lang-switcher img').forEach(img => {
    img.addEventListener('click', () => {
      const lang = img.getAttribute('alt') === 'Vietnamese' ? 'vi' : 'en';
      loadLanguage(lang);
    });
  });
});

/* Skip _comment with json */
fetch('lang/en.json')
  .then(res => res.json())
  .then(data => {
    Object.keys(data).forEach(key => {
      if (key.startsWith('_')) return; // skip comment or key 

      const el = document.querySelector(`[data-i18n="${key}"]`);
      if (el) el.textContent = data[key];
    });
  });

/* Scroll to Top */
var mybutton = document.getElementById("scrollToTopBtn");

window.onscroll = function () {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
};

function scrollToTop() {
  document.body.scrollTop = 0; // To Safari
  document.documentElement.scrollTop = 0; // Cho Chrome, Firefox, IE and Opera
}
