/**
 * BooksController
 *
 * @description :: Server-side logic for managing books
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	list: function(req, res){
    Books.find({}).exec(function(err, books){
      if(err){
        res.send(500, {error: 'Помилка бази даних!'});
      }
      res.view('list', {books: books});
    })         
  },

  add: function(req, res){
    res.view('add');
  },

  create: function(req, res){
    let title = req.body.title;
    let body = req.body.body;

    Books.create({title: title, body: body}).exec(function(err){
      if(err){               
        if(err.message.indexOf('title') >= 0 && err.message.indexOf('"required"') >= 0){
          err.message = 'У полі для вводу назви книги, пусте значення НЕДОПУСТИМЕ!';
          res.view('error', {message: err.message});
          return;
        }else if(err.message.indexOf('body') >= 0 && err.message.indexOf('"required"') >= 0){
          err.message = 'У полі для вводу жанру книги, пусте значення НЕДОПУСТИМЕ!';                     
          res.view('error', {message: err.message});        
          return;
        }else if(err.message.indexOf('title') >= 0 && err.message.indexOf('"regex"') >= 0){
          err.message = 'Ви ввели не валідне значення для назви книги! Пробіли - це не дуже інформативно :)';                     
          res.view('error', {message: err.message});        
          return;
        }else if(err.message.indexOf('body') >= 0 && err.message.indexOf('"regex"') >= 0){
          err.message = 'Ви ввели недопустимі символи у полі для вводу жанру книги! Вводіть будь ласка тільки букви, та допустимі символи: "- ,"';                     
          res.view('error', {message: err.message});        
          return;
        }
      }
      res.redirect('/books/list');      
    });
  },

  delete: function(req, res){
    Books.destroy({id: req.params.id}).exec(function(err){
      if(err){
        res.send(500, {error: 'Помилка бази даних!'});
      }
      res.redirect('/books/list');
    });
    return;
  },

  edit: function(req, res){
    Books.findOne({id: req.params.id}).exec(function(err, book){
      if(err){        
        res.send(500, {error: 'Помилка бази даних!'});
      }
      res.view('edit', {book: book});
    });
  },

  update: function(req, res){
    let title = req.body.title;
    let body = req.body.body;

    Books.update({id: req.params.id}, {title: title, body: body}).exec(function(err){
      if(err){               
        if(err.message.indexOf('title') >= 0 && err.message.indexOf('"required"') >= 0){
          err.message = 'У полі для вводу назви книги, пусте значення НЕДОПУСТИМЕ!';
          res.view('error', {message: err.message});
          return;
        }else if(err.message.indexOf('body') >= 0 && err.message.indexOf('"required"') >= 0){
          err.message = 'У полі для вводу жанру книги, пусте значення НЕДОПУСТИМЕ!';                     
          res.view('error', {message: err.message});        
          return;
        }else if(err.message.indexOf('title') >= 0 && err.message.indexOf('"regex"') >= 0){
          err.message = 'Назва книги перевищує допистиму довжину символів!';                     
          res.view('error', {message: err.message});        
          return;
        }else if(err.message.indexOf('body') >= 0 && err.message.indexOf('"regex"') >= 0){
          err.message = 'Недопустимий жанр книги!';                     
          res.view('error', {message: err.message});        
          return;        
        }
      }
      res.redirect('/books/list');
    });
    return;    
  },

  filter_title_by_alphabet: function(req, res){    
    Books.find({}).sort({ title: 1 }).exec(function(err, books){
      if(err){
        res.send(500, {error: 'Помилка бази даних!'});
      }
      res.view('list', {books: books});
    })             
  },
  
  filter_title_by_non_alphabet: function(req, res){    
    Books.find({}).sort({ title: -1 }).exec(function(err, books){
      if(err){
        res.send(500, {error: 'Помилка бази даних!'});
      }
      res.view('list', {books: books});
    })             
  },

  filter_body_by_non_alphabet: function(req, res){
    Books.find({}).sort({ body: -1 }).exec(function(err, books){
      if(err){
        res.send(500, { error: 'Помилка бази даних!' });
      }
      res.view('list', { books: books });
    });
  },

  filter_body_by_alphabet: function(req, res){
    Books.find({}).sort({ body: 1 }).exec(function(err, books){
      if(err){
        res.send(500, { error: 'Помилка бази даних!' });
      }
      res.view('list', { books: books });
    });
  }
    
};

