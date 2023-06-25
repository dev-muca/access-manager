import { generateUsername } from "@/utils/user";

export function PreviewCard({ fullname, password }) {
  return (
    <div className="border shadow my-10 px-8 py-6">
      <h1 className="text-lg font-medium">Preview:</h1>
      <div className="mt-2 flex flex-col">
        <h1>Credenciais de acesso:</h1>
        <span className="pl-4 flex flex-row">
          <span className="font-medium pr-2">• Usuário:</span>
          <span>{generateUsername(fullname)}</span>
        </span>
        <span className="pl-4 flex flex-row">
          <span className="font-medium pr-2">• Senha:</span>
          <span className="flex gap-4 items-center font-mono">{password}</span>
        </span>
      </div>
    </div>
  );
}
