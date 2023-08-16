import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { Input } from "@/components/Input";
import { Table } from "@/components/Table";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

interface IAccess {
  id: number;
  name: string;
  description: string;
}

export default function Access() {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataRows, SetDataRows] = useState<IAccess[]>(null!);
  const [searchValue, setSearchValue] = useState<number | string>();

  const filteredRows = searchValue
    ? dataRows.filter(
        (acesso) =>
          acesso.name.toLowerCase().includes(String(searchValue).toLowerCase()) || acesso.id === Number(searchValue)
      )
    : dataRows;

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  function onSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(searchValue);
  }

  return (
    <Container loading={loading} className="space-y-5">
      <header className="w-full">
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
