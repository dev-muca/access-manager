import { ChangeEvent } from "react";

import useSearch from "@/hooks/useSearch";

import { Table } from "@/components/Table";
import { Input } from "@/components/Form/Input";
import { Button } from "@/components/Form/Button";
import { Container } from "@/components/Form/Container";

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
      <Table headers={["#", "Nome", "Descrição", "Ações"]} rows={filteredRows} />
    </Container>
  );
}
