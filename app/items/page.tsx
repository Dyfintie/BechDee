import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import ItemList from "../components/ItemList";
import { auth } from "../../auth";
const BlogPage = async() => {
  const session = await auth(); 
  if (session?.user) {
    return (
      <>
        <Navbar />
        <div className="pt-16 bg-custom">
          <ItemList />
        </div>
      </>
    );
  } else {
    redirect("/login");
  }
};

export default BlogPage;
