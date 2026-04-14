import { notFound } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
import { cookies } from "next/headers";
import Opening from "@/components/Opening";

export default async function GuestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const id = (await params).id;
  console.log(id);
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  return (
    <main className="w-full h-full bg-primary">
      <Opening guestName={data.name} />
    </main>
  );
}
