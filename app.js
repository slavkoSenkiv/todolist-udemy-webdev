const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');


let personalTasksLst = ['buy food', 'cook food', 'eat food'];
let workTasksLst = ['check calendar', 'check tasks', 'check inbox'];

const today = new Date();
const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'short'}
const taskListDate = today.toLocaleDateString('en-US', options);

app.get('/', function(req, res){
    const taskListType = 'Personal';
    res.render('list', {
        taskListType: taskListType, 
        taskListDate: taskListDate, 
        tasksLst: personalTasksLst,
        route: '/'});
});

app.post('/', function(req, res){
    let newTask = req.body.newTask;
    personalTasksLst.push(newTask);
    res.redirect('/');
}); 

app.get('/work', function(req, res){
    const taskListType = 'Work';
    res.render('list', {
        taskListType: taskListType, 
        taskListDate: taskListDate, 
        tasksLst: workTasksLst,
        route: '/work'});
    });

app.post('/work', function(req, res){
    let newTask = req.body.newTask;
    workTasksLst.push(newTask);
    res.redirect('/work');
}); 


app.listen(3000, function(){
    console.log('server is up and listening to port 3000');
});