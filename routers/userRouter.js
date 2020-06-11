import {check} from "express-validator";
import {authorize} from "../utils/permission";


const {Router} = require("express");
const router = Router();
const userController = require("../controllers/userController");

//Search, get, get all users
router.get("/",
    authorize('read', 'users'),
    userController.search);

//route list user
router.get("/users", 
    authorize('read', 'users'),
    userController.getUsers);

//route register
router.post("/register", userController.register);

//login route
router.post("/login", [
    check('name').isString(),
    check('password').isString()
    ], 
    userController.login);

//route get user from id
router.get("/:id",
    authorize('read', 'users'),
    userController.getUserById
);

//route Update user 
router.put("/:id",
    authorize('update', 'users'),
    userController.updateUserById);

//route delete user
router.delete("/:id",
    authorize('delete', 'users'),
    userController.deleteUserById
);


module.exports = router;
