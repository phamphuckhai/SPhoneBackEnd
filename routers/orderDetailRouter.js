import { authorize } from "../utils/permission";

const { Router } = require("express");
const router = Router();
const orderDetailController = require("../controllers/orderDetailController");

//Search, get, get all orderDetails
router.get(
  "/",
  authorize("read", "orderDetails"),
  orderDetailController.search
);

//rote get orderDetails from orderID and ID

router.get(
  "/:OrderID/:OrderDetailID",
  authorize("read", "orderDetails"),
  orderDetailController.getOrderDetailByOIDANDODID
);

//route Put orderDetails
router.put(
  "/:OrderID/:OrderDetailID",
  authorize("update", "orderDetails"),
  orderDetailController.updateOrderDetailById
);

//route delete orderDetails
router.delete(
  "/:OrderID/:OrderDetailID",
  authorize("delete", "orderDetails"),
  orderDetailController.deleteOrderDetailById
);

//route add orderDetails
router.post(
  "/",
  authorize("create", "orderDetails"),
  orderDetailController.addOrderDetail
);

module.exports = router;
