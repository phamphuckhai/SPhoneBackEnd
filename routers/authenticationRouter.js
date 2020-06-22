import {check} from "express-validator";
import {checkPassport} from "../controllers/userController";

const {Router} = require("express");
const router = Router();
const userController = require("../controllers/userController");

//route register
router.post("/register", userController.register);

//login route
router.post(
    "/login",
    [check("name").isString(), check("password").isString()],
    userController.login
);

router.post('/auth', checkPassport, userController.auth)

module.exports = router;
