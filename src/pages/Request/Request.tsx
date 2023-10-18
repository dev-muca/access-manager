import { useRouter } from "next/navigation";

import Alert from "@/components/Alert";
import Group from "@/components/Group";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Container from "@/components/Container";

import useRequest from "./hooks/useRequest";

export default function Request() {
  const router = useRouter();

  const {
    error,
    access,
    request,
    approverOwner,
    pageLoader,
    buttonLoader,
    onSubmitForm,
    onInputChange,
    onChangeJustification,
  } = useRequest();

  return (
    <Container title={request?.id ? "Solicitação criada" : "Solicitação de novos acessos:"} loading={pageLoader}>
      <form onSubmit={onSubmitForm} className="w-full h-full flex flex-col justify-between">
        <Group label="Dados do acesso:" className="flex-1">
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
              {access?.approver?.length ? (
                access?.approver?.map((approver, i) => (
                  <li key={i} className="even:bg-gray-100 odd:bg-white px-2 py-0.5">
                    {approver.fullname}
                  </li>
                ))
              ) : (
                <span className="w-fit text-red-600 font-medium rounded-md px-2 py-0.5 animate-pulse">
                  ERRO | Não á aprovadores
                </span>
              )}
            </ul>
          </div>
        </Group>

        <Group label="Dados complementares:" className="flex-1">
          <div className="w-full p-4 px-6 flex flex-col justify-start">
            <Input
              name="justification"
              label="Justificativa:"
              placeholder={
                approverOwner
                  ? "Solicitações para aprovador não requerem justificativa"
                  : "Insira aqui uma justificativa para sua solicitação"
              }
              value={request?.justification}
              onChange={onInputChange}
              disabled={approverOwner}
              error={error?.field === "justification" && error.message}
              multiline
            />

            <Checkbox
              label="Aprovador"
              hasInfo
              infoMessage="Ao marcar esta opção, você irá solicitar para ser aprovador deste acesso."
              onChange={onChangeJustification}
            />
          </div>
        </Group>

        <Button label="Solicitar" className="w-full mb-10" loader={buttonLoader} />

        {request?.id && (
          <Alert
            title="Solicitação criada!"
            subtitle={`O número da sua solicitação é: #${request?.id}`}
            hasConfirm
            onConfirm={() => router.push("/Requests")}
          />
        )}
      </form>
    </Container>
  );
}
