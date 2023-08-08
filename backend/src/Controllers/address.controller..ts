import { deleteAddressService } from "../Services/address.services";
import {
  createUserService,
  deleteUserService,
  listUserService,
  retriveUserService,
  updateUserService,
} from "../Services/user.services";
import { Request, Response } from "express";

export const deleteAddressController = async (
  request: Request,
  response: Response
) => {
  const status = await deleteAddressService(request);
  return response.status(Number(status)).send();
};
