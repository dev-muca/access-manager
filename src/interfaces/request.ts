import { Approver } from "./approver";

export interface Request {
  id?: number;
  idAccess?: number;
  idRequester?: number;
  justification?: string;
  approverOwner?: boolean;
  requestDate?: string;
  approvalDate?: string;
  idStatus?: number;
  approver?: Approver[];
}

export interface Requests {
  id?: number;
  name?: string;
  approverOwner?: boolean;
  justification?: string;
  requestDate?: string;
  username?: string;
  fullname?: string;
  status?: string;
}
