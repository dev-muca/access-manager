SELECT
    AR.id approvalId,
    R.id requestId,
    A.name accessName,
    A.description accessDescription,
    DATE_FORMAT (R.request_date, '%Y-%m-%d %H:%i:%s') AS requestDate,
    R.justification,
    R.approver_owner approverOwner,
    U.id requesterId,
    U.fullname requesterName,
    S.status
FROM
    approval_request AR
    INNER JOIN approval AP ON AP.id = AR.id_approval
    INNER JOIN request R ON R.id = AR.id_request
    INNER JOIN access A ON A.id = R.id_access
    INNER JOIN USER U ON U.id = R.id_requester
    INNER JOIN STATUS S ON S.id = AP.id_status
WHERE
    AP.id_user = ?
    AND AP.id_status = (
        SELECT
            id
        FROM
            STATUS
        WHERE
            STATUS = ?
    )
ORDER BY
    requestDate DESC