//declare
const category = require("../models").categories;
const { Sequelize } = require("../models");

//create category
const createCategory = async (Category) => {
    return await category.create(Category);
};

//search category
const searchCategory = async (condition) => {
    let Option = {};
    Object.keys(condition).forEach((val, index) => {
        if (isNaN(condition[val])) {
            Option[val] = { [Sequelize.Op.like]: `%${condition[val]}%` };
        } else {
            Option[val] = parseInt(condition[val], 10);
        }
    });
    return await category.findAll({
        where: Option,
    });
};

//Get Category
const getCategory = async (condition) => {
    const Category = await category.findOne({
        where: condition,
    });
    return Category;
};

//delete Category
const deleteCategory = async (condition) => {
    return await category.destroy({
        where: condition,
    });
};

module.exports.addCategory = async function (req, res, next) {
    try {
      const result = await createCategory(req.body);
      res.send(result);
    } catch (e) {
      console.log("error:", e);
      res.sendStatus(500);
    }
  };
  
  module.exports.getCategoryById = async function (req, res) {
    let id = req.params.id;
    const Category = await getCategory({ id });
    if (!Category) return res.sendStatus(404);
    else return res.send(Category.get());
  };
  
  module.exports.updateCategoryById = async function (req, res) {
    try {
      let id = req.params.id;
      let newCategory = req.body;
      const Category = await getCategory({ id });
      if (!Category) return res.sendStatus(400);
      const result = await Category.update(newCategory);
      res.send(result.get());
    } catch (e) {
      console.log("error:", e);
      res.sendStatus(500);
    }
  };
  module.exports.deleteCategoryById = async function (req, res) {
    let id = req.params.id;
    const result = await deleteCategory({ id });
    res.sendStatus(200);
  };
  
  //Search provider
  module.exports.searchCategory = async function (req, res) {
    const cond = req.query;
    console.log("query", cond);
    const Categories = await searchCategory(cond);
    if (!Categories) res.sendStatus(404);
    else res.send(Categories);
  };
  