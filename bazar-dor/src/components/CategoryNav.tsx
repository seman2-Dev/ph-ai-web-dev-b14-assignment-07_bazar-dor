"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/app/lib/api";

type CategoryNavProps = { categories: Category[] };

export default function CategoryNav({ categories }: CategoryNavProps) {
    const pathname = usePathname();

    return <nav className="container flex items-center gap-2 overflow-x-auto py-2 border-t border-[#f0f3f0]" aria-label="পণ্যের বিভাগ">
        {categories.map((category) => {
            const isActive = pathname === `/category/${category.slug}`;
            return <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                aria-current={isActive ? "page" : undefined}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold hover:bg-[#e4f4e9] ${isActive ? "bg-[#e4f4e9] text-[#12844c]" : ""}`}
            >
                <span className="mr-1">{category.emoji}</span>{category.name}
            </Link>;
        })}
    </nav>;
}
