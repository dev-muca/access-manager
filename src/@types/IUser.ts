interface IUser {
  id?: number;
  internalCode?: number;
  firstName?: string;
  lastName?: string;
  fullname?: string;
  email?: string;
  username?: string;
  password?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  postalCode?: number | null;
  title?: string;
  office?: string;
  department?: string;
  company?: string;
  telephoneNumber?: number | null;
  homeNumber?: number | null;
  description?: string;
  active?: boolean;
  validationToken?: string;
}

export default IUser;
