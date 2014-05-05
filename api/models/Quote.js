/**
 * Quote
 * Цитаты из фильмов
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
    // связь с десятилетием
    age_id : "integer"
  }

};
