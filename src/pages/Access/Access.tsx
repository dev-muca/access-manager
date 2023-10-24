import Button from "@/components/Button";
import Container from "@/components/Container";
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
      <Button className="flex-1" onClick={() => router.push("/Approvals")}>
        Minhas aprovações
      </Button>
    </Container>
  );
};

export default Access;
