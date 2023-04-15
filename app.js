const express = require('express');
const date = require(__dirname + '/date.js');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

console.log(date());

let personalTasksLst = ['buy food', 'cook food', 'eat food'];
let workTasksLst = ['check calendar', 'check tasks', 'check inbox'];


app.get('/', function(req, res){
    res.render('list', {
        taskListType: 'Personal', 
        taskListDate: date(), 
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
        taskListDate: date(), 
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