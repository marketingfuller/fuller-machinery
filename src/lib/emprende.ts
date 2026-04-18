import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "emprende");

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  cover: string;
  author: string;
  readingTime: string;
  featured?: boolean;
  content: string;
};

function estimateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min`;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title ?? slug,
      excerpt: data.excerpt ?? "",
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      category: data.category ?? "General",
      cover: data.cover ?? "",
      author: data.author ?? "Equipo Fuller",
      readingTime: data.readingTime ?? estimateReadingTime(content),
      featured: Boolean(data.featured),
      content,
    } satisfies Post;
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? "",
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    category: data.category ?? "General",
    cover: data.cover ?? "",
    author: data.author ?? "Equipo Fuller",
    readingTime: data.readingTime ?? estimateReadingTime(content),
    featured: Boolean(data.featured),
    content,
  };
}

export function getFeaturedPost(): Post | null {
  const all = getAllPosts();
  return all.find((p) => p.featured) ?? all[0] ?? null;
}
