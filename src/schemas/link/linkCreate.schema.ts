import * as yup from "yup";
import { SchemaOf } from "yup";
import { iLinkRequest } from "../../interfaces/link";

export const linkCreateSchema: SchemaOf<iLinkRequest> = yup.object().shape({
  original_link: yup.string().required(),
  title: yup.string().required(),
});
