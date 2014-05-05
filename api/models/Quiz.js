/**
 * Quiz
 * Вопросы викторины с четырьмя вариантами ответа
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
    // номер верного варианта
    true_number: {
      type: "integer"
    }

  }

};
