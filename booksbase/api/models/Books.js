/**
 * Books.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {      
      type: 'string',
      required: true,
      unique: true,
      maxLength: 70,
      regex: /[\wа-яё]+/gi
    },
    body: {
      type: 'string',
      required: true,
      maxLength: 50,
      regex: /^( )*[a-zа-яёі]+( )*[-,]?( )*[a-zа-яёі]+( )*[-,]?( )*[a-zа-яёі]+( )*[-,]?( )*[a-zа-яёі]+$/gi
    }
  },

  validationMessages: {
    title: {
      maxLength: 'Ви перевищили допустиму кількість символів у полі для назви книги',
      unique: 'Така книга вже існує',
      required: 'Поле для назви книги повинне бути заповненим!',
      regex: 'Пробіли це не дуже інформативно :)'
    },
    body: {
      required: 'Поле для жанру книги повинне бути заповненим!',
      maxLength: 'Ви перевищили допустиму кількість символів у полі для жанру книги',
      regex: 'Ви ввели недопустимі символи у полі для вводу жанру книги! Вводіть будь ласка тільки букви, та допустимі символи: "- ,"'
    }
  },

  connection: 'mongodb'

};

