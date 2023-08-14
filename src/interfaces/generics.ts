export interface ICredentials {
  username: string;
  password: string;
}

export interface IError {
  code?: number;
  field: string;
  message: string;
}
