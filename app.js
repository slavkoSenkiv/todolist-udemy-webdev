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
console.log('pg db is connected')

//http
const personalTasksLst =[];
const workTasksLst = [];

function renderList(res, listName, desitationLst) {
  res.render('list', {
    taskListType: listName, 
    taskListDate: longDate, 
    tasksLst: desitationLst,
    route: '/'});
}

function renderListbasedOnInput(root, idRange, desitationLst, listName) {
  app.get(root, function(req, res) {
    if (desitationLst.length === 0) {
      const querySting = 'select * from tasks where id ' + idRange;
      db.query(querySting, (error, results) => {
        if (error) {
          throw error;
        }
        const dbTaskLst = results.rows;
        dbTaskLst.forEach((task) => {
          desitationLst.push(task.task_name);
        });
        renderList(res, listName, desitationLst);
      });   
    } else {
        renderList(res, listName, desitationLst);
    }
  });
}

renderListbasedOnInput('/', '<=3', personalTasksLst, 'Personal');

app.post('/', function(req, res){

  const newTask = req.body.newTask;

  const newTaskId = 7; //personalTasksLst.length + 1;

  const querySting = 'insert into tasks (id, task_name) values (' + newTaskId + ", '" + newTask + "');";
  console.log(querySting);

  db.query(querySting, (error, results) => {
    if (error) {throw error};
    console.log(results);
  });

  res.redirect('/');
}); 


renderListbasedOnInput('/work', '>=4', workTasksLst, 'Work');

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