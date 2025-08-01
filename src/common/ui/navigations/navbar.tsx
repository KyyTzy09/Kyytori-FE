"use client";

import { Search } from "lucide-react";
import React from "react";
import AuthButton from "@/features/auth/components/auth-button";
import { User } from "@/common/types/user";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AnimeSearchButton from "@/features/anime/components/anime-search-button";

export default function Navbar({ data }: { data: User }) {
  const pathname = usePathname();

  return (
    <nav
      className={`w-full h-20 border-b ${
        pathname.startsWith("/dashboard") && "hidden"
      }`}
    >
      <div className="w-full h-full p-8 flex items-center justify-between">
        <Link
          href={"/home"}
          className="text-red-500 light:text-black font-bold text-xl"
        >
          KyyTori<span className="text-white">.id</span>
        </Link>
        <div className="flex items-center justify-between gap-5">
          <Link
            href={"/list"}
            className="text-white font-semibold hover:text-red-500 hover:underline"
          >
            Daftar Anime
          </Link>
          <AnimeSearchButton />
          <AuthButton data={data} />
        </div>
      </div>
    </nav>
  );
}
