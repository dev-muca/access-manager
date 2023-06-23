import { ItemMenu } from "./ItemMenu";

export function Menu({ options, ...props }) {
  return (
    <ul {...props} className="w-full my-2 px-2 flex flex-col justify-start items-center gap-4">
      <ItemMenu name="Início" icon="HiHome" to="/home" />

      {options &&
        options.map((option) => <ItemMenu key={option.id} name={option.name} icon={option.icon} to={option.path} />)}
    </ul>
  );
}
