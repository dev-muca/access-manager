import Link from "next/link";

interface TableProps {
  headers?: any[];
  rows?: any[];
}

export function Table({ headers, rows }: TableProps) {
  return (
    <section className="relative overflow-x-auto sm:rounded-md max-h-[calc(100vh-200px)] border-b">
      <table className="w-full text-sm text-left text-gray-50 overflow-auto">
        {headers && (
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
            <tr>
              {headers?.map((header, i) => (
                <th
                  key={i}
                  scope="col"
                  className={`px-6 py-3 ${i == 2 ? "hidden sm:block" : ""} ${i == 0 || i == 3 ? "text-center" : ""}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows?.map((row) => (
            <tr key={row.id} className="odd:bg-white even:bg-gray-50 border-b text-gray-800">
              <td className="px-6 py-4 text-center">{row.id}</td>
              <td className="px-6 py-4">{row.name}</td>
              <td className="px-6 py-4 hidden sm:block">{row.description.substring(0, 75) + "..."}</td>
              <td className="px-6 py-4 text-center">
                <Link href={`/access/${row.id}`} className="text-blue-700 underline">
                  Solicitar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
