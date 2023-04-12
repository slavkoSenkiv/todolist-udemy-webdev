const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

let newTasksLst = ['buy food', 'cook food', 'eat food'];

app.set('view engine', 'ejs');


app.get('/', function(req, res){
    const today = new Date();

    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    const currentDay = today.toLocaleDateString('en-US', options);
 
    res.render('list', {currentDay: currentDay, newTasksLst: newTasksLst});
});

app.post('/', function(req, res){
    const newTask = req.body.newTask;
    newTasksLst.push(newTask);
    res.redirect('/');
});

app.listen(3000, function(){
    console.log('server is up and listening to port 3000');
});