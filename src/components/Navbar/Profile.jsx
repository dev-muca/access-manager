import Image from "next/image";
import Placeholder from "../../../public/assets/profile.png";

export function Profile({ fullname, avatar }) {
  return (
    <div className="w-full h-20 flex justify-start items-center border-b pl-3 gap-4 overflow-hidden relative">
      {avatar ? (
        <img src={avatar} alt="Profile Image" className="w-10 h-10 rounded-full border" />
      ) : (
        <Image src={Placeholder} alt="Profile Image" className="w-10 h-10 rounded-full border" />
      )}
      <div className="shrink-0">
        <p className="font-normal flex flex-row justify-between shrink-0">Bem-vindo,</p>
        <p className="font-medium">{fullname?.slice(0, 28) + (fullname?.length > 27 ? "..." : "")}</p>
      </div>
    </div>
  );
}
