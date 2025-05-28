import NavbarClient from "./NavbarClient";
import { auth } from "../../auth";
const Navbar = async () => {
  const session = await auth();
  return (
    <NavbarClient
      isAuth={!!session?.user}
      profilepic={session?.user?.image}
      name={session?.user?.name}
      email={session?.user?.email}
    />
  );
};

export default Navbar;
