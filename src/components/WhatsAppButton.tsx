import type { Settings } from "@/lib/content-schema";
import { whatsappLink } from "@/lib/site";

export function WhatsAppButton({ settings }: { settings: Settings }) {
  return (
    <a
      href={whatsappLink(settings.whatsapp, settings.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="plausible-event-name=WhatsApp+Click fixed right-5 bottom-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden>
        <path d="M16.04 3C9.03 3 3.33 8.7 3.33 15.7c0 2.24.59 4.43 1.7 6.36L3.2 28.8l6.92-1.81a12.66 12.66 0 0 0 5.92 1.47h.01c7 0 12.7-5.7 12.7-12.7 0-3.39-1.32-6.58-3.72-8.98A12.6 12.6 0 0 0 16.04 3Zm0 23.3h-.01a10.55 10.55 0 0 1-5.37-1.47l-.39-.23-4.1 1.08 1.1-4-.26-.41a10.5 10.5 0 0 1-1.61-5.6c0-5.82 4.74-10.56 10.57-10.56 2.82 0 5.47 1.1 7.46 3.1a10.48 10.48 0 0 1 3.09 7.47c0 5.83-4.74 10.57-10.56 10.57Zm5.8-7.91c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.76-2.2-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.98-2.35-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.07 1.3 3.28c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.14-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z" />
      </svg>
    </a>
  );
}
