import IUser from "./IUser";

interface IAccess {
  id: number;
  name: string;
  description?: string;
  approver?: IUser[];
}

export default IAccess;
