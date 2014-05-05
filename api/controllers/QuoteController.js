/**
 * QuoteController
 */

module.exports = {

  getQuote : function(req,res,next) {
    Quote.query("SELECT * FROM quote ORDER BY RANDOM() LIMIT 1", function(err, quote){
      res.json({error:err, quote:quote.rows[0]});
    });
  },

  'new' : function (req, res) {
    Age.find().done(function(err,ages){
      res.view({ ages : ages });
    });
  },

  'create' : function(req,res,next) {
    Quote.create(req.params.all(), function(err,quote){
      if(err)
        return next(err);
      // res.json({ success : true, quote : quiz });
      res.redirect('/quote');
    })
  },

  'edit' : function (req, res) {
    Age.find().done(function(err,ages){
      Quote.findOneById(req.param('id')).done(function(err,quote){
        res.view({err:err, quote : quote, ages : ages});
      });
    });
  },

  'update' : function(req,res,next) {
    Quote.update({ id : req.param('id')} ,
      { text : req.param('text'),
        year : req.param('year'),
        age_id : req.param('age_id')
      },
      function(err,quote){
        if(err)
          return next(err);
        res.redirect('/quote');
      }
    );
  },

  'index' : function (req, res, next) {
    Quote.find(function(err, quotes){
      if(err) return next(err);
      res.view({ quotes : quotes });
    });
  },

  'destroy' : function (req, res, next) {
    Quote.findOneById(req.param('id'), function(err,quotes){
      if(err) return next(err);
      if(quotes) quotes.destroy(function(err){
        if(err)
          return next(err);
        else
          res.redirect('/quote');
      });
    })
  },

  _config: {}


};
