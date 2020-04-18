const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//connect sequelize
const {sequelize} = require('./models');
//declare model
const User = require('./models').users;

//parse application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//basic route
app.get('/', function(req, res){
    res.json({message: 'Express is up!'});
});

//route list user
app.get('/users', function(req, res){
    getAllUsers().then(users => res.json(users))
});

//route register
app.post('/register', function(req, res, next){
    const {name, password} = req.body;
    createUser({name, password}).then(users => 
        res.json({users, msg: 'account created successfully '})
        );
})

//check connect
sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database', err));

//check connect table user

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

//app start
var port = process.env.PORT || 3000;

sequelize.sync().then(() => {
    app.listen(port, () => console.log('app listening'));
});
