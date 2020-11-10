//front end application
// load the things we need
var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var app = express();
var helper = require('./Helper');

// set the view engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

// index page
app.get('/', function(req, res) {
   helper.getAllBooks().then((response)=>{
    res.render('pages/index', {page:'Home', menuId:'home', Books: response});
   }).catch(err=>{console.log(err);}); 
});

// about us page
app.get('/about', function(req, res) {
    res.render('pages/about', {page:'About', menuId:'about'});
 });

 // contact us page
app.get('/contact', function(req, res) {
    res.render('pages/contact', {page:'Contact', menuId:'contact'});
 });


//insert - form page
app.get('/form', function(req, res) {
    res.render('pages/form', {page:'Form', menuId:'form',action:"Insert", categories: helper.categories, object: null});
});

//update - form page
app.get('/patch/:bookId', function(req, res) {
    helper.getBookByID(req.params.bookId).then((response)=>{
      res.render('pages/form', {page:'Form', menuId:'form',action:"Update", categories: helper.categories, object: response[0]});
     }).catch((err)=>{console.log(err);});
   
});

// delete book
app.get('/delete/:bookId', function(req, res) {
    let bookID = req.params.bookId;
    helper.DeleteBook(bookID).then((response)=>{
        console.log(response);
         //redirect to main page, sort of refresh 
        res.redirect('/');
    }).catch((err)=>{console.log(err);});
});

//insert new book
app.post('/Insert', function(req, res)
{
   let paramsObj = req.body; 
   helper.InsertBook(paramsObj).then((response)=>{
       console.log(response);
       //redirect to main page, sort of refresh
       res.redirect('/');
    }).catch((err)=>{console.log(err);})  
    
})

// post book
app.post('/Update/:bookId', function(req, res) {
    let bookID = req.params.bookId;
    helper.UpdateBook(bookID, req.body).then((response)=>{
        console.log(response);
         //redirect to main page, sort of refresh 
        res.redirect('/');
    }).catch((err)=>{console.log(err);});
});
module.exports = app;