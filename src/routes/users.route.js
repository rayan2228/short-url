import e from "express";
import { createUser } from "../controllers/users.controller.js";
const router = e.Router();
router.route("/users").post(createUser);
export default router;
