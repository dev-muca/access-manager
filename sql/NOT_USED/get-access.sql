SELECT
       A.id,
       A.name,
       A.description,
       GROUP_CONCAT(CONCAT(U.id, '-', u.fullname) ORDER BY U.id ASC SEPARATOR ';') AS approver
FROM
       access A
       INNER JOIN approver AP ON AP.id_access = A.id
       INNER JOIN USER U ON U.id = AP.id_user
WHERE
       A.id = COALESCE(?, A.id)
GROUP BY A.name
ORDER BY
       CASE
              WHEN ? = 'id' THEN A.id
              WHEN ? = 'name' THEN A.name
              WHEN ? = 'description' THEN A.description
              ELSE A.id -- Ordenação padrão se o valor da variável não corresponder a nenhuma coluna específica 
       END;