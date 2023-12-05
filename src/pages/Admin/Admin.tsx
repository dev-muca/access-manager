import Button from "@/components/Button";
import Container from "@/components/Container";
import Group from "@/components/Group";
import { useRouter } from "next/navigation";
import { FaUserCog } from "react-icons/fa";

import { MdLockPerson } from "react-icons/md";

const Admin = () => {
  const router = useRouter();

  return (
    <Container title="Área de Administradores" className="flex flex-col gap-4">
      <Group className="border-none">
        <Button className="flex-1 h-max py-4" onClick={() => router.push("/Admin/Users")}>
          <div className="flex flex-col justify-center items-center gap-2 py-1">
            <FaUserCog size={36} />
            <span>Administração de usuários</span>
          </div>
        </Button>
        <Button className="flex-1 h-max py-4" onClick={() => alert("Desativado Temporariamente")} disable>
          <div className="flex flex-col justify-center items-center gap-2 py-1">
            <MdLockPerson size={36} />
            <span>Administração de acessos</span>
          </div>
        </Button>
      </Group>
    </Container>
  );
};

export default Admin;
