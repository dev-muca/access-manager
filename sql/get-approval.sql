SELECT
    AP.id,
    U.fullname,
    S.status,
    AP.id approvalId,
    DATE_FORMAT (AP.approval_date, '%Y-%m-%d %H:%i:%s') approvalDate,
    AP.comment
FROM
    approval_request AR
    INNER JOIN request R ON R.id = AR.id_request
    INNER JOIN approval AP ON AP.id = AR.id_approval
    INNER JOIN user U ON U.id = AP.id_user
    INNER JOIN status S ON S.id = AP.id_status
WHERE
    R.id = ?