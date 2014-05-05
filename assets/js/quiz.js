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
    html += "<p class='final'>That's all folks!</p>";
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
  html += "<div class='way'> Пройдено 0</div>";
  html += "<div class='result'>Правильно 0</div>";
  html += "</br>";
  html += "</div>";
  $quiz.append(html);
},
  checkanswer = function(isRight){
    $('.way').html(++window.way);//просто вывести фигню в хтмл
    if(isRight.right == true)
      $('.result').html(++window.count);
  };


$(document).ready(function(){
  takequestion();
  $(document).on('click', '.bu', function(e){
    check($(this).data('id'));
    takequestion();
  });
});

function takequestion(){
  socket.get('/quiz/getQuestion', {questions:window.questions}, showquestion);
}

function check(answer_id){
  socket.get('/quiz/getAnswer',{question_id: current, answer_id: answer_id}, checkanswer);
}