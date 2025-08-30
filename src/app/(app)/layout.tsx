import React from "react";
import "@/global.css";
import AuthProvider from "@/components/auth_provider/AuthProvider";

export default function MainAppLayou({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl w-full mx-auto h-full pt-12 px-10 pb-6">
        <AuthProvider>{children}</AuthProvider>
      </div>
    </div>
  )
}