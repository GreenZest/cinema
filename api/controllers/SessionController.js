/**
 * SessionController
 */

module.exports = {

  'new' : function(req,res) {
    res.view();
  },

  'create' : function(req,res,next) {
    if(!req.param('email') || !req.param('password')) {
      req.session.flash = {
        err : "Введите, пожалуйста, имя и пароль"
      };
      return res.redirect('/login');
    }

    User.findOneByEmail( req.param('email') ).done(function(err, user) {
      if(err) return next(err);
      if(!user) {
        req.session.flash = {
          err : "Не найден пользователь с таким именем"
        };
        return res.redirect('/login');
      }
      require('bcrypt').compare(req.param('password'), user.password, function(err, valid) {
        if(err) return next(err);
        if(!valid) {
          req.session.flash = {
            err : "Неверный пароль"
          };
          return res.redirect('/login');
        }
        req.session.authenticated = true;
        req.session.User = user;
        res.redirect('/admin');
      });
    });
  },

  destroy : function(req,res,next) {
    req.session.destroy();
    res.redirect('/login');
  },

  _config: {}

};
