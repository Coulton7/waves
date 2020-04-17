function countdown(){
  var i = document.getElementById('counter');
  if (parseInt(i.innerHTML)<=0){

  document.getElementById('replace').textContent= "If re-direct has failed click the link above to the site";
  return;

  }
  if (parseInt(i.innerHTML)!=0){
    i.innerHTML = parseInt(i.innerHTML)-1;
  }
}

(function($){
  $(document).ready(function(){
    setInterval(function(){countdown();},1000);
  });
})(jQuery);
