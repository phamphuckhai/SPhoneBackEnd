import {check} from "express-validator";
import {authorize} from "../utils/permission";

const {Router} = require("express");
const router = Router();
const userController = require("../controllers/userController");

//Search, get, get all users
router.get("/",
    authorize('read', 'users'),
    userController.search);


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
