const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

let personalTasksLst = ['buy food', 'cook food', 'eat food'];
let workTasksLst = ['check calendar', 'check tasks', 'check inbox'];

let  targetLst = [];

const today = new Date();

const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
};

const taskListDate = today.toLocaleDateString('en-US', options);


app.set('view engine', 'ejs');


app.get('/', function(req, res){

    const taskListType = 'Personal | ';
    
    res.render('list', {taskListType: taskListType, taskListDate: taskListDate, tasksLst: personalTasksLst});

    targetLst = personalTasksLst;
});

app.get('/work', function(req, res){
    
    const taskListType = 'Work | ';
    
    res.render('list', {taskListType: taskListType, taskListDate: taskListDate, tasksLst: workTasksLst});

    targetLst = workTasksLst;
});

app.post('/', function(req, res){
    const newTask = req.body.newTask;
    targetLst.push(newTask);
    res.redirect('/');
});

app.post('/work', function(req, res){
    const newTask = req.body.newTask;
    targetLst.push(newTask);
    res.redirect('/work');
});

app.listen(3000, function(){
    console.log('server is up and listening to port 3000');
});