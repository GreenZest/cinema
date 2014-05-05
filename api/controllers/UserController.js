/**
 * UserController
 */

module.exports = {

  'new' : function (req, res) {
    res.view();
  },

  'create' : function (req, res, next) {
    User.create(req.params.all(),function(err,user){
      if(err){next(err); return}
      res.redirect('/user')
    });
  },

  'index' : function (req, res, next) {
    User.find(function(err, users){
      if(err) return next(err);
      res.view({ users : users });
    });
  },

  'destroy' : function (req, res, next) {
    User.findOneById(req.param('id'), function(err,user){
      if(err) return next(err);
      if(user) user.destroy(function(err){
        if(err)
          return next(err);
        else
          res.redirect('/user');
      });
    })
  },

  _config: {}

};
