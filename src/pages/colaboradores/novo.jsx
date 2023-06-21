import { AuthMiddleware } from "@/components/AuthMiddleware";
import { InputFloating } from "@/components/InputFloating";

export default function Novo() {
  return (
    <main className="px-8">
      <InputFloating name="Nome Completo" />
    </main>
  );
}
