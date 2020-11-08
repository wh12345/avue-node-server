'use strict';

// export.mysql = require('mysql')
var mysql = require('mysql')


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'avue-data',
    multipleStatements:true
});

// console.log('mysql connecting -------------------------')
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('mysql connected  as id ' + connection.threadId);
});

module.exports = connection
