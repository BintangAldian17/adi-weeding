import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
import { cookies } from "next/headers";
import Opening from "@/components/Opening";
import { getWishes } from "@/lib/actions/getWishes";

const siteTitle = "The Wedding of Devi & Adi";
const siteDescription =
  "Join us in celebrating the wedding of Devi & Adi on 31 Mei 2026.";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const id = (await params).id;
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

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${siteTitle}`,
      description,
      images: ["/icon1.png"],
    },
    twitter: {
      title: `${title} | ${siteTitle}`,
      description,
      images: ["/icon1.png"],
    },
  };
}

export default async function GuestPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const id = (await params).id;
  const pageParam = (await searchParams).page;
  const currentPage = Math.max(1, Number(pageParam) || 1);
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const wishesData = await getWishes(currentPage, 8);

  return (
    <main className="w-full h-full bg-primary">
      <Opening
        guestName={data.name}
        guestId={id}
        initialWishes={wishesData.items}
        initialPage={wishesData.page}
        totalPages={wishesData.totalPages}
        totalWishes={wishesData.total}
      />
    </main>
  );
}
