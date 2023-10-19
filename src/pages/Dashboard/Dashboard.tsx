import Alert from "@/components/Alert";
import Badge from "@/components/Badge";
import Container from "@/components/Container";
import useDashboard from "./hooks/useDashboard";
import Group from "@/components/Group";

const Dashboard = () => {
  const { fullname } = useDashboard();

  return (
    <Container title="Dashboard">
      <Alert
        title="Seja bem-vindo 😄"
        subtitle={`Olá ${fullname}, seja bem-vindo ao SGA (Sistema Gestor de Acessos)`}
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
