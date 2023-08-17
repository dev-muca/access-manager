import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import API from "@/services/API";

import { Input } from "@/components/Input";
import { Table } from "@/components/Table";
import { Button } from "@/components/Button";
import { IAccess } from "@/interfaces/access";
import { Container } from "@/components/Container";

export default function Access() {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataRows, setDataRows] = useState<IAccess[]>(null!);
  const [searchValue, setSearchValue] = useState<number | string>();

  const filteredRows =
    searchValue && dataRows
      ? dataRows.filter(
          (acesso) =>
            acesso.name.toLowerCase().includes(String(searchValue).toLowerCase()) || acesso.id === Number(searchValue)
        )
      : dataRows;

  useEffect(() => {
    API.Access.GetInfo()
      .then((response) => setDataRows(response.accesses))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  function onSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(searchValue);
  }

  return (
    <Container loading={loading}>
      <header className="w-full mb-12">
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
      <Table headers={["#", "Nome", "Descrição", "Ações"]} rows={filteredRows} />
    </Container>
  );
}
