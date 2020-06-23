(function($){

  $.fn.fadeText = function(){

    var fade_text = jQuery(".fade_text");
    var quoteIndex = -1;

    function showNextQuote() {
        ++quoteIndex;
        fade_text.eq(quoteIndex % fade_text.length)
            .fadeIn(810)
            .delay(810)
            .fadeOut(810, showNextQuote);
    }

    showNextQuote();
  };

})(jQuery);

jQuery(document).ready(function(){
  jQuery('.preface').fadeText();
});
