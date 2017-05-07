var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;


var router = function (nav) {

    bookRouter.route('/')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.find({}).toArray(function (err, results) {
                    res.render('bookListView', {
                        title: 'Hello from render in EJS',
                        nav: nav,
                        books: results,
                    });
                });
            });
        });


    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = req.params.id.trim();
            var objId = new objectId(id);
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var books = db.collection('books');
                books.findOne({ _id: objId},function (err, results) {                    
                    res.render('bookView', {
                        title: 'Book',
                        nav: nav,
                        book: results
                    }); 
                });
            });

        });
    return bookRouter;
};



module.exports = router;