const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    var today = new Date();
    var currentDay = today.getDay();

    switch(currentDay){
        case 0 :
            var day = 'Sunday 😀';
            var desc = '1 taste it while you can';
            res.render('list', {typeOfDay : day, about : desc});
            break;
        case 1 :
            var day = 'Monday 😀';
            var desc = '2 taste it while you can';
            res.render('list', {typeOfDay : day, about : desc});
            break;
        case 2 :
            var day = 'Tuesday 😀';
            var desc = '3 taste it while you can';
            res.render('list', {typeOfDay : day, about : desc});
            break;
        case 3 :
            var day = 'Wednessday 😀';
            var desc = '4 taste it while you can';
            res.render('list', {typeOfDay : day, about : desc});
            break;
        case 4 :
            var day = 'the  😀';
            var desc = '5 taste it while you can';
            res.render('list', {typeOfDay : day, about : desc});
            break;
        case 5 :
            var day = 'fri 😀';
            var desc = '6 taste it while you can';
            res.render('list', {typeOfDay : day, about : desc});
            break;
        case 6 :
            var day = 'sat 😀';
            var desc = '7 taste it while you can';
            res.render('list', {typeOfDay : day, about : desc});
            break;
        default:
            var day = 'idk this day 😀';
            var desc = '8 taste it while you can';
            res.render('list', {typeOfDay : day, about : desc});
            break;
    }   
});

app.listen(3000, function(){
    console.log('server is up and listening to port 3000');
});