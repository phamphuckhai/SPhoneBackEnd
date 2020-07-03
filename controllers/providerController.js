//declare model
const provider = require("../models").providers;
const { Sequelize } = require("../models");

//create provider
const createProvider = async ({ name, address, phone, website, email, status }) => {
  return await provider.create({ name, address, phone, website, email, status });
};

//search Provider
const searchProvider = async (condition) => {
  let Option = {};
  Object.keys(condition).forEach((val, index) => {
    if (isNaN(condition[val])) {
      Option[val] = { [Sequelize.Op.like]: `%${condition[val]}%` };
    } else {
      Option[val] = parseInt(condition[val], 10);
    }
  });
  return await provider.findAll({
    where: Option,
  });
};

//Get Provider
const getProvider = async (condition) => {
  return await provider.findOne({
    where: condition,
  });
};

//delete provider
const deleteProvider = async (condition) => {
  return await provider.destroy({
    where: condition,
  });
};

module.exports.addProvider = function (req, res, next) {
  const { name, address, phone, website, email, status } = req.body;
  createProvider({ name, address, phone, website, email, status }).then((providers) =>
    res.json({ providers, msg: "provider created successfully " })
  );
};

module.exports.getProviderById = function (req, res) {
  let id = req.params.id;
  getProvider({ id }).then((providers) => {
    if (!providers) return res.sendStatus(404);
    else return res.send(providers);
  });
};

module.exports.updateProviderById = function (req, res) {
  let id = req.params.id;
  let newPvd = req.body;
  getProvider({ id }).then((provider) => {
    if (!provider) return res.sendStatus(404);
    provider.update(newPvd).then((newProvider) => res.json(newProvider));
  });
};
module.exports.deleteProviderById = function (req, res) {
  let id = req.params.id;
  deleteProvider({ id }).then((provider) => res.json("delete successfully!"));
};

//Search provider
module.exports.search = async function (req, res) {
  const cond = req.query;
  console.log("query", cond);
  const providers = await searchProvider(cond);
  if (!providers) res.sendStatus(404);
  else res.send(providers);
};
