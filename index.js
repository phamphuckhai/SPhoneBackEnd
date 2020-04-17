const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.json({message: 'Express is up!'});
});

app.get('/', function(req, res){
    Users().then(user => res.json(user))
});

app.post('/register', function(req, res, next){
    const {name, password} = req.body;
    createUser({name, password}).then(user => 
        res.json({user, msg: 'account created successfully '})
        );
})

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


//ceate user
const createUser = async({name, password}) => {
    return await User.create({name, password});
};

//List Users
const Users = async() => {
    return await User.findAll();
};

//get user
const getUser = async obj =>{
    return await User.findOne({
        where: obj,
    });
} 

