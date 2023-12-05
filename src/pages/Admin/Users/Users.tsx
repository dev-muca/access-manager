import IError from "@/@types/IError";
import IUser from "@/@types/IUser";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Group from "@/components/Group";
import Input from "@/components/Input";
import useFetch from "@/hooks/useFetch";
import apiBaseUrl from "@/utils/host";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { BsPersonFillAdd } from "react-icons/bs";
import { FaUserEdit, FaUserTag } from "react-icons/fa";

const Users = () => {
  const [searchValue, setSearchValue] = useState<number | string>("");
  const [currentPage, setCurrentPage] = useState<"list" | "form">("list");
  const [currentUser, setCurrentUser] = useState<IUser>({ fullname: "" });
  const [buttonLoader, setButtonLoader] = useState(false);

  const [error, setError] = useState<IError>(null!);
  const [created, setCreated] = useState<{ message: string; id: number }>(null!);

  const { data, pageLoader } = useFetch({ endpoint: `/api/user/`, method: "GET", dependencies: [currentPage] });

  const rows =
    searchValue && data
      ? data.filter((user: IUser) => {
          const searching =
            typeof searchValue === "string" ? String(searchValue.toLocaleLowerCase()) : Number(searchValue);
          const { id, fullname, email, department } = user;

          const result =
            fullname?.toLowerCase().includes(searching as string) ||
            email?.toLowerCase().includes(searching as string) ||
            department?.toLowerCase().includes(searching as string) ||
            id === Number(searchValue);

          return result;
        })
      : data;

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setCurrentUser((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setButtonLoader(true);

    const res = await fetch(`${apiBaseUrl}/api/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentUser),
    });

    const { error, action } = await res.json();
    setButtonLoader(false);

    if (error) setError(error);
    if (action) {
      setCreated(action);
      setCurrentUser({
        id: null!,
        active: true,
        city: null!,
        email: null!,
        state: null!,
        title: null!,
        office: null!,
        company: null!,
        lastName: null!,
        fullname: null!,
        username: null!,
        firstName: null!,
        department: null!,
        description: null!,
        streetAddress: null!,
        password: null!,
        homeNumber: null,
        postalCode: null,
        telephoneNumber: null,
      });
      setError(null!);
      setCurrentPage("list");
    }
  };

  return (
    <Container title="Administração de usuários:" fixedTitle loading={pageLoader}>
      {created && (
        <Alert
          title="Usuário criado!"
          hasConfirm
          onClose={() => {
            setCreated(null!);
            setCurrentUser({
              id: null!,
              active: true,
              city: null!,
              email: null!,
              state: null!,
              title: null!,
              office: null!,
              company: null!,
              lastName: null!,
              fullname: null!,
              username: null!,
              firstName: null!,
              department: null!,
              description: null!,
              streetAddress: null!,
              password: null!,
              homeNumber: null,
              postalCode: null,
              telephoneNumber: null,
            });
          }}
          onConfirm={() => {
            setCreated(null!);
            setCurrentUser({
              id: null!,
              active: true,
              city: null!,
              email: null!,
              state: null!,
              title: null!,
              office: null!,
              company: null!,
              lastName: null!,
              fullname: null!,
              username: null!,
              firstName: null!,
              department: null!,
              description: null!,
              streetAddress: null!,
              password: null!,
              homeNumber: null,
              postalCode: null,
              telephoneNumber: null,
            });
          }}
        >
          <p>
            {created.message}, ID: {created.id}
          </p>
        </Alert>
      )}
      <header className="py-6 flex flex-col gap-3">
        <Input
          label="Filtrar:"
          name="search"
          placeholder="Filtre usuários por id, nome, email ou departamento por aqui."
          value={searchValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.currentTarget.value)}
        />
        <div className="flex justify-center items-center gap-4">
          <Button
            onClick={() => {
              setCurrentUser({
                id: null!,
                active: true,
                city: null!,
                email: null!,
                state: null!,
                title: null!,
                office: null!,
                company: null!,
                lastName: null!,
                fullname: null!,
                username: null!,
                firstName: null!,
                department: null!,
                description: null!,
                streetAddress: null!,
                password: null!,
                homeNumber: null,
                postalCode: null,
                telephoneNumber: null,
              });
              setCurrentPage("form");
            }}
            className="w-full"
          >
            <div className="flex flex-row justify-center items-center gap-2 py-2 px-2">
              <BsPersonFillAdd size={24} />
              <span>Novo colaborador</span>
            </div>
          </Button>
          <Button
            onClick={() => {
              setError(null!);
              setCurrentPage("list");
            }}
            className="w-full"
          >
            <div className="flex flex-row justify-center items-center gap-2 py-2 px-2">
              <FaUserTag size={24} />
              <span>Listar colaboradores</span>
            </div>
          </Button>
        </div>
      </header>

      {currentPage === "list" && (
        <section className="relative overflow-x-auto sm:rounded-md max-h-[calc(100vh-120px)] border-b">
          <table className="w-full text-sm text-left text-gray-50 overflow-auto">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
              <tr>
                <th scope="col" className="px-6 py-3 text-center font-bold cursor-pointer hover:bg-gray-100">
                  <span className="flex items-center justify-center gap-2">ID</span>
                </th>

                <th scope="col" className="px-6 py-3 text-center font-bold cursor-pointer hover:bg-gray-100">
                  <span className="flex items-center gap-2">Colaborador</span>
                </th>

                <th scope="col" className="px-6 py-3 text-center font-bold cursor-pointer hover:bg-gray-100">
                  <span className="flex items-center gap-2">E-mail</span>
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-center font-bold cursor-pointer hover:bg-gray-100 hidden sm:block"
                >
                  <span className="flex items-center gap-2">Departamento</span>
                </th>

                <th scope="col" className="px-6 py-3 text-center font-bold">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {rows?.map((row: IUser) => (
                <tr key={row.id} className="odd:bg-white even:bg-gray-50 border-b text-gray-800">
                  <td className="px-6 py-4 text-center">{row.id}</td>
                  <td className="px-6 py-4">{row.fullname}</td>
                  <td className="px-6 py-4">{row.email}</td>
                  <td className="px-6 py-4">{row.department}</td>
                  <td className="px-6 py-4 text-center flex gap-6 justify-center items-center">
                    {/* <p
                      className="text-indigo-600 hover:underline cursor-pointer"
                      onClick={() => {
                        setCurrentUser(row);
                        setCurrentPage("form");
                      }}
                    >
                      [Editar]
                    </p>
                    <p className="hover:underline cursor-pointer" onClick={() => {}}>
                      {row.active ? "[Bloquear 🔒]" : "[Desbloquear 🔓]"}
                    </p> */}
                    <p>N/A</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {currentPage === "form" && (
        <form className="py-4" onSubmit={onSubmitForm}>
          <Group label="Credenciais:" className="px-6 py-8">
            <Input
              name="username"
              label="Nome de usuário*:"
              placeholder="Usuário do colaborador"
              value={currentUser?.username}
              onChange={onInputChange}
              error={error?.field === "username" && error.message}
            />
            <Input
              type="password"
              name="password"
              label="Senha*:"
              placeholder="Senha do colaborador"
              value={currentUser?.password}
              onChange={onInputChange}
              error={error?.field === "password" && error.message}
            />
          </Group>

          <Group label="Nome & E-mail:" className="px-6 py-8">
            <main className="flex flex-col w-full gap-4">
              <section className="flex justify-center items-center gap-4 w-full">
                <Input
                  name="firstName"
                  label="Primeiro nome:"
                  placeholder="Primeiro nome do colaborador"
                  value={currentUser?.firstName}
                  onChange={onInputChange}
                />
                <Input
                  name="lastName"
                  label="Último nome:"
                  placeholder="Último nome do colaborador"
                  value={currentUser?.lastName}
                  onChange={onInputChange}
                />
                <Input
                  name="fullname"
                  label="Nome completo*:"
                  placeholder="Nome completo do colaborador"
                  value={currentUser?.fullname}
                  onChange={onInputChange}
                  error={error?.field === "fullname" && error.message}
                />
              </section>
              <section className="flex justify-center items-center gap-4 w-full">
                <Input
                  name="email"
                  label="E-mail:"
                  placeholder="E-mail do colaborador"
                  value={currentUser?.email}
                  onChange={onInputChange}
                />
              </section>
            </main>
          </Group>

          <Group label="Cargo & Departamento:" className="px-6 py-8">
            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex flex-row justify-center items-center gap-4">
                <Input
                  name="title"
                  label="Cargo:"
                  placeholder="Cargo/Função do colaborador"
                  value={currentUser?.title}
                  onChange={onInputChange}
                />
                <Input
                  name="office"
                  label="Local de atuação:"
                  placeholder="Local de atuação do colaborador"
                  value={currentUser?.office}
                  onChange={onInputChange}
                />
              </div>
              <div className="w-full flex flex-row justify-center items-center gap-4">
                <Input
                  name="department"
                  label="Departamento/Setor:"
                  placeholder="Departamento/Setor do colaborador"
                  value={currentUser?.department}
                  onChange={onInputChange}
                />
                <Input
                  name="company"
                  label="Compania/Unidade:"
                  placeholder="Compania/Unidade de atuação do colaborador"
                  value={currentUser?.company}
                  onChange={onInputChange}
                />
              </div>
            </div>
          </Group>

          <Group label="Endereço & Localidade:" className="px-6 py-8">
            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex flex-row justify-center items-center gap-4">
                <Input
                  name="streetAddress"
                  label="Endereço:"
                  placeholder="Endereço do colaborador"
                  value={currentUser?.streetAddress}
                  onChange={onInputChange}
                />
                <Input
                  name="city"
                  label="Cidade:"
                  placeholder="Cidade do colaborador"
                  value={currentUser?.city}
                  onChange={onInputChange}
                />
              </div>
              <div className="w-full flex flex-row justify-center items-center gap-4">
                <Input
                  name="postalCode"
                  label="CEP (Código Postal):"
                  placeholder="CEP do colaborador"
                  value={currentUser?.postalCode!}
                  onChange={onInputChange}
                />
                <Input
                  name="state"
                  label="Estado:"
                  placeholder="Estado do colaborador"
                  value={currentUser?.state}
                  onChange={onInputChange}
                />
              </div>
            </div>
          </Group>

          <Button type="submit" className="w-full mb-4" loader={buttonLoader}>
            SALVAR
          </Button>
        </form>
      )}
    </Container>
  );
};

export default Users;
