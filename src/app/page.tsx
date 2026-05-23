import type { Metadata } from "next";
import { CategoryStrip } from "@/components/home/CategoryStrip";
import { AdvantagesSection } from "@/components/home/AdvantagesSection";
import { ContactBand } from "@/components/home/ContactBand";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { getCatalogue } from "@/lib/dataUtils";
import { buildHomeMetadata } from "@/lib/seoHelpers";

export function generateMetadata(): Metadata {
  const catalogue = getCatalogue();

  return buildHomeMetadata("automobile", catalogue.modes.automobile.home.copy);
}

export default function Home() {
  const catalogue = getCatalogue();

  return (
    <HeroSection modes={catalogue.modes}>
      <CategoryStrip />
      <FeaturedProducts />
      <AdvantagesSection />
      <ContactBand />
    </HeroSection>
  );
}
