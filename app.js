//express boilerplate
const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

//date boilerplate
const date = require(__dirname + '/date.js');
const longDate = date.getDate();
const dayOfWeek = date.getDayOfWeek();

//sequelize boilerplate
const Sequelize = require('sequelize');
const {DataTypes, Op} = Sequelize;

const sequelize = new Sequelize(
  'todolist',
  'postgres',
  'pass',
  {
    dialect: 'postgres',
    freezeTableName: true,
    logging: (msg) => {
      let neededQuery = 'Executing (default): SELECT "id", "task_name" FROM "tasks" AS "tasks" WHERE "tasks"."category" = ';
      if (msg.startsWith(neededQuery) && !msg.includes('favicon.ico')) {
        console.log(msg);
      }
    }
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

//functions
function getPage(route, tasksLst){
  app.get(route, function(req, res){
    let category = req.params.listUrl || 'personal';
    if (!category.includes('favicon.ico')){console.log('get page category', category);} //log
    getTasks(category, tasksLst).then(()=>{
      renderListPage(category, tasksLst, res, route);
    }).catch((err)=>{
      console.log('error getting tasks');
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
  });
};


function getTasks(tasksDbCategory, tasksLst){
  return Task.sync({alter: true}).then(()=>{
    return Task.findAll({
      attributes: ['id', 'task_name'], 
      where:{category:{[Op.eq]:tasksDbCategory}}});
  }).then((data)=>{
    tasksLst.splice(0, tasksLst.length);
      data.forEach((dataPiece)=>{
        tasksLst.push({
          id: dataPiece.dataValues.id,
          task_name: dataPiece.dataValues.task_name
        });
      });

    console.log('tasksLst', tasksLst); //log

    }).catch((err)=>{
      console.log('error syncing table and model');
      console.log(err);
    });
};


function renderListPage(tasksCategory, tasksLst, res, route){
  const actualRoute = route.replace(':listUrl', tasksCategory);
  res.render('list', {
    tasksCategory: tasksCategory, 
    taskListDate: longDate, 
    tasksLst: tasksLst,
    route: actualRoute});
};


function postTask(route){
  app.post(route, function(req, res){
    let category = req.params.listUrl || 'personal';
    if (!category.includes('favicon.ico')){console.log('post task category', category);} //log
    const newTask = req.body.newTask;
    return Task.sync({alter: true}).then(()=>{
      return Task.create({
        category: category,
        task_name: newTask
      });
    }).then((data)=>{
      let  actualRoute = route.replace(':listUrl', category);
      res.redirect(actualRoute);
    }).catch((err)=>{
      console.log('error syncing table and model');
      console.log(err);
    });
  });
};

const tasksLst = [];


//http methods
getPage('/:listUrl?', tasksLst);
postTask('/:listUrl?');

//getPage('/', tasksLst);
//postTask('/');

app.post('/delete', function(req, res){
  
  let deleteTaskId = req.body.checkbox;
  return Task.sync({alter: true}).then(()=>{
    return Task.destroy({where:{id:deleteTaskId}});
  }).then((data)=>{
    personalTasksLst = personalTasksLst.filter(task => task.id !== parseInt(deleteTaskId));
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

