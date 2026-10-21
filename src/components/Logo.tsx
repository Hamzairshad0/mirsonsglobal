import Image from "next/image";
import Link from "next/link";

export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const lg = size === "lg";
  return (
    <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label="Mirsons Global — home">
      <Image
        src="/brand/logo-mark.png"
        alt=""
        width={360}
        height={257}
        priority
        className={lg ? "h-14 w-auto" : "h-11 w-auto"}
      />
      <span className="flex flex-col leading-none">
        <span className={`font-serif font-semibold tracking-[0.12em] text-gold-400 ${lg ? "text-2xl" : "text-xl"}`}>
          MIRSONS
        </span>
        <span className={`mt-1 font-serif tracking-[0.42em] text-gold-300/80 ${lg ? "text-xs" : "text-[10px]"}`}>
          GLOBAL
        </span>
      </span>
    </Link>
  );
}
