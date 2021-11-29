(function($){
  function autocollapse() {
    var navbar = $('#autocollapse');
    navbar.removeClass('collapsed');
    if(navbar.innerHeight() > 60) {
      navbar.addClass('collapsed');
      $('#overlayBtn').addClass('display-none-important');
    } else {
      navbar.removeClass('collapsed');
      $('#overlayBtn').removeClass('display-none-important');
    }
  }

  function menuOverlay() {
    var overlayBtn = document.querySelector('.overlay-btn').getBoundingClientRect();
    var overlayBtnTop = overlayBtn.top;
    var overlayBtnLeft = overlayBtn.left;
    var overlayBtnRight = overlayBtn.right
    var overlayBtnBottom = overlayBtn.bottom

    var menuItem = document.querySelector('.last').getBoundingClientRect();
    var menuItemTop = menuItem.top;
    var menuItemLeft = menuItem.left;
    var menuItemRight = menuItem.right
    var menuItemBottom = menuItem.bottom

    if ((menuItemRight > overlayBtnLeft && menuItemRight < overlayBtnRight) || (menuItemLeft < overlayBtnRight && menuItemLeft > overlayBtnLeft)) {
      var horizontalMatch = true
    } else {
      var horizontalMatch = false
    }

    if (horizontalMatch) {
      overlayBtn.addClass('display-none')
    } else {
      overlayBtn.removeClass('display-none')
    }
  }

  $(document).on('ready', autocollapse);
  $(document).on('ready', menuOverlay);
  $(window).on('resize', autocollapse);
  $(window).on('resize', menuOverlay);
})(jQuery);
