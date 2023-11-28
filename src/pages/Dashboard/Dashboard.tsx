import Alert from "@/components/Alert";
import Badge from "@/components/Badge";
import Container from "@/components/Container";
import Group from "@/components/Group";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";

const Dashboard = () => {
  const { session, greetings, setGreetings } = useContext(AuthContext);

  return (
    <>
      {greetings && (
        <Alert title="Seja bem-vindo 😄" hasConfirm onConfirm={() => setGreetings(false)}>
          <p>{`Olá ${session?.fullname}, seja bem-vindo ao SGA (Sistema Gestor de Acessos)`}</p>
        </Alert>
      )}

      <Container title="Dashboard" noBackward>
        <Group label="Informações da plataforma:" className="px-4">
          <Badge className="h-[30px] px-4 flex justify-center items-center hover:brightness-105">
            🔵 Versão: 0.1.1
          </Badge>
          <Badge className="h-[30px] px-4 flex justify-center items-center hover:brightness-105" color="green">
            🟢 Integração Web-Api: Online
          </Badge>
          <Badge className="h-[30px] px-4 flex justify-center items-center hover:brightness-105" color="red">
            🔴 Integração Active-Directory: Offline
          </Badge>
        </Group>
      </Container>
    </>
  );
};

export default Dashboard;
