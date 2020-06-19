//declare model
import {FOR_EACH} from "../utils/Object";
import {createOrderDetail} from "./orderDetailController";

const Order = require("../models").orders;
const {Sequelize, sequelize} = require("../models");
const {orderDetails, Customer, orderTypes} = require("../models");
//create Order
// const createOrder = async ({
//   providerId,
//   CustomerId,
//   orderTypeId,
//   status,
//   amount,
// }) => {
//   return await order.create({
//     providerId,
//     CustomerId,
//     orderTypeId,
//     status,
//     amount,
//   });
// };

const searchOrder = async (condition) => {
    let Option = {};
    Object.keys(condition).forEach((val, index) => {
        if (isNaN(condition[val])) {
            Option[val] = {[Sequelize.Op.like]: `%${condition[val]}%`};
        } else {
            Option[val] = parseInt(condition[val], 10);
        }
    });
    return Order.findAll({
        where: Option,
    });
};

const getOrder = async (condition) => {
    return Order.findOne({
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


async function createOrder(data) {
    const {CustomerId, orderDetail: details} = data;
    const orderTypeId = 2;
    let amount = 0;
    details.forEach(it => {
        amount += it.unitPrice * it.quantity;
    });
    const order = await Order.create(
        {
            CustomerId,
            orderTypeId,
            amount
        }
    );

    await FOR_EACH(details, async (item) => {
        //Create Detail
        const detail = await createOrderDetail({...item, orderId: order.id});
    });

    return await getOrder({id: order.id});
}

async function createImport(data) {
    // const {CustomerId, orderTypeId, providerId, orderDetail} = data;
    // const item = await order.create({providerId, CustomerId, orderTypeId});

    const {providerId, orderDetail: details} = data;
    const orderTypeId = 1;
    let amount = 0;
    details.forEach(it => {
        amount += it.unitPrice * it.quantity;
    });
    const order = await Order.create(
        {
            providerId,
            orderTypeId,
            amount
        }
    );
    await FOR_EACH(details, async (item) => {
        //Create Detail
        const detail = await createOrderDetail({...item, orderId: order.id});
        //Update MAC
        // const product = await detail.getproducts()
        // (count()*product.price + quantity*price )/(count() + quantity)
    });
    return await getOrder({id: order.get('id')});
}

export const addOrder = async function (req, res, next) {
    const {orderTypeId} = req.body;
    try {
        const result = await sequelize.transaction(async (t) => {
            switch (orderTypeId) {
                case 1:
                    return await createImport(req.body);
                    break;
                case 2:
                    return await createOrder(req.body);
                    break;
                default:
                    res.sendStatus(400);
                    break;
            }
        });
        res.send(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

export const getOrderById = function (req, res) {
    let id = req.params.id;
    getOrder({id}).then((order) => {
        if (!order) return res.sendStatus(404);
        else return res.send(order);
    });
};


//Search Order
export const search = async function (req, res) {
    const cond = req.query;
    console.log("query", cond);
    const orders = await searchOrder(cond);
    if (!orders) res.sendStatus(404);
    else res.send(orders);
};
