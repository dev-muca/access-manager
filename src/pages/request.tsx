import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

import API from "@/services/API";
import { IAccess } from "@/interfaces/access";

import { Input } from "@/components/Form/Input";
import { Button } from "@/components/Form/Button";
import { Checkbox } from "@/components/Form/Checkbox";
import { Container } from "@/components/Form/Container";
import { FormGroup } from "@/components/Form/FormGroup";

export default function Request() {
  const [loader, setLoader] = useState<boolean>(true);
  const [access, setAccess] = useState<IAccess | null>(null);
  const [justification, setJustification] = useState<boolean>(false);

  const router = useRouter();
  const { reqId } = router.query;

  useEffect(() => {
    API.Access.getApprover(Number(reqId))
      .then((response) => {
        setAccess(response.access);
        console.log(response.access);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  }, []);

  async function onSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoader(true);

    setTimeout(() => setLoader(false), 2300);
  }

  return (
    <Container title="Solicitação de novos acessos:" loading={loader}>
      <form onSubmit={onSubmitForm} className="w-full h-full flex flex-col">
        <FormGroup label="Dados do acesso:">
          <div className="w-full p-4 pl-6 flex flex-col gap-2">
            <p className="flex gap-2">
              <span className="font-medium">Nome:</span>
              <span>{access?.name}</span>
            </p>
            <p className="flex gap-2">
              <span className="font-medium">Descrição:</span>
              <span>{access?.description}</span>
            </p>
            <ul className="mt-4">
              <span className="font-medium">Aprovadores:</span>
              {access?.approver.length ? (
                access?.approver?.map((approver, i) => (
                  <li key={i} className="even:bg-gray-100 odd:bg-white px-2 py-0.5">
                    {approver.fullname}
                  </li>
                ))
              ) : (
                <span className="w-fit text-red-600 font-medium rounded-md px-2 py-0.5 animate-pulse">
                  não há aprovadores
                </span>
              )}
            </ul>
          </div>
        </FormGroup>

        <FormGroup label="Dados complementares:">
          <div className="w-full p-4 px-6 flex flex-col justify-start">
            <Input
              label="Justificativa:"
              placeholder={
                justification
                  ? "Solicitações para aprovador não requerem justificativa"
                  : "Insira aqui uma justificativa para sua solicitação"
              }
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

        <Button label="Solicitar" className="w-full" loader={loader} />
      </form>
    </Container>
  );
}

// export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
//   //
//   const reqId = context.query.reqId;
//   const response = await API.Access.GetApprover(Number(reqId));
//   const data = response.access[0];

//   return {
//     props: {
//       access: data,
//     },
//   };
// };
