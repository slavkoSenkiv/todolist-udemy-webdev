const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    var today = new Date();
    var currentDay = today.getDay();

    switch(currentDay){
        case 0 :
            var day = 'Sunday';
            break;
        case 1 :
            var day = 'Monday';
            break;
        case 2 :
            var day = 'Tuesday';
            break;
        case 3 :
            var day = 'Wednesday';
            break;
        case 4 :
            var day = 'Thursday';
            break;
        case 5 :
            var day = 'Friday';
            break;
        case 6 :
            var day = 'Saturday';
            break;
        default:
            console.log('the error with day num, it is not int between 0 and 6')
            break;
    }  
    res.render('list', {typeOfDay : day});
});

app.listen(3000, function(){
    console.log('server is up and listening to port 3000');
});