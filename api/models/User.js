/**
 * User
 * Пользователи. Модель для хранения учетных записей администраторов
 */

module.exports = {

  attributes: {
    name: 'string',
    password: 'string',
    email:'email'
  },

  // При создании пользователя шифруем его пароль
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
