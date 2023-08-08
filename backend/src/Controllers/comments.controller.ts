import {
  createCommentsService,
  deleteCommentsService,
  retrieveComments,
  updateCommentsService,
} from "../Services/comments.services";
import { Request, Response } from "express";

export const createCommentsController = async (
  request: Request,
  response: Response
) => {
  const newUser = await createCommentsService(
    request.body,
    request.user.id,
    request.params.annoucementId
  );
  return response.status(201).json(newUser);
};

export const updateCommentsController = async (
  request: Request,
  response: Response
) => {
  const updatedUser = await updateCommentsService(
    request.body,
    request.params.annoucementId,
    request.params.id
  );
  return response.status(200).json(updatedUser);
};

export const deleteCommentsController = async (
  request: Request,
  response: Response
) => {
  const status = await deleteCommentsService(request.params.id);
  return response.status(Number(status)).send();
};

export const retrieveCommentsUserController = async (
  request: Request,
  response: Response
) => {
  const comments = await retrieveComments(request.params.annoucementId);
  return response.status(200).json(comments);
};

