import * as yup from "yup";
import { SchemaOf } from "yup";
import { iLinkUpdateResponse } from "../../interfaces/link";

export const linkUpdateResponseSchema: SchemaOf<iLinkUpdateResponse> = yup
  .object()
  .shape({
    user: yup.object().shape({
      id: yup.string().notRequired(),
      name: yup.string().notRequired(),
    }),
    visits: yup.number().required(),
    shortened_link: yup.string().required(),
    original_link: yup.string().required(),
    title: yup.string().required(),
    id: yup.string().required(),
  });
