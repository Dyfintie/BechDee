import React from "react";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-orange-100 max-w-full shadow-md hover:border-primary transition-all duration-500 hover:shadow-lg hover:bg-green-200;">
      <div className="container mx-auto px-4 py-8 ">
        <div className="flex flex-col md:flex-row justify-between items-center ">
          <p className="text-orange-800 font-semibold font-mono mb-4 md:mb-0">
            Made with ❤️ by{" "}
            <Link
              href="https://linkedin.com/in/varun-pandey-iiita"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-900"
            >
              {" "}
              Varun Pandey{" "}
            </Link>
          </p>
          <div className="flex space-x-4">
            <Link
              href="https://github.com/Dyfintie/Travelog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-800 transition-colors duration-200"
            >
              <Github size={24} />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com/in/varun-pandey-iiita"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-800 transition-colors duration-200"
            >
              <Linkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
