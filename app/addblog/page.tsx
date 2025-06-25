import React from "react";
import AddBlogWithImage from "@/components/AddBlog";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";
const page = () => {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="text-center mt-10 text-gray-500">Loading...</div>
        }
      >
        <AddBlogWithImage />
      </Suspense>
    </>
  );
};

export default page;
