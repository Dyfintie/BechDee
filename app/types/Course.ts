export interface CourseType {
    _id: string;
    title: string;
    instructor: string;
    email: string;
    thumbnail?: string;
    profilepic?: string;
    description?: string;
    price?: number;
    category?: string;
    tags?: string;
    status?: string; // e.g., "available", "unavailable"
    date_created?: string; // ISO date format
    duration?: string; // e.g., "3 hours"
    level?: "beginner" | "intermediate" | "advanced";
    videoUrl?: string; // URL to the course video
}