"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { copyToClipboard } from "@/utils/copyToClipboard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ACCOUNT_NUMBER = "0113306464";

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
      className="w-full xl:min-h-screen min-h-[75vh] relative bg-secondary text-text-dark xl:rounded-t-[80px] rounded-t-[24px] xl:pb-[217px] pb-[172px] overflow-hidden"
    >
      <div className="absolute xl:bottom-1/2 xl:translate-y-1/2 bottom-10 left-0 z-30">
        <Image
          src="/images/accent-flower.png"
          alt="side-frame"
          width={268}
          height={425}
          className="xl:translate-y-60 translate-y-16  relative z-10 -translate-x-10.5 xl:w-[268px] w-[71px] h-auto"
        />
        <Image
          src="/images/accent-flower2.png"
          alt="side-frame"
          width={399}
          height={220}
          className="xl:translate-y-25 -translate-x-10 translate-y-7 xl:w-[399px] w-[107px] h-auto"
        />
        <Image
          src="/images/accent-flower3.png"
          alt="side-frame"
          width={232}
          height={288}
          className="relative z-10 -translate-x-10 xl:w-[232px] w-[77px] h-auto rotate-y-180"
        />
      </div>
      <div className="absolute xl:bottom-1/2 xl:translate-y-1/2 bottom-10 right-0 rotate-y-180">
        <Image
          src="/images/accent-flower.png"
          alt="side-frame"
          width={268}
          height={425}
          className="xl:translate-y-60 translate-y-16  relative z-10 -translate-x-10.5 xl:w-[268px] w-[71px] h-auto"
        />
        <Image
          src="/images/accent-flower2.png"
          alt="side-frame"
          width={399}
          height={220}
          className="xl:translate-y-25 -translate-x-10 translate-y-7 xl:w-[399px] w-[107px] h-auto"
        />
        <Image
          src="/images/accent-flower3.png"
          alt="side-frame"
          width={232}
          height={288}
          className="relative z-10 -translate-x-10 xl:w-[232px] w-[77px] h-auto rotate-y-180"
        />
      </div>
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
          Your blessing and coming to our wedding are enough for us. However, if
          you want to give a gift we provide a Digital Envelope to make it
          easier for you. thank you
        </p>

        {/* ENVELOPE */}
        <div data-gift-envelope className="relative will-change-transform">
          <Image
            src="/images/gift-frame-2.png"
            alt="gift-frame"
            width={683}
            height={491}
            className="xl:w-[684px] w-[301px] h-auto"
          />

          {/* INNER TEXT */}
          <div
            data-gift-inner
            className="text-center text-text-dark absolute top-[65%] left-1/2 -translate-x-1/2 will-change-transform"
          >
            <p className="xl:text-[40px] font-alex-brush leading-none">
              E-Angpao
            </p>

            <div className="text-center text-sm xl:text-[32px] mt-2">
              <div className="flex gap-3 items-center justify-center">
                <p className="font-bold leading-none">BCA - {ACCOUNT_NUMBER}</p>
                <button
                  type="button"
                  onClick={handleCopyAccount}
                  className="flex items-center justify-center size-4 xl:size-9 rounded-full bg-secondary transition-transform hover:scale-105"
                  aria-label="Copy nomor rekening"
                >
                  <Icon
                    icon={copied ? "mdi:check" : "mdi:content-copy"}
                    className="xl:size-5 size-2.5 text-text-dark"
                  />
                </button>
              </div>

              <p>Gema Adi Perwira</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
