import * as yup from "yup";
import { Schema } from "yup";
import { IUserRequest } from "../Interfaces/users";
import addressSchema from "./createAddress.serial";

const createUserShape: Schema<IUserRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  phone: yup.string().required(),
  cpf: yup.string().required(),
  description: yup.string().required(),
  is_seller: yup.boolean().required(),
  birth_date: yup.date().required(),
  address: addressSchema,
});

export default createUserShape;
