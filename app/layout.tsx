import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gestión de Notas",
  description: "Plataforma para gestionar notas de estudiantes de forma eficiente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans antialiased bg-gradient-to-r from-blue-50 via-gray-100 to-blue-50 text-gray-800`}
      >
        <main className="min-h-screen flex flex-col items-center justify-center p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
