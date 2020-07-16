//declare
const manufacture = require("../models").manufactures;
const { Sequelize } = require("../models");


//search manufacture
const searchManufacture = async (condition) => {
    let Option = {};
    Object.keys(condition).forEach((val, index) => {
        if (isNaN(condition[val])) {
            Option[val] = { [Sequelize.Op.like]: `%${condition[val]}%` };
        } else {
            Option[val] = parseInt(condition[val], 10);
        }
    });
    return await manufacture.findAll({
        where: Option,
    });
};
  //Search provider
  module.exports.searchManufacture = async function (req, res) {
    const cond = req.query;
    console.log("query", cond);
    const manufacture = await searchManufacture(cond);
    if (!manufacture) res.sendStatus(404);
    else res.send(manufacture);
  };
  