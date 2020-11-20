var express = require("express");
var cors = require('cors')
var app = express();
var router = require('./router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', router);

var port = 1234;
app.listen(port, function () {
    console.log('server running: http://localhost:%s/  (Ctrl+C to Quit)', port);
});
