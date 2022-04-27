(function($) {

  $(document).ready(function() {
    var block = $('.float-block'),
      nav = $('.side-menu'),
      windowScreen = $(window),
      navOffset = nav.offset().bottom,
      blockWidth = $(".region-sidebar-first").width(),
      previousScroll = 0;

    if (windowScreen.scrollTop() >= navOffset && !block.hasClass('sticky')) {
      block.addClass('sticky');
      block.css('width', blockWidth + 'px');
    }
    $(window).on('scroll', function() {

      if (windowScreen.scrollTop() >= navOffset && !block.hasClass('sticky')) {
        block.addClass('sticky');
        block.css('width', blockWidth + 'px');
      }

      if (windowScreen.scrollTop() < navOffset && block.hasClass('sticky')) {
        block.removeClass('sticky');
      }

    });
  });
})(jQuery);
