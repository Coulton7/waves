(function($){
  function autocollapse() {
    var navbar = $('#autocollapse');
    navbar.removeClass('collapsed');
    if(navbar.innerHeight() > 100) {
      navbar.addClass('collapsed');
      $('#overlay-btn').addClass('display-none-important');
    } else {
      navbar.removeClass('collapsed');
      $('#overlay-btn').removeClass('display-none-important');
    }
  }

  function menuItemOverlay() {
    let overlayBtn = document.querySelector('.overlay-btn').getBoundingClientRect();
    let overlayBtnLeft = overlayBtn.left;
    let overlayBtnRight = overlayBtn.right;

    let menuItem = document.querySelector('.desktop-last').getBoundingClientRect();
    let menuItemLeft = menuItem.left;
    let menuItemRight = menuItem.right;

    if ((menuItemRight > overlayBtnLeft)) {
      $('#overlay-btn').addClass('display-none-important');
    }
    else {
      $('#overlay-btn').removeClass('display-none-important');
    }
  }

  var overlayNavbar = $('#autocollapse');

  $(document).on('ready', autocollapse);
  $(document).on('ready', menuItemOverlay);
  $(window).on('resize', function() {
    if($("#overlay-btn").hasClass("change")) {
      if(overlayNavbar.innerHeight() > 100) {
        overlayNavbar.addClass('overlay-collapse');
      } else {
        overlayNavbar.removeClass('overlay-collapse');
      }
    } else {
      autocollapse();
      overlayNavbar.removeClass('overlay-collapse');
    }
  });
  $(window).on('resize', function() {
    if($("#overlay-btn").hasClass("change")) {
      return;
    } else {
      menuItemOverlay();
    }
  });
})(jQuery);
