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
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];
const Sequelize = require('sequelize');
const {DataTypes, Op} = Sequelize;

const sequelize = new Sequelize(
  'todolist',
  'postgres',
  'pass',
  config,
  {
    dialect: 'postgres',
    freezeTableName: true,
    logging: true /* (msg) => {
      let neededQuery = 'Executing (default): SELECT "id", "task_name" FROM "tasks" AS "tasks" WHERE "tasks"."category" = ';
      if (msg.startsWith(neededQuery) && !msg.includes('favicon.ico')) {
        console.log(msg);
      }
    } */
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
    getTasks(category, tasksLst).then(()=>{
      renderListPage(category, tasksLst, res, route);

    }).catch((err)=>{
      logErr(res, err);
    });
  });
};


function getTasks(tasksDbCategory, tasksLst){

  return Task.sync({alter: true}).then(()=>{
    return Task.findAll({
      attributes: ['id', 'task_name', 'category'], 
      where:{category:{[Op.eq]:tasksDbCategory}}});

  }).then((data)=>{
    tasksLst.splice(0, tasksLst.length);
      data.forEach((dataPiece)=>{
        tasksLst.push({
          id: dataPiece.dataValues.id,
          task_name: dataPiece.dataValues.task_name,
          category: dataPiece.dataValues.category
        });
      });

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
    //let actualRoute = route.replace(':listUrl', category);

    if (category == 'delete'){
      let deleteTaskId = req.body.deleteTaskId;
      return Task.sync({alter: true}).then(()=>{
        return Task.destroy({where:{id:deleteTaskId}});

      }).then(()=>{
        tasksLst = tasksLst.filter((task) => task.id !== parseInt(deleteTaskId));
        res.redirect(req.headers.referer);

      }).catch((err)=>{
        logErr(res, err);
      });


    } else {
      const newTask = req.body.newTask;
      return Task.sync({alter: true}).then(()=>{
        return Task.create({
          category: category,
          task_name: newTask
        });

      }).then(()=>{
        res.redirect(req.headers.referer);

      }).catch((err)=>{
        logErr(res, err);
      });
    }
  });
};


function logErr(res, err){
  console.log('error syncing table and model');
  console.log(err);
  res.status(500).send('Internal Server Error');
}

let tasksLst = [];


//http methods
getPage('/:listUrl?', tasksLst);
postTask('/:listUrl?');

app.get('/about', function(req, res){
    res.render('about', {
        taskListType: 'About',
        taskListDate: date()
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});


