function autocollapse() {
  var navbar = $('#autocollapse');
  navbar.removeClass('collapsed'); // set standart view
  if (navbar.innerHeight() > 60) // check if we've got 2 lines
    navbar.addClass('collapsed'); // force collapse mode
}

(function($) {
  function menuOverlay() {
    var overlayElem = document.querySelector('.overlay-btn');
    var menuItem = document.querySelector('.last');

    var overlayBound = overlayElem.getBoundingClientRect();
    var menuBound = menuItem.getBoundingClientRect();

    if (menuBound.top + menuBound.height > overlayBound.top &&
      menuBound.left + menuBound.width > overlayBound.left &&
      menuBound.bottom - menuBound.height < overlayBound.bottom &&
      menuBound.right - menuBound.width < overlayBound.right) {
      overlayElem.addClass("display-none");
    }
  }

  $(document).on('ready', menuOverlay);
  $(window).on('resize', menuOverlay);
  $(document).on('ready', autocollapse);
  $(window).on('resize', autocollapse);
});
(jQuery)
