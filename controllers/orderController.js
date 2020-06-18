//declare model
const order = require("../models").orders;
const { Sequelize, sequelize } = require("../models");
const { orderDetails, Customer, orderTypes } = require("../models");
import { createOrderDetail } from "./orderDetailController";
import { or } from "sequelize";
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
  const details = req.body.orderDetail;
  const orderId = req.body.id;

  try {
    const result = await sequelize.transaction(async (t) => {
      const item = await order.create(
        {
          providerId,
          CustomerId,
          orderTypeId,
          status,
          amount,
        }
        // { transaction: t }
      );
      await Promise.all(details.map((v) => createOrderDetail(v)));
      return await getOrder({ id: item.id });
      // const res = await getProduct({ id: prdt.id });
      // return res;
    });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
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
