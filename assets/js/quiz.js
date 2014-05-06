var questions = [],
  current = 0,
  count = 0,
  way = 0;

var showquestion = function(question){
  var $quiz = $('.quiz');
  if($.isEmptyObject(question)) {
    $quiz.empty();
    html = '';
    html += "<button class='closeq'></button>";
    html += "<div id='answer'>";
    html += "<p class='final'>That's all folks!</p>";
    html += " <div class='way'>Пройдено:</p>" + window.way + "</div>";
    html += " <div class='result'><p>Правильно:</p>" + window.count + "</div>";
    html += "</div>";
    $quiz.append(html);
    // $quiz.append('That\'s all folks!');
    return;
  }
  var quiz = question.quiz;
  current = question.quiz.id;
  questions.push(current);
  $quiz.empty();
  html = '';
  html += "<button class='closeq'></button>";

  html += "<div id='answer'>";

  html += "<div id='what'><b>"  + quiz.question + "</b></div>";
  html += "<div id='number'>";
  html += "<button class='bu' data-id=1 id='one'>" + quiz.answer_1 + "</button>";
  // html += "</br>";
  html += "<button class='bu' data-id=2 id='two'>" + quiz.answer_2 + "</button>";
  html += "</br>";
  html += "<button class='bu' data-id=3 id='three'>" + quiz.answer_3 + "</button>";
  // html += "</br>";
  html += "<button class='bu' data-id=4 id='four'>" + quiz.answer_4 + "</button>";
  html += "</div>";
  html += " <div class='way'><p>Пройдено:</p><span class='way_change'>" + window.way + "</span></div>";
  html += " <div class='result'><p>Правильно:</p><span class='result_change'>" + window.count + "</span></div>";
  html += "</br>";
  html += "</div>";
  $quiz.append(html);
},
  checkanswer = function(isRight){
    $('.way_change').html(++window.way);
    if(isRight.right == true)
      $('.result_change').html(++window.count);
  };


$(document).ready(function(){
  initGame();
  $(document).on('click', '.bu', function(e){
    check($(this).data('id'));
    takequestion();
  });
});

function initGame(){
  window.questions = [],
    window.current = 0,
    window.count = 0,
    window.way = 0;
  takequestion();
}

function takequestion(){
  socket.get('/quiz/getQuestion', {questions:window.questions}, showquestion);
}

function check(answer_id){
  socket.get('/quiz/getAnswer',{question_id: current, answer_id: answer_id}, checkanswer);
}
