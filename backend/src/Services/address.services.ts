import AppDataSource from "../data-source";
import { Address } from "../Entities/addresses.entity";
import { User } from "../Entities/user.entity";
import { AppError } from "../Errors/error";
import { IUserRequest, IUser, IUserResponse } from "../Interfaces/users";
import createUserWOShape from "../Serials/userWOpassword.serial";
import { Request } from "express";

export const deleteAddressService = async (
  request: Request
): Promise<number> => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  console.log("DAUSHDSAUADS");

  const user = await userRepository.find({
    where: { id: request.user.id },
    relations: { address: true },
  });

  if (!user[0]) {
    throw new AppError("Permission denied", 404);
  }

  const address = await addressRepository.find({
    where: { id: user[0].address.id },
  });

  await addressRepository.remove(address);

  return 204;
};
