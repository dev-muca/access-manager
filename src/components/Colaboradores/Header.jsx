import { getCurrentDate } from "@/utils/data";

export function Header({ title, subtitle, departament, noData = false }) {
  return (
    <header>
      <div className="w-full space-y-2 border-b pb-2">
        <h1 className="text-gray-700 text-2xl">{title}</h1>
        <p className="text-gray-500 pl-0.5">{subtitle}</p>
      </div>
      {departament && !noData ? (
        <div className="text-sm py-2 px-0.5 flex flex-row-reverse justify-between items-center">
          {departament ? <p>Departamento: {departament ? departament : "Sem departamento atribuído"}</p> : null}
          {!noData ? <p>Data: {getCurrentDate()}</p> : null}
        </div>
      ) : null}
    </header>
  );
}
