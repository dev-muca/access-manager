export interface IRequest {
  id: number;
  idAccess: number;
  idRequester: number;
  justification?: string;
  approverOwner: boolean;
  requestDate: string;
  approvalDate?: string;
  idStatus: number;
}
