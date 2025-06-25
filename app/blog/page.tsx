import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import BlogList from "../components/BlogList";
import { auth } from "../../auth";
import { cookies } from "next/headers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};
const BlogPage = async () => {
  const session = await auth();
  const isAdmin = cookies().get("admin_auth")?.value === "true";
  if (session?.user || isAdmin) {
    return (
      <>
        <Navbar />
        <div className="pt-16 bg-custom">
          <BlogList />
        </div>
      </>
    );
  } else {
    redirect("/login");
  }
};

export default BlogPage;
