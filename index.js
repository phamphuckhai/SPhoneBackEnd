const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

//connect sequelize
const {sequelize} = require("./models");

const userController = require("./routers/userRouter");
const providerRouter = require("./routers/providerRouter");
const {permissionRouter} = require('./routers/permissionRouter');

const {checkPassport} = require('./controllers/userController');

app.use(cors());
//parse application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//route to use
app.use('/permissions', permissionRouter);
app.use(userController);
app.use(checkPassport, providerRouter);

app.get("/", function (req, res) {
    res.json({message: "Express is up!"});
});

//check connect
sequelize
    .authenticate()
    .then(() => console.log("Connection has been established successfully."))
    .catch((err) => console.error("Unable to connect to the database", err));

//app start
let port = process.env.PORT || 3000;

sequelize.sync().then(() => {
    app.listen(port, () => console.log("app listening on port" + port));
});
