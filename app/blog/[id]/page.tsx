import BlogPage from "@/components/BlogPage";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

// Fix: Make generateMetadata async, remove unused prop `topic`
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${params.id}`
    );
    if (!res.ok) throw new Error("Failed to fetch blog");

    const data = await res.json();
    const blog = data.blog;

    return {
      title: blog.title,
      description: blog.description.slice(0, 150),
      // openGraph: {
      //   title: blog.title,
      //   description: blog.description.slice(0, 150),
      //   images: [
      //     {
      //       url: `data:image/png;base64,${blog.file}`,
      //       width: 800,
      //       height: 600,
      //       alt: blog.title,
      //     },
      //   ],
      // },
    };
  } catch (err) {
    console.error("Error generating metadata:", err);
    return {
      title: "Blog not found",
      description: "The requested blog could not be found.",
    };
  }
}

const getBlogData = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.blog;
  } catch (err) {
    console.error("Error fetching blog:", err);
    return null;
  }
};

const Page = async ({ params }: Props) => {
  const blog = await getBlogData(params.id);
  if (!blog) return notFound();
  return <BlogPage topic={blog} />;
};

export default Page;
