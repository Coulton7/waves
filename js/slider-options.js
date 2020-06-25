(function($) {
  $(document).ready(function() {

    $('.flexslider').flexslider({
      controlNav: false,
      directionNav: false

    });

    $('.controlNav').flexslider({
      controlNav: true,
      directionNav: false
    });

    $('.carousel-slider').flexslider({
      controlNav: true,
      directionNav: true,
      animation: "slide",
      easing: "swing",
      animationLoop: true,
      pauseOnHover: true,
      maxItems: 5,
      move: 1

    });

    $('.directionNav').flexslider({
      controlNav: false,
      directionNav: true
    });

  });
})(jQuery)
