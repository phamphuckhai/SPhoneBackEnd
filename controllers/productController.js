import {
    categories,
    manufactures,
    orderDetails as OrderDetail,
    orders as Order,
    products as Product,
    sequelize,
    Sequelize
} from "../models";

const createProduct = async ({name, codeName, description, madeIn, categoryId, manufactureId}) => {
    const dbRes = await Product.create({name, codeName, description, madeIn, categoryId, manufactureId,});
    return await getProduct({id: dbRes.id});
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
    const {name, codeName, description, madeIn, categoryId, manufactureId,} = req.body;
    createProduct({
        name, codeName, description, madeIn, categoryId, manufactureId,
    }).then((products) => res.json(products));
};

module.exports.getProductById = async function (req, res) {
    let id = req.params.id;
    const product = await Product.findOne({
        where: {id},
        include: [{
            model: OrderDetail,
            include: [
                {model: Order, right: true, where: {orderTypeId: 1}, attributes: []}
            ],
            attributes: []
        }],
        attributes: [
            [sequelize.fn('SUM', sequelize.col('orderDetails.quantity')), 'count'],
            "name", "codeName", "description", "madeIn", "price"
        ],
        group: ['products.id']
    });
    if (!product) return res.sendStatus(404);
    res.send(product.get());

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
