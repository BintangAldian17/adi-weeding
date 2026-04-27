"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useIsOpen } from "@/context/OpeningContext";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Quote() {
  const rootRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isOpen = useIsOpen();

  useGSAP(
    () => {
      if (!contentRef.current) return;
      if (!isOpen) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      const items = gsap.utils.toArray<HTMLElement>("[data-quote-anim]");

      if (!items.length) return;

      if (reduceMotion.matches) {
        gsap.set(items, {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: "all",
        });
        return;
      }

      // initial state: lebih besar lalu mengecil ke normal
      gsap.set(items, {
        opacity: 0,
        y: 18,
        scale: 1.08,
        transformOrigin: "center center",
        force3D: true,
      });

      const tl = gsap.timeline({
        defaults: {
          ease: "power2.out",
        },
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 82%",
          once: true,
        },
      });

      tl.to("[data-quote-title]", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.6,
      })
        .to(
          "[data-quote-body]",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
          },
          "-=1.0",
        )
        .to(
          "[data-quote-source]",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.3,
          },
          "-=1.0",
        )
        .to(
          "[data-quote-ornament]",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.14,
          },
          "-=0.9",
        );
    },
    { scope: rootRef, dependencies: [isOpen] },
  );

  return (
    <section
      ref={rootRef}
      className="container mt-10 mb-[60px] bg-transparent px-4 text-center text-secondary xl:mb-60 xl:p-20"
    >
      <div ref={contentRef}>
        <h2
          data-quote-anim
          data-quote-title
          className="will-change-transform font-alex-brush text-[clamp(2.5rem,7vw,5.5rem)] leading-none opacity-0"
        >
          Devi & Adi
        </h2>

        <p
          data-quote-anim
          data-quote-body
          className="will-change-transform mt-8 text-sm leading-relaxed opacity-0 sm:text-base lg:text-[1.375rem] xl:mt-12 xl:text-[32px] xl:leading-[1.5]"
        >
          “Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan
          pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa
          tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih
          sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat
          tanda-tanda (kebesaran Allah) bagi kaum yang berpikir”
        </p>

        <p
          data-quote-anim
          data-quote-source
          className="will-change-transform mt-8 text-base opacity-0 sm:text-lg lg:text-2xl xl:text-[32px]"
        >
          QS. Ar-Rum : 21
        </p>

        <div className="mt-[50px] flex flex-col items-center justify-center gap-2 xl:mt-20 xl:gap-4">
          <Image
            data-quote-anim
            data-quote-ornament
            src="/images/mini-frame.webp"
            alt="mini-frame"
            width={340}
            height={28}
            className="h-auto w-[135px] will-change-transform xl:w-[340px]"
          />

          <span
            data-quote-anim
            data-quote-ornament
            className="will-change-transform text-sm sm:text-base lg:text-2xl xl:text-[32px]"
          >
            Potret Kami
          </span>

          <Image
            data-quote-anim
            data-quote-ornament
            src="/images/mini-frame.webp"
            alt="mini-frame"
            width={340}
            height={28}
            className="h-auto w-[135px] rotate-180 will-change-transform xl:w-[340px]"
          />
        </div>
      </div>
    </section>
  );
}
