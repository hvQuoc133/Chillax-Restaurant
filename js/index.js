/* ---INDEX JS--- */
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