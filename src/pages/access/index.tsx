import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

export default function Access() {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<number | string>();

  useEffect(() => {
    setLoading(true);

    setTimeout(() => setLoading(false), 1500);
  }, []);

  function onSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(searchValue);
  }

  return (
    <Container loading={loading}>
      <header className="w-full">
        <form onSubmit={onSubmitForm} className="flex flex-row gap-2 justify-center items-center">
          <Input
            name="search"
            placeholder="Informe o código ou nome do acesso aqui."
            value={searchValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.currentTarget.value)}
          />
          <Button label="Pesquisar" />
        </form>
      </header>
    </Container>
  );
}
