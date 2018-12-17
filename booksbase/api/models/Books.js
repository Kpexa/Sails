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
      regex: /[\wа-яё]+/gi
    },
    body: {
      type: 'string',
      required: true,
      regex: /^( )*[a-zа-яё]+(,)?( )*(,)?(-)?( )*[a-zа-яё]+( )*$/gi
    }
  },

  connection: 'mongodb'

};

