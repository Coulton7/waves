(function($){

  $.fn.contactIcon = function(){

    var contact_icon = jQuery(".contact_icon");
    var contactIcon = -1;

    function showNextIcon() {
        ++contactIcon;
        contact_icon.eq(contactIcon % contact_icon.length)
            .show(0)
            .delay(5500)
            .hide(0, showNextIcon);
    }

    showNextIcon();
  }

})(jQuery);

jQuery(document).ready(function(){
  jQuery('.socialmedia').contactIcon();
});
