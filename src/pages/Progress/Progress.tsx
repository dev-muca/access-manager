import { useRouter } from "next/router";
import { useState } from "react";

import Container from "@/components/Container";
import TimeLineCard from "@/components/TimeLineCard";

const Progress = () => {
  const router = useRouter();
  const requestId = router.query.requestId;

  const [pageLoader, setPageLoader] = useState(false);

  return (
    <Container title={`Andamento da Solicitação #${requestId}`} fixedTitle loading={pageLoader}>
      <TimeLineCard
        color="green"
        icon="check"
        title="Aprovado por: Murilo Carvalho Baleeiro"
        data="Em 20/10/2023 às 12:34"
      >
        Nenhum comentário adicional
      </TimeLineCard>
      <TimeLineCard
        color="green"
        icon="check"
        title="Aprovado por: Murilo Carvalho Baleeiro"
        data="Em 20/10/2023 às 12:34"
      >
        Nenhum comentário adicional
      </TimeLineCard>
      <TimeLineCard
        color="green"
        icon="check"
        title="Aprovado por: Murilo Carvalho Baleeiro"
        data="Em 20/10/2023 às 12:34"
      >
        Nenhum comentário adicional
      </TimeLineCard>
      <TimeLineCard
        color="green"
        icon="check"
        title="Aprovado por: Murilo Carvalho Baleeiro"
        data="Em 20/10/2023 às 12:34"
      >
        Nenhum comentário adicional
      </TimeLineCard>
      <TimeLineCard
        color="green"
        icon="check"
        title="Aprovado por: Murilo Carvalho Baleeiro"
        data="Em 20/10/2023 às 12:34"
      >
        Nenhum comentário adicional
      </TimeLineCard>
      <TimeLineCard
        color="green"
        icon="check"
        title="Aprovado por: Murilo Carvalho Baleeiro"
        data="Em 20/10/2023 às 12:34"
      >
        Nenhum comentário adicional
      </TimeLineCard>
      <TimeLineCard
        color="green"
        icon="check"
        title="Aprovado por: Murilo Carvalho Baleeiro"
        data="Em 20/10/2023 às 12:34"
      >
        Nenhum comentário adicional
      </TimeLineCard>
      <TimeLineCard
        color="green"
        icon="check"
        title="Aprovado por: Murilo Carvalho Baleeiro"
        data="Em 20/10/2023 às 12:34"
      >
        Nenhum comentário adicional
      </TimeLineCard>
      <TimeLineCard
        color="green"
        icon="check"
        title="Aprovado por: Murilo Carvalho Baleeiro"
        data="Em 20/10/2023 às 12:34"
      >
        Nenhum comentário adicional
      </TimeLineCard>
      <TimeLineCard color="yellow" title="Pendente">
        Aguardando aprovação de: Vitor Oliveira
      </TimeLineCard>
      <TimeLineCard title="Em espera">Aguardando ações anteriores...</TimeLineCard>
    </Container>
  );
};

export default Progress;
