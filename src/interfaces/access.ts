import { Approver } from "./approver";

export interface Access {
  id: number;
  name: string;
  description: string;
  approver: Approver[];
}
