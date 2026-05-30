import { Poppins } from "next/font/google";
import "./globals.css";
import SiteFooter from "@/components/SiteFooter";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Josh English Academy | Spoken English Coaching",
  description:
    "Josh English Academy by R.K.D Sir offers spoken English training, personality development, interview preparation, and communication skills coaching.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
