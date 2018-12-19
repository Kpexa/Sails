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
        let errString = JSON.stringify(err.Errors);
        if(errString.indexOf('"title"') >= 0){
          res.view('error', {message: err.Errors.title[0].message});
          return;
        }
        res.view('error', {message: err.Errors.body[0].message}); 
        return;         
      }
      res.redirect('/books/list');      
    });
  },

  delete: function(req, res){
    Books.destroy({id: req.params.id}).exec(function(err){
      if(err){
        res.view(500, {error: 'Помилка бази даних!'});
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
        let errString = JSON.stringify(err.Errors);
        if(errString.indexOf('"title"') >= 0){
          res.view('error', {message: err.Errors.title[0].message});
          return;
        }
        res.view('error', {message: err.Errors.body[0].message}); 
        return;         
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

