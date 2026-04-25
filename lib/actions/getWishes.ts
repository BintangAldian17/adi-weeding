"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export type WishItem = {
  id: number | string;
  name: string;
  message: string;
  present: boolean;
};

export async function getWishes(page = 1, limit = 8) {
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);
  const from = (safePage - 1) * safeLimit;
  const to = from + safeLimit - 1;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, count, error } = await supabase
    .from("wishes")
    .select("id, name, message, present", { count: "exact" })
    .order("id", { ascending: false })
    .range(from, to);

  if (error) {
    throw error;
  }

  const total = count ?? 0;

  return {
    items: (data ?? []) as WishItem[],
    total,
    totalPages: Math.max(1, Math.ceil(total / safeLimit)),
    page: safePage,
    limit: safeLimit,
  };
}
