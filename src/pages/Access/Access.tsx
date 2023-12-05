import Button from "@/components/Button";
import Container from "@/components/Container";
import Group from "@/components/Group";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { IoMdListBox } from "react-icons/io";
import { MdPlaylistAddCircle, MdOutlinePlaylistAddCheck } from "react-icons/md";

const Access = () => {
  const router = useRouter();

  return (
    <Container title="Meus Acessos" className="flex flex-col gap-4">
      <Group className="border-none">
        <Button className="flex-1 h-max py-4" onClick={() => router.push("/Search")}>
          <div className="flex flex-col justify-center items-center gap-2 py-1">
            <MdPlaylistAddCircle size={36} />
            <span>Solicitar novos acessos</span>
          </div>
        </Button>
        <Button className="flex-1 h-max py-4" onClick={() => router.push("/Requests")}>
          <div className="flex flex-col justify-center items-center gap-2 py-1">
            <IoMdListBox size={36} />
            <span>Minhas solicitações</span>
          </div>
        </Button>
        <Button className="flex-1 h-max py-4" onClick={() => router.push("/Approvals")}>
          <div className="flex flex-col justify-center items-center gap-2 py-1">
            <MdOutlinePlaylistAddCheck size={36} />
            <span>Minhas aprovações</span>
          </div>
        </Button>
      </Group>
    </Container>
  );
};

export default Access;
