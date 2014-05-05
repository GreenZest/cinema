$(document).ready(function() {
  $('.ogame').on( 'click', function(){
    $('.quiz').addClass('class_lol'),
    $('.main').addClass('class_inactive')
    // $('.blur').addClass('class_hello')
  });
  $(document).on('click', '.closeq', function(){
    $('.quiz').removeClass('class_lol'),
    $('.main').removeClass('class_inactive')
    // $('.blur').removeClass('class_hello')
    });
});

document.onkeyup = function (u) {
  closeSearch(u);
  closeGame(u);
}

function closeGame(u) {
  u = u || window.event;
    if (u.keyCode === 27) {
    $('.quiz').removeClass('class_lol'),
    $('.main').removeClass('class_inactive')
    // $('.blur').removeClass('class_hello')
    // $.getScript ("http://greenzest.disqus.com/count.js")
    // alert("Вы нажали Enter!");
  }
  // Отменяем действие браузера
  return false;
}