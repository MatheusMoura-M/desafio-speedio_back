import * as yup from "yup";
import { SchemaOf } from "yup";
import { iGetUserResponse } from "../../interfaces/user";

export const allUsersResponseSchema: SchemaOf<iGetUserResponse[]> = yup.array(
  yup.object().shape({
    links: yup.array(
      yup.object().shape({
        visits: yup.number().required(),
        shortened_link: yup.string().required(),
        original_link: yup.string().required(),
        title: yup.string().required(),
        id: yup.string().required(),
      })
    ),
    email: yup.string().required(),
    name: yup.string().required(),
    id: yup.string().required(),
  })
);
