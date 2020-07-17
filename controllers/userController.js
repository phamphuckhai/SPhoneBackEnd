import Permission from '../config/permission.json';

const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const bcrypt = require("bcrypt");
const {Sequelize} = require("../models");

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
const createUser = async ({name, password, role, fullname, phone, address, email, status}) => {
    return await User.create({name, password, role, fullname, phone, address, email, status});
};

const searchUser = async (condition) => {
    let Option = {};
    Object.keys(condition).forEach((val, index) => {
        Option[val] = {[Sequelize.Op.like]: `%${condition[val]}%`};
    });
    console.log(Option);
    return User.findAll({
        where: Option,
        attributes: {
            exclude: ['password']
        }
    });
};

//List Users
const getAllUsers = async () => {
    return User.findAll({
        attributes: {
            exclude: ['password']
        }
    });
};

//get user
const getUser = async (condition) => {
    return User.findOne({
        where: condition,
        attributes: {
            exclude: ['password']
        }
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
};

module.exports.register = async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    console.log("req", req.body);
    let {name, password, role, fullname, phone, address, email, status} = req.body;
    if (name && password) {
        let user = await getUser({name});
        if (!user) {
            bcrypt.hash(password, 10, function (err, hash) {
                // Store hash in database
                console.log(hash);
                password = hash;
                createUser({
                    name,
                    password,
                    role,
                    fullname,
                    phone,
                    address,
                    email,
                    status,
                }).then((users) =>
                    res.json({users, msg: "account created successfully "})
                );
            });
        } else {
            res.status(401).json({msg: "User has been existed"});
        }
    }
};

module.exports.login = async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    console.log("req", req.body);
    const {name, password} = req.body;
    if (name && password) {
        let user = await User.findOne({
            where: {name}
        });
        console.log(user.get());
        if (!user) {
            res.status(401).json({msg: "No such user found", user});
        }
        ;

        bcrypt.compare(password, user.password, function (err, result) {
            if (result == true) {
                let payload = {id: user.id};
                let token = jwt.sign(payload, jwtOptions.secretOrKey);
                res.json({user, token: token});
            } else {
                res.status(401).json({msg: "Password is incorrect"});
            }
        });
    }
};

//Search User
module.exports.search = async function (req, res) {
    const cond = req.query;
    console.log("query", cond);
    const users = await searchUser(cond);
    if (!users) res.sendStatus(404);
    else res.send(users);
};

module.exports.getUserById = function (req, res) {
    let id = req.params.id;
    getUser({id}).then((user) => {
        if (!user) return res.sendStatus(404);
        else return res.send(user);
    });
};

module.exports.deleteUserById = function (req, res) {
    let id = req.params.id;
    deleteUser({id}).then((user) => res.json("delete successfully!"));
};

module.exports.updateUserById = function (req, res) {
    let id = req.params.id;
    let newUsr = req.body;
    if (newUsr.password) {
        bcrypt.hash(newUsr.password, 10, function (err, res) {
            newUsr.password = res;
        })
    }
    const {name} = req.body;
    getUser({id}).then((user) => {
        if (!user) return res.status(404).json({msg: "don't have user"});
        else if (user.name == name)
            return res.status(404).json({msg: "U can't change username"});
        user.update(newUsr).then((newUser) => res.json(newUser));
    });
};

module.exports.auth = async function (req, res) {
    if (req.user) {
        const user = await User.findOne({
            where: {id: req.user.id},
            attributes: {
                exclude: ['password']
            }
        });
        res.send({...user.get(), permissions: Permission[user.role] ? Permission[user.role]['grants'] : null});
    } else
        res.sendStatus(401);
}

module.exports.checkPassport = passport.authenticate("jwt", {session: false});
