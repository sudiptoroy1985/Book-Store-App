var express = require("express");

var app = express();

var sql = require('mssql');

var config = {
    user: 'LocalDev',
    password: 'sas2nlt1.',
    server: 'gk5cdsnp65.database.windows.net',
    database: 'Books',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options:{
        encrypt:true
    }
};

sql.connect(config,function(err){
    if(err){
        console.log(err);
    }    
});

var port = process.env.PORT || 5000;

var nav = [{
                Link: '/Books',
                Text: 'Book'
            },
            {
                Link: '/Authors',
                Text: 'Author'
            },
        ];


var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);

app.use(express.static("public"));
app.set('views', "./src/views");
app.set('view engine', 'ejs');
//app.use('/',bookRouter);
app.use('/Books',bookRouter);
app.use('/',bookRouter);


app.use('/Admin', adminRouter);


app.listen(port, function (err) {
    console.log('running server on port ' + port);
});