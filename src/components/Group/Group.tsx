import { Children, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface GroupProps {
  label?: string | any;
  className?: string;
  children: ReactNode;
  labelFixed?: true;
}

const Group = ({ label, className, children, labelFixed }: GroupProps) => {
  const sectionClass = twMerge("w-full py-4 px-2 mb-8 border rounded-md border-gray-300 relative", className);

  return (
    <section className={sectionClass}>
      <h1 className="absolute -top-3.5 bg-white ml-2 px-1">{label}</h1>
      <div className="h-full flex flex-row gap-2">{children}</div>
    </section>
  );
};

export default Group;
