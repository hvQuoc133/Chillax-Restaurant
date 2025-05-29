/* Send mail contact */
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Block send form

    const form = this;
    const email = document.getElementById('email').value;
    const apiKey = '681783632587d3e2361ad3f35db1753d'; // API Key 

    // Call API check email
    fetch(`https://apilayer.net/api/check?access_key=${apiKey}&email=${encodeURIComponent(email)}&smtp=1&format=1`)
        .then(res => res.json())
        .then(data => {
            if (data.format_valid && data.smtp_check) {
                // Email valid -> send mail
                emailjs.sendForm('service_9fooih6', 'template_xh917in', form)
                    .then(function (response) {
                        Toastify({
                            text: "✅ Phản hồi thành công!",
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

/* Change lang placeholder contact*/
function changeLang(lang) {
    const input = document.getElementById("inputContact");
    if (input) {
        if (lang === 'vi') {
            input.placeholder = "Ví dụ: Nêu ý kiến góp ý của bạn về nhà hàng, món ăn, dịch vụ...";
        } else if (lang === 'en') {
            input.placeholder = "E.g. Share your feedback about the restaurant, food, service...";
        }
    }
}

// Call changeLang when the page loads: 
document.addEventListener('DOMContentLoaded', function () {
    // Set default language from localStorage or use 'vi'
    let lang = localStorage.getItem('language') || 'vi';
    changeLang(lang);
});

