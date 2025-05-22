/* Send mail contact */
document.getElementById('contact-form').addEventListener('submit', function (event) {
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
