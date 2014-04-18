/**
 * QuizController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
        'new' : function (req, res) {
          Quiz.find().done(function(err,quiz){
            res.view({err:err, quiz : quiz});
          });
        },

        'create' : function(req,res,next) {
        Quiz.create(req.params.all(), function(err,quiz){
          if(err)
            return next(err);
          res.json({ success : true, quiz : quiz });
          res.redirect('/quiz');
        })
      },

        'getQuestion' : function (req, res) {
          var already_asked = req.param('questions');
          var where = '';
          if(already_asked.length > 0)
            where =  " WHERE id not in ("+ already_asked.join(",") +") ";
          console.log("SELECT * FROM Quiz " +where+" ORDER BY RANDOM() LIMIT 1");
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

  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to QuizController)
   */
  _config: {}

  
};
