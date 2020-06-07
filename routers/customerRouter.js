import {authorize} from "../utils/permission";
import {
    addCustomer,
    deleteCustomerById,
    getCustomerById,
    searchCustomer,
    updateCustomerById
} from "../controllers/customerController";
import {check} from "express-validator";
import {validationHandler} from "../utils/validate";

const {Router} = require('express');
const router = Router();

router.get("/",
    authorize('read', 'customers'),
    searchCustomer);

//route get provider from id
router.get("/:id",
    authorize('read', 'customers'),
    getCustomerById);

//route Put provider
router.put("/:id",
    authorize('update', 'customers'),
    updateCustomerById);

//route delete provider
router.delete("/:id",
    authorize('delete', 'customers'),
    deleteCustomerById);

//route add provider
router.post("/",
    authorize('create', 'customers'),
    [
        check('name').isString(),
        check('phone').isString(),
        check('address').isString(),
        check('email').isEmail(),
    ],
    validationHandler,
    addCustomer
);


export const customerRouter = router;