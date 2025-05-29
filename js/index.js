/* ---INDEX JS--- */

/* Set banner full viewport */
function setFullViewportHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setFullViewportHeight();
window.addEventListener('resize', setFullViewportHeight);
/* Set table */
/* Auto day */
const dateInput = document.getElementById('date');
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0'); // Month (0-11)
const dd = String(today.getDate()).padStart(2, '0'); // Day

const minDate = `${yyyy}-${mm}-${dd}`;
dateInput.min = minDate;

/* Auto time */
const timeSelect = document.getElementById("time");
for (let hour = 8; hour <= 20; hour++) {
  const times = [`${hour}:00`, `${hour}:30`];
  if (hour === 20) times.pop(); //  21:30 
  times.forEach(t => {
    const option = document.createElement('option');
    option.value = t;
    option.textContent = t;
    timeSelect.appendChild(option);
  });
}

/* Send mail set table */
document.getElementById('reservation-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Block send form

  const form = this;
  const email = document.getElementById('email').value;
  const apiKey = '681783632587d3e2361ad3f35db1753d'; // API Key 

  // Call API check email
  fetch(`https://apilayer.net/api/check?access_key=${apiKey}&email=${encodeURIComponent(email)}&smtp=1&format=1`)
    .then(res => res.json())
    .then(data => {
      if (data.format_valid && data.smtp_check) {
        // Email valid → send form
        emailjs.sendForm('service_hx8pgh5', 'template_ac820p4', form)
          .then(function (response) {
            Toastify({
              text: "✅ Đặt bàn thành công!",
              duration: 3000,
              close: true,
              gravity: "top",
              position: "right",
              backgroundColor: "#4CAF50",
            }).showToast();
            form.reset();
          }, function (error) {
            Toastify({
              text: "❌ Gửi thất bại! Vui lòng thử lại.",
              duration: 3000,
              close: true,
              gravity: "top",
              position: "right",
              backgroundColor: "#f44336",
            }).showToast();
          });
      } else {
        // Email invalid
        Toastify({
          text: "❗ Email không hợp lệ hoặc không tồn tại.",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "#ff6b6b",
        }).showToast();
      }
    })
    .catch(error => {
      console.error("Lỗi API kiểm tra email:", error);
      Toastify({
        text: "❗ Lỗi khi kiểm tra email. Vui lòng thử lại sau.",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#f44336",
      }).showToast();
    });
});

/* Change lang placeholder booking*/
function changeLang(lang) {
  const input = document.getElementById("myInput");
  if (input) {
    if (lang === 'vi') {
      input.placeholder = "Ví dụ: Yêu cầu chỗ ngồi ngoài trời, món ăn dị ứng, kiên cử...";
    } else if (lang === 'en') {
      input.placeholder = "E.g. Outdoor seating, food allergies, abstain...";
    }
  }
}
// Call changeLang when the page loads: 
document.addEventListener('DOMContentLoaded', function () {
  // Set default language from localStorage or use 'vi'
  let lang = localStorage.getItem('language') || 'vi';
  changeLang(lang);
});

/* Floating menu */
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.floating-menu');
  const menuList = document.querySelector('.floating-list');
  const menuLinks = document.querySelectorAll('.floating-list a');

  // Toggle menu + icon 
  document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('menuBtn');
    const menuList = document.getElementById('menuList');
    if (menuBtn && menuList) {
      menuBtn.addEventListener('click', () => {
        menuList.classList.toggle('active');
        menuBtn.classList.toggle('rotate');
      });
    }
  });
  // Hide menu and reset toggle
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuList.classList.remove('active');
      menuBtn.classList.remove('rotate');
    });
  });

  // Scroll Spy 
  const sections = Array.from(menuLinks).map(link => {
    const id = link.getAttribute('href').substring(1);
    return document.getElementById(id);
  });

  const activateLink = () => {
    let currentSectionId = null;
    const scrollPosition = window.scrollY + 120;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section && scrollPosition >= section.offsetTop) {
        currentSectionId = section.id;
        break;
      }
    }

    // Remove active class 
    if (!currentSectionId) {
      menuLinks.forEach(link => link.classList.remove('active'));
      return;
    }

    // Assign/disable active class
    menuLinks.forEach(link => {
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', activateLink);
  activateLink();
});
