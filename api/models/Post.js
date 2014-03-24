/**
 * Post
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	title: {
  		type: 'string',
  		required: true
  	},
    body: {
      type: 'text'
    },
    preview: {
      type: 'text'
    }
  	/* e.g.
  	nickname: 'string'
  	*/
    
  }

};
