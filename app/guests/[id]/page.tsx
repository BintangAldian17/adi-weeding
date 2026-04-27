import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Opening from "@/components/Opening";
import { createClient } from "../../../utils/supabase/server";
import { getAllWishes } from "@/lib/actions/getWishes";

const siteTitle = "The Wedding of Devi & Adi";

const siteDescription =
  "Join us in celebrating the wedding of Devi & Adi on 31 Mei 2026.";

const ogImage = "/og-image-v5.jpg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from("guests")
    .select("name")
    .eq("id", id)
    .single();

  const guestName = data?.name?.trim();

  const title = guestName
    ? `${guestName} - Wedding Invitation`
    : "Wedding Invitation";

  const description = guestName
    ? `${guestName}, you are invited to celebrate the wedding of Devi & Adi on 31 Mei 2026.`
    : siteDescription;

  const pageUrl = `/guests/${id}`;

  return {
    title: `${title} | ${siteTitle}`,
    description,

    alternates: {
      canonical: pageUrl,
    },

    openGraph: {
      type: "website",
      locale: "id_ID",
      url: pageUrl,
      title: `${title} | ${siteTitle}`,
      description,
      siteName: siteTitle,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: siteTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteTitle}`,
      description,
      images: [ogImage],
    },
  };
}

export default async function GuestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const wishes = await getAllWishes();

  return (
    <main className="h-full w-full bg-primary">
      <Opening
        guestName={data.name}
        guestId={id}
        initialWishes={wishes}
      />
    </main>
  );
}
