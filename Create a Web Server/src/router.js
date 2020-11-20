var fs = require('fs');
var express = require('express');
var router = express.Router();

router.get('/books', function (req, res) {
    fs.readFile('./src/files/data.txt', 'utf-8', function (err, data) {
        if (err) {
            res.json({status: 'failed', msg: 'no books found'});
        } else {
            var booksData = data
                .split('\n')
                .filter(function (str) {
                    return str.length > 0;
                })
                .join(',');
            booksData = JSON.parse('[' + booksData  + ']');
            res.json({status: 'success', books: booksData});
        }
    })
});

router.post('/book', function(req, res) {
    var title = req.body.title,
        author = req.body.author,
        publisher = req.body.publisher,
        year = req.body.year,
        isbn = req.body.isbn;

    if (!title || !author || !publisher || !year || !isbn) {
        res.status(400).json({status: 'failed', msg: 'title, author, publisher, year and isbn are required.'});
        return;
    }
    
    var bookData = {
        title: title,
        author: author,
        publisher: publisher,
        year: year,
        isbn: isbn
    }

    fs.appendFile('./src/files/data.txt', JSON.stringify(bookData), function (err) {
        if (err) {
            console.log(err); res.json({status: 'failed', msg: 'the book was not saved'});
        } else {
            res.json({status: 'success', msg: 'the book was saved successfully'});
        }
    });
});

module.exports = router;
