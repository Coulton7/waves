function autocollapse() {
  var navbar = $('#autocollapse');
  navbar.removeClass('collapsed'); // set standart view
  if(navbar.innerHeight() > 60) // check if we've got 2 lines
    navbar.addClass('collapsed'); // force collapse mode
}

$(document).on('ready', autocollapse);
$(window).on('resize', autocollapse);
