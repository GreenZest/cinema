/**
 * Global adapter config
 * 
 * The `adapters` configuration object lets you create different global "saved settings"
 * that you can mix and match in your models.  The `default` option indicates which 
 * "saved setting" should be used if a model doesn't have an adapter specified.
 *
 * Keep in mind that options you define directly in your model definitions
 * will override these settings.
 *
 * For more information on adapter configuration, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.adapters = {
  'default': 'postgre',

  mongo: {
    module   : 'sails-mongo',
    host     : 'localhost',
    port     : 27017,
    user     : 'dg',
    password : 'monster',
    database : 'cinema'

  },

  local_postgre: {
    module   : 'sails-postgresql',
    host     : 'localhost',
    port     : 5432,
    user     : 'dg',
    password : 'monster',
    database : 'cinema'
  },

  postgre: {
    module   : 'sails-postgresql',
    host     : 'ec2-54-204-40-96.compute-1.amazonaws.com',
    port     : 5432,
    user     : 'piqsjknhsvcsex',
    password : '56YqQL4E3kfN3BrWUUfyaaErIb',
    database : 'dc71n0s8852a7t',
    ssl: true
  }
};