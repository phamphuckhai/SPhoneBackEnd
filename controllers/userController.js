const jwt = require("jsonwebtoken");

//import passport and passport-jwt modules
const passport = require("passport");
const passportJWT = require("passport-jwt");  
//declare model
const User = require("../models").users;
//Extract token
let ExtractJwt = passportJWT.ExtractJwt;

//strategy for authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "imhandsome";

//strategy for web token
let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log("payload received", jwt_payload);
  let user = getUser({ id: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
    next(null, flase);
  }
});

//use the strategy
passport.use(strategy);
passport.initialize();

//check connect table user

User.sync()
  .then(() => console.log("successfully"))
  .catch((err) => console.log("oh no!"));

//create user
const createUser = async ({ name, password }) => {
  return await User.create({ name, password });
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

module.exports.getUsers = function (req, res) {
  getAllUsers().then((users) => res.json(users));
}

module.exports.register = function (req, res, next) {
  const { name, password } = req.body;
  createUser({ name, password }).then((users) =>
    res.json({ users, msg: "account created successfully " })
  );
}

module.exports.login = async function (req, res, next) {
  const { name, password } = req.body;
  if (name && password) {
    let user = await getUser({ name });
    if (!user) {
      res.status(401).json({ msg: "No such user found", user });
    }
    if (user.password === password) {
      let payload = { id: user.id };
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({ msg: "Ok", token: token });
    } else {
      res.status(401).json({ msg: "Password is incorrect" });
    }
  }
}

module.exports.checkPassport = passport.authenticate("jwt", { session: false })

module.exports.acceptPassport = function (req, res) {
  res.json({
    msg: "Congrats! You are seeing this because you are authorized",
  });
}