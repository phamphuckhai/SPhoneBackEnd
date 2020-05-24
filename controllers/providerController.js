//declare model
const provider = require("../models").providers;
//check connect table user

provider.sync()
  .then(() => console.log("successfully"))
  .catch((err) => console.log("oh no!"));

//create provider
const createProvider = async ({ name, address, phone }) => {
    return await provider.create({ name, address, phone });
  };
  
  //get providers
  const getAllProvider = async () => {
    return await provider.findAll();
  };
  
  //get provider
  const getProvider = async (condition) => {
    return await provider.findOne({
      where: condition,
    });
  };
   //get provider
   const getProviderTwoConditon = async ({id, name}) => {
    return await provider.findAll({
      where: {
          id: id,
          name: name
      }
    });
  };
  //delete provider
  const deleteProvider = async (condition) => {
    return await provider.destroy({
      where: condition,
    });
  };
  
  module.exports.addProvider = function (req, res, next) {
    const { name, address, phone } = req.body;
    createProvider({ name, address, phone }).then((providers) =>
      res.json({ providers, msg: "provider created successfully " })
    );
  }

  module.exports.getProviders = function (req, res) {
    getAllProvider().then((providers) => res.json(providers));
  }

  module.exports.getProviderById = function (req, res) {
    let id = req.params.id;
    getProvider({id}).then((providers)=> res.json(providers));
  }
  
  module.exports.updateProviderById = function (req, res) {
    let id = req.params.id;
    let newPvd = req.body;
    getProvider({id}).then((provider)=> 
        provider.update(newPvd).then(newProvider =>
            res.json(newProvider))
    );
  }
  module.exports.deleteProviderById = function (req, res){
    let id = req.params.id;
    deleteProvider({id}).then((provider)=> res.json("delete successfully!"))
  }

  module.exports.searchProvideByIdAndName = function (req, res){
    let id = req.query.id;
    let name = req.query.name;
    getProviderTwoConditon({id, name}).then((provider)=> res.json(provider))
    console.log(name)
  }