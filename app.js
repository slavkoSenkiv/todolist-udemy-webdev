const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    var today = new Date();
    var currentDay = today.getDay();

    if (currentDay === 6 || currentDay === 0){
        var day = 'Weekend 😀';
        var desc = 'taste it while you can';
        res.render('list', {typeOfDay : day, about : desc});
    } else {
        var day = 'Weekday 🥸';
        var desc = 'wait a little bit more';
        res.render('list', {typeOfDay : day, about : desc});
    }
});

app.listen(3000, function(){
    console.log('server is up and listening to port 3000');
});