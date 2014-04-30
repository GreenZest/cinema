$(document).ready(function() {
  $('.open'). on( 'click', function(){
    $('.search').addClass('class_active'),
    $('.main').addClass('class_inactive')
    });
    $('.close'). on( 'click', function(){
    $('.search').removeClass('class_active'),
    $('.main').removeClass('class_inactive')
    });
});


function closeSearch(j) {
  j = j || window.event;
  if (j.keyCode === 13) {
    $('.search').removeClass('class_active'),
    $('.main').removeClass('class_inactive')
    // $.getScript ("http://greenzest.disqus.com/count.js")
    // alert("Вы нажали Enter!");
  }
  // Отменяем действие браузера
  // return false;

  else if (j.keyCode === 27) {
    $('.search').removeClass('class_active'),
    $('.main').removeClass('class_inactive')
    // $.getScript ("http://greenzest.disqus.com/count.js")
    // alert("Вы нажали Enter!");
  }
  // Отменяем действие браузера
  return false;
}