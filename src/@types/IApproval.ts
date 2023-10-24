interface IApproval {
  requestNumber: number;
  access: string;
  description?: string;
  requesterId: number;
  requesterName: string;
  requestUsername: string;
  requestDate: string;
  approverOwner: boolean | null;
  status: string;
}

export default IApproval;
