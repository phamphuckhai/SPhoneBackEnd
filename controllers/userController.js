const jwt = require("jsonwebtoken");
const {validationResult} = require('express-validator');
const passport = require("passport");
const passportJWT = require("passport-jwt");

const User = require("../models").users;
let ExtractJwt = passportJWT.ExtractJwt;

//strategy for authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "imhandsome";

//strategy for web token
let strategy = new JwtStrategy(jwtOptions, async function (jwt_payload, next) {
    console.log("payload received", jwt_payload);
    let user = await getUser({id: jwt_payload.id});
    user = user.get();
    if (user) {
        next(null, user);
    } else {
        next(null, null);
    }
});

//use the strategy
passport.use(strategy);
passport.initialize();

//create user
const createUser = async ({name, password}) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    console.log('req', req.body);
    const {name, password} = req.body;
    if (name && password) {
        let user = await getUser({name});
        if (!user) {
            return await User.create({name, password});
        }
        else {
            res.status(401).json({msg: "User has been existed"});
        }
    }
};

const searchUser = async (condition) => {
    let Option = {};
    Object.keys(condition).forEach((val, index) => {
        if (typeof condition[val] == 'string') {
            Option[val] = {[Sequelize.Op.like]: `%${condition[val]}%`};
        } else {
            Option[val] = condition[val];
        }
    });
    return await User.findAll({
        where: Option,
    });
};

//List Users
const getAllUsers = async () => {
    return await User.findAll();
};

//get user
const getUser = async (condition) => {
    return await User.findOne({
        where: condition,
    });
};

//Check error before running service
function checkErrors(req, res) {

}

//delete user
const deleteUser = async (condition) => {
    return await User.destroy({
        where: condition,
    });
};

module.exports.getUsers = function (req, res) {
    getAllUsers().then((users) => res.json(users));
}

module.exports.register = function (req, res, next) {
    const {name, password} = req.body;
    createUser({name, password}).then((users) =>
        res.json({users, msg: "account created successfully "})
    );
}

module.exports.login = async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    console.log('req', req.body);
    const {name, password} = req.body;
    if (name && password) {
        let user = await getUser({name});
        if (!user) {
            res.status(401).json({msg: "No such user found", user});
        }
        if (user.password === password) {
            let payload = {id: user.id};
            let token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({msg: "Ok", token: token});
        } else {
            res.status(401).json({msg: "Password is incorrect"});
        }
    }
}

//Search User
module.exports.search = async function (req, res) {
    const cond = req.query;
    console.log('query', cond);
    const users = await searchUser(cond);
    if (!users)
        res.sendStatus(404);
    else
        res.send(users);
}

module.exports.getUserById = function (req, res) {
    let id = req.params.id;
    getUser({id}).then((user) => {
        if (!user)
            return res.sendStatus(404);
        else
            return res.send(user);
    });
}

module.exports.deleteUserById = function (req, res) {
    let id = req.params.id;
    deleteUser({id}).then((user) => res.json("delete successfully!"))
}

module.exports.updateUserById = function (req, res) {
    let id = req.params.id;
    let newUsr = req.body;
    getUser({id}).then((user) => {
        if(!user)
            return res.sendStatus(404).json("don't have user");
        user.update(newUsr).then(newUser =>
            res.json(newUser))
        }
    );
}

module.exports.checkPassport = passport.authenticate("jwt", {session: false})