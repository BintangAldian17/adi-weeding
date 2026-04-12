"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Gift() {
  const rootRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!contentRef.current) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      const frame = "[data-gift-frame]";
      const title = "[data-gift-title]";
      const desc = "[data-gift-desc]";
      const envelope = "[data-gift-envelope]";
      const inner = "[data-gift-inner]";

      if (reduceMotion.matches) {
        gsap.set([frame, title, desc, envelope, inner], {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: "all",
        });
        return;
      }

      // 🔥 INITIAL STATE
      gsap.set(frame, {
        opacity: 0,
        y: -30,
        scale: 1.08,
      });

      gsap.set(title, {
        opacity: 0,
        y: -20,
        scale: 1.08,
      });

      gsap.set(desc, {
        opacity: 0,
        y: 30,
        scale: 1.08,
      });

      gsap.set(envelope, {
        opacity: 0,
        y: 40,
        scale: 1.1, // sedikit lebih dramatis
      });

      gsap.set(inner, {
        opacity: 0,
        y: 20,
        scale: 1.05,
      });

      // 🔥 TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: {
          ease: "power2.out",
        },
      });

      tl.to(frame, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
      })
        .to(
          title,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
          },
          "-=0.8",
        )
        .to(
          desc,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.3,
          },
          "-=1",
        )
        .to(
          envelope,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
          },
          "-=0.9",
        )
        .to(
          inner,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            stagger: 0.1,
          },
          "-=0.9",
        );
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="w-full xl:min-h-screen min-h-[75vh] relative bg-secondary text-text-dark xl:rounded-t-[80px] rounded-t-[24px] xl:pb-[217px] pb-[172px] overflow-hidden"
    >
      <Image
        src="/images/bg-accent2.png"
        alt="bg"
        width={1440}
        height={1918}
        className="object-cover absolute w-full h-full mix-blend-multiply"
      />

      <div
        ref={contentRef}
        className="container xl:pt-[100px] xl:pb-[100px] pt-10 relative z-10 flex flex-col items-center justify-center xl:gap-[72px] gap-6"
      >
        {/* MINI FRAME */}
        <Image
          data-gift-frame
          src="/images/mini-frame-black.png"
          alt="mini-frame"
          width={398}
          height={32}
          className="xl:w-[398px] w-[196px] h-auto will-change-transform"
        />

        {/* TITLE */}
        <h2
          data-gift-title
          className="xl:text-[88px] text-[40px] font-alex-brush will-change-transform"
        >
          Wedding Gift
        </h2>

        {/* DESC */}
        <p
          data-gift-desc
          className="xl:text-[32px] text-center leading-none will-change-transform"
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>

        {/* ENVELOPE */}
        <div data-gift-envelope className="relative will-change-transform">
          <Image
            src="/images/amplop-gift.png"
            alt="gift-frame"
            width={684}
            height={492}
            className="xl:w-[684px] w-[301px] h-auto"
          />

          {/* INNER TEXT */}
          <div
            data-gift-inner
            className="text-center text-text-dark absolute top-[65%] left-1/2 -translate-x-1/2 will-change-transform"
          >
            <p className="xl:text-2xl font-alex-brush leading-none">E-Angpao</p>

            <div className="text-center text-sm mt-2">
              <div className="flex gap-3 items-center justify-center">
                <p className="font-bold leading-none">BCA - 0113306464</p>
                <div className="flex items-center justify-center size-4 rounded-full bg-secondary">
                  <Image
                    src="/images/copy-icon.png"
                    alt="copy"
                    width={12}
                    height={12}
                  />
                </div>
              </div>
              <p>Gema Adi Perwira</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
