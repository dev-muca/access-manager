interface IApprovals {
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

export default IApprovals;
