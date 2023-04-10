const express = require('express');
const app = express();

app.get('/', function(req, res){
    var today = new Date();
    var currentDay = today.getDay();

    if (currentDay === 6 || currentDay === 0){
        res.sendFile(__dirname + '/index.html');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.listen(3000, function(){
    console.log('server is up and listening to port 3000');
});