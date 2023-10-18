import { FcInfo } from "react-icons/fc";

interface InfoProps {
  message: string;
}

const Infobox = ({ message }: InfoProps) => {
  return (
    <div className="group flex gap-2 justify-center items-center select-none relative">
      <FcInfo className="group cursor-help hover:brightness-110 absolute top-1/2 left-0 -translate-y-1/2" />
      <div className="hidden group-hover:block bg-gray-200 text-gray-600 px-4 py-1 w-80 rounded-md rounded-tl-none absolute top-8 left-5 -translate-y-1/2">
        {message}
      </div>
    </div>
  );
};

export default Infobox;
