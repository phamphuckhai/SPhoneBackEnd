import {authorize} from "../utils/permission";

const {Router} = require("express");
const router = Router();
const orderController = require("../controllers/orderController");

//Search, get, get all orders
router.get("/", authorize("read", "orders"), orderController.search);

//Search, get, get all orders
router.get("/v2", authorize("read", "orders"), orderController.searchByCus);

//route get orders by id
router.get("/:id", authorize("read", "orders"), orderController.getOrderById);

//route add orders
router.post("/", authorize("create", "orders"), orderController.addOrder);

module.exports = router;
