"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Currency = "INR" | "USD" | "CAD";

interface CurrencyRate {
  symbol: string;
  rate: number; // relative to INR (1 INR = rate)
  label: string;
}

export const CURRENCY_RATES: Record<Currency, CurrencyRate> = {
  INR: { symbol: "₹", rate: 1, label: "INR (₹)" },
  USD: { symbol: "$", rate: 0.012, label: "USD ($)" },
  CAD: { symbol: "CA$", rate: 0.016, label: "CAD ($)" },
};

export interface AuthUser {
  email: string;
  name: string;
}

interface AgencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (inrAmount: number) => string;
  // Consultation booking
  isConsultationOpen: boolean;
  setIsConsultationOpen: (open: boolean) => void;
  selectedService: string;
  setSelectedService: (svc: string) => void;
  openBookingWithService: (svc: string) => void;
  // Auth & Login Popup states
  isLoggedIn: boolean;
  user: AuthUser | null;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  loginNotice: string | null;
  setLoginNotice: (notice: string | null) => void;
  loginUser: (email: string, name?: string) => void;
  logoutUser: () => void;
  requireAuth: (action: () => void, notice?: string) => void;
}

const AgencyContext = createContext<AgencyContextType | undefined>(undefined);

export function AgencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [isConsultationOpenInternal, setIsConsultationOpenInternal] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("Web Development");

  // Authentication & Login Modal states
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [loginNotice, setLoginNotice] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Restore authentication from localStorage on client mount
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem("soryat_auth_session");
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        if (parsed?.isLoggedIn && parsed?.user) {
          setIsLoggedIn(true);
          setUser(parsed.user);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const loginUser = (email: string, name?: string) => {
    const formattedName = name || email.split("@")[0].replace(/[._-]/g, " ");
    const capitalizedName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
    const userData: AuthUser = { email, name: capitalizedName };

    setIsLoggedIn(true);
    setUser(userData);
    try {
      localStorage.setItem("soryat_auth_session", JSON.stringify({ isLoggedIn: true, user: userData }));
    } catch {}

    setIsLoginModalOpen(false);
    setLoginNotice(null);

    // If an action was pending (e.g. user clicked a service booking before logging in)
    if (pendingAction) {
      setTimeout(() => {
        pendingAction();
        setPendingAction(null);
      }, 100);
    }
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    setUser(null);
    try {
      localStorage.removeItem("soryat_auth_session");
    } catch {}
  };

  // Intercept consultation modal request if user is not authenticated
  const setIsConsultationOpen = useCallback((open: boolean) => {
    if (open && !isLoggedIn) {
      setLoginNotice("Please sign in first to access our services and kickstart demo staging.");
      setPendingAction(() => () => setIsConsultationOpenInternal(true));
      setIsLoginModalOpen(true);
    } else {
      setIsConsultationOpenInternal(open);
    }
  }, [isLoggedIn]);

  // Intercept specific service booking request if unauthenticated
  const openBookingWithService = useCallback((svc: string) => {
    setSelectedService(svc);
    if (!isLoggedIn) {
      setLoginNotice(`Please sign in first to access ${svc} and reserve your demo staging.`);
      setPendingAction(() => () => setIsConsultationOpenInternal(true));
      setIsLoginModalOpen(true);
    } else {
      setIsConsultationOpenInternal(true);
    }
  }, [isLoggedIn]);

  // Generic action guard
  const requireAuth = useCallback((action: () => void, notice?: string) => {
    if (isLoggedIn) {
      action();
    } else {
      if (notice) setLoginNotice(notice);
      setPendingAction(() => action);
      setIsLoginModalOpen(true);
    }
  }, [isLoggedIn]);

  const formatPrice = (inrAmount: number) => {
    const config = CURRENCY_RATES[currency];
    if (currency === "INR") {
      return `₹${inrAmount.toLocaleString("en-IN")}`;
    }
    const converted = Math.round(inrAmount * config.rate);
    return `${config.symbol}${converted.toLocaleString("en-US")}`;
  };

  return (
    <AgencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        isConsultationOpen: isConsultationOpenInternal,
        setIsConsultationOpen,
        selectedService,
        setSelectedService,
        openBookingWithService,
        isLoggedIn,
        user,
        isLoginModalOpen,
        setIsLoginModalOpen,
        loginNotice,
        setLoginNotice,
        loginUser,
        logoutUser,
        requireAuth,
      }}
    >
      {children}
    </AgencyContext.Provider>
  );
}

export function useAgency() {
  const context = useContext(AgencyContext);
  if (!context) {
    throw new Error("useAgency must be used within an AgencyProvider");
  }
  return context;
}
