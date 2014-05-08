$(function() {

  socket.get('/get_quote', {}, function(response){
    $('#randomimage').append('<p class="slog">' + response.quote.text +'<a href="/age/' + response.quote.age_id + '"> ' + response.quote.year +'</a></p>')
  });

});