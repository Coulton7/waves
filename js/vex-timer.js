(function($) {
  $(document).ready(function() {
    function vex_counter(seconds) {
      seconds = parseInt(sessionStorage.getItem("seconds")) || seconds;

      function tick() {
        seconds--;
        sessionStorage.setItem("seconds", seconds);
        if (seconds > 0) {
          setTimeout(tick, 1000);
        }
        else{
          if (sessionStorage.getItem('vexClosed') != 'closed') {
            vex.dialog.open({
              message: "Can't find what you are looking for maybe try going to aesseal.com",
              contentClassName: 'text-center',
              buttons: [
                $.extend({}, vex.dialog.buttons.YES, {
                  className: 'col-lg-4 col-lg-pull-2 col-xs-5 col-xs-pull-1 btn-red',
                  text: 'Go to aesseal.com',
                  click: function() {
                    window.location.href = 'https://www.aesseal.com/';
                  }
                }),
                $.extend({}, vex.dialog.buttons.NO, {
                  className: 'col-xs-5 col-xs-pull-1 col-lg-4 col-lg-pull-2 btn-default',
                  text: 'Remain on this site',
                })
              ],
              afterClose: function() {
                sessionStorage.setItem('vexClosed', 'closed');
              }
            });
          }
        }
        tick();
      }
    }
    vex_counter(10);
    
    if(vex_counter(0)){
      if (sessionStorage.getItem('vexClosed') != 'closed') {
        vex.dialog.open({
          message: "Can't find what you are looking for maybe try going to aesseal.com",
          contentClassName: 'text-center',
          buttons: [
            $.extend({}, vex.dialog.buttons.YES, {
              className: 'col-lg-4 col-lg-pull-2 col-xs-5 col-xs-pull-1 btn-red',
              text: 'Go to aesseal.com',
              click: function() {
                window.location.href = 'https://www.aesseal.com/';
              }
            }),
            $.extend({}, vex.dialog.buttons.NO, {
              className: 'col-xs-5 col-xs-pull-1 col-lg-4 col-lg-pull-2 btn-default',
              text: 'Remain on this site',
            })
          ],
          afterClose: function() {
            sessionStorage.setItem('vexClosed', 'closed');
          }
        });
      }
    }
  });
})(jQuery);
