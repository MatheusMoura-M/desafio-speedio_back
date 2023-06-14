import * as yup from "yup";
import { SchemaOf } from "yup";
import { iLinkUpdate } from "../../interfaces/link";

export const linkUpdateSchema: SchemaOf<iLinkUpdate> = yup.object().shape({
  title: yup.string().required(),
});
