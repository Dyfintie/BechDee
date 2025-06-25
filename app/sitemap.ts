import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  const staticRoutes = [
    "",
    "/about",
    "/addblog",
    "/addcourse",
    "/admin",
    "/blog",
    "/course",
    "/items",
    "/login",
    "/profile",
    "/therapy",
  ];

  let blogRoutes: string[] = [];
  let courseRoutes: string[] = [];

  try {
    const [blogsRes, coursesRes] = await Promise.all([
      fetch(`${baseUrl}/api/blog`),
      fetch(`${baseUrl}/api/course`),
    ]);

    const blogs = await blogsRes.json();
    const courses = await coursesRes.json();

    blogRoutes = blogs.map((b: any) => `/blog/${b._id}`);
    courseRoutes = courses.map((c: any) => `/course/${c._id}`);
  } catch (err) {
    console.error("Sitemap fetch failed:", err);
  }

  const allRoutes = [...staticRoutes, ...blogRoutes, ...courseRoutes];

  return allRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
  }));
}

