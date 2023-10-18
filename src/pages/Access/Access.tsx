import Link from "next/link";

import Container from "@/components/Container";

const Access = () => {
  return (
    <Container title="Meus acessos" className="flex flex-col gap-4">
      <Link className="underline text-blue-600" href={{ pathname: "/Search" }}>
        Solicitar novos acessos
      </Link>
      <Link className="underline text-blue-600" href={{ pathname: "/Requests" }}>
        Minhas solicitações
      </Link>
    </Container>
  );
};

export default Access;
