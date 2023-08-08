import { Router } from "express";
import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware";
import { deleteAddressController } from "../Controllers/address.controller.";

const addressRouter = Router();

addressRouter.delete(
  `/api/userAddress`,
  ensureAuthMiddleware,
  deleteAddressController
);

export default addressRouter;
