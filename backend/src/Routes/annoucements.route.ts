import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUserController,
  updateUserController,
} from "../Controllers/user.controller";
import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware";
import validateSchemaMiddleware from "../Middlewares/validadeschema.middleware";
import createAnnoucementShape from "../Serials/createAnnoucements.serial";
import {
  listAnnoucementController,
  createAnnoucementController,
  updateAnnoucementController,
  deleteAnnoucementController,
  retriveAnnoucementController,
  listAnnoucementUserController,
} from "../Controllers/annoucement.controller";
import patchAnnoucementShape from "../Serials/patchAnnoucements.serial";

const annoucementsRouter = Router();

annoucementsRouter.get(`/api/anoucements`, listAnnoucementController);
annoucementsRouter.get(`/api/anoucements/:id`, retriveAnnoucementController);
annoucementsRouter.get(
  `/api/anoucementUser/:id`,
  listAnnoucementUserController
);
annoucementsRouter.post(
  `/api/anoucements`,
  ensureAuthMiddleware,
  validateSchemaMiddleware(createAnnoucementShape),
  createAnnoucementController
);
annoucementsRouter.patch(
  `/api/anoucements/:id`,
  ensureAuthMiddleware,
  validateSchemaMiddleware(patchAnnoucementShape),
  updateAnnoucementController
);
annoucementsRouter.delete(
  `/api/anoucements/:id`,
  ensureAuthMiddleware,
  deleteAnnoucementController
);

export default annoucementsRouter;
