import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "@/styles/globals.css";
import AppProvider from "@/lib/AppProvider";

const lexendDeca = Lexend_Deca({
  subsets: ['latin'],
  weight: ['200', '400', '500', '600', '700']
}) 

export const metadata: Metadata = {
  title: "TODO App",
  description: "Full Stack Nextjs TODO App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <html lang="en">
        <body className={`${lexendDeca.className} dark:bg-[#121215] bg-slate-100 text-[#84849d]`}>
          {children}
        </body>
      </html>
    </AppProvider>
  );
}
