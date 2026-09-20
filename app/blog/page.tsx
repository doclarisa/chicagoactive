import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";

const TITLE = "Blog";
const DESCRIPTION =
  "Data, findings, and stories from our directory of free and low-cost activities for active adults 50+ across Chicagoland.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: { title: `${TITLE} | Active Chicagoland`, description: DESCRIPTION },
};

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogIndexPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema(posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}` })))),
        }}
      />
      <Breadcrumbs crumbs={crumbs} />

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{TITLE}</h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-muted">{DESCRIPTION}</p>

      <div className="mt-8 flex flex-col">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex items-center gap-4 border-b border-flag-blue-tint-2 py-4 no-underline first:border-t"
          >
            {post.heroImage ? (
              <Image
                src={post.heroImage}
                alt=""
                width={200}
                height={150}
                className="h-16 w-20 flex-none rounded-lg object-cover sm:h-20 sm:w-24"
                sizes="96px"
              />
            ) : (
              <div className="h-16 w-20 flex-none rounded-lg bg-gradient-to-br from-flag-blue-tint to-flag-blue-tint-2 sm:h-20 sm:w-24" />
            )}

            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold leading-snug text-ink group-hover:text-flag-blue-ink sm:text-xl">
                {post.title}
              </h2>
              <p className="mt-1 text-sm text-ink-muted">
                Published · <time dateTime={post.publishedDate}>{formatDate(post.publishedDate)}</time>
              </p>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-10">
        <Link href="/directory" className="text-base font-semibold text-flag-blue-ink no-underline hover:underline">
          ← Back to the free directory
        </Link>
      </p>
    </main>
  );
}
