// app/providers/PageLoadingProvider.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";

type PageLoadingContextType = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

const PageLoadingContext = createContext<PageLoadingContextType | undefined>(
  undefined
);

export function PageLoadingProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  // When pathname changes, we know navigation is complete
  useEffect(() => {
    if (pathname !== lastPathname) {
      setIsLoading(false);
      setLastPathname(pathname);
    }
  }, [isLoading, pathname, lastPathname]);

  return (
    <PageLoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </PageLoadingContext.Provider>
  );
}

export function usePageLoading() {
  const ctx = useContext(PageLoadingContext);
  if (!ctx) {
    throw new Error("usePageLoading must be used inside a PageLoadingProvider");
  }
  return ctx;
}
