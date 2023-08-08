import AppDataSource from "../data-source";
import { Annoucement } from "../Entities/annoucement.entity";
import { Image } from "../Entities/image.entity";
import { User } from "../Entities/user.entity";
import { AppError } from "../Errors/error";
import {
  IAnnoucementListResult,
  IAnnoucementRequest,
  IAnnoucementResponse,
} from "../Interfaces/annoucements";
import { Request } from "express";
import createUserWOShape from "../Serials/userWOpassword.serial";

export const createAnnoucementService = async (
  data: IAnnoucementRequest,
  requestId: string
): Promise<IAnnoucementResponse> => {
  const annoucementRepository = AppDataSource.getRepository(Annoucement);
  const userRepository = AppDataSource.getRepository(User);
  const imagesRepository = AppDataSource.getRepository(Image);
  const user = await userRepository.findOneBy({ id: requestId });

  const { images, ...annoucement } = data;

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const createdAnnoucement = annoucementRepository.create({
    ...annoucement,
    user,
  });

  await annoucementRepository.save(createdAnnoucement);

  images?.forEach(async (image) => {
    const createdImages = imagesRepository.create({
      url: image,
      annoucement: createdAnnoucement,
    });
    await imagesRepository.save(createdImages);
  });

  const returnAnnoucement = await annoucementRepository.findOneBy({
    id: createdAnnoucement.id,
  });

  if (!returnAnnoucement) {
    throw new AppError("User not found", 404);
  }

  return returnAnnoucement;
};

export const updateAnnoucementService = async (
  data: Request
): Promise<IAnnoucementResponse[]> => {
  const annoucementRepository = AppDataSource.getRepository(Annoucement);

  const findAnnoucement = await annoucementRepository.findOneBy({
    id: data.params.id,
  });

  if (!findAnnoucement) {
    throw new AppError("Annoucement not found", 404);
  }

  if (findAnnoucement) {
    const updatedAnnoucement = annoucementRepository.create({
      ...findAnnoucement,
      ...data.body,
    });

    await annoucementRepository.save(updatedAnnoucement);

    return updatedAnnoucement;
  }

  throw new AppError("Permission denied", 403);
};

export const listAnnoucementUserService = async (request: Request) => {
  const annoucementRepository = AppDataSource.getRepository(Annoucement);
  const userRepository = AppDataSource.getRepository(User);
  const perPage = 16;
  const page = request.query.page || 1;

  const userExist = await userRepository.find({
    where: { id: request.params.id },
    relations: { address: true, comments: true },
  });

  if (!userExist) {
    throw new AppError("User not found", 404);
  }

  const findAnnoucement: Array<IAnnoucementResponse> =
    await annoucementRepository.find({
      take: perPage,
      skip: (+page - 1) * perPage,
      order: { created_at: "desc" },
      where: { user: { id: userExist[0].id } },
    });

  const UserWithoutPassword = await createUserWOShape.validate(userExist[0], {
    stripUnknown: true,
  });

  const result = {
    count: findAnnoucement.length,
    data: { user: UserWithoutPassword, annoucements: findAnnoucement },
  };
  return result;
};

export const listAnnoucementService = async (
  request: Request
): Promise<IAnnoucementListResult> => {
  const annoucementRepository = AppDataSource.getRepository(Annoucement);
  const perPage = 12;
  const page = request.query.page || 1;

  const annoucements = await annoucementRepository.find();
  const count = annoucements.length;

  const findAnnoucement: Array<IAnnoucementResponse> =
    await annoucementRepository.find({
      take: perPage,
      skip: (+page - 1) * perPage,
      order: { created_at: "desc" },
      relations: { user: true },
    });
  const result = {
    count: count,
    data: findAnnoucement,
  };
  return result;
};

export const retrieveAnnoucementService = async (
  request: Request
): Promise<IAnnoucementResponse> => {
  const annoucementRepository = AppDataSource.getRepository(Annoucement);
  const findAnnoucement = await annoucementRepository.find({
    where: { id: request.params.id },
    relations: ["images", "user", "comments", "user.address"],
  });

  if (!findAnnoucement[0]) {
    throw new AppError("Not Found", 404);
  }

  const newUser = await createUserWOShape.validate(findAnnoucement[0].user, {
    stripUnknown: true,
  });

  return { ...findAnnoucement[0], user: newUser };
};

export const deleteAnnoucementService = async (
  request: Request
): Promise<number> => {
  const annoucementRepository = AppDataSource.getRepository(Annoucement);

  const annoucement = await annoucementRepository.findOneBy({
    id: request.params.id,
  });

  if (!annoucement) {
    throw new AppError("Not Found", 404);
  }

  await annoucementRepository.remove(annoucement);

  return 204;
};
