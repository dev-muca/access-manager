export function CollabList({ collabs }) {
  return (
    <div>
      <ul>
        {!!collabs && !!collabs ? (
          collabs?.map((collab) => (
            <li
              className="py-1 px-2 border-b flex justify-between items-center hover:bg-gray-100"
              key={collab.username}
            >
              <span>{collab.fullname}</span>
              <span className="text-xs font-medium text-green-500 uppercase">Ativo</span>
            </li>
          ))
        ) : (
          <li className="py-1 px-2 flex text-red-300 justify-center items-center">Nenhum colaborador neste setor</li>
        )}
      </ul>
    </div>
  );
}
