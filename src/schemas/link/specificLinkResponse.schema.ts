import * as yup from "yup";
import { SchemaOf } from "yup";
import { iGetSpecificLink } from "../../interfaces/link";

export const specificLinkResponseSchema: SchemaOf<iGetSpecificLink> = yup
  .object()
  .shape({
    user: yup.object().shape({
      id: yup.string().required(),
      name: yup.string().required(),
    }),
    visits: yup.number().required(),
    shortened_link: yup.string().required(),
    original_link: yup.string().required(),
    title: yup.string().required(),
    id: yup.string().required(),
  });
