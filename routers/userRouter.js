const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");


//route list user
router.get("/users", userController.getUsers);

//route register
router.post("/register", userController.register);
//login route
router.post("/login", userController.login);

//protected route (check token)

router.get(
  "/protected",userController.checkPassport
  ,userController.acceptPassport
  
);

module.exports = router;
