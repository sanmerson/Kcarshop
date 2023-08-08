import * as yup from "yup";
import { Schema } from "yup";
import {
  IAddressPatch,
  IAddressRequest,
  IUserRequest,
} from "../Interfaces/users";

const addressPatchSchema: Schema<IAddressPatch> = yup.object().shape({
  cep: yup.string(),
  state: yup.string(),
  city: yup.string(),
  number: yup.string(),
  road: yup.string(),
  complement: yup.string(),
});

export default addressPatchSchema;
