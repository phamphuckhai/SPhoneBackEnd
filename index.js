const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken');

//import passport and passport-jwt modules
const passport = require('passport');
const passportJWT = require('passport-jwt');

//Extract token
let ExtractJwt = passportJWT.ExtractJwt;

//strategy for authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "imhandsome";

//strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next){
    console.log('payload received', jwt_payload);
    let user = getUser({id: jwt_payload.id});
    if (user){
        next(null, user);
    }
    else{
        next(null, flase)
    }
});
//use the strategy
passport.use(strategy);
app.use(passport.initialize());

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
});
//login route
app.post('/login', async function(req, res, next) {
    const {name, password} = req.body;
    if(name && password){
        let user = await getUser({name});
        if(!user){
            res.status(401).json({msg: 'No such user found', user});
        }

        if(user.password===password)
        {
            let payload = {id: user.id};
            let token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({msg: 'Ok', token: token});
        }
        else{
            res.status(401).json({msg: 'Password is incorrect', user});
        }
    }
});

//protected route

app.get('/protected', passport.authenticate('jwt', {session: false}), function(req, res){
    res.json({
        msg: 'Congrats! You are seeing this because you are authorized'
    });
});

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
