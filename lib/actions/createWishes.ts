"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createWishes(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const message = String(formData.get("message") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const presentValue = String(formData.get("present") ?? "").trim();
  const userId = String(formData.get("user_id") ?? "").trim();
  const path = String(formData.get("path") ?? "").trim();
  const present = presentValue === "true";

  if (!name || !message || !presentValue || !userId) {
    throw new Error("Nama, kehadiran, dan ucapan wajib diisi.");
  }

  const { error } = await supabase.from("wishes").insert({
    user_id: userId,
    name,
    message,
    present,
  });
  if (error) throw error;

  if (path) {
    revalidatePath(path);
  }
}
