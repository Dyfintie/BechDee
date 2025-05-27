"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useScroll,
  useMotionValueEvent,
  motion,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
const navItems = [
  { href: "/", label: "Home" },
  { href: "/items", label: "Items" },
];

interface NavbarClientProps {
  isAuth: boolean;
  profilepic: string;
  name?: string;
  email?: string;
}

const NavbarClient = ({
  isAuth,
  profilepic,
  name,
  email,
}: NavbarClientProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const router = useRouter();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 100);
  });

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "GET" });
    router.push("/");
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={hidden ? { y: -100 } : { y: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-orange-100 backdrop-blur-md  shadow-lg"
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              width={50}
              height={50}
              src="/favicon.ico"
              alt="Logo"
              className="w-8 h-8"
            />
            <span className="text-3xl font-extrabold ">Bechde</span>
          </Link>

          <div className="md:hidden">
            <motion.button
              whileTap={{ rotate: 30 }}
              className="ham-button"
              onClick={() => setIsOpen((v) => !v)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(({ href, label }) => (
              <motion.button
                key={label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn"
                onClick={() =>
                  router.push(`${href}?name=${encodeURIComponent(name || "")}`)
                }
              >
                {label}
                <span className="absolute inset-x-0 bottom-0 h-0.5  " />
              </motion.button>
            ))}

            {isAuth && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  router.push(
                    `/additem?email=${encodeURIComponent(
                      email || ""
                    )}&name=${encodeURIComponent(name || "")}`
                  )
                }
                className="px-8 py-2  bg-green-300  border-2 border-black dark:border-white uppercase  text-black text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
              >
                <CurrencyRupeeIcon
                  style={{ color: "green" }}
                  className=" w-4 h-4"
                />
                <span className="font-bold  ">Sell</span>
              </motion.button>
            )}

            {isAuth ? (
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      // className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                      className="search-form"
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={profilepic || ""} alt={name} />
                        <AvatarFallback className="bg-gradient-to-br  text-white text-sm"></AvatarFallback>
                      </Avatar>
                      <div className="hidden lg:block text-left">
                        <p className="text-sm font-bold text-gray-900">
                          {name}
                        </p>
                        {/* <p className="text-xs text-gray-500">{email.slice(0, 7)}..</p> */}
                      </div>
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="card w-64" align="end">
                    <DropdownMenuLabel>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage
                            src={profilepic || "/placeholder.svg"}
                            alt={name}
                          />
                          <AvatarFallback className="bg-gradient-to-br  text-white">
                            {name[0]?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{name}</p>
                          <p className="text-sm text-gray-500">
                            {email.slice(0, 25)}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() =>
                        router.push(
                          `/profile?email=${encodeURIComponent(email || "")}`
                        )
                      }
                      className="btn mr-2"
                    >
                      {" "}
                      <User className="mr-2 h-4 w-4 " />{" "}
                      <span className="font-medium">Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="btn mr-2 mb-2 "
                      style={{ color: "red" }}
                    >
                      {" "}
                      <LogOut className="mr-2 h-4 w-4" /> <span>Logout</span>{" "}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button
                onClick={() => router.push("/login")}
                className="px-8 py-2 border-2 border-black dark:border-white uppercase bg-green-300 text-black  text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </nav>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="card md:hidden border-t border-gray-200 bg-white"
            >
              <div className="px-2 flex pt-4 pb-6 space-y-2 flex-col">
                {navItems.map(({ href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex justify-center font-medium text=md px-8 py-0.5 w-full  border-2 border-black dark:border-white uppercase bg-white text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </Link>
                ))}

                {isAuth && (
                  <>
                    <button
                      onClick={() => {
                        router.push(
                          `/additem?email=${encodeURIComponent(
                            email || ""
                          )}&name=${encodeURIComponent(name || "")}`
                        );
                        setIsOpen(false);
                      }}
                      // className="w-full flex items-center gap-3 px-4 py-3 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      className="px-8 py-0.5 w-full  border-2 border-black dark:border-white uppercase bg-green-300 text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                    >
                      <CurrencyRupeeIcon className="w-5 h-5" />
                      <span className="font-medium text-md ">Sell Item</span>
                    </button>

                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex items-center space-x-3 px-4 py-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={profilepic || ""} alt={name} />
                          <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                            {name[0]?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{name}</p>
                          <p className="text-sm text-gray-500">{email}</p>
                        </div>
                      </div>

                      <div className="space-y-1 mt-2">
                        <button
                          onClick={() => {
                            router.push(
                              `/profile?email=${encodeURIComponent(
                                email || ""
                              )}`
                            );
                            setIsOpen(false);
                          }}
                          className="btn w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <User className="w-5 h-5" />
                          <span>Profile</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}

                <div className="border-t border-gray-200 pt-4 mt-4">
                  {isAuth ? (
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="flex px-8 py-2 border-2 w-full text-red-600 border-black dark:border-white uppercase bg-white  transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)]"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      <span className="font-medium">Logout</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        router.push("/login");
                        setIsOpen(false);
                      }}
                      className="btn gap-4  w-full flex "
                      style={{ color: "green" }}
                    >
                      <LogIn className="w-5 h-5" />
                      <span className="font-medium">Login</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default NavbarClient;
