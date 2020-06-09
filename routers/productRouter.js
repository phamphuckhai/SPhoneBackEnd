import {authorize} from "../utils/permission";

const {Router} = require("express");
const router = Router();
const productController = require("../controllers/productController");
const {checkAccess} = require('../utils/permission');

//Search, get, get all providers
router.get("/",
    authorize('read', 'products'),
    productController.search);

//route get provider from id
router.get("/:id",
    authorize('read', 'products'),
    productController.getProductById
);

//route Put provider 
router.put("/:id",
    authorize('update', 'products'),
    productController.updateProductById);

//route delete provider
router.delete("/:id",
    authorize('delete', 'products'),
    productController.deleteProductById
);

//route add provider
router.post("/",
    productController.addProduct
);

module.exports = router;
