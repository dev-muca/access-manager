import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import API from "@/services/API";

import { Table } from "@/components/Table";
import { Input } from "@/components/Form/Input";
import { Button } from "@/components/Form/Button";
import { IAccess } from "@/interfaces/access";
import { Container } from "@/components/Form/Container";

export default function Search() {
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
    API.Access.getInfo()
      .then((response) => setDataRows(response.access))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  function onSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(searchValue);
  }

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
      <Table headers={["#", "Nome", "Descrição", "Ações"]} rows={filteredRows} />
    </Container>
  );
}
