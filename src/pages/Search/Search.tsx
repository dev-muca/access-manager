import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { GoTriangleDown } from "react-icons/go";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";

import IAccess from "@/@types/IAccess";
import useFetch from "@/hooks/useFetch";

const Search = () => {
  const [searchValue, setSearchValue] = useState<number | string>("");
  const [order, setOrder] = useState<string>("name");

  const { data, pageLoader } = useFetch<IAccess>({
    endpoint: `/api/access?orderBy=${order}`,
    method: "GET",
    dependencies: [order],
  });

  const rows =
    searchValue && data
      ? data.filter(
          (access: IAccess) =>
            access.name.toLowerCase().includes(String(searchValue).toLowerCase()) || access.id === Number(searchValue)
        )
      : data;

  function onSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Você encontrou o Easter-Egg 🥚");
  }

  return (
    <Container loading={pageLoader}>
      <header className="py-6">
        <form onSubmit={onSubmitForm} className="flex flex-row gap-2 justify-center items-center">
          <Input
            name="search"
            placeholder="Filtre acessos por nome ou código aqui"
            value={searchValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.currentTarget.value)}
          />
          <Button type="submit">
            <BiSearch size={20} className="mx-2" />
          </Button>
        </form>
      </header>
      <section className="relative overflow-x-auto sm:rounded-md max-h-[calc(100vh-120px)] border-b">
        <table className="w-full text-sm text-left text-gray-50 overflow-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center font-bold cursor-pointer hover:bg-gray-100"
                onClick={() => setOrder("id")}
              >
                <span className="flex items-center justify-center gap-2">
                  ID {order === "id" && <GoTriangleDown />}
                </span>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center font-bold cursor-pointer hover:bg-gray-100"
                onClick={() => setOrder("name")}
              >
                <span className="flex items-center gap-2">Nome {order === "name" && <GoTriangleDown />}</span>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center font-bold cursor-pointer hover:bg-gray-100 hidden sm:block"
                onClick={() => setOrder("description")}
              >
                <span className="flex items-center gap-2">
                  Descrição {order === "description" && <GoTriangleDown />}
                </span>
              </th>
              <th scope="col" className="px-6 py-3 text-center font-bold">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((row: IAccess) => (
              <tr key={row.id} className="odd:bg-white even:bg-gray-50 border-b text-gray-800">
                <td className="px-6 py-4 text-center">{row.id}</td>
                <td className="px-6 py-4">{row.name}</td>
                <td className="px-6 py-4 hidden sm:block">{row.description?.substring(0, 75) + "..."}</td>
                <td className="px-6 py-4 text-center">
                  <Link href={{ pathname: "/Request", query: { id: row.id } }} className="text-blue-700 underline">
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
};

export default Search;
