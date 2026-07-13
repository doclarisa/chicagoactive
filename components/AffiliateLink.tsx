import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "rel" | "target">;

// Every affiliate link goes through this component so rel="sponsored
// nofollow" can never be forgotten on a new offer.
export default function AffiliateLink({ href, children, variant = "secondary", ...rest }: Props) {
  const base =
    "inline-flex min-h-12 items-center justify-center rounded-pill px-6 text-base font-bold no-underline";
  const styles =
    variant === "primary"
      ? "bg-star-red text-white hover:bg-[#c40025]"
      : "border-2 border-flag-blue-ink text-flag-blue-ink";

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener"
      className={`${base} ${styles}`}
      {...rest}
    >
      {children}
    </a>
  );
}
