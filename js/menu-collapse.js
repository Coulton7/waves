function autocollapse() {
  var navbar = $('#autocollapse');
  navbar.removeClass('collapsed'); // set standart view
  if(navbar.innerHeight() > 60) // check if we've got 2 lines
    navbar.addClass('collapsed'); // force collapse mode
}

$(document).on('ready', autocollapse);
$(window).on('resize', autocollapse);

var coverElem = $(".overlay-btn");
var elemArray = $(".last");

{
    var currElemOffset = elemArray.offset();
    var currElemWidth = elemArray.width();

    var currElemStPoint = currElemOffset.left;
    var currElemEndPoint = currElemStPoint + currElemWidth;


    if(currElemStPoint <= coverElem.offset().left &&  coverElem.offset().left <=  currElemEndPoint)
    {
        elemArray.addClass("display-none");
    }
    else
    {
        elemArray[i].removeClass("display-none");
    }
}
