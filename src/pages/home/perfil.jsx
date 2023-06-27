import { Header } from "@/components/Colaboradores/Header";
import { Dropdown } from "@/components/Form/Dropdown";
import { InputFloating } from "@/components/Form/InputFloating";
import { Button } from "@/components/Login/Button";
import { AuthContext } from "@/context/AuthContext";
import API from "@/services/web-api/methods";
import { useContext, useEffect, useState } from "react";

export default function Detalhes() {
  const { userSession, setUserSession } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    role: 0,
    avatar: null,
    username: "",
    fullname: "",
  });

  const [roles, setRoles] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setFormData({ fullname: userSession?.fullname });

    // API.getProfileInfoByUsernameRequest(userSession?.username).then((response) => console.log(response));

    API.getAllRolesRequest()
      .then((response) => setRoles(response.roles))
      .catch((err) => setRoles(null));
  }, []);

  function handleInput(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleRole(value) {
    setFormData((prevData) => ({ ...prevData, role: value }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevData) => ({ ...prevData, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmitForm(e) {
    e.preventDefault();
    setLoader(true);

    const updated = await API.updateProfileInfoRequest(userSession?.username, formData);
    console.log("PROFILE UPDATE:", updated);
    setUserSession((prevData) => ({ ...prevData, avatar: formData.avatar, role: formData.role }));

    setLoader(false);
  }

  console.log("ROLE DEFAULT:", userSession);

  return (
    <main className="w-full flex flex-col lg:flex-row">
      <section className="flex-1 px-12 py-8">
        <Header title="Dados do seu perfil" />

        <form onSubmit={handleSubmitForm} className="mt-6 flex flex-col gap-8">
          <InputFloating text="Nome Completo" name="fullname" value={formData.fullname} onChange={handleInput} />
          <InputFloating
            type="file"
            name="avatar"
            accept="image/*"
            text="Foto de Avatar"
            onChange={handleImageChange}
          />
          <Dropdown label="Cargo:" options={roles} defaultValue={userSession?.role} onOptionSelect={handleRole} />
          <Button text="Salvar" loader={loader} />
        </form>
      </section>
    </main>
  );
}
