import React from "react";
import "@/global.css";
import AuthProvider from "@/components/auth_provider/AuthProvider";
import Header from "@/components/header/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
      </head>
      <body className="flex flex-col h-dvh">
        <Header />
        <main className="grow-1">
          <AuthProvider>{children}</AuthProvider>
        </main>
      </body>
    </html>
  )
}