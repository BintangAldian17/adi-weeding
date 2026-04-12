"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useIsOpen } from "@/context/OpeningContext";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const isOpen = useIsOpen();

  useGSAP(
    () => {
      if (!isOpen) return;
      if (!textRef.current) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      if (reduceMotion.matches) {
        gsap.set("[data-hero-anim]", {
          opacity: 1,
          y: 0,
          clearProps: "transform",
        });
        return;
      }

      const items = gsap.utils.toArray<HTMLElement>("[data-hero-anim]");

      gsap.set(items, {
        y: 40,
        opacity: 0,
        force3D: true, // 🔥 penting untuk GPU
      });

      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: rootRef, dependencies: [isOpen] },
  );

  return (
    <section
      ref={rootRef}
      className="relative h-[50vh] w-full bg-primary xl:h-screen"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full overflow-x-clip">
        <div className="absolute top-0 left-0 flex h-full">
          <div className="relative h-full w-[161px] md:w-[334px]">
            <Image
              src="/images/side-frame.png"
              alt="side-frame"
              fill
              className="object-contain object-left-top"
            />
          </div>

          <div
            data-flower-cluster
            className="absolute bottom-0 left-0 z-30 will-change-transform"
          >
            <div data-flower-piece className="will-change-transform">
              <Image
                src="/images/accent-flower.png"
                alt="flower1"
                width={244}
                height={389}
                className="h-auto w-[71px] -translate-x-5.5 translate-y-22 md:w-[244px] md:translate-y-80"
              />
            </div>

            <div
              data-flower-piece
              className="relative -z-10 will-change-transform"
            >
              <Image
                src="/images/accent-flower2.png"
                alt="flower2"
                width={364}
                height={254}
                className="h-auto w-[107px] -translate-x-5 translate-y-11 md:w-[364px] md:translate-y-40"
              />
            </div>

            <div data-flower-piece className="will-change-transform">
              <Image
                src="/images/accent-flower3.png"
                alt="flower3"
                width={212}
                height={263}
                className="h-auto w-[62px] -translate-x-2 translate-y-4 rotate-y-180 md:w-[212px] md:translate-y-12"
              />
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 flex h-full rotate-y-180">
          <div className="relative h-full w-[161px] md:w-[334px]">
            <Image
              src="/images/side-frame.png"
              alt="side-frame"
              fill
              className="object-contain object-left-top"
            />
          </div>

          <div
            data-flower-cluster
            className="absolute bottom-0 left-0 z-30 will-change-transform"
          >
            <div data-flower-piece className="will-change-transform">
              <Image
                src="/images/accent-flower.png"
                alt="flower1"
                width={244}
                height={389}
                className="h-auto w-[71px] -translate-x-5.5 translate-y-22 md:w-[244px] md:translate-y-80"
              />
            </div>

            <div
              data-flower-piece
              className="relative -z-10 will-change-transform"
            >
              <Image
                src="/images/accent-flower2.png"
                alt="flower2"
                width={364}
                height={254}
                className="h-auto w-[107px] -translate-x-5 translate-y-11 md:w-[364px] md:translate-y-40"
              />
            </div>

            <div data-flower-piece className="will-change-transform">
              <Image
                src="/images/accent-flower3.png"
                alt="flower3"
                width={212}
                height={263}
                className="h-auto w-[62px] -translate-x-2 translate-y-4 rotate-y-180 md:w-[212px] md:translate-y-12"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 z-20 h-1/2 w-full bg-linear-to-t from-primary from-10% to-transparent" />

      <div className="relative z-0 h-full w-full overflow-hidden">
        <div className="absolute inset-0 md:scale-100 scale-125">
          <Image
            src="/images/hero2.png"
            alt="hero-bg"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      <Image
        src="/images/logo.png"
        alt="logo"
        width={43}
        height={41}
        className="absolute top-2 right-1/2 z-50 h-[19px] w-[19px] translate-x-1/2 xl:top-10 xl:h-[41px] xl:w-[43px]"
      />

      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center text-secondary">
        <div
          ref={textRef}
          className="flex translate-y-[60%] flex-col items-center gap-2 md:translate-y-[40%] md:gap-6"
        >
          <p
            data-hero-anim
            className="translate-y-6 opacity-0 font-eb-garamond text-xs leading-none tracking-widest uppercase md:text-xl"
          >
            the wedding of
          </p>

          <h1
            data-hero-anim
            className="flex translate-y-6 items-center gap-6 leading-none opacity-0 md:gap-[50px]"
          >
            <span className="font-alex-brush text-[40px] leading-none md:text-[120px]">
              Devi
            </span>
            <span className="font-alegreya font-thin md:text-[64px]">&</span>
            <span className="font-alex-brush text-[40px] leading-none md:text-[120px]">
              Adi
            </span>
          </h1>

          <div className="flex flex-col items-center justify-center gap-2 md:gap-4">
            <Image
              data-hero-anim
              src="/images/mini-frame.png"
              alt="mini-frame"
              width={195}
              height={16}
              className="h-auto w-[135px] translate-y-6 opacity-0 md:w-[195px]"
            />

            <time
              data-hero-anim
              dateTime="2026-05-31"
              className="translate-y-6 opacity-0 md:text-2xl"
            >
              31 Mei 2026
            </time>

            <Image
              data-hero-anim
              src="/images/mini-frame.png"
              alt="mini-frame"
              width={195}
              height={16}
              className="h-auto w-[135px] translate-y-6 rotate-180 opacity-0 md:w-[195px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
