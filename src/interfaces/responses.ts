import { Access } from "./access";
import { Errors } from "./errors";
import { Request } from "./request";
import { User } from "./user";

export interface UserOrError {
  user?: User;
  error?: Errors;
}

export interface AccessOrError {
  access?: Access[];
  error?: Errors;
}

export interface AccessApproverOrError {
  access?: Access;
  error?: Errors;
}

export interface RequestOrError {
  requestNumber?: number;
  error?: Errors;
}
