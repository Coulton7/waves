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
    let overlayBtn = document.querySelector('.overlay-btn').getBoundingClientRect();
    let overlayBtnLeft = overlayBtn.left;

    let menuItem = document.querySelector('.desktop-last').getBoundingClientRect();
    let menuItemRight = menuItem.right;

    if ((menuItemRight > overlayBtnLeft)) {
      $('#overlay-btn').addClass('display-none-important');
    }
    else {
      $('#overlay-btn').removeClass('display-none-important');
    }
  }

  $(document).on('ready', autocollapse);
  $(document).on('ready', menuItemOverlay);
  $(window).on('resize', function() {
    if($(".change")[0]) {
      return;
    } else {
      autocollapse;
  	}
  });
  $(window).on('resize', function() {
    if($(".change")[0]) {
      return;
    } else {
      menuItemOverlay;
  	}
  });
})(jQuery);
