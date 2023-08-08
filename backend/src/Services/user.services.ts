import AppDataSource from "../data-source";
import { Address } from "../Entities/addresses.entity";
import { User } from "../Entities/user.entity";
import { AppError } from "../Errors/error";
import { IUserRequest, IUser } from "../Interfaces/users";
import createUserWOShape from "../Serials/userWOpassword.serial";
import { Request } from "express";

export const createUserService = async (
  userData: IUserRequest
): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);
  const userEmailExist = await userRepository.findOneBy({
    email: userData.email,
  });
  const userCPFExist = await userRepository.findOneBy({ cpf: userData.cpf });

  const { address, ...user } = userData;

  if (userEmailExist) {
    throw new AppError("email alredy exist", 409);
  }

  if (userCPFExist) {
    throw new AppError("CPF alredy exist", 409);
  }

  const createdAddress = addressRepository.create(address);
  await addressRepository.save(createdAddress);
  const createdUser = userRepository.create({
    ...user,
    address: createdAddress,
  });

  await userRepository.save(createdUser);

  const userWithoutPassord = await createUserWOShape.validate(createdUser, {
    stripUnknown: true,
  });

  return userWithoutPassord;
};

export const updateUserService = async (request: Request): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  const findUser = await userRepository.findOne({
    where: { id: request.params.id },
    relations: {
      address: true,
      comments: true,
      annoucement: true,
    },
  });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  const keys = Object.keys(request.body.address);

  if (keys.length > 0 && request.user.id === findUser.id) {
    const updatedAddress = addressRepository.create({
      ...findUser.address,
      ...request.body.address,
    });

    await addressRepository.save(updatedAddress);
  }
  if (request.user.id === findUser.id) {
    const updatedUser = userRepository.create({
      ...findUser,
      ...request.body,
    });

    await userRepository.save(updatedUser);

    const userExist = await userRepository.find({
      where: { id: findUser.id },
      relations: {
        address: true,
        comments: true,
        annoucement: true,
      },
    });

    const updatedUserWithoutPassword = await createUserWOShape.validate(
      userExist[0],
      {
        stripUnknown: true,
      }
    );

    return updatedUserWithoutPassword;
  }

  throw new AppError("Permission denied", 403);
};

export const listUserService = async (request: Request): Promise<IUser[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const usersWithoutPassordPromise = users.map(async (user) => {
    const userWoPsswd = await createUserWOShape.validate(user, {
      stripUnknown: true,
    });
    return userWoPsswd;
  });

  const usersWopassword = await Promise.all(usersWithoutPassordPromise);

  return usersWopassword;
};

export const retriveUserService = async (request: Request): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const userExist = await userRepository.find({
    where: { id: request.user.id },
    relations: {
      address: true,
      comments: true,
      annoucement: true,
    },
  });

  if (!userExist) {
    throw new AppError("Permission denied", 404);
  }

  const userWithoutPassord = await createUserWOShape.validate(userExist[0], {
    stripUnknown: true,
  });

  return userWithoutPassord;
};

export const deleteUserService = async (request: Request): Promise<number> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: request.params.id });

  if (!user) {
    throw new AppError("Permission denied", 404);
  }

  if (user.id != request.user.id) {
    throw new AppError("Permission denied", 403);
  }

  await userRepository.remove(user);

  return 204;
};
