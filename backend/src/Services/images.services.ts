import AppDataSource from "../data-source";
import { Annoucement } from "../Entities/annoucement.entity";
import { Image } from "../Entities/image.entity";
import { AppError } from "../Errors/error";
import {
  IAnnoucementRequest,
  IAnnoucementResponse,
} from "../Interfaces/annoucements";
import { Request } from "express";
import { fileValidation } from "../Utils";

export const createImageService = async (request: Request): Promise<Image> => {
  const annoucementRepository = AppDataSource.getRepository(Annoucement);
  const imagesRepository = AppDataSource.getRepository(Image);
  const annoucement = await annoucementRepository.findOneBy({
    id: request.params.id,
  });

  if (!annoucement) {
    throw new AppError("Annoucement not found", 404);
  }

  if (!fileValidation(request.body.url)) {
    throw new AppError("Invalid file type", 400);
  }

  const createdImages = imagesRepository.create({
    url: request.body.url,
    annoucement: annoucement,
  });
  await imagesRepository.save(createdImages);

  return createdImages;
};

export const deleteImagesService = async (
  request: Request
): Promise<number> => {
  const imagesRepository = AppDataSource.getRepository(Image);

  console.log(request);
  const image = await imagesRepository.findOneBy({
    id: request.params.id,
  });

  if (!image) {
    throw new AppError("Not Found", 404);
  }

  await imagesRepository.remove(image);

  return 204;
};
