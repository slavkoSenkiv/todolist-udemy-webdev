const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));

var newTasksLst = ['buy food', 'cook food', 'eat food'];

app.set('view engine', 'ejs');


app.get('/', function(req, res){
    var today = new Date();

    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    var currentDay = today.toLocaleDateString('en-US', options);
 
    res.render('list', {currentDay: currentDay, newTasksLst: newTasksLst});
});

app.post('/', function(req, res){
    var newTask = req.body.newTask;
    newTasksLst.push(newTask);
    res.redirect('/');
});

app.listen(3000, function(){
    console.log('server is up and listening to port 3000');
});