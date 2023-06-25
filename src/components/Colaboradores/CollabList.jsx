export function CollabList({ collabs }) {
  return (
    <div>
      <ul>
        {!!collabs && !!collabs ? (
          collabs?.map((collab) => (
            <li key={collab.id} className="py-1 px-2 border-b flex justify-between items-center hover:bg-gray-100">
              <span>{collab.fullname}</span>
              <p className="text-xs font-medium uppercase">
                {collab.status ? (
                  <span className="text-green-500">Ativo</span>
                ) : (
                  <span className="text-red-500">Inativo</span>
                )}
              </p>
            </li>
          ))
        ) : (
          <li className="py-1 px-2 flex text-red-300 justify-center items-center">Nenhum colaborador neste setor</li>
        )}
      </ul>
    </div>
  );
}
