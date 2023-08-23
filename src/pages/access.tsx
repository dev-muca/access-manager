import { Container } from "@/components/Form/Container";
import Link from "next/link";

export default function Access() {
  return (
    <Container title="Meus acessos">
      <Link className="underline text-blue-600" href={{ pathname: "/search" }}>
        Solicitar novos acessos
      </Link>
    </Container>
  );
}
