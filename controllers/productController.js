//declare model
const product = require("../models").products;
const {Sequelize} = require("../models");

//create Product
const createProduct = async ({name, codeName, description, madeIn, amount, categoryId, manufactureId}) => {
    return await product.create({name, codeName, description, madeIn, amount, categoryId, manufactureId});
};

//search Product
const searchProduct = async (condition) => {
    let Option = {};
    Object.keys(condition).forEach((val, index) => {
        if (isNaN(condition[val])) {
            Option[val] = {[Sequelize.Op.like]: `%${condition[val]}%`};
        } else {
            Option[val] = parseInt(condition[val],10);
        }
    });
    return await product.findAll({
        where: Option,
    });
};

//Get Product
const getProduct = async (condition) => {
    return await product.findOne({
        where: condition,
    });
};

//delete Product
const deleteProduct = async (condition) => {
    return await product.destroy({
        where: condition,
    });
};

module.exports.addProduct = function (req, res, next) {
    const {name, codeName, description, madeIn, amount, categoryId, manufactureId} = req.body;
    createProduct({name, codeName, description, madeIn, amount, categoryId, manufactureId}).then((products) =>
        res.json({products, msg: "products created successfully "})
    );
}

module.exports.getProductById = function (req, res) {
    let id = req.params.id;
    getProduct({id}).then((product) => {
        if (!product)
            return res.sendStatus(404);
        else
            return res.send(product);
    });
}

module.exports.updateProductById = function (req, res) {
    let id = req.params.id;
    let newPdt = req.body;
    getProduct({id}).then((product) => {
        if(!product)
            return res.sendStatus(404);
            product.update(newPdt).then(newProduct =>
            res.json(newProduct));
        }
    );
}
module.exports.deleteProductById = function (req, res) {
    let id = req.params.id;
    deleteProduct({id}).then((product) => res.json("delete product successfully!"))
}

//Search Product
module.exports.search = async function (req, res) {
    const cond = req.query;
    console.log('query', cond);
    const products = await searchProduct(cond);
    if (!products)
        res.sendStatus(404);
    else
        res.send(products);
}