$(document).ready(function() {
  $('.ogame').on( 'click', function(){
    $('.quiz').addClass('class_lol'),
    $('.main').addClass('class_inactive')
  });
  $(document).on('click', '.closeq', function(){
    $('.quiz').removeClass('class_lol'),
    $('.main').removeClass('class_inactive')
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
    // $.getScript ("http://greenzest.disqus.com/count.js")
    // alert("Вы нажали Enter!");
  }
  // Отменяем действие браузера
  return false;
}