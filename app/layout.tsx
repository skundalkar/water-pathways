import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Water Pathways | California D1/D2 Study",
  description: "Beginner-friendly California water distribution exam prep."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
