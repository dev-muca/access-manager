SELECT
    R.id,
    A.name accessName,
    A.description accessDescription,
    R.approver_owner AS approverOwner,
    R.justification,
    U.username,
    U.fullname,
    DATE_FORMAT (R.request_date, '%Y-%m-%d %H:%i:%s') AS requestDate,
    S.status
FROM
    request R
    LEFT JOIN user U ON R.id_requester = U.id
    LEFT JOIN access A ON R.id_access = A.id
    LEFT JOIN status S ON R.id_status = S.id
WHERE
    R.id = ?