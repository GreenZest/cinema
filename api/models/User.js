/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/
    
    name: 'string',
    password: 'string',
    email:'email'
  },

  beforeCreate : function (values, next) {
    if(!values.password || values.password != values.confirmation) {
      return next({ err : ["Password incorrect"]});
    }

    require('bcrypt').hash(values.password, 10, function(err, encryptedPassword) {
      if(err) return next(err);
      values.password = encryptedPassword;
      next();
    });
  }

};
