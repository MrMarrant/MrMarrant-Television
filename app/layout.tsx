import React from 'react';
import type { Metadata } from 'next';
// @ts-ignore: side-effect import of CSS without type declarations
import "./globals.css";

export const metadata: Metadata = {
  title: 'MrMarrant',
  description: 'A fully interactive virtual television experience.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}