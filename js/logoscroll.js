(function($) {
  $.fn.waveFade = function() {
    var self = this;
    var windowHeight = $(window)[0].innerHeight;
    var windowScrollTop = $(window).scrollTop();
    var waveFadeFunction = function() {

      return self.each(function() {
        if (windowScrollTop <= windowHeight) {
          var scrollPercent = windowScrollTop / windowHeight;

          self.find('.textlogo, .section-shadow-menu').css({
            opacity: -1.03 + scrollPercent * 4.5
          });

        }

      });
    };

    $(window).on('scroll', function() {
      windowHeight = $(window)[0].innerHeight;
      windowScrollTop = $(window).scrollTop();
      waveFadeFunction();
    });

    waveFadeFunction();
    return self;
  };

})(jQuery);

//initialize
jQuery(window).width(function(e) {

  jQuery(document).ready(function() {
    if (jQuery(window).width() > 992) {

      jQuery('.waveupper').waveFade();
    } else {
      jQuery('.textlogo, .section-shadow-menu').css({
        "opacity": "1"
      });
    }
  });
});
