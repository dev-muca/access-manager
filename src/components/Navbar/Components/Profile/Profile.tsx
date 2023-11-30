interface ProfileProps {
  open: boolean;
  fullname?: string;
}

const Profile = ({ open }: ProfileProps) => {
  return <div className={`flex flex-row gap-2 m-[18px] absolute ${open ? "block" : "hidden"}`}></div>;
};

export default Profile;
