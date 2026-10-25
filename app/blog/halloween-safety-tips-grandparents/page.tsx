import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BLOG_POSTS } from "@/lib/blog";

const POST = BLOG_POSTS.find((p) => p.slug === "halloween-safety-tips-grandparents")!;

export const metadata: Metadata = {
  title: POST.title,
  description: POST.dek,
  alternates: { canonical: `/blog/${POST.slug}` },
  openGraph: {
    title: POST.title,
    description: POST.dek,
    type: "article",
    images: [POST.heroImage],
  },
  robots: { index: true, follow: true },
};

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function HalloweenSafetyPost() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: POST.title, path: `/blog/${POST.slug}` },
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
          __html: JSON.stringify(
            articleSchema({
              headline: POST.title,
              description: POST.dek,
              path: `/blog/${POST.slug}`,
              datePublished: POST.publishedDate,
            }),
          ),
        }}
      />
      <Breadcrumbs crumbs={crumbs} />

      <article>
        <header className="mt-4">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            {POST.title}
          </h1>
          <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-ink-muted">
            <time dateTime={POST.publishedDate}>{formatDate(POST.publishedDate)}</time>
            <span aria-hidden="true">·</span>
            <span>{POST.readingMinutes} min read</span>
            <span aria-hidden="true">·</span>
            <span>Active Chicagoland</span>
          </p>
        </header>

        <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src={POST.heroImage}
            alt="A smiling woman crouched next to a child in a yellow dragon costume at a Halloween street parade"
            width={2294}
            height={4080}
            priority
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <p className="mt-6 text-xl leading-relaxed text-ink">
          Halloween changes shape once the grandkids are the ones in costume. You&apos;re not trick-or-
          treating anymore — you&apos;re the one decorating the porch, handing out candy to a steady
          stream of strangers&apos; kids, or walking your own grandchild around a dark block. That&apos;s
          a different set of risks than the ones aimed at trick-or-treaters, and most Halloween safety
          advice doesn&apos;t talk about them.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          Here&apos;s what&apos;s actually worth knowing, with real numbers where they exist.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">
          Decorations Start More Fires Than You&apos;d Think
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          The National Fire Protection Association tracked an average of <strong>835 home structure
          fires a year</strong> (2018–2022) that started with decorations — three deaths, 30 injuries,
          and $14 million in property damage annually. Nearly half started with decorations placed too
          close to a heat source, and about a third started with candles. Candles are a bigger problem
          on their own: NFPA counts roughly 7,610 home candle fires a year nationally.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          The fix is simple and doesn&apos;t cost much: swap real candles in jack-o&apos;-lanterns for
          battery-operated ones or glow sticks. If you do use a real candle, keep it in a well-attended
          spot out of the path trick-or-treaters will actually walk, and never leave it burning
          unattended. Dried cornstalks, paper decorations, and anything else flammable belong away from
          light bulbs, heaters, and any open flame.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">
          Your Porch Gets More Foot Traffic Tonight Than All Year
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          The CDC&apos;s home fall-prevention checklist exists for exactly this kind of scenario — more
          people than usual moving through your entryway, often in the dark, often distracted by candy
          or costumes. A few items straight off that checklist are worth a five-minute walk-through
          before dusk:
        </p>
        <ul className="mt-4 flex flex-col gap-2 text-lg text-ink">
          <li>
            <strong>Fix any burned-out porch or step light</strong> — this is the single most common
            item on the CDC&apos;s own checklist, and Halloween is the one night a dim porch actually
            matters.
          </li>
          <li>
            <strong>Clear the walkway</strong> of cords, rugs, candy bowls, or decorations sitting where
            feet actually land — your own, and every trick-or-treater&apos;s.
          </li>
          <li>
            <strong>Secure loose stair edges or carpet</strong> on steps, and consider reflective tape on
            the edge of each step if lighting is limited.
          </li>
        </ul>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          If standing at the door for hours isn&apos;t comfortable, a chair right inside or on the porch
          works just as well — or set out a supervised self-serve bowl and sit nearby. There&apos;s no
          rule that says you have to be on your feet all evening.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">
          If You&apos;re Walking a Grandchild Around the Block
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          NFPA&apos;s costume guidance is really just fire-safety common sense: avoid costumes that
          billow or trail (capes, long skirts, flowing sleeves), since loose fabric both catches easily
          and is a tripping hazard on uneven sidewalks. A flashlight or glow stick for each child helps
          everyone see the curbs and steps you&apos;re navigating — not just cars seeing your group.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">
          What to Hand Out, Diabetes-Friendly Options Included
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          If diabetes is a factor for you, a grandchild, or anyone in your household, sugar-free options
          have genuinely improved — Hershey&apos;s and Russell Stover both make sugar-free versions of
          familiar candy, and York now makes a zero-sugar peppermint pattie. One honest caveat: many
          sugar-free candies use sugar alcohols, which can still affect blood sugar and cause stomach
          upset in larger amounts, so check the label rather than assuming &quot;sugar-free&quot; means
          &quot;no effect.&quot;
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Non-candy options work too, and line up with the <strong>Teal Pumpkin Project</strong> — a
          national movement where households set out a teal pumpkin to signal they&apos;re handing out
          non-food treats (small toys, stickers, pencils) alongside or instead of candy, originally aimed
          at food allergies but just as useful for diabetes management.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">One Honest Note</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          None of this is medical advice — if diabetes management is a real concern for your household,
          that&apos;s a conversation for your doctor, not a blog post. This is just the practical,
          well-sourced version of &quot;have a safe one.&quot;
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Want to actually get out of the house instead of staying on porch duty?{" "}
          <Link
            href="/blog/halloween-fall-events-chicagoland-october-2026"
            className="font-semibold text-flag-blue-ink no-underline hover:underline"
          >
            See what&apos;s happening across Chicagoland this Halloween →
          </Link>
        </p>
      </article>

      <section className="mt-14 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-xl font-bold text-ink">Explore the directory</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/blog/halloween-fall-events-chicagoland-october-2026"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Halloween Events in Chicagoland →</span>
            <span className="text-base text-ink-muted">11 verified events, most free and open to all ages</span>
          </Link>
          <Link
            href="/directory"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Browse the full directory →</span>
            <span className="text-base text-ink-muted">Every listing, searchable by city and category</span>
          </Link>
        </div>
      </section>

      <p className="mt-8">
        <Link href="/blog" className="text-base font-semibold text-flag-blue-ink no-underline hover:underline">
          ← Back to the blog
        </Link>
      </p>
    </main>
  );
}
