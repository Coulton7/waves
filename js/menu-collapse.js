(function($){
  function autocollapse() {
    var navbar = $('#autocollapse');
    navbar.removeClass('collapsed');
    if(navbar.innerHeight() > 60) {
      navbar.addClass('collapsed');
      $('#overlay-btn').addClass('display-none-important');
    } else {
      navbar.removeClass('collapsed');
      $('#overlay-btn').removeClass('display-none-important');
    }
  }

  function menuOverlay() {
    var overlayElem = document.querySelector('.overlay-btn');
    var menuItem = document.querySelector('.last');

    var overlayBound = overlayElem.getBoundingClientRect();
    var menuBound = menuItem.getBoundingClientRect();

  }

  console.log(overlayBound);
  console.log(menuBound);
  $(document).on('ready', autocollapse);
  $(window).on('resize', autocollapse);
})(jQuery);
