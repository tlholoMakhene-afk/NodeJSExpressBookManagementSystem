const express = require('express');
const MongoClient = require('mongodb').MongoClient
const bodyParser= require('body-parser')
var ObjectID = require('mongodb').ObjectID;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const mongodbURL = 'mongodb+srv://dbUser:dbUserPassword@mynodedata.zcfxf.mongodb.net/dbLibraryManagment?retryWrites=true&w=majority';
MongoClient.connect(mongodbURL,{ useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
  if (err) return console.log(err)

  let dbase = db.db("dbLibraryManagment");

  app.post('/books/add', (req, res, next) => {

    let book = {
      _id: new ObjectID(),
      title: req.body.title,
      author: req.body.author,
      date_of_publication: req.body.date_of_publication,
      book_category: req.body.book_category,
    };
    dbase.collection("books").insertOne(book, (err, result) => {
      if(err) {
        console.log(err);
      }

      res.send('book added successfully');
    });

  });

  app.get('/books', (req, res, next) => {
    dbase.collection('books').find().toArray( (err, results) => {
      res.send(results)
    });
  });

  app.get('/books/:id', (req, res, next) => {
    if(err) {
      throw err;
    }

    let id = ObjectID(req.params.id);
    dbase.collection('books').find(id).toArray( (err, result) => {
      if(err) {
        throw err;
      }

      res.send(result);
    });
  });

  app.put('/books/update/:id', (req, res, next) => {
    var id = {
      _id: new ObjectID(req.params.id)
    };

    dbase.collection("books").updateOne(id, {$set:{ "title": req.body.title, "author": req.body.author, "date_of_publication": req.body.date_of_publication,"book_category": req.body.book_category}}, (err, result) => {
      if(err) {
        throw err;
      }

      res.send('book updated sucessfully');
    });
  });

  app.delete('/books/delete/:id', (req, res, next) => {
    let id = ObjectID(req.params.id);

    dbase.collection('books').deleteOne({_id: id}, (err, result) => {
      if(err) {
        throw err;
      }

      res.send('book deleted');
    });
  });

  app.use((req, res, next) => {
      const error = new Error('Not Found');
      error.status = 404;
      next(error);//forwards to the next with the error
    });

  app.use((error, req, res, next) => {
      res.status(error.status || 500).json({
          error:
          {
              message: error.message,
          }
      });

    });
});

module.exports = app;