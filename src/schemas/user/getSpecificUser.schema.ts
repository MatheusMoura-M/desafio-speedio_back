import * as yup from "yup";
import { iGetUserResponse } from "../../interfaces/user";

export const getSpecificUserSchema: yup.SchemaOf<iGetUserResponse> = yup
  .object()
  .shape({
    links: yup.array(
      yup.object().shape({
        shortened_link: yup.string().required(),
        original_link: yup.string().required(),
        title: yup.string().required(),
        visits: yup.number().required(),
        id: yup.string().required(),
      })
    ),
    email: yup.string().email().required(),
    name: yup.string().required(),
    id: yup.string().required(),
  });
