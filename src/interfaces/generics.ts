export interface Credentials {
  username: string;
  password: string;
}

export interface Error {
  code?: number;
  field: string;
  message: string;
}
