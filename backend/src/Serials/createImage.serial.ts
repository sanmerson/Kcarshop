import * as yup from "yup";
import { Schema } from "yup";
import { IUserRequest } from "../Interfaces/users";
import { IAnnoucementRequest } from "../Interfaces/annoucements";
import { Image } from "../Entities/image.entity";

export interface IImageRequest {
  url: string;
}

const createImageShape: Schema<IImageRequest> = yup.object().shape({
  url: yup.string().required(),
});

export default createImageShape;
