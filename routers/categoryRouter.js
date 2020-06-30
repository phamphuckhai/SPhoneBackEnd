import { authorize } from "../utils/permission";
import {
    addCategory,
    searchCategory,
    deleteCategoryById,
    updateCategoryById,
    getCategoryById,
} from "../controllers/categoryController";

const { Router } = require("express");
const router = Router();

router.get("/", authorize("read", "categories"), searchCategory);

//route get provider from id
router.get("/:id", authorize("read", "categories"), getCategoryById);

//route Put provider
router.put("/:id", authorize("update", "categories"), updateCategoryById);

//route delete provider
router.delete("/:id", authorize("delete", "categories"), deleteCategoryById);

//route add provider
router.post(
    "/",
    authorize("create", "categories"),
    addCategory
);

module.exports = router;
