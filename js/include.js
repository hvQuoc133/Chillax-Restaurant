function filterMenu(category) {
    const items = document.querySelectorAll('.menu-item');
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    const menuContainer = document.querySelector('.menu-container');
    if (menuContainer) {
        menuContainer.scrollIntoView({ behavior: 'smooth' });
    }
    // Update AOS animations
    if (window.AOS && typeof window.AOS.refresh === 'function') {
        window.AOS.refresh();
    }
}

// When the DOM is fully loaded, fetch and insert header and footer
document.addEventListener("DOMContentLoaded", () => {
    let loaded = 0;
    function afterLoad() {
        loaded++;
        if (loaded === 2) {
            // Gắn event filter menu
            function runMenuFilter() {
                setTimeout(() => {
                    const hash = window.location.hash.substring(1);
                    filterMenu(hash || 'all');
                }, 50);
            }
            runMenuFilter();
            window.addEventListener("hashchange", runMenuFilter);

            document.querySelectorAll('.dropdown-menu a').forEach(link => {
                link.addEventListener('click', () => {
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

    fetch("header.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
            afterLoad();
            setActiveNavItem();
        });

    fetch("footer.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
            afterLoad();
        });
});