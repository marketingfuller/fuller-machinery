import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts, getPostBySlug } from "@/lib/emprende";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Artículo no encontrado" };
  return {
    title: `${post.title} | Emprende — Fuller Machinery`,
    description: post.excerpt,
    openGraph: post.cover ? { images: [{ url: post.cover }] } : undefined,
  };
}

export default async function EmprendePostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const dateFmt = new Date(post.date).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Header />
      <main className="min-h-screen mt-[80px] bg-white">
        {/* Hero */}
        <header className="relative bg-bg-dark text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <Link
              href="/emprende"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Volver a Emprende
            </Link>
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full mb-5">
              {post.category}
            </span>
            <h1 className="font-display font-black text-3xl md:text-5xl leading-tight mb-5">
              {post.title}
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-6 max-w-3xl">{post.excerpt}</p>
            <div className="flex items-center gap-3 text-sm text-white/50">
              <span>{post.author}</span>
              <span>·</span>
              <span>{dateFmt}</span>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
          </div>
        </header>

        {post.cover && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-12 relative z-10">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
              <Image src={post.cover} alt={post.title} fill className="object-cover" priority />
            </div>
          </div>
        )}

        {/* Body */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-headings:font-black prose-headings:text-slate-900 prose-a:text-primary hover:prose-a:text-secondary prose-a:font-semibold prose-strong:text-slate-900 prose-img:rounded-xl prose-table:text-sm">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
