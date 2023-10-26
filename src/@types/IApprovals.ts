interface IApprovals {
  approvalId: number;
  requestId: number;
  accessName: string;
  accessDescription?: string;
  requestDate: string;
  requesterId: number;
  requesterName: string;
  status: string;
}

export default IApprovals;
