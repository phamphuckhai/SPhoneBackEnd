import * as _ from 'lodash';
import {products as Product, providers as Provider} from '../models';
import {FOR_EACH} from "../utils/Object";
import {createOrderDetail} from "./orderDetailController";
import {getProduct} from "./productController";

const Order = require("../models").orders;
const {Sequelize, sequelize} = require("../models");
const {orderDetails, Customer, orderTypes} = require("../models");

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
        include: [
            {
                model: Customer,
                as: "Customer",
            },
            {
                model: Provider,
                as: 'provider'
            },
        ]
    });
};

const getOrder = async (condition) => {
    const result = await Order.findOne({
        where: condition,
        include: [
            {
                model: orderDetails,
                as: "orderDetail",
                include: [
                    {model: Product}
                ],
                // attributes: {
                //     exclude: ['interest']
                //
                // }
            },
            {
                model: Customer,
                as: "Customer",
            },
            {
                model: Provider,
                as: 'provider'
            },
            {
                model: orderTypes,
                as: "orderType",
            },
        ],
        attributes: {
            exclude: [
                'updatedAt'
            ]
        }
    });
    return _.omitBy(result.get({plain: true}), _.isNull);
};

function getTotal(details) {
    let amount = 0;
    details.forEach(it => {
        amount += it.unitPrice * it.quantity;
    });
    return amount;
}

async function createOrder(data) {
    //Create Order
    //For each order detail
    //Create detail
    //Update availabe
    //Update COGS

    const {CustomerId, orderDetail: details} = data;
    const orderTypeId = 2;

    let amount = 0;

    const order = await Order.create(
        {
            CustomerId,
            orderTypeId,
            amount
        }
    );
    await FOR_EACH(details, async (item) => {
        //Get params
        const {productId, quantity} = item;

        //Get product
        const product = await getProduct({id: productId});


        //Calculate interest
        const interest = (product.price - product.COGS) * quantity;

        //Caculate total of order
        amount+=product.price;

        //Create Details
        const detail = await createOrderDetail({
            productId: product.id,
            quantity,
            interest,
            orderId: order.id,
            unitPrice: product.price
        });

        //Update order's value
        order.amount = amount;
        await order.save();

        //update product price if it's note exist
        if (product.price === null)
            throw new Error('Product price is not specified');

        const available = product.available !== null ? product.available : 0;

        //Update available
        product.available = available - quantity;

        //Save updated product
        await product.save();

    });
    const transactionRes = await getOrder({id: order.id});
    return transactionRes;
}

async function createImport(data) {
    //Create Order
    //For each order detail
    //Create detail
    //Update availabe
    //Update COGS

    const {providerId, orderDetail: details} = data;
    const orderTypeId = 1;
    let amount = 0;

    //Calculate order value
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
        //Get params
        const {productId, quantity, unitPrice} = item;

        //Get product
        const product = await getProduct({id: productId});

        //Create Details
        const detail = await createOrderDetail({
            productId: product.id,
            quantity,
            interest: 0,
            orderId: order.id,
            unitPrice
        });

        //update product price if it's note exist
        if (product.price === null)
            product.price = unitPrice;

        //Update COGS
        const available = product.available ? product.available : 0;
        const COGS = (product.COGS * available + quantity * unitPrice) / (available + quantity);
        product.COGS = COGS;

        //Update available
        product.available = available + quantity;

        //Save updated product
        await product.save();

    });
    const transactionRes = await getOrder({id: order.id});
    return transactionRes;
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
        // console.log(error);
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
    const orders = await searchOrder(cond);
    if (!orders) res.sendStatus(404);
    else res.send(orders);
};
