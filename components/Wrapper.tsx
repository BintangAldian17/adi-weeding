"use client";

import type { WishItem } from "@/lib/actions/getWishes";
import Hero from "./Hero";
import Quote from "./Quote";
import Couple from "./Couple";
import Gallery from "./Gallery";
import Gift from "./Gift";
import Closing from "./Closing";
import Event from "./Event";
import Image from "next/image";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/all";
import Wishes from "./Wishes";

export default function Wrapper({
  guestId,
  initialWishes,
  initialPage,
  totalPages,
  totalWishes,
}: {
  guestId: string;
  initialWishes: WishItem[];
  initialPage: number;
  totalPages: number;
  totalWishes: number;
}) {
  useEffect(() => {
    // Refresh lagi setelah semua gambar load
    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  return (
    <>
      <Hero />
      <div className="bg-primary w-full h-full relative">
        <Image
          src="/images/bg-event.png"
          alt="Hero Background"
          width={1710}
          height={2280}
          // TAMBAHKAN: mix-blend-multiply dan opacity
          // mix-blend-multiply: Membuat warna putih/terang menjadi transparan (mengambil warna background)
          // opacity-50: (Opsional) Sesuaikan angkanya agar motif tidak terlalu kontras
          className="object-cover absolute w-full h-full mix-blend-multiply"
        />

        {/* Pastikan konten di atasnya punya z-index lebih tinggi agar tidak ikut kena efek blend */}
        <div className="relative z-10">
          <Quote />
          <Couple />
        </div>
      </div>
      <Gallery />
      <Event />
      <Gift />
      <Wishes
        guestId={guestId}
        initialWishes={initialWishes}
        initialPage={initialPage}
        totalPages={totalPages}
        totalWishes={totalWishes}
      />
      <Closing />
    </>
  );
}
