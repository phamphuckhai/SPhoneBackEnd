const {Router} = require("express");
const router = Router();
const providerController = require("../controllers/providerController");
const {checkAccess} = require('../utils/permission');

//route list provider
router.get("/providers",
    (req, res, next) => {
        console.log(req.user);
        next();
    },
    providerController.getProviders);

//Search >?
router.get("/provider/Search", providerController.searchProvideByIdAndName);

//route get provider from id
router.get("/provider/:id", providerController.getProviderById);
//route Put provider 
router.put("/provider/:id", providerController.updateProviderById);
//route delete provider
router.delete("/provider/:id", providerController.deleteProviderById);

//route add provider
router.post("/provider", providerController.addProvider);


module.exports = router;
