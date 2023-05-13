//express boilerplate
const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

//date boilerplate
const longDate = new Date().toLocaleDateString();
/* const date = require(__dirname + '/date.js');
const longDate = date.getDate();
const dayOfWeek = date.getDayOfWeek();
 */

//sequelize boilerplate
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

//main code

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

//functions
function getPage(route){
  app.get(route, function(req, res){

    let tasksDbCategory = req.params.listUrl || 'personal';
    getTasks(tasksDbCategory, res, tasksArray).then(()=>{
      renderListPage(tasksDbCategory, tasksArray, res, route);

    }).catch((err)=>{
      console.log('error getting tasks');
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
  });
};


function getTasks(tasksDbCategory, tasksArray){

  return Task.sync({alter: true}).then(()=>{
    return Task.findAll({
      attributes: ['id', 'task_name'], 
      where:{category:{[Op.eq]:tasksDbCategory}}});

  }).then((data)=>{
    tasksArray.splice(0, tasksArray.length);
      data.forEach((dataPiece)=>{

        tasksArray.push({
          id: dataPiece.dataValues.id,
          task_name: dataPiece.dataValues.task_name
        });
      });

    }).catch((err)=>{
      console.log('error syncing table and model');
      console.log(err);
    });
};


function renderListPage(tasksDbCategory, tasksArray, res, route){
  res.render('list', {
    tasksCategory: tasksDbCategory, 
    taskListDate: longDate, 
    tasksArray: tasksArray,
    route: route});
};


function postTask(route){
  app.post(route, function(req, res){

    let tasksDbCategory = req.params.listUrl || 'personal';
    let newTask = req.body.newTask;

    return Task.sync({alter: true}).then(()=>{
      return Task.create({
        category: tasksDbCategory,
        task_name: newTask
      });

    }).then((data)=>{
      getPage(route);
      //renderListPage(tasksDbCategory, tasksArray, res, route);

    }).catch((err)=>{
      console.log('error syncing table and model');
      console.log(err);
    });
  });
};



//http 
const tasksArray = [];


//http methods
getPage('/:listUrl?');

postTask('/:listUrl?');

app.post('/delete', function(req, res){
  
  let deleteTaskId = req.body.checkbox;
  return Task.sync({alter: true}).then(()=>{
    return Task.destroy({where:{id:deleteTaskId}});
  }).then((data)=>{
    personaltasksArray = personaltasksArray.filter(task => task.id !== parseInt(deleteTaskId));
    res.redirect('/');
  }).catch((err)=>{
    console.log('error syncing table and model');
    console.log(err);
  });
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


