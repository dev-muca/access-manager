import { FcInfo } from "react-icons/fc";
import { GetServerSideProps } from "next";

import API from "@/services/API";
import { Container } from "@/components/Container";
import { InfoBox } from "@/components/InfoBox";
import { Checkbox } from "@/components/Checkbox";
import { FormGroup } from "@/components/FormGroup";
import { Input } from "@/components/Input";
import { FormEvent, useState } from "react";
import { Button } from "@/components/Button";

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
      <form onSubmit={onSubmitForm}>
        <FormGroup label="Dados do acesso:">
          <div className="p-4 pl-6 flex flex-col gap-2">
            <p className="flex gap-2">
              <span className="font-medium">Nome:</span>
              <span>{access.name}</span>
            </p>
            <p className="flex gap-2">
              <span className="font-medium">Descrição:</span>
              <span>{access.description}</span>
            </p>
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
  const response = await API.Access.GetInfo(Number(reqId));
  const data = response.accesses[0];

  return {
    props: {
      access: data,
    },
  };
};
