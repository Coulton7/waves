(function($){
  $(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
  });

  $(document).ready(function(){
    var forestBackground = document.getElementById('forestBackground');

    function loadImgs() {
      var src1;
      if (window.matchMedia("only screen and (max-width:991px)").matches){
        var src1 = forestBackground.getAttribute('data-src-small');
      } else {
        var src1 = forestBackground.getAttribute('data-src-large');
      }

      forestBackground.setAttribute('data-src', src1);

      forestBackground.removeAttribute('data-was-processed');
    }

    loadImgs();

    var lastWindowSize = window.innerWidth;

    window.onresize = function (event){
      var currentWindowSize = window.innerWidth;
      if ((lastWindowSize <= 991 && currentWindowSize > 991) || (lastWindowSize > 991 && currentWindowSize <= 991)){
        loadImgs();
      }

      lastWindowSize = currentWindowSize;
    };
    $(function(){
      $('.lazy').lazy();
    })
  });
})(jQuery);
