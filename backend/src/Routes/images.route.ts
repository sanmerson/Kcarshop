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
} from "../Controllers/annoucement.controller";
import patchAnnoucementShape from "../Serials/patchAnnoucements.serial";
import {
  createImageController,
  deleteImagesController,
} from "../Controllers/images.controller";
import createImageShape from "../Serials/createImage.serial";

const imagesRouter = Router();

// annoucementsRouter.get(`/api/anoucements`, listAnnoucementController);
// annoucementsRouter.get(`/api/anoucements/:id`, retriveAnnoucementController);
imagesRouter.post(
  `/api/images/:id`,
  ensureAuthMiddleware,
  validateSchemaMiddleware(createImageShape),
  createImageController
);
// annoucementsRouter.patch(
//   `/api/anoucements/:id`,
//   validateSchemaMiddleware(patchAnnoucementShape),
//   updateAnnoucementController
// );
imagesRouter.delete(`/api/images/:id`, deleteImagesController);

export default imagesRouter;
