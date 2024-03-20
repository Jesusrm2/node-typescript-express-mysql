import { Router } from "express";
import { deleteMenu, getMenu, getMenus, postMenu, putMenu } from "../controllers/menu";

const router = Router();

router.get('/', getMenus);
router.get('/:men_id', getMenu);
router.post('/', postMenu);
router.put('/:men_id', putMenu);
router.delete('/:men_id', deleteMenu);


export default router;