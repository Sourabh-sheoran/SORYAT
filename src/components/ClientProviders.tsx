"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AgencyProvider } from "@/context/AgencyContext";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AgencyProvider>
        <Navbar />
        <div className="flex-1 w-full flex flex-col">{children}</div>
        {!isAuthPage && <Footer />}
        <LoginModal />
      </AgencyProvider>
    </ThemeProvider>
  );
}
