import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "PlanPodu.in — Your Property, In Your Hands | Tamil Nadu Real Estate Tools",
  description:
    "Free online tools for Tamil Nadu property buyers — Stamp Duty Calculator, Area Converter, CMDA/DTCP Finder & Vastu Planner. Calculate registration charges, convert land units, and plan your dream home.",
  keywords:
    "stamp duty calculator Tamil Nadu, property registration charges, cent to sqft converter, CMDA DTCP check, vastu plan Tamil Nadu, TN property tools",
  openGraph: {
    title: "PlanPodu.in — Tamil Nadu Property Tools",
    description:
      "Free calculators for stamp duty, area conversion, jurisdiction finder & vastu planning. Made for Tamil Nadu.",
    type: "website",
    locale: "en_IN",
    siteName: "PlanPodu.in",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlanPodu.in — Tamil Nadu Property Tools",
    description:
      "Free calculators for stamp duty, area conversion, jurisdiction finder & vastu planning.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${inter.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
