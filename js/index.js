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
const mm = String(today.getMonth() + 1).padStart(2, '0'); // Tháng (0-11)
const dd = String(today.getDate()).padStart(2, '0'); // Ngày

const minDate = `${yyyy}-${mm}-${dd}`;
dateInput.min = minDate;

/* Auto time */
const timeSelect = document.getElementById("time");
for (let hour = 8; hour <= 20; hour++) {
  const times = [`${hour}:00`, `${hour}:30`];
  if (hour === 20) times.pop(); // chỉ đến 21:30
  times.forEach(t => {
    const option = document.createElement('option');
    option.value = t;
    option.textContent = t;
    timeSelect.appendChild(option);
  });
}

/* Send mail set table */
document.getElementById('reservation-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Chặn gửi form

  const form = this;
  const email = document.getElementById('email').value;
  const apiKey = '681783632587d3e2361ad3f35db1753d'; // Thay bằng API Key thực tế

  // Call API check email
  fetch(`https://apilayer.net/api/check?access_key=${apiKey}&email=${encodeURIComponent(email)}&smtp=1&format=1`)
    .then(res => res.json())
    .then(data => {
      if (data.format_valid && data.smtp_check) {
        // Email hợp lệ → gửi form
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
        // Email không tồn tại
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

/* Change lang placeholder */
function changeLang(lang) {
  const input = document.getElementById("myInput");
  if (lang === 'vi') {
    input.placeholder = "Ví dụ: Yêu cầu chỗ ngồi ngoài trời, món ăn dị ứng, kiên cử...";
  } else if (lang === 'en') {
    input.placeholder = "E.g. Outdoor seating, food allergies, abstain...";
  }
}


/* Floating menu */
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.floating-menu');
  const menuList = document.querySelector('.floating-list');
  const menuLinks = document.querySelectorAll('.floating-list a');

  // Toggle menu + icon xoay
  menuBtn.addEventListener('click', () => {
    menuList.classList.toggle('active');
    menuBtn.classList.toggle('rotate');
  });

  // Khi click vào mục, ẩn menu và reset icon
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuList.classList.remove('active');
      menuBtn.classList.remove('rotate');
    });
  });

  // Scroll Spy chính xác
  const sections = Array.from(menuLinks).map(link => {
    const id = link.getAttribute('href').substring(1);
    return document.getElementById(id);
  });

  const activateLink = () => {
    let currentSectionId = null;
    const scrollPosition = window.scrollY + 120;

    // Duyệt từ dưới lên để bắt đúng section đang hiển thị
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section && scrollPosition >= section.offsetTop) {
        currentSectionId = section.id;
        break;
      }
    }

    // Nếu không ở trong bất kỳ section nào => gỡ active hết
    if (!currentSectionId) {
      menuLinks.forEach(link => link.classList.remove('active'));
      return;
    }

    // Gán/tắt class active tương ứng
    menuLinks.forEach(link => {
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', activateLink);
  activateLink(); // Gọi 1 lần khi load
});

//Hide floating button 
window.addEventListener("scroll", function() {
  const btn = document.querySelector('.floating-wrapper');
  if (window.scrollY > 100) {
    btn.classList.remove('hide');
  } else {
    btn.classList.add('hide');
  }
});