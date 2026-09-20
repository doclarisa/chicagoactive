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
    month: "long",
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

      <div className="mt-10 flex flex-col gap-8">
        {posts.map((post, i) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block no-underline">
            <article
              className={
                i === 0
                  ? "overflow-hidden rounded-card bg-card shadow-sm ring-1 ring-black/5 transition-shadow group-hover:shadow-md"
                  : "flex gap-4 border-t border-flag-blue-tint-2 pt-6"
              }
            >
              {i === 0 ? (
                <Image
                  src={post.heroImage}
                  alt=""
                  width={1448}
                  height={1086}
                  className="h-auto w-full object-cover"
                  sizes="(min-width: 672px) 672px, 100vw"
                />
              ) : (
                <Image
                  src={post.heroImage}
                  alt=""
                  width={1448}
                  height={1086}
                  className="h-20 w-20 flex-none rounded-lg object-cover sm:h-24 sm:w-24"
                  sizes="96px"
                />
              )}
              <div className={i === 0 ? "p-6 sm:p-8" : "min-w-0"}>
              <p className="text-sm font-semibold text-ink-muted">
                <time dateTime={post.publishedDate}>{formatDate(post.publishedDate)}</time>
                <span aria-hidden="true"> · </span>
                {post.readingMinutes} min read
              </p>
              <h2
                className={
                  i === 0
                    ? "mt-2 text-2xl font-extrabold leading-tight tracking-tight text-ink group-hover:text-flag-blue-ink sm:text-3xl"
                    : "mt-2 text-xl font-extrabold leading-tight tracking-tight text-ink group-hover:text-flag-blue-ink"
                }
              >
                {post.title}
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-ink-muted">{post.dek}</p>
              <span className="mt-3 inline-block text-base font-semibold text-flag-blue-ink">Read more →</span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <p className="mt-14 border-t border-flag-blue-tint-2 pt-6">
        <Link href="/directory" className="text-base font-semibold text-flag-blue-ink no-underline hover:underline">
          ← Back to the free directory
        </Link>
      </p>
    </main>
  );
}
