import Alert from "@/components/Alert";
import Badge from "@/components/Badge";
import Container from "@/components/Container";
import Group from "@/components/Group";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const Dashboard = () => {
  const { session } = useContext(AuthContext);

  return (
    <Container title="Dashboard">
      <Alert
        title="Seja bem-vindo 😄"
        content={`Olá ${session?.fullname}, seja bem-vindo ao SGA (Sistema Gestor de Acessos)`}
        hasConfirm
      />

      <Group label="Informações do sistema" className="px-4">
        <Badge>Versão: 0.1.0</Badge>
        <Badge color="green">Integração Web-Api: Online</Badge>
        <Badge color="red">Integração Active-Directory: Offline</Badge>
      </Group>
    </Container>
  );
};

export default Dashboard;
