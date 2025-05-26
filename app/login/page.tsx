import Image from "next/image";
import GitHub from "../components/GitHub";
import Google from "../components/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
export default function AuthPage() {
  return (
    <div className="font-work-sans min-h-screen bg-custom flex flex-col sm:flex-row items-center sm:items-stretch justify-center sm:justify-between">
      <div className="sm:flex flex-col justify-center items-center px-5 py-8 sm:w-1/2 w-full bg-custom max-w-full">
        <div className="flex flex-col gap-3 mt-4">
          <div className="card flex items-center justify-center gap-2 px-9 py-5 bg-black text-white border border-gray-300 rounded-lg shadow hover:bg-gray-200">
            <GoogleIcon style={{ color: "black" }} fontSize="large" />
            <Google />
          </div>
          <div className="card flex items-center justify-center gap-2 px-9 py-5 bg-black text-white border border-gray-300 rounded-lg shadow hover:bg-gray-200">
            <GitHubIcon style={{ color: "black" }} fontSize="large" />
            <GitHub />
          </div>
        </div>
      </div>
      <div className="relative w-full sm:w-1/2 h-64 sm:h-screen">
        <Image
          src="/assests/hero.jpeg"
          alt="selling"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="rounded-t-lg sm:rounded-none"
        />
      </div>
    </div>
  );
}
