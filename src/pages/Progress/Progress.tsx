import { useRouter } from "next/router";

import Container from "@/components/Container";
import TimeLineCard from "@/components/TimeLineCard";
import useFetch from "@/hooks/useFetch";
import IApproval from "@/@types/IApproval";

const Progress = () => {
  const router = useRouter();
  const requestId = router.query.requestId;

  const { data, pageLoader } = useFetch({
    endpoint: `/api/request/approval?id=${requestId}`,
    method: "GET",
    dependencies: [requestId],
  });

  const parsedStatus: any = {
    Pendente: { color: "yellow", icon: "clock" },
    Aprovado: { color: "green", icon: "check" },
    Reprovado: { color: "red", icon: "cancel" },
  };

  return (
    <Container title={`Andamento da Solicitação #${requestId}`} fixedTitle loading={pageLoader}>
      {data?.map(({ id, fullname, status, approvalDate, comment }: IApproval) => (
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
            {status === "Aprovador"
              ? `Em ${approvalDate}`
              : status === "Reprovado"
              ? `Em ${approvalDate}`
              : `Aguardando aprovação de: ${fullname}`}
          </p>
        </TimeLineCard>
      ))}
    </Container>
  );
};

export default Progress;
