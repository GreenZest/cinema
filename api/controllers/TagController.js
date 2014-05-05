/**
 * TagController
 */

module.exports = {

  create : function(req,res,next) {
    Tag.create(req.params.all(), function(err,tag){
      if(err)
        return next(err);
      res.json({ success : true, tag : tag })
    })
  },

  'index' : function (req, res, next) {
    Tag.find(function(err, tags){
      if(err) return next(err);
      res.view({ tags : tags });
    });
  },

  'destroy' : function (req, res, next) {
    Tag.findOneById(req.param('id'), function(err,tag){
      if(err) return next(err);
      if(tag) tag.destroy(function(err){
        if(err)
          return next(err);
        else
          res.redirect('/tag');
      });
    })
  },

  _config: {}

};
