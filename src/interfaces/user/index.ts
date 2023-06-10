import { iLinkResponse } from "../link";

export interface iUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface iOmitClientPassword extends Omit<iUserRequest, "password"> {}

export interface iUserResponse extends iOmitClientPassword {
  id: string;
}

export interface iUserLogin {
  email: string;
  password: string;
}

export interface iGetUserResponse {
  id: string;
  name: string;
  email: string;
  links: iLinkResponse[];
}
