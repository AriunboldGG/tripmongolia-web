import Link from "next/link";

const menuLinks = [
  { label: "Нүүр", href: "/" },
  { label: "Зочид буудал", href: "/hotels" },
  { label: "Амралтын газар", href: "/resorts" },
  { label: "Орон сууц", href: "/guesthouses" },
  { label: "Ресторан", href: "/restaurants" },
  { label: "Мэдээ", href: "/news" },
  { label: "Холбоо барих", href: "/contacts" },
];

const partners = ["Hilton", "Marriott"];

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      {/* Main footer content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo + Contact */}
          <div className="flex flex-col gap-5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="flex items-end gap-0.5">
                {[3, 5, 4, 6, 4].map((h, i) => (
                  <span
                    key={i}
                    className="bg-gray-900 rounded-sm w-1.5"
                    style={{ height: `${h * 3}px` }}
                  />
                ))}
              </div>
              <span className="text-gray-900 text-lg font-bold tracking-tight">
                goDarkhan
              </span>
            </Link>

            {/* Contact details */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-3 pb-2 border-b border-gray-300">
                Contact Details
              </p>
              <ul className="flex flex-col gap-1.5 text-sm text-gray-700">
                <li>
                  <span className="font-semibold text-gray-500 mr-1">Tel:</span>
                  +976 9900-0000
                </li>
                <li>
                  <span className="font-semibold text-gray-500 mr-1">Mob:</span>
                  +976 9911-0000
                </li>
                <li>
                  <span className="font-semibold text-gray-500 mr-1">E-mail:</span>
                  info@tripmongolia.mn
                </li>
              </ul>

              {/* Social icons */}
              <div className="flex items-center gap-2 mt-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 hover:border-gray-700 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 hover:border-gray-700 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/97699000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 hover:border-gray-700 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.985-1.406A9.954 9.954 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.946 7.946 0 0 1-4.291-1.254l-.308-.183-3.185.898.886-3.1-.2-.318A7.946 7.946 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Menu */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-3 pb-2 border-b border-gray-300">
              Menu
            </p>
            <ul className="flex flex-col gap-2">
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-700 hover:text-gray-950 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Partners */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-3 pb-2 border-b border-gray-300">
              Хамтрагч байгууллагууд
            </p>
            <ul className="flex flex-col gap-2">
              {partners.map((p) => (
                <li key={p} className="text-sm text-gray-700">
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: About card */}
          <div>
            <div className="bg-gray-800 text-gray-200 rounded-xl p-5 text-sm leading-relaxed">
              <p>
                Бид танийг тав тухтай аялахад тусална...
              </p>
              <button className="mt-3 text-xs text-gray-400 hover:text-white transition-colors underline underline-offset-2">
                Дэлгэрэнгүй...
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 py-4 px-4 sm:px-6">
        <p className="text-center text-xs text-gray-400">
          by goDarkhan.mn
        </p>
      </div>
    </footer>
  );
}
