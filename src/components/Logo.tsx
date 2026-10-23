import Image from "next/image";
import Link from "next/link";

// The client's logo artwork, unchanged (only the tiny tagline line is left off at header size).
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex shrink-0 items-center" aria-label="Mirsons Global — home">
      <Image
        src="/brand/logo-header.png"
        alt="Mirsons Global"
        width={480}
        height={389}
        priority
        sizes="160px"
        className={`w-auto transition-[height] duration-300 ${compact ? "h-16" : "h-16 lg:h-[5.5rem]"}`}
      />
    </Link>
  );
}
