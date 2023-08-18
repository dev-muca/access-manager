import { GetServerSideProps } from "next";

import API from "@/services/API";
import { FormEvent, useState } from "react";
import { Button } from "@/components/Form/Button";
import { Container } from "@/components/Form/Container";
import { FormGroup } from "@/components/Form/FormGroup";
import { Input } from "@/components/Form/Input";
import { Checkbox } from "@/components/Form/Checkbox";

export default function Request({ access }: any) {
  const [loader, setLoader] = useState<boolean>(false);
  const [justification, setJustification] = useState<boolean>(false);

  async function onSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoader(true);

    setTimeout(() => setLoader(false), 2300);
  }

  return (
    <Container title="Requisição de Novos Acessos">
      <form onSubmit={onSubmitForm} className="flex flex-col justify-around">
        <FormGroup label="Dados do acesso:">
          <div className="w-full p-4 pl-6 flex flex-col gap-2">
            <p className="flex gap-2">
              <span className="font-medium">Nome:</span>
              <span>{access.name}</span>
            </p>
            <p className="flex gap-2">
              <span className="font-medium">Descrição:</span>
              <span>{access.description}</span>
            </p>
            <ul className="mt-4">
              <p className="font-medium">Aprovadores:</p>
              <li className="even:bg-gray-100 odd:bg-white px-2 py-0.5">{access.approver}</li>
            </ul>
          </div>
        </FormGroup>

        <FormGroup label="Dados complementares:">
          <div className="w-full p-4 px-6 flex flex-col justify-start">
            <Input
              label="Justificativa:"
              placeholder="Insira aqui uma justificativa para sua solicitação"
              multiline
              disabled={justification}
            />

            <Checkbox
              label="Aprovador"
              hasInfo
              infoMessage="Ao marcar esta opção, você irá solicitar para ser aprovador deste acesso."
              onChange={() => setJustification(!justification)}
            />
          </div>
        </FormGroup>

        <div className="w-full flex justify-end">
          <Button label="Solicitar" className="w-40" loader={loader} />
        </div>
      </form>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  //
  const reqId = context.query.reqId;
  const response = await API.Access.GetApprover(Number(reqId));
  const data = response.access[0];

  return {
    props: {
      access: data,
    },
  };
};
