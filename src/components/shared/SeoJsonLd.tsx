import type { JsonLdObject } from "@/lib/seoHelpers";

type SeoJsonLdProps = {
  data: JsonLdObject | JsonLdObject[];
};

function safeSerializeJsonLd(data: JsonLdObject | JsonLdObject[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function SeoJsonLd({ data }: SeoJsonLdProps) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: safeSerializeJsonLd(data) }}
    />
  );
}
