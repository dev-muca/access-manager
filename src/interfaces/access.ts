import { IApprover } from "./approver";

export interface IAccess {
  id: number;
  name: string;
  description: string;
  approver: IApprover[];
}
