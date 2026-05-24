"use client";
// components/layout/Providers.tsx
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#112040",
            color: "#F0F4FF",
            border: "1px solid #1E3A6A",
            borderRadius: "12px",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "14px",
          },
          success: {
            iconTheme: { primary: "#00E676", secondary: "#050B18" },
          },
          error: {
            iconTheme: { primary: "#FF5252", secondary: "#050B18" },
          },
        }}
      />
    </SessionProvider>
  );
}
