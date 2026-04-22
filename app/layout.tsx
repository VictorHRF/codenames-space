import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import SpaceBackground from "./components/SpaceBackground";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Operación Espacial",
  description: "Juego de estrategia espacial en tiempo real. ¿Podrás conquistar la galaxia?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SpaceBackground >
          {children}
        </SpaceBackground>
      </body>
    </html>
  );
}
