/**
 * Quiz
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs    :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    text: {
      type: "text",
      required: true
    },
    year: {
      type: "integer",
      required: true
    },
    
    age_id : "integer"
    /* e.g.
    nickname: 'string'
    */
    
  }

};