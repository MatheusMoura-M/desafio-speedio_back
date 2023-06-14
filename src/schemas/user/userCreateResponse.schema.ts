import * as yup from "yup";
import { iUserResponse } from "../../interfaces/user";

export const userCreateAndUpdateResponseSchema: yup.SchemaOf<iUserResponse> =
  yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().required(),
    id: yup.string().required(),
  });
