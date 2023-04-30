//express boilerplate
const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

//custom module date boilerplate
const date = require(__dirname + '/date.js');
const longDate = date.getDate();
const dayOfWeek = date.getDayOfWeek();

// pg boilerplate
const pool  = require('./db');

app.get('/users', (req, res)=>{
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows);
    });
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

