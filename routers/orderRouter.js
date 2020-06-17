import { authorize } from "../utils/permission";

const { Router } = require("express");
const router = Router();
const orderController = require("../controllers/orderController");

//Search, get, get all orders
router.get("/", authorize("read", "orders"), orderController.search);

//route get orders from id
router.get("/:id", authorize("read", "orders"), orderController.getOrderById);

//route Put orders
router.put(
  "/:id",
  authorize("update", "orders"),
  orderController.updateOrderById
);

//route delete orders
router.delete(
  "/:id",
  authorize("delete", "orders"),
  orderController.deleteOrderById
);

//route add orders
router.post("/", authorize("create", "orders"), orderController.addOrder);

module.exports = router;
