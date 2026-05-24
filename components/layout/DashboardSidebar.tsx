"use client";
// components/layout/DashboardSidebar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard, BookOpen, TrendingUp, CreditCard, Star,
  Settings, LogOut, ArrowLeftRight, BarChart2, History,
  Users, ShieldCheck, BellRing, Megaphone
} from "lucide-react";
import { cn, getInitials } from "@/lib/utils";

const studentLinks = [
  { href: "/dashboard/student", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/student/courses", label: "My Courses", icon: BookOpen },
  { href: "/dashboard/student/progress", label: "Progress", icon: TrendingUp },
  { href: "/subscriptions", label: "Subscription", icon: CreditCard },
  { href: "/reviews", label: "Reviews", icon: Star },
  { href: "/dashboard/student/settings", label: "Settings", icon: Settings },
];

const investorLinks = [
  { href: "/dashboard/investor", label: "Portfolio", icon: LayoutDashboard },
  { href: "/dashboard/investor/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/dashboard/investor/transactions", label: "Transactions", icon: History },
  { href: "/subscriptions", label: "Plan Details", icon: CreditCard },
  { href: "/dashboard/investor/settings", label: "Settings", icon: Settings },
];

const adminLinks = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "All Users", icon: Users },
  { href: "/admin/subscriptions", label: "Subscriptions", icon: CreditCard },
  { href: "/admin/payments", label: "Verify Payments", icon: ShieldCheck },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { href: "/admin/reviews", label: "Moderate Reviews", icon: Star },
  { href: "/admin/notifications", label: "Notifications", icon: BellRing },
];

interface DashboardSidebarProps {
  type: "student" | "investor" | "admin";
}

export function DashboardSidebar({ type }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const links =
    type === "student" ? studentLinks :
    type === "investor" ? investorLinks : adminLinks;

  const altHref =
    type === "student" ? "/dashboard/investor" : "/dashboard/student";
  const altLabel =
    type === "student" ? "Switch to Investor" : "Switch to Student";

  return (
    <aside className="w-60 bg-bg-secondary border-r border-border flex flex-col min-h-[calc(100vh-64px)]">
      {/* User info */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center text-sm font-black",
            type === "investor"
              ? "bg-gradient-to-br from-cyan-accent to-cyan-400"
              : "bg-gradient-to-br from-gold to-gold-light"
          )} style={{ color: "#050B18" }}>
            {getInitials(session?.user?.name || "U")}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{session?.user?.name}</p>
            <p className="text-xs text-slate-500 font-mono">
              {type === "admin" ? "Administrator" : type === "student" ? "Student · VIP" : "Investor · VIP"}
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <p className="text-xs text-slate-600 font-mono uppercase tracking-widest px-3 py-2 mt-1">
          {type === "admin" ? "Management" : type === "student" ? "Learning" : "Portfolio"}
        </p>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "sidebar-item flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm",
                isActive
                  ? "bg-gold/10 text-gold border border-gold/20"
                  : "text-slate-400 hover:text-white hover:bg-surface/60"
              )}
            >
              <Icon size={16} />
              {link.label}
            </Link>
          );
        })}

        {type !== "admin" && (
          <>
            <div className="my-3 h-px bg-border" />
            <Link
              href={altHref}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-slate-500 hover:text-white hover:bg-surface/60 transition-colors"
            >
              <ArrowLeftRight size={16} />
              {altLabel}
            </Link>
          </>
        )}
      </nav>

      {/* Sign out */}
      <div className="p-3 border-t border-border">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
