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
    let overlayBtn = document.querySelector('.overlay-btn').getBoundingClientRect();
    let overlayBtnTop = overlayBtn.top;
    let overlayBtnLeft = overlayBtn.left;
    let overlayBtnRight = overlayBtn.right
    let overlayBtnBottom = overlayBtn.bottom

    let menuItem = document.querySelector('.last').getBoundingClientRect();
    let menuItemTop = menuItem.top;
    let menuItemLeft = menuItem.left;
    let menuItemRight = menuItem.right
    let menuItemBottom = menuItem.bottom

    if ((menuItemRight > overlayBtnLeft && menuItemRight < overlayBtnRight) || (menuItemLeft < overlayBtnRight && menuItemLeft > overlayBtnLeft)) {
      let horizontalMatch = true
    } else {
      let horizontalMatch = false
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
