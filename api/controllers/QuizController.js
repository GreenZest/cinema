/**
 * QuizController
 */

module.exports = {
  'new' : function (req, res) {
    // Quiz.find().done(function(err,quiz){
      res.view();
    // });
  },

  'create' : function(req,res,next) {
    Quiz.create(req.params.all(), function(err,quiz){
      if(err)
        return next(err);
      // res.json({ success : true, quiz : quiz });
      res.redirect('/quiz');
    })
  },

  'edit' : function (req, res) {
    Quiz.findOneById(req.param('id')).done(function(err,quiz){
      res.view({err:err, quiz : quiz});
    });
  },

  'update' : function(req,res,next) {
    Quiz.update({ id : req.param('id')} ,
      { question : req.param('question'),
        answer_1 : req.param('answer_1'),
        answer_2 : req.param('answer_2'),
        answer_3 : req.param('answer_3'),
        answer_4 : req.param('answer_4'),
        true_number : req.param('true_number')
      },
      function(err,quiz){
        if(err)
          return next(err);
        res.redirect('/quiz');
      }
    );
  },

  'index' : function (req, res, next) {
    Quiz.find(function(err, quiz_items){
      if(err) return next(err);
      res.view({ quiz_items : quiz_items });
    });
  },

  'destroy' : function (req, res, next) {
    Quiz.findOneById(req.param('id'), function(err,quiz){
      if(err) return next(err);
      if(quiz) quiz.destroy(function(err){
        if(err)
          return next(err);
        else
          res.redirect('/quiz');
      });
    })
  },

  'getQuestion' : function (req, res) {
    var already_asked = req.param('questions');
    var where = '';
    if(already_asked.length > 0)
      where =  " WHERE id not in ("+ already_asked.join(",") +") ";
    Quiz.query("SELECT id, question, answer_1,answer_2,answer_3,answer_4 FROM Quiz " +where+" ORDER BY RANDOM() LIMIT 1",  function(err, quiz){
      if(err)
        return res.json({ error : err });
      res.json({ quiz : quiz.rows[0] });
    });
  },

  'getAnswer' : function (req, res) {
    Quiz.findOneById(req.param('question_id')).done(function(err,question) {
      if(question.true_number == req.param('answer_id'))
        res.json({ right : true });
      else
        res.json({ right : false });
    });
  },

  _config: {}

};
