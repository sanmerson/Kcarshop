import { Annoucement } from "../Entities/annoucement.entity";
import { Comments } from "../Entities/comments.entity";
import { User } from "../Entities/user.entity";
import { AppError } from "../Errors/error";
import AppDataSource from "../data-source";
const commentsRepository = AppDataSource.getRepository(Comments);
const userRepository = AppDataSource.getRepository(User);
const annoucementRepository = AppDataSource.getRepository(Annoucement);

export const createCommentsService = async (
  payload: any,
  userId: string,
  annoucementId: string
) => {
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const announcement = await annoucementRepository.findOneBy({
    id: annoucementId,
  });

  if (!announcement) {
    throw new AppError("Annoucement not found", 404);
  }

  const newComment = commentsRepository.create({
    ...payload,
    user,
    announcement,
  });
  console.log(newComment);
  return await commentsRepository.save(newComment);
};

export const deleteCommentsService = async (id: string) => {
  const comments = await commentsRepository.findOneBy({ id: id });

  if (!comments) {
    throw new AppError("Not Found", 404);
  }

  await commentsRepository.remove(comments);

  return 204;
};

export const updateCommentsService = async (
  payload: any,
  annoucementId: string,
  commentsId: string
) => {
  const annoucement = await annoucementRepository.findOneBy({
    id: annoucementId,
  });

  if (!annoucement) {
    throw new AppError("Annoucement not found", 404);
  }
  const findComment = await commentsRepository.findOneBy({
    id: commentsId,
  });

  if (!findComment) {
    throw new AppError("Annoucement not found", 404);
  }

  if (findComment) {
    const commentAnnoucement = commentsRepository.create({
      ...findComment,
      ...payload,
      annoucement,
      is_updated: true,
    });

    await commentsRepository.save(commentAnnoucement);

    return commentAnnoucement;
  }

  throw new AppError("Permission denied", 403);
};
export const retrieveComments = async (annoucementId: string) => {
  const comments = await commentsRepository.find({
    relations: {
      user: true,
      announcement: true,
    },
  });

  return comments;
};
