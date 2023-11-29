UPDATE approval
SET
    id_status = (
        SELECT
            id
        FROM
            status
        WHERE
            status = ?
    ),
    approval_date = ?,
    comment = ?
WHERE
    id = ?