
function filterMenu(category) {
    const items = document.querySelectorAll('.menu-item');
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    // Scroll lên phần menu
    document.querySelector('.menu-container').scrollIntoView({ behavior: 'smooth' });
}

// Khi trang đã tải
document.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash.substring(1); // bỏ dấu #
    if (hash) {
        filterMenu(hash);
    } else {
        filterMenu('all');
    }
});

// 🔁 Lắng nghe khi người dùng thay đổi hash (ví dụ click #pizza từ #beef)
window.addEventListener("hashchange", () => {
    const hash = window.location.hash.substring(1);
    filterMenu(hash);
});

// Đóng dropdown menu khi chọn một mục
document.querySelectorAll('.dropdown-menu a').forEach(link => {
    link.addEventListener('click', () => {
        // Tìm dropdown cha
        const dropdown = link.closest('.dropdown');
        if (dropdown) {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle && bootstrap) {
                const instance = bootstrap.Dropdown.getInstance(toggle);
                if (instance) {
                    instance.hide(); // Đóng dropdown
                }
            }
        }
    });
});