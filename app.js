const express = require('express');
const app = express();

app.get('/', function(req, res){
    var today = new Date();
    var currentDay = today.getDay();

    if (currentDay === 6 || currentDay === 0){
        res.write('<h1>yey, its weeekend</h1>');
        res.write('<p>feel every minute of it<p>');
    } else {
        res.write('<h1>' + (7 - today) + ' days too wait till weekend</h1>');
        res.write('<p>the weekend is comming <p>');
    }
    res.send();
});

app.listen(3000, function(){
    console.log('server is up and listening to port 3000');
});