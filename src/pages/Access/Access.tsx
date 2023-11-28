import Button from "@/components/Button";
import Container from "@/components/Container";
import { useRouter } from "next/navigation";

import { IoMdListBox } from "react-icons/io";
import { MdPlaylistAddCircle, MdOutlinePlaylistAddCheck } from "react-icons/md";

const Access = () => {
  const router = useRouter();

  return (
    <Container title="Meus Acessos" className="flex flex-row gap-4">
      <Button className="flex-1 h-max py-2" onClick={() => router.push("/Search")}>
        <div className="flex flex-col justify-center items-center gap-2 py-1">
          <MdPlaylistAddCircle size={36} />
          <span>Solicitar novos acessos</span>
        </div>
      </Button>
      <Button className="flex-1 h-max py-2" onClick={() => router.push("/Requests")}>
        <div className="flex flex-col justify-center items-center gap-2 py-1">
          <IoMdListBox size={36} />
          <span>Minhas solicitações</span>
        </div>
      </Button>
      <Button className="flex-1 h-max py-2" onClick={() => router.push("/Approvals")}>
        <div className="flex flex-col justify-center items-center gap-2 py-1">
          <MdOutlinePlaylistAddCheck size={36} />
          <span>Minhas aprovações</span>
        </div>
      </Button>
    </Container>
  );
};

export default Access;
