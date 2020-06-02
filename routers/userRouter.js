import {check} from "express-validator";

const {Router} = require("express");
const router = Router();
const userController = require("../controllers/userController");

//route list user
router.get("/users", userController.getUsers);

//route register
router.post("/register", userController.register);

//login route
router.post("/login", [
    check('name').isString(),
    check('password').isString()
], userController.login);

module.exports = router;
