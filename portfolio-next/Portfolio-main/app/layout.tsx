import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/providers/smooth-scroll-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { LanguageProvider } from "@/providers/language-provider";
import { SoundProvider } from "@/providers/sound-provider";
import { CustomCursor } from "@/components/layout/custom-cursor";
import { Preloader } from "@/components/layout/preloader";
import Navbar from "@/components/layout/navbar";
import { getDictionary, getContents, getSharedData } from "@/lib/loaders";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://snehraunak.in"),
  title: { default: "Sneh Raunak | ML systems and full-stack products", template: "%s | Sneh Raunak" },
  description: "Selected machine-learning systems, full-stack products, and explainable-AI research by Sneh Raunak.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_IN", url: "/", siteName: "Sneh Raunak", images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Sneh Raunak - ML systems and full-stack products" }] },
  twitter: { card: "summary_large_image", images: ["/og.svg"] }, robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [dictionary, contents, shared] = await Promise.all([getDictionary("en"), getContents("en"), getSharedData()]);
  const personSchema = { "@context": "https://schema.org", "@type": "Person", name: "Sneh Raunak", url: "https://snehraunak.in", sameAs: ["https://github.com/snehOP9", "https://www.linkedin.com/in/sneh-raunak/", "https://x.com/Snehhhh_09", "https://www.instagram.com/sneh.raunak/"] };
  return <html lang="en" suppressHydrationWarning><head><meta httpEquiv="Content-Security-Policy" content="default-src 'self'; base-uri 'self'; connect-src 'self' https://formsubmit.co; font-src 'self' data:; form-action 'self'; frame-ancestors 'none'; frame-src 'self'; img-src 'self' data: blob:; media-src 'self'; object-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; worker-src 'self' blob:; upgrade-insecure-requests" /><meta httpEquiv="Permissions-Policy" content="camera=(), geolocation=(), microphone=(), payment=(), usb=()" /><meta name="referrer" content="strict-origin-when-cross-origin" /></head><body className={`${inter.variable} ${syne.variable} font-sans bg-background text-foreground antialiased`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} /><ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}><SoundProvider><LanguageProvider lang="en" dictionary={dictionary} contents={contents} shared={shared}><CustomCursor /><Preloader /><SmoothScroll><a className="skip-link" href="#main-content">Skip to content</a><Navbar />{children}</SmoothScroll></LanguageProvider></SoundProvider></ThemeProvider></body></html>;
}
