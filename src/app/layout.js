import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers/providers";
import Navbar from "@/components/shared/Navbar/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Car Doctor Next",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
