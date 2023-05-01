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
    });
});

/* pool.query("INSERT INTO users (id, name) VALUES (3, 'Aen');", (error, results) => {
  if (error) {
    throw error;
  }
}); */

/* pool.query("delete from users where id = 3;", (error, results) => {
  if (error) {
    throw error;
  } 
});
 */
pool.query("update users set name = 'Den' where id = 3;", (error) => {
  if (error) {
    throw error;
  } 
});

//http
const personalTasksLst = ['buy food', 'cook food', 'eat food'];
const workTasksLst = ['check calendar', 'check tasks', 'check inbox'];


app.get('/', function(req, res){
    res.render('list', {
        taskListType: 'Personal', 
        taskListDate: longDate, 
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
        taskListDate: dayOfWeek, 
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
        taskListDate: dayOfWeek
    });
});

app.listen(3000, function(){
    console.log('server is up and listening to port 3000');
});

