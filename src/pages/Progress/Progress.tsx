import { useRouter } from "next/router";

import Container from "@/components/Container";
import TimeLineCard from "@/components/TimeLineCard";
import useFetch from "@/hooks/useFetch";
import IApproval from "@/@types/IApproval";
import Group from "@/components/Group";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Infobox from "@/components/Infobox";

const Progress = () => {
  const router = useRouter();
  const requestId = router.query.requestId;
  const { session } = useContext(AuthContext);

  const dataApproval = useFetch({
    endpoint: `/api/request/approval?id=${requestId}`,
    method: "GET",
    dependencies: [requestId],
  });

  const dataRequest = useFetch({
    endpoint: `/api/request?id=${requestId}`,
    method: "GET",
    dependencies: [requestId],
  });

  console.log(dataRequest);

  const parsedStatus: any = {
    Pendente: { color: "yellow", icon: "clock" },
    Aprovado: { color: "green", icon: "check" },
    Reprovado: { color: "red", icon: "cancel" },
  };

  return (
    <Container
      title={`Andamento da Solicitação #${requestId}`}
      fixedTitle
      loading={dataApproval.pageLoader}
      className="flex gap-6 pt-4"
    >
      <Group label="Grade de aprovações:" className="w-1/2 h-full">
        {dataApproval.data?.map(({ id, fullname, status, approvalDate, comment }: IApproval) => (
          <TimeLineCard
            key={id}
            icon={parsedStatus[status].icon}
            color={parsedStatus[status].color}
            title={
              status === "Aprovado"
                ? `Aprovado por: ${fullname}`
                : status === "Reprovado"
                ? `Reprovado por: ${fullname}`
                : "Pendente"
            }
          >
            <p>
              {status === "Aprovado"
                ? `Em ${approvalDate.split(" ")[0].split("-").reverse().join("/")} às ${approvalDate
                    .split(" ")[1]
                    .slice(0, 5)}`
                : status === "Reprovado"
                ? `Em ${approvalDate}`
                : `Aguardando aprovação de: ${fullname}`}
            </p>
            {comment && (
              <p className="mt-2">
                <span className="pr-1">Comentários:</span>
                <span>{comment}</span>
              </p>
            )}
          </TimeLineCard>
        ))}
      </Group>

      <Group label="Detalhes da solicitação:" className="w-1/2 h-full">
        <div className="flex flex-col gap-4">
          <div className="ml-3 flex gap-2">
            <span className="font-medium">Solicitante:</span>
          </div>
        </div>
      </Group>
    </Container>
  );
};

/* 
approverOwner: boolean
fullname: 
id: 
justification: 
name: 
requestDate: 
username: 
*/

export default Progress;
