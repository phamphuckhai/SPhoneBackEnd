//declare model
const order = require("../models").orders;
const { Sequelize } = require("../models");
const { orderDetails, Customer, orderTypes } = require("../models");
import { createOrderDetail } from "./orderDetailController";
//create Order
const createOrder = async ({
  providerId,
  CustomerId,
  orderTypeId,
  status,
  amount,
}) => {
  return await order.create({
    providerId,
    CustomerId,
    orderTypeId,
    status,
    amount,
  });
};

//search Order
const searchOrder = async (condition) => {
  let Option = {};
  Object.keys(condition).forEach((val, index) => {
    if (isNaN(condition[val])) {
      Option[val] = { [Sequelize.Op.like]: `%${condition[val]}%` };
    } else {
      Option[val] = parseInt(condition[val], 10);
    }
  });
  return await order.findAll({
    where: Option,
  });
};

//Get Order
const getOrder = async (condition) => {
  return await order.findOne({
    where: condition,
    include: [
      {
        model: orderDetails,
        as: "orderDetail",
        where: {
          orderId: condition.id,
        },
        required: false,
      },
      {
        model: Customer,
        as: "Customer",
        required: true,
      },
      {
        model: orderTypes,
        as: "orderType",
        required: true,
      },
    ],
  });
};

//delete Order
const deleteOrder = async (condition) => {
  return await order.destroy({
    where: condition,
  });
};
//
module.exports.addOrder = async function (req, res, next) {
  const { providerId, CustomerId, orderTypeId, status, amount } = req.body;
  const object = req.body.orderDetail;
  const orderId = req.body.id;
  createOrder({ providerId, CustomerId, orderTypeId, status, amount });

  object.forEach((index) => {
    const { productId, unitPrice, quantity, interest } = index;
    createOrderDetail({ productId, orderId, unitPrice, quantity, interest });
  });
  return res.json(req.body);
};

module.exports.getOrderById = function (req, res) {
  let id = req.params.id;
  getOrder({ id }).then((order) => {
    if (!order) return res.sendStatus(404);
    else return res.send(order);
  });
};

module.exports.updateOrderById = function (req, res) {
  let id = req.params.id;
  let neword = req.body;
  getOrder({ id }).then((order) => {
    if (!order) return res.sendStatus(404);
    order.update(neword).then((newOrder) => res.json(newOrder));
  });
};
module.exports.deleteOrderById = function (req, res) {
  let id = req.params.id;
  deleteOrder({ id }).then((order) => res.json("delete order successfully!"));
};

//Search Order
module.exports.search = async function (req, res) {
  const cond = req.query;
  console.log("query", cond);
  const orders = await searchOrder(cond);
  if (!orders) res.sendStatus(404);
  else res.send(orders);
};
