import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "goDarkhan.mn – Дархан хотын портал вебсайт",
  description: "Та хүссэн бүх мэдээллийг нэг дороос авах боломжтой. Дархан хотын аялал жуулчлал, зочид буудал, хоолны газар, үйл явдлын талаархи хамгийн сүүлийн үеийн мэдээ, зөвлөмжүүдийг эндээс олж авна уу.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="mn"
      className={`${lexend.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">{children}</body>
    </html>
  );
}
