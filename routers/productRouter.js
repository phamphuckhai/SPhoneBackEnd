import {authorize} from "../utils/permission";

const {Router} = require("express");
const router = Router();
const productController = require("../controllers/productController");

//Search, get, get all products
router.get("/",
    authorize('read', 'products'),
    productController.search);

//route get products from id
router.get("/:id",
    authorize('read', 'products'),
    productController.getProductById
);

//route Put products 
router.put("/:id",
    authorize('update', 'products'),
    productController.updateProductById);

//route delete products
router.delete("/:id",
    authorize('delete', 'products'),
    productController.deleteProductById
);

//route add products
router.post("/",
    authorize('create', 'products'),
    productController.addProduct
);

module.exports = router;
