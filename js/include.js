function filterMenu(category) {
    const items = document.querySelectorAll('.menu-item');
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    // Cuộn lên phần menu nếu cần
    const menuContainer = document.querySelector('.menu-container');
    if (menuContainer) {
        menuContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let loaded = 0;
    function afterLoad() {
        loaded++;
        if (loaded === 2) {
            runMenuFilter();
            window.addEventListener("hashchange", runMenuFilter);

            // Đóng dropdown menu khi chọn một mục (lúc này header đã có trên DOM)
            document.querySelectorAll('.dropdown-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    // Tìm dropdown cha
                    const dropdown = link.closest('.dropdown');
                    if (dropdown) {
                        const toggle = dropdown.querySelector('.dropdown-toggle');
                        if (toggle && window.bootstrap) {
                            const instance = window.bootstrap.Dropdown.getInstance(toggle);
                            if (instance) {
                                instance.hide(); // Đóng dropdown
                            }
                        }
                    }
                });
            });
        }
    }
    function runMenuFilter() {
        const hash = window.location.hash.substring(1);
        filterMenu(hash || 'all');
    }

    fetch("header.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;http://127.0.0.1:5500/drinkMenu.html#drink-1
            afterLoad();
        });

    fetch("footer.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
            afterLoad();
        });
});