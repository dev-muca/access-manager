import { Children, ReactNode } from "react";

interface GroupProps {
  label?: string;
  children: ReactNode;
}

export function FormGroup({ label, children }: GroupProps) {
  return (
    <section className="mt-3 mb-8 border rounded-md border-gray-300 py-2 relative">
      <h1 className="absolute -top-3.5 bg-white ml-2 px-1">{label}</h1>
      <div className="flex flex-row gap-2">{children}</div>
    </section>
  );
}
