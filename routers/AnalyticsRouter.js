import {Router} from 'express';
import {analyticsController} from "../controllers/AnalyticsController";

const router = Router();

//Search, get, get all products
router.get("/", analyticsController);

module.exports = router;
