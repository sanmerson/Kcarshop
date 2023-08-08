import * as yup from "yup";
import { Schema } from "yup";
import { IAddressRequest, IUserRequest } from "../Interfaces/users";

const addressSchema: Schema<IAddressRequest> = yup.object().shape({
  cep: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
  number: yup.string().required(),
  road: yup.string().required(),
  complement: yup.string(),
});

export default addressSchema;
