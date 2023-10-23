import Badge from "@/components/Badge";
import Container from "@/components/Container";
import TimeLineCard from "@/components/TimeLineCard";
import { useRouter } from "next/router";
import { FaCheckCircle, FaTimesCircle, FaExclamationCircle } from "react-icons/fa";

const Progress = () => {
  const router = useRouter();
  const requestId = router.query.requestId;
  console.log("ID em andamento:", requestId);

  return (
    <Container title="Andamento da Solicitação">
      <div>
        <TimeLineCard color="green" icon="check" title="Aprovado por: Murilo Carvalho Baleeiro">
          Em 23/10/2023 às 17:35
        </TimeLineCard>
        <TimeLineCard color="yellow" title="Pendente">
          Aguardando aprovação de: Vitor Oliveira
        </TimeLineCard>
        <TimeLineCard title="Em espera">Aguardando ações anteriores...</TimeLineCard>
      </div>
    </Container>
  );
};

export default Progress;
