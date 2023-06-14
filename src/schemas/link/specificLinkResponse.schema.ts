import * as yup from "yup";
import { SchemaOf } from "yup";
import { iLinkResponse } from "../../interfaces/link";

export const specificLinkResponseSchema: SchemaOf<iLinkResponse> = yup
  .object()
  .shape({
    visits: yup.number().required(),
    shortened_link: yup.string().required(),
    original_link: yup.string().required(),
    title: yup.string().required(),
    id: yup.string().required(),
  });
