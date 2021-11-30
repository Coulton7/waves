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

  function menuItemOverlay() {
    var overlayBtn = document.querySelector('.overlay-btn').getBoundingClientRect();
    var overlayBtnLeft = overlayBtn.left;
    var overlayBtnRight = overlayBtn.right;

    var menuItem = document.querySelector('.last').getBoundingClientRect();
    var menuItemLeft = menuItem.left;
    var menuItemRight = menuItem.right;

    if ((menuItemRight >= overlayBtnLeft) && (menuItemRight < overlayBtnRight)) {
      var horizontalMatch = true
    }
    else {
      var horizontalMatch = false
    }

    if (horizontalMatch == true) {
      $('#overlay-btn').addClass('display-none')
    } else {
      $('#overlay-btn').removeClass('display-none')
    }
  }

  $(document).on('ready', autocollapse);
  $(document).on('ready', menuItemOverlay);
  $(window).on('resize', autocollapse);
  $(window).on('resize', menuItemOverlay);
})(jQuery);
