//declare model
const orderDetail = require("../models").orderDetails;
const { Sequelize } = require("../models");

//create OrderDetail
const createOrderDetail = async ({ productId, orderId, unitPrice }) => {
  return await orderDetail.create({ productId, orderId, unitPrice });
};

//search OrderDetail
const searchOrderDetail = async (condition) => {
  let Option = {};
  Object.keys(condition).forEach((val, index) => {
    if (isNaN(condition[val])) {
      Option[val] = { [Sequelize.Op.like]: `%${condition[val]}%` };
    } else {
      Option[val] = parseInt(condition[val], 10);
    }
  });
  return await orderDetail.findAll({
    where: Option,
  });
};

//Get OrderDetail
const getOrderDetail = async (condition) => {
  return await orderDetail.findOne({
    where: condition,
  });
};

//delete OrderDetail
const deleteOrderDetail = async (condition) => {
  return await orderDetail.destroy({
    where: condition,
  });
};

module.exports.addOrderDetail = function (req, res, next) {
  const { productId, orderId, unitPrice } = req.body;
  createOrderDetail({ productId, orderId, unitPrice }).then((orderDetails) =>
    res.json({ orderDetails, msg: "orderDetail created successfully " })
  );
};

module.exports.getOrderDetailById = function (req, res) {
  let orderId = req.params.id;
  searchOrderDetail({ orderId }).then((orderDetails) => {
    if (!orderDetail) return res.sendStatus(404);
    else return res.send(orderDetails);
  });
};

module.exports.updateOrderDetailById = function (req, res) {
  let orderID = req.params.OrderID;
  let id = req.params.OrderDetailID;
  let neworddt = req.body;
  getOrderDetail({ orderID, id }).then((orderDetail) => {
    if (!orderDetail) return res.sendStatus(404);
    orderDetail
      .update(neworddt)
      .then((newOrderDetail) => res.json(newOrderDetail));
  });
};
module.exports.deleteOrderDetailById = function (req, res) {
  let orderID = req.params.OrderID;
  let id = req.params.OrderDetailID;
  deleteOrderDetail({ id, orderID }).then((orderDetail) =>
    res.json("delete orderDetail successfully!")
  );
};

module.exports.getOrderDetailByOIDANDODID = function (req, res) {
  let orderID = req.params.OrderID;
  let id = req.params.OrderDetailID;
  searchOrderDetail({ orderID, id }).then((orderDetails) => {
    if (!orderDetail) return res.sendStatus(404);
    else return res.send(orderDetails);
  });
};

//Search OrderDetail
module.exports.search = async function (req, res) {
  const cond = req.query;
  console.log("query", cond);
  const orderDetails = await searchOrderDetail(cond);
  if (!orderDetails) res.sendStatus(404);
  else res.send(orderDetails);
};
