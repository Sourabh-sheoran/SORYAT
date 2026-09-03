"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  height?: number;
  symbolOnly?: boolean;
  priority?: boolean;
}

/**
 * Official SORYAT Company Logo component.
 * Automatically adapts between Light Mode (black) and Dark Mode (white).
 */
export default function SoryatLogo({
  className = "h-8 w-auto",
  symbolOnly = false,
  priority = true,
}: LogoProps) {
  if (symbolOnly) {
    return (
      <div className={`relative inline-flex items-center ${className}`}>
        {/* Dark Mode Symbol (White) */}
        <Image
          src="/logo-symbol-white.png"
          alt="SORYAT Symbol"
          width={180}
          height={180}
          priority={priority}
          className="hidden dark:block w-auto h-full object-contain"
        />
        {/* Light Mode Symbol (Black) */}
        <Image
          src="/logo-symbol-black.png"
          alt="SORYAT Symbol"
          width={180}
          height={180}
          priority={priority}
          className="block dark:hidden w-auto h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {/* Dark Mode Logo (White) */}
      <Image
        src="/logo-white.png"
        alt="SORYAT Digital Excellence"
        width={945}
        height={201}
        priority={priority}
        className="hidden dark:block w-auto h-full object-contain"
      />
      {/* Light Mode Logo (Black) */}
      <Image
        src="/logo-black.png"
        alt="SORYAT Digital Excellence"
        width={945}
        height={201}
        priority={priority}
        className="block dark:hidden w-auto h-full object-contain"
      />
    </div>
  );
}

export function SoryatSymbol({
  className = "h-7 w-auto",
  priority = true,
}: Omit<LogoProps, "symbolOnly">) {
  return <SoryatLogo symbolOnly className={className} priority={priority} />;
}
