/**
 * SessionController
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
        res.redirect('/posts');
      });
    });
  },

  destroy : function(req,res,next) {
    req.session.destroy();
    res.redirect('/login');
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SessionController)
   */
  _config: {}

  
};
