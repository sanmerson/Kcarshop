import {
  createAnnoucementService,
  listAnnoucementService,
  updateAnnoucementService,
  deleteAnnoucementService,
  retrieveAnnoucementService,
} from "../Services/annoucements.services";
import { Request, Response } from "express";
import {
  createImageService,
  deleteImagesService,
} from "../Services/images.services";

export const createImageController = async (
  request: Request,
  response: Response
) => {
  const newImage = await createImageService(request);
  return response.status(201).json(newImage);
};

export const deleteImagesController = async (
  request: Request,
  response: Response
) => {
  const status = await deleteImagesService(request);
  return response.status(Number(status)).send();
};
