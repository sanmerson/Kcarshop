import { Router } from "express";
import validateSchemaMiddleware from "../Middlewares/validadeschema.middleware";
import loginUserShape from "../Serials/loginUser.serial";
import { loginUsersController } from "../Controllers/recoverPassoword.controller";

const loginRouter = Router();

loginRouter.post(
  `/api/login`,
  validateSchemaMiddleware(loginUserShape),
  loginUsersController
);

export default loginRouter;
