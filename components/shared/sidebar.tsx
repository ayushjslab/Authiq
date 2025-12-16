"use client";

import { useState } from "react";
import {
  Plus,
  BarChart3,
  Settings,
  User,
  CreditCard,
  Palette,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  const menuItems = [
    { icon: Palette, label: "Dashboard", slug: "/dashboard" },
    { icon: Plus, label: "Add website", slug: "/dashboard/add-website" },
    { icon: BarChart3, label: "Analysis", slug: "/dashboard/analysis" },
    { icon: User, label: "Account", slug: "/dashboard/account" },
    { icon: Settings, label: "Settings", slug: "/dashboard/settings" },
    { icon: CreditCard, label: "Billing", slug: "/dashboard/billing" },
  ];

  return (
    <div
      className="fixed left-0 top-0 h-full z-50"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div
        className={`h-full backdrop-blur-md shadow-2xl transition-all duration-500 ease-in-out rounded-r-2xl ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-emerald-100/20">
          <div
            className={`overflow-hidden transition-all duration-500 cursor-pointer ${
              isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
            }`}
            onClick={() => router.push("/")}
          >
            <h1 className="text-2xl font-extrabold text-emerald-500 whitespace-nowrap tracking-tight">
              Authiq
            </h1>
          </div>

          <div className="shrink-0 text-emerald-600 cursor-pointer hover:text-emerald-700 transition-colors mr-2">
            {!isOpen && (
              <div className="w-8 h-8 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-sm">AQ</span>
              </div>
            )}
          </div>
        </div>

        <nav className="mt-6 space-y-3 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathName === item.slug;

            return (
              <Link
                key={item.label}
                href={item.slug}
                className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden border border-transparent hover:border-emerald-500 ${
                  isActive
                    ? "bg-emerald-200/10 text-emerald-600"
                    : "text-gray-200"
                }`}
              >
                <span className="absolute inset-0 bg-linear-to-r from-emerald-400 via-emerald-300 to-emerald-400 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></span>
                <Icon
                  className={`w-6 h-6 shrink-0 transition-colors duration-300 ${
                    isActive
                      ? "ml-0.5 text-white"
                      : "text-emerald-500 group-hover:text-emerald-600"
                  }`}
                />

                <span
                  className={`font-medium overflow-hidden transition-all duration-500 ${
                    isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                  } whitespace-nowrap relative`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
