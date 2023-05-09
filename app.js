//express
const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

//date
const date = require(__dirname + '/date.js');
const longDate = date.getDate();
const dayOfWeek = date.getDayOfWeek();

//sequelize boiler plate
const Sequelize = require('sequelize');
const {DataTypes, Op} = Sequelize;

const sequelize = new Sequelize(
  'todolist',
  'postgres',
  'pass',
  {
    dialect: 'postgres',
    freezeTableName: true
  });

sequelize.authenticate().then(() =>{
  console.log('connection successful');
}).catch((err)=>{
  console.log('error connection to the database');
});

//task model
const Task = sequelize.define('tasks', {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category:{
    type: DataTypes.STRING,
  },
  task_name:{
    type: DataTypes.STRING
  }
},{
  timestamps: false
});

//task sync
//Task.update({category: 'work'}, {where : {'id':{[Op.gt]:3}}});

//functions
function getTasks(tasksDbCat, tasksLst){
  Task.sync({alter: true}).then(()=>{
    return Task.findAll({attributes: ['task_name'], where:{category:{[Op.eq]:tasksDbCat}}});
  }).then((data)=>{
      data.forEach((dataPiece)=>{
        let task_name = dataPiece.dataValues.task_name;
        console.log(task_name);
        tasksLst.push(task_name);
      });
    }).catch((err)=>{
      console.log('error syncing table and model');
      console.log(err);
    });
}

function renderListPage(listType, tasksLst, res, route){
  res.render('list', {
    taskListType: listType, 
    taskListDate: longDate, 
    tasksLst: tasksLst,
    route: route});
}

function getPage(route, listType, tasksLst){
  app.get(route, function(req, res){
    if (tasksLst.length === 0){
      getTasks(listType, tasksLst);
      renderListPage(listType, tasksLst, res, route);
    } else{
      renderListPage(listType, tasksLst, res, route);
    }
  });
}

//http 
let personalTasksLst = [];
let workTasksLst = [];

getPage('/', 'personal', personalTasksLst);

app.post('/', function(req, res){
    let newTask = req.body.newTask;
    personalTasksLst.push(newTask);
    res.redirect('/');
}); 

getPage('/work', 'work', workTasksLst);

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