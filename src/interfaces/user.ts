export interface User {
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
  postalCode?: number;
  title?: string;
  office?: string;
  department?: string;
  company?: string;
  telephoneNumber?: number;
  homeNumber?: number;
  description?: string;
  active?: boolean;
  validationToken?: string;
}
