/**
 * Quiz
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    question: {
      type: "text",
      required: true
    },
    answer_1: {
      type: "string",
      required: true
    },
    answer_2: {
      type: "string",
      required: true
    },
    answer_3: {
      type: "string",
      required: true
    },
    answer_4: {
      type: "string",
      required: true
    },
    
    true_number: {
      type: "integer"
    }
  	/* e.g.
  	nickname: 'string'
  	*/
    
  }

};
