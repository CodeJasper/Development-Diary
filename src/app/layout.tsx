import React from "react";
import "@/global.css";
import AuthProvider from "@/components/auth_provider/AuthProvider";

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
      <body className="h-dvh">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}