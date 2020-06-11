import {customerRouter} from "./routers/customerRouter";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

//connect sequelize
const {sequelize} = require("./models");

const authenticationRouter = require("./routers/authenticationRouter");
const userRouter = require("./routers/userRouter")
const providerRouter = require("./routers/providerRouter");
const productRoter = require("./routers/productRouter");
const {permissionRouter} = require('./routers/permissionRouter');

const {checkPassport} = require('./controllers/userController');

app.use(cors());
//parse application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//route to use
app.use('/permissions', permissionRouter);
app.use(authenticationRouter);
app.use('/users', checkPassport, userRouter);
app.use('/providers', checkPassport, providerRouter);
app.use('/customers', checkPassport, customerRouter);
app.use('/products', checkPassport, productRoter);

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
