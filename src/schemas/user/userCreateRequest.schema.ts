import * as yup from "yup";
import { iUserRequest } from "../../interfaces/user";

export const userCreateRequestSchema: yup.SchemaOf<iUserRequest> = yup
  .object()
  .shape({
    password: yup.string().required(),
    email: yup.string().email().required(),
    name: yup.string().required(),
  });
