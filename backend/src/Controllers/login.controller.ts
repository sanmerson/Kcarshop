import { Request, Response } from "express";
import recoverPasswordService from "../Services/recoverPassword.services";

export const recoverpasswordController = async (
  request: Request,
  response: Response
) => {
  const res = await recoverPasswordService(request.body.email);
  return response.status(200).json({ message: res });
};
