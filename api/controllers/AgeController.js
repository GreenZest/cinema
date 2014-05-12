/**
 * AgeController
 */

module.exports = {

  show: function(req,res,next) {
    Tag.find().done(function(err,alltags){
      Post.findAllPostsWithTags(function(posts) {
        if(posts!='fail')
          res.view('post/query', {
            posts : posts,
            alltags : alltags
          });
        else
          res.view('post/query',{
            posts : [],
            alltags: []
          });
      }, { age_id:req.param('id') });
    });
  },
  

  'new' : function (req, res) {
    res.view();
  },

  'create' : function (req, res, next) {
    Age.create(req.params.all(),function(err,age){
      if(err){next(err); return}
      res.redirect('/age')
    });
  },

  'index' : function (req, res, next) {
    Age.find(function(err, ages){
      if(err) return next(err);
      res.view({ ages : ages });
    });
  },

  'destroy' : function (req, res, next) {
    Age.findOneById(req.param('id'), function(err,age){
      if(err) return next(err);
      if(age) age.destroy(function(err){
        if(err)
          return next(err);
        else
          res.redirect('/age');
      });
    })
  },


  _config: {}


};
