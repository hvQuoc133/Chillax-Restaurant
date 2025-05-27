document.addEventListener('DOMContentLoaded', function () {
  var grid = document.querySelector('.gallery-grid');
  // Wait for images to load before initializing Isotope
  imagesLoaded(grid, function () {
    var iso = new Isotope(grid, {
      itemSelector: '.gallery-item',
      layoutMode: 'fitRows'
    });

    var filterButtons = document.querySelectorAll('.gallery-filter button');
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        var filterValue = this.getAttribute('data-filter');
        iso.arrange({ filter: filterValue });
      });
    });
  });
});