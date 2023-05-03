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
const { Client } = require('pg');
const db = new Client({
    user: 'postgres',
    host: 'localhost', //127.0.0.1
    database: 'todolist',
    password: 'pass',
    port: 5432
});
db.connect();

/* app.get('/users', (req, res)=>{
    db.query('SELECT * FROM users', (error, results) => {
        if (error) {
            throw error;
        }
    });
}); */
/* db.query("INSERT INTO users (id, name) VALUES (3, 'Aen');", (error, results) => {
  if (error) {
    throw error;
  }
}); */
/* db.query("delete from users where id = 3;", (error, results) => {
  if (error) {
    throw error;
  } 
});
 */
/* db.query("update users set name = 'Den' where id = 3;", (error) => {
  if (error) {
    throw error;
  } 
}); */

// create table
/* const createTableQuery = `CREATE TABLE IF NOT EXISTS tasks (id SERIAL PRIMARY KEY, task_name VARCHAR(50));`;
db.query(createTableQuery, (err, res)=>{
  if (err){
    console.error(err);
    db.end();
    return;
  }
  console.log('table created successfully');
  db.end();
}); */

//insert into table
/* const taskOne = "'Welcome to yout todo list'";
const taskTwo = "'Hit the + button to add new tasks'";
const taskThree = "'<== Hit this to delete an item'";
const insertQuery =  `insert into tasks (id, task_name) values (4, ${taskOne}),(5, ${taskTwo}),(6, ${taskThree});`;

db.query(insertQuery, (err, res)=>{
  if (err){
    console.error(err);
    db.end();
    return;
  }
  console.log('rows inserted successfully');
  db.end();
}); */

//delete somerows
db.query('delete from tasks where id > 3', (err, res)=>{
  if (err){
    console.error(err);
    db.end();
    return;
  }
  console.log('rows deleted successfully');
  db.end();
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

