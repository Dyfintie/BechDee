import { cookies } from "next/headers";
import NavbarClient from "./NavbarClient";
import { auth } from "../../auth";

const Navbar = async () => {
  const session = await auth();
  const isAdmin = cookies().get("admin_auth")?.value === "true";

  return (
    <NavbarClient
      isAuth={!!session?.user}
      profilepic={session?.user?.image}
      name={session?.user?.name}
      email={session?.user?.email}
      isAdmin={isAdmin} 
    />
  );
};

export default Navbar;
