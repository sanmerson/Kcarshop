import * as yup from "yup";
import { Schema } from "yup";
import { IUserRequest } from "../Interfaces/users";
import { IAnnoucementRequest } from "../Interfaces/annoucements";

const createAnnoucementShape: Schema<IAnnoucementRequest> = yup.object().shape({
  brand: yup.string().required(),
  model: yup.string().required(),
  banner: yup.string().required(),
  year: yup.string().required(),
  fuel: yup.string().required(),
  mileage: yup.number().required(),
  color: yup.string().required(),
  price: yup.number().required(),
  description: yup.string().required(),
  fip: yup.string().required(),
  images: yup.array(),
  is_bargain: yup.boolean(),
  is_published: yup.boolean(),
});

export default createAnnoucementShape;
