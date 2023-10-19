import Link from "next/link";

import Container from "@/components/Container";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const Access = () => {
  const router = useRouter();

  return (
    <Container title="Meus Acessos" className="flex flex-row gap-4">
      <Button className="flex-1" onClick={() => router.push("/Search")}>
        Solicitar novos acessos
      </Button>
      <Button className="flex-1" onClick={() => router.push("/Requests")}>
        Minhas solicitações
      </Button>
    </Container>
  );
};

export default Access;
