//express boilerplate
const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

//custom module date boilerplate
const date = require(__dirname + '/date.js');
const longDate = date.getDate();
const dayOfWeek = date.getDayOfWeek();
app.set('view engine', 'ejs');

//mongoose boilerplate
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todolistDB');
const taskSchema = new mongoose.Schema ({name: {type: String, required: true}});
const Task = mongoose.model('Task', taskSchema);

const defTaskOne = new Task ({
    name: 'Welcome to your todo list'
});
const defTaskTwo = new Task ({
    name: 'Hit + button to add new task'
});
const defTaskThree = new Task ({
    name: '<-- Hit  to delete an item'
});


app.get('/', function(req, res){
    res.render('list', {
        taskListType: 'Personal', 
        taskListDate: 'Today', 
        tasksLst: personalTasksLst,
        route: '/'});
});

app.post('/', function(req, res){
    let newTask = req.body.newTask;
    personalTasksLst.push(newTask);
    res.redirect('/');
}); 

app.get('/work', function(req, res){
    res.render('list', {
        taskListType: 'Work', 
        taskListDate: 'Today', 
        tasksLst: workTasksLst,
        route: '/work'});
    });

app.post('/work', function(req, res){
    let newTask = req.body.newTask;
    workTasksLst.push(newTask);
    res.redirect('/work');
}); 

app.get('/about', function(req, res){
    res.render('about', {
        taskListType: 'About',
        taskListDate: date()
    });
});


app.listen(3000, function(){
    console.log('server is up and listening to port 3000');
});