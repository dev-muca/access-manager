import { Access } from "./access";
import { Errors } from "./errors";
import { Requests } from "./request";
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
  requests?: Requests[];
  error?: Errors;
}

export interface RequestNumberOrError {
  requestNumber?: number;
  error?: Errors;
}
