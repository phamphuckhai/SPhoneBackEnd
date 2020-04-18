const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//parse application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//basic route
app.get('/', function(req, res){
    res.json({message: 'Express is up!'});
});

//route list user
app.get('/users', function(req, res){
    getAllUsers().then(user => res.json(user))
});

//route register
app.post('/register', function(req, res, next){
    const {name, password} = req.body;
    createUser({name, password}).then(user => 
        res.json({user, msg: 'account created successfully '})
        );
})

//start app
app.listen(3000, function(){
    console.log('Express is running on port 3000');
});

//init sequeliz
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    database: 'users_db',
    username: 'root',
    password: '',
    dialect: 'mysql',
});

//check connect
sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database', err));
//create table with user model

const User = sequelize.define('user',{
    name: {
        type: Sequelize.STRING,
    },
    password:{
        type: Sequelize.STRING,
    }
});

//Create table with user model 

User.sync()
    .then(() => console.log('successfully'))
    .catch(err => console.log('oh no!')); 


//ceate user
const createUser = async({name, password}) => {
    return await User.create({name, password});
};

//List Users
const getAllUsers = async() => {
    return await User.findAll();
};

//get user
const getUser = async obj =>{
    return await User.findOne({
        where: obj,
    });
} 

