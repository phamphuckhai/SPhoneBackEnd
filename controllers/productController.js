import {categories, manufactures} from "../models";
//declare model
const Product = require("../models").products;
const {Sequelize} = require("../models");
const OrderDetail = require("../models").orderDetails;

//create Product

const createProduct = async ({
                                 name,
                                 codeName,
                                 description,
                                 madeIn,
                                 // amount,
                                 categoryId,
                                 manufactureId,
                             }) => {
    const prdt = await Product.create({
        name,
        codeName,
        description,
        madeIn,
        // amount,
        categoryId,
        manufactureId,
    });
    // const res = await product.findOne({
    //     where: {id: prdt.id},
    //     include: [
    //         {model: categories, required: true, as: 'category'},
    //         {model: manufactures, required: true, as: 'manufacture'},
    //     ]
    // })
    const res = await getProduct({id: prdt.id});
    return res;
};

//search Product
const searchProduct = async (condition) => {
    let Option = {};
    Object.keys(condition).forEach((val, index) => {
        if (isNaN(condition[val])) {
            Option[val] = {[Sequelize.Op.like]: `%${condition[val]}%`};
        } else {
            Option[val] = parseInt(condition[val], 10);
        }
    });
    return Product.findAll({
        where: Option,
        order: [["updatedAt", "DESC"]],
        include: [
            {model: categories, required: true, as: "category"},
            {model: manufactures, required: true, as: "manufacture"},
        ],
    });
};

//Get Product
const getProduct = async (condition) => {
    return Product.findOne({
        where: condition,
        include: [
            {model: categories, required: true, as: "category"},
            {model: manufactures, required: true, as: "manufacture"},
        ],
    });
};

//delete Product
const deleteProduct = async (condition) => {
    const res = await getProduct(condition);
    await Product.destroy({
        where: condition,
    });
    return res;
};

module.exports.addProduct = function (req, res, next) {
    const {
        name,
        codeName,
        description,
        madeIn,
        // amount,
        categoryId,
        manufactureId,
    } = req.body;
    createProduct({
        name,
        codeName,
        description,
        madeIn,
        // amount,
        categoryId,
        manufactureId,
    }).then((products) => res.json(products));
};

module.exports.getProductById = async function (req, res) {
    let id = req.params.id;
    const product = await getProduct({id});
    if (!product) return res.sendStatus(404);
    //Count product



    res.send(product);

};

module.exports.updateProductById = function (req, res) {
    let id = req.params.id;
    let newPdt = req.body;
    getProduct({id}).then((product) => {
        if (!product) return res.sendStatus(404);
        product.update(newPdt).then((newProduct) => res.json(newProduct));
    });
};

module.exports.deleteProductById = function (req, res) {
    let id = req.params.id;
    deleteProduct({id}).then((product) => res.json(product));
};

//Search Product
module.exports.search = async function (req, res) {
    const cond = req.query;
    console.log("query", cond);
    const products = await searchProduct(cond);
    if (!products) res.sendStatus(404);
    else res.send(products);
};
