const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    var today = new Date();

    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    var currentDay = today.toLocaleDateString('en-US', options);
 
    res.render('list', {currentDay: currentDay});
});

app.listen(3000, function(){
    console.log('server is up and listening to port 3000');
});