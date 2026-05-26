import Link from "next/link";

export default function SellCTA() {
  return (
    <section className="bg-gray-950 py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8">
        <h2 className="text-white text-2xl sm:text-4xl font-bold leading-tight max-w-lg">
          Та хамтрагч байгууллага болохыг хүсч байна уу?
        </h2>
        <Link
          href="/sell"
          className="w-full sm:w-auto text-center shrink-0 border border-white text-white text-sm font-medium px-7 py-3 rounded-full hover:bg-white hover:text-gray-950 transition-colors"
        >
          Энд дарна уу...
        </Link>
      </div>
    </section>
  );
}
