import { ChangeEvent } from "react";

import useSearch from "@/hooks/useSearch";

import { Input } from "@/components/Form/Input";
import { Button } from "@/components/Form/Button";
import { Container } from "@/components/Form/Container";
import Link from "next/link";

export default function Search() {
  const { loading, searchValue, filteredRows, setSearchValue, onSubmitForm } = useSearch();

  return (
    <Container loading={loading}>
      <header className="py-6">
        <form onSubmit={onSubmitForm} className="flex flex-row gap-2 justify-center items-center">
          <Input
            name="search"
            placeholder="Filtre acessos por nome ou código aqui"
            value={searchValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.currentTarget.value)}
          />
          <Button label="Pesquisar" />
        </form>
      </header>
      <section className="relative overflow-x-auto sm:rounded-md max-h-[calc(100vh-120px)] border-b">
        <table className="w-full text-sm text-left text-gray-50 overflow-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3 text-center font-bold">
                ###
              </th>
              <th scope="col" className="px-6 py-3 text-center font-bold">
                Nome
              </th>
              <th scope="col" className="px-6 py-3 text-center font-bold">
                Descrição
              </th>
              <th scope="col" className="px-6 py-3 text-center font-bold">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRows?.map((row) => (
              <tr key={row.id} className="odd:bg-white even:bg-gray-50 border-b text-gray-800">
                <td className="px-6 py-4 text-center">{row.id}</td>
                <td className="px-6 py-4">{row.name}</td>
                <td className="px-6 py-4 hidden sm:block">{row.description.substring(0, 75) + "..."}</td>
                <td className="px-6 py-4 text-center">
                  <Link href={{ pathname: "/request", query: { reqId: row.id } }} className="text-blue-700 underline">
                    Solicitar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Container>
  );
}
