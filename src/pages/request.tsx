import { useRouter } from "next/navigation";

import useRequest from "@/hooks/useRequest";

import { Input } from "@/components/Form/Input";
import { Button } from "@/components/Form/Button";
import { Checkbox } from "@/components/Form/Checkbox";
import { Container } from "@/components/Form/Container";
import { FormGroup } from "@/components/Form/FormGroup";
import { Alert } from "@/components/Layout/Alert";

export default function Request() {
  const router = useRouter();
  const {
    error,
    loader,
    access,
    request,
    loaderBtn,
    approverOwner,
    handleInputChange,
    handleChangeJustification,
    onSubmitForm,
  } = useRequest();

  return (
    <Container title={request?.id ? "Solicitação criada" : "Solicitação de novos acessos:"} loading={loader}>
      <form onSubmit={onSubmitForm} className="w-full h-full flex flex-col justify-between">
        <FormGroup label="Dados do acesso:" className="flex-1">
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
              <span className="font-medium">Aprovadores:</span>
              {access.approver?.length ? (
                access.approver?.map((approver, i) => (
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

        <FormGroup label="Dados complementares:" className="flex-1">
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
              onChange={handleInputChange}
              disabled={approverOwner}
              error={error?.field === "justification" && error.message}
              multiline
            />

            <Checkbox
              label="Aprovador"
              hasInfo
              infoMessage="Ao marcar esta opção, você irá solicitar para ser aprovador deste acesso."
              onChange={handleChangeJustification}
            />
          </div>
        </FormGroup>

        <Button label="Solicitar" className="w-full mb-10" loader={loaderBtn} />

        {request?.id && (
          <Alert
            title="Solicitação criada!"
            subtitle={`O número da sua solicitação é: #${request?.id}`}
            hasConfirm
            onConfirm={() => router.back()}
          />
        )}
      </form>
    </Container>
  );
}
