import * as yup from "yup";
import { Schema } from "yup";
import addressPatchSchema from "./createAddressPatch.serial";
import { IUser } from "../Interfaces/users";

const createUserWOShape: Schema<IUser> = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string().required(),
  description: yup.string().required(),
  birth_date: yup.date().required(),
  is_seller: yup.boolean().required(),
  cpf: yup.string().required(),
  createdAt: yup.date().required(),
  updatedAt: yup.date().required(),
  address: addressPatchSchema.notRequired(),
  annoucement: yup.array(),
  comments: yup.array(),
});

export default createUserWOShape;
