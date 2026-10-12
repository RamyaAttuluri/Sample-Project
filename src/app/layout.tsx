import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GGST Innovations",
    template: "%s | GGST Innovations",
  },
  description: "Empowering global businesses with expert engineering, seamless migrations, and innovative digital solutions.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="site-bg relative min-h-full flex flex-col">
        {/* Soft blue / orange / yellow glow at the top of every page — sits behind the header too. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1000px] overflow-hidden" aria-hidden="true">
          <div className="absolute -top-24 left-[4%] h-[460px] w-[460px] rounded-full bg-glow-blue opacity-50 blur-glow" />
          <div className="absolute top-32 right-[4%] h-[500px] w-[500px] rounded-full bg-glow-orange opacity-50 blur-glow-lg" />
          <div className="absolute top-[380px] left-[28%] h-[400px] w-[400px] rounded-full bg-glow-yellow opacity-50 blur-glow" />
        </div>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
