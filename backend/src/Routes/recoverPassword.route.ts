import { Router } from "express";
import { recoverpasswordController } from "../Controllers/login.controller";

const recoverRouter = Router();

recoverRouter.post(`/api/recoverpassword`, recoverpasswordController);

export default recoverRouter;
