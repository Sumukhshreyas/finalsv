import Link from "next/link";
import type { Category, Mode } from "@/data/types";
import { getCategoryUrl } from "@/lib/dataUtils";

interface CategoryChipRowProps {
  activeCategorySlug: string;
  categories: Category[];
  mode: Mode;
}

export function CategoryChipRow({
  activeCategorySlug,
  categories,
  mode,
}: CategoryChipRowProps) {
  return (
    <div className="chip-row" aria-label="Category shortcuts">
      {categories.map((category) => {
        const active = category.slug === activeCategorySlug;

        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={`quick-chip${active ? " active" : ""}`}
            href={getCategoryUrl(category, mode)}
            key={category.id}
          >
            {category.title}
          </Link>
        );
      })}
    </div>
  );
}
