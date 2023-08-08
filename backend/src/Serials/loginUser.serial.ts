import * as yup from "yup";
import { Schema } from "yup";
import { IUserLogin } from "../Interfaces/users";

const loginUserShape: Schema<IUserLogin> = yup.object().shape({
  password: yup.string().required(),
  email: yup.string().required(),
});

export default loginUserShape;
