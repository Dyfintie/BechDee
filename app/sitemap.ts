import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogsRes, coursesRes] = await Promise.all([
    fetch(`${baseUrl}/api/blog`),
    fetch(`${baseUrl}/api/course`),
  ]);

  const blogs = await blogsRes.json();
  const courses = await coursesRes.json();

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

  const dynamicRoutes = [
    ...blogs.map((b: any) => `/blog/${b._id}`),
    ...courses.map((c: any) => `/course/${c._id}`),
  ];

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const now = new Date().toISOString();

  return allRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
  }));
}
