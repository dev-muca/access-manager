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
  approver_owner?: boolean;
  justification?: string;
  request_date?: string;
  username?: string;
  fullname?: string;
  status?: string;
}
