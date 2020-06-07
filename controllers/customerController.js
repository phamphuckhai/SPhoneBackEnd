import {sequelize, Sequelize} from '../models';

const {Customer} = sequelize.models;

//create provider
const createCustomer = async (customer) => {
    return await Customer.create(customer);
};

//search Customer
const searchCustomer = async (condition) => {
    let Option = {};
    Object.keys(condition).forEach((val, index) => {
        if (typeof condition[val] == 'string') {
            Option[val] = {[Sequelize.Op.like]: `%${condition[val]}%`};
        } else {
            Option[val] = condition[val];
        }
    });
    return await Customer.findAll({
        where: Option,
    });
};

//Get Customer
const getCustomer = async (condition) => {
    const customer = await Customer.findOne({
        where: condition,
    });
    return customer;
};

//delete provider
const deleteCustomer = async (condition) => {
    return await Customer.destroy({
        where: condition,
    });
};

module.exports.addCustomer = async function (req, res, next) {
    try {
        const result = await createCustomer(req.body);
        res.send(result);
    } catch (e) {
        console.log('error:', e);
        res.sendStatus(500);
    }
}

module.exports.getCustomerById = async function (req, res) {
    let id = req.params.id;
    const customer = await getCustomer({id});
    if (!customer)
        return res.sendStatus(404);
    else
        return res.send(customer.get());
}

module.exports.updateCustomerById = async function (req, res) {
    try {
        let id = req.params.id;
        let newCustomer = req.body;
        const customer = await getCustomer({id});
        if (!customer)
            return res.sendStatus(400);
        const result = await customer.update(newCustomer);
        res.send(result.get());
    } catch (e) {
        console.log('error:', e);
        res.sendStatus(500);
    }
}
module.exports.deleteCustomerById = async function (req, res) {
    let id = req.params.id;
    const result = await deleteCustomer({id});
    res.sendStatus(200);
}

//Search provider
module.exports.searchCustomer = async function (req, res) {
    const cond = req.query;
    console.log('query', cond);
    const customers = await searchCustomer(cond);
    if (!customers)
        res.sendStatus(404);
    else
        res.send(customers);
}