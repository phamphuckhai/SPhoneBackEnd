import {authorize} from "../utils/permission";

const {Router} = require("express");
const router = Router();
const productController = require("../controllers/productController");
const {checkAccess} = require('../utils/permission');

//Search, get, get all providers
router.get("/",
    authorize('read', 'providers'),
    productController.search);

//route get provider from id
router.get("/:id",
    authorize('read', 'providers'),
    productController.getProductById
);

//route Put provider 
router.put("/:id",
    authorize('update', 'providers'),
    productController.updateProductById);

//route delete provider
router.delete("/:id",
    authorize('delete', 'providers'),
    productController.deleteProductById
);

//route add provider
router.post("/",
    authorize('create', 'providers'),
    productController.addProduct
);

module.exports = router;
