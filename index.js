const express = require('express');
// const bodyParser = require('body-parser');

const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.json({message: 'Express is up!'});
});

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