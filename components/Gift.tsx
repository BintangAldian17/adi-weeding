"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { copyToClipboard } from "@/utils/copyToClipboard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ACCOUNT_NUMBER = "7140948378";

export default function Gift() {
  const rootRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyAccount = async () => {
    try {
      await copyToClipboard(ACCOUNT_NUMBER);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

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
      className="relative min-h-[75vh] w-full overflow-hidden rounded-t-[24px] bg-secondary pb-36 text-text-dark sm:pb-40 lg:min-h-screen lg:rounded-t-[48px] lg:pb-48 xl:rounded-t-[80px] xl:pb-[217px]"
    >
      <div className="absolute bottom-10 left-0 z-30 lg:bottom-1/2 lg:translate-y-1/2">
        <Image
          src="/images/accent-flower.webp"
          alt="side-frame"
          width={268}
          height={425}
          className="relative z-10 h-auto w-[71px] translate-y-16 -translate-x-10.5 sm:w-[92px] lg:w-[180px] lg:translate-y-40 xl:w-[268px] xl:translate-y-60"
        />
        <Image
          src="/images/accent-flower2.webp"
          alt="side-frame"
          width={399}
          height={220}
          className="h-auto w-[107px] translate-y-7 -translate-x-10 sm:w-[135px] lg:w-[260px] lg:translate-y-16 xl:w-[399px] xl:translate-y-25"
        />
        <Image
          src="/images/accent-flower3.webp"
          alt="side-frame"
          width={232}
          height={288}
          className="relative z-10 h-auto w-[77px] -translate-x-10 rotate-y-180 sm:w-[96px] lg:w-[160px] xl:w-[232px]"
        />
      </div>
      <div className="absolute bottom-10 right-0 rotate-y-180 lg:bottom-1/2 lg:translate-y-1/2">
        <Image
          src="/images/accent-flower.webp"
          alt="side-frame"
          width={268}
          height={425}
          className="relative z-10 h-auto w-[71px] translate-y-16 -translate-x-10.5 sm:w-[92px] lg:w-[180px] lg:translate-y-40 xl:w-[268px] xl:translate-y-60"
        />
        <Image
          src="/images/accent-flower2.webp"
          alt="side-frame"
          width={399}
          height={220}
          className="h-auto w-[107px] translate-y-7 -translate-x-10 sm:w-[135px] lg:w-[260px] lg:translate-y-16 xl:w-[399px] xl:translate-y-25"
        />
        <Image
          src="/images/accent-flower3.webp"
          alt="side-frame"
          width={232}
          height={288}
          className="relative z-10 h-auto w-[77px] -translate-x-10 rotate-y-180 sm:w-[96px] lg:w-[160px] xl:w-[232px]"
        />
      </div>
      <Image
        src="/images/bg-accent2.webp"
        alt="bg"
        width={1440}
        height={1918}
        className="object-cover absolute w-full h-full mix-blend-multiply"
      />

      <div
        ref={contentRef}
        className="container relative z-10 flex flex-col items-center justify-center gap-6 pt-10 sm:gap-8 sm:pt-12 lg:gap-12 lg:pt-16 xl:gap-[72px] xl:pt-[100px] xl:pb-[100px]"
      >
        {/* MINI FRAME */}
        <Image
          data-gift-frame
          src="/images/mini-frame-black.webp"
          alt="mini-frame"
          width={398}
          height={32}
          className="h-auto w-[196px] will-change-transform sm:w-[240px] lg:w-[320px] xl:w-[398px]"
        />

        {/* TITLE */}
        <h2
          data-gift-title
          className="font-alex-brush text-[clamp(2.5rem,7vw,5.5rem)] will-change-transform"
        >
          Wedding Gift
        </h2>

        {/* DESC */}
        <p
          data-gift-desc
          className="max-w-[19rem] text-center text-sm leading-relaxed will-change-transform sm:max-w-[28rem] sm:text-base lg:max-w-[44rem] lg:text-[1.375rem] xl:max-w-[58rem] xl:text-[32px] xl:leading-[1.35]"
        >
          Doa restu Anda merupakan karunia terindah bagi kami. Namun, bagi
          Bapak/Ibu/Saudara/i yang ingin memberikan tanda kasih, dapat melalui
          saluran berikut ini. Terima kasih atas segala kebaikan Anda.
        </p>

        {/* ENVELOPE */}
        <div data-gift-envelope className="relative will-change-transform">
          <Image
            src="/images/gift-frame-2.webp"
            alt="gift-frame"
            width={683}
            height={491}
            className="h-auto w-[301px] sm:w-[380px] lg:w-[540px] xl:w-[684px]"
          />

          {/* INNER TEXT */}
          <button
            type="button"
            onClick={handleCopyAccount}
            data-gift-inner
            className="absolute top-[65%] left-1/2 w-[68%] -translate-x-1/2 text-center text-text-dark will-change-transform sm:w-[70%] lg:w-[72%]"
            aria-label="Copy nomor rekening BCA"
          >
            <p className="font-alex-brush text-[22px] leading-none sm:text-[28px] lg:text-[34px] xl:text-[40px]">
              E-Angpao
            </p>

            <div className="mt-1.5 text-center text-[10px] sm:mt-2 sm:text-sm lg:text-[1.375rem] xl:text-[32px]">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 lg:gap-3">
                <p className="font-bold leading-none">BSI - {ACCOUNT_NUMBER}</p>
                <span className="flex size-4 items-center justify-center rounded-full bg-secondary transition-transform sm:size-5 lg:size-7 xl:size-9">
                  <Icon
                    icon={copied ? "mdi:check" : "mdi:content-copy"}
                    className="size-2.5 text-text-dark sm:size-3 lg:size-4 xl:size-5"
                  />
                </span>
              </div>

              <p className="mt-1 sm:mt-1.5">Gema Adi Perwira</p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
