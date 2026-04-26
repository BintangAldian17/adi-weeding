"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useIsOpen } from "@/context/OpeningContext";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero({ isDefault = false }: { isDefault?: boolean }) {
  const rootRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const dayCounterRef = useRef<HTMLSpanElement | null>(null);
  const isOpen = useIsOpen();

  const dependencies = isDefault ? [] : [isOpen];

  useGSAP(
    () => {
      if (!isOpen && !isDefault) return;
      if (!textRef.current) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );
      const heroItems = gsap.utils.toArray<HTMLElement>("[data-hero-anim]");
      const topFrames = gsap.utils.toArray<HTMLElement>(
        "[data-hero-frame-top]",
      );
      const bottomFrames = gsap.utils.toArray<HTMLElement>(
        "[data-hero-frame-bottom]",
      );
      const staticNumbers = gsap.utils.toArray<HTMLElement>(
        "[data-hero-static-num]",
      );
      const defaultTexts = gsap.utils.toArray<HTMLElement>(
        "[data-hero-default-text]",
      );
      const dateNumber = dayCounterRef.current ? [dayCounterRef.current] : [];
      const defaultAnimated = [
        ...topFrames,
        ...bottomFrames,
        ...staticNumbers,
        ...defaultTexts,
        ...dateNumber,
      ];

      if (reduceMotion.matches) {
        gsap.set(heroItems, {
          opacity: 1,
          y: 0,
          clearProps: "transform",
        });

        if (defaultAnimated.length > 0) {
          gsap.set(defaultAnimated, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            clearProps: "all",
          });
        }

        if (dayCounterRef.current) {
          dayCounterRef.current.textContent = "31";
        }
        return;
      }

      gsap.set(heroItems, {
        y: 40,
        opacity: 0,
        force3D: true,
      });

      gsap.set(topFrames, {
        opacity: 0,
        y: -22,
        scale: 1.08,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(bottomFrames, {
        opacity: 0,
        y: 22,
        scale: 1.08,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(staticNumbers, {
        opacity: 0,
        y: 0,
        scale: 1.08,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(defaultTexts, {
        opacity: 0,
        y: 24,
        scale: 1.06,
        transformOrigin: "center center",
        force3D: true,
      });

      if (dayCounterRef.current) {
        gsap.set(dayCounterRef.current, {
          opacity: 0,
          y: 0,
          scale: 1.08,
          transformOrigin: "center center",
          force3D: true,
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      tl.to(heroItems, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        force3D: true,
      });

      if (!isDefault) return;

      tl.to(
        topFrames,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.05,
          stagger: 0.08,
        },
        "-=0.35",
      )
        .to(
          staticNumbers,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            stagger: 0.08,
          },
          "-=0.85",
        )
        .to(
          dayCounterRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
          },
          "<",
        )
        .to(
          bottomFrames,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.05,
            stagger: 0.08,
          },
          "-=0.95",
        );

      if (dayCounterRef.current) {
        const counterObj = { value: 0 };

        tl.to(
          counterObj,
          {
            value: 31,
            duration: 1.1,
            ease: "power3.out",
            onUpdate: () => {
              if (dayCounterRef.current) {
                dayCounterRef.current.textContent = String(
                  Math.round(counterObj.value),
                );
              }
            },
          },
          "<",
        );
      }

      tl.to(
        defaultTexts,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.15,
          stagger: 0.12,
        },
        "-=0.5",
      );
    },
    { scope: rootRef, dependencies },
  );

  return (
    <section
      ref={rootRef}
      className={cn(
        "relative w-full  bg-primary",
        isDefault
          ? "min-h-[38rem] h-[72svh] sm:min-h-[42rem] lg:min-h-[48rem] xl:h-screen"
          : "min-h-[24rem] h-[50svh] sm:min-h-[28rem] lg:min-h-[34rem] xl:h-screen",
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full overflow-x-clip">
        <div className="absolute top-0 left-0 flex h-full">
          <div className="relative h-full w-[120px] sm:w-[161px] lg:w-[250px] xl:w-[334px]">
            <Image
              src="/images/side-frame.webp"
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
                src="/images/accent-flower.webp"
                alt="flower1"
                width={244}
                height={389}
                className="h-auto w-[54px] -translate-x-4 translate-y-14 sm:w-[71px] sm:-translate-x-5.5 sm:translate-y-22 lg:w-[160px] lg:translate-y-52 xl:w-[244px] xl:translate-y-80"
              />
            </div>

            <div
              data-flower-piece
              className="relative -z-10 will-change-transform"
            >
              <Image
                src="/images/accent-flower2.webp"
                alt="flower2"
                width={364}
                height={254}
                className="h-auto w-[82px] -translate-x-4 translate-y-8 sm:w-[107px] sm:-translate-x-5 sm:translate-y-11 lg:w-[240px] lg:translate-y-28 xl:w-[364px] xl:translate-y-40"
              />
            </div>

            <div data-flower-piece className="will-change-transform">
              <Image
                src="/images/accent-flower3.webp"
                alt="flower3"
                width={212}
                height={263}
                className="h-auto w-[48px] -translate-x-1 translate-y-3 rotate-y-180 sm:w-[62px] sm:-translate-x-2 sm:translate-y-4 lg:w-[140px] lg:translate-y-8 xl:w-[212px] xl:translate-y-12"
              />
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 flex h-full rotate-y-180">
          <div className="relative h-full w-[120px] sm:w-[161px] lg:w-[250px] xl:w-[334px]">
            <Image
              src="/images/side-frame.webp"
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
                src="/images/accent-flower.webp"
                alt="flower1"
                width={244}
                height={389}
                className="h-auto w-[54px] -translate-x-4 translate-y-14 sm:w-[71px] sm:-translate-x-5.5 sm:translate-y-22 lg:w-[160px] lg:translate-y-52 xl:w-[244px] xl:translate-y-80"
              />
            </div>

            <div
              data-flower-piece
              className="relative -z-10 will-change-transform"
            >
              <Image
                src="/images/accent-flower2.webp"
                alt="flower2"
                width={364}
                height={254}
                className="h-auto w-[82px] -translate-x-4 translate-y-8 sm:w-[107px] sm:-translate-x-5 sm:translate-y-11 lg:w-[240px] lg:translate-y-28 xl:w-[364px] xl:translate-y-40"
              />
            </div>

            <div data-flower-piece className="will-change-transform">
              <Image
                src="/images/accent-flower3.webp"
                alt="flower3"
                width={212}
                height={263}
                className="h-auto w-[48px] -translate-x-1 translate-y-3 rotate-y-180 sm:w-[62px] sm:-translate-x-2 sm:translate-y-4 lg:w-[140px] lg:translate-y-8 xl:w-[212px] xl:translate-y-12"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 z-20 h-1/2 w-full bg-linear-to-t from-primary from-10% to-transparent" />

      <div className="relative z-0 h-full w-full overflow-hidden">
        <div className={cn("absolute inset-0 ")}>
          <Image
            src="/images/hero2.webp"
            alt="hero-bg"
            fill
            priority
            quality={95}
            sizes="(max-width: 640px) 200vw, (max-width: 1024px) 150vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      <Image
        src="/images/logo.webp"
        alt="logo"
        width={43}
        height={41}
        className="absolute top-2 right-1/2 z-50 h-[19px] w-[19px] translate-x-1/2 sm:top-4 sm:h-[24px] sm:w-[24px] lg:top-6 lg:h-[32px] lg:w-[32px] xl:top-10 xl:h-[41px] xl:w-[43px]"
      />

      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center text-secondary">
        <div
          ref={textRef}
          className="flex translate-y-[42%] flex-col items-center gap-3 px-4 sm:translate-y-[38%] sm:gap-4 lg:translate-y-[32%] lg:gap-5 xl:translate-y-[40%] xl:gap-0"
        >
          <p
            data-hero-anim
            className="translate-y-6 opacity-0 font-eb-garamond text-[10px] leading-none tracking-[0.3em] uppercase sm:text-xs lg:text-base xl:text-xl"
          >
            the wedding of
          </p>

          <h1
            data-hero-anim
            className="flex translate-y-6 items-center gap-4 leading-none opacity-0 sm:gap-6 lg:gap-10 xl:gap-[50px]"
          >
            <span className="font-alex-brush text-[clamp(2.5rem,8vw,7.5rem)] leading-none">
              Devi
            </span>
            <span className="font-alegreya text-[clamp(1.5rem,4vw,4rem)] font-thin">
              &
            </span>
            <span className="font-alex-brush text-[clamp(2.5rem,8vw,7.5rem)] leading-none">
              Adi
            </span>
          </h1>
          {isDefault ? (
            <div className="grid w-full max-w-[min(92vw,72rem)] grid-cols-3 items-start gap-4 px-1 sm:gap-6 sm:px-3 lg:gap-10 xl:gap-[72px] xl:px-0">
              <div className="flex flex-col items-center justify-center gap-2 lg:gap-3 xl:gap-4">
                <Image
                  data-hero-frame-top
                  src="/images/mini-frame.webp"
                  alt="mini-frame"
                  width={340}
                  height={28}
                  className="w-[92px] will-change-transform sm:w-[120px] lg:w-[220px] xl:w-[305px]"
                />
                <span
                  data-hero-static-num
                  className="text-center text-[11px] leading-tight will-change-transform sm:text-sm lg:text-xl xl:text-[32px]"
                >
                  Minggu
                </span>
                <Image
                  data-hero-frame-bottom
                  src="/images/mini-frame.webp"
                  alt="mini-frame"
                  width={340}
                  height={28}
                  className="w-[92px] rotate-180 will-change-transform sm:w-[120px] lg:w-[220px] xl:w-[305px]"
                />
              </div>

              <div className="flex flex-col items-center justify-center gap-2 lg:gap-3 xl:gap-4">
                <span
                  data-hero-static-num
                  className="text-[16px] leading-none will-change-transform sm:text-[18px] lg:text-[26px] xl:text-[32px]"
                >
                  Mei
                </span>
                <span
                  ref={dayCounterRef}
                  className="text-[32px] leading-none font-bold will-change-transform sm:text-[40px] lg:text-[60px] xl:text-[80px]"
                >
                  0
                </span>
                <span
                  data-hero-static-num
                  className="text-[16px] leading-none will-change-transform sm:text-[18px] lg:text-[26px] xl:text-[32px]"
                >
                  2026
                </span>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 lg:gap-3 xl:gap-4">
                <Image
                  data-hero-frame-top
                  src="/images/mini-frame.webp"
                  alt="mini-frame"
                  width={340}
                  height={28}
                  className="w-[92px] will-change-transform sm:w-[120px] lg:w-[220px] xl:w-[305px]"
                />
                <span
                  data-hero-static-num
                  className="text-center text-[11px] leading-tight will-change-transform sm:text-sm lg:text-xl xl:text-[32px]"
                >
                  12:00 - 15:00 WIB
                </span>
                <Image
                  data-hero-frame-bottom
                  src="/images/mini-frame.webp"
                  alt="mini-frame"
                  width={340}
                  height={28}
                  className="w-[92px] rotate-180 will-change-transform sm:w-[120px] lg:w-[220px] xl:w-[305px]"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 lg:gap-4">
              <Image
                data-hero-anim
                src="/images/mini-frame.webp"
                alt="mini-frame"
                width={195}
                height={16}
                className="h-auto w-[135px] translate-y-6 opacity-0 sm:w-[160px] lg:w-[180px] xl:w-[195px]"
              />

              <time
                data-hero-anim
                dateTime="2026-05-31"
                className="translate-y-6 text-sm opacity-0 sm:text-base lg:text-xl xl:text-2xl"
              >
                31 Mei 2026
              </time>

              <Image
                data-hero-anim
                src="/images/mini-frame.webp"
                alt="mini-frame"
                width={195}
                height={16}
                className="h-auto w-[135px] translate-y-6 rotate-180 opacity-0 sm:w-[160px] lg:w-[180px] xl:w-[195px]"
              />
            </div>
          )}
          {isDefault && (
            <div className="mt-6 flex max-w-[min(92vw,48rem)] flex-col items-center justify-center gap-4 sm:mt-8 lg:mt-10 lg:gap-6 xl:mt-4 xl:gap-8">
              <h3
                data-hero-default-text
                className="text-center text-sm leading-tight font-semibold uppercase will-change-transform sm:text-base lg:text-xl xl:text-2xl"
              >
                GEDUNG CAKRAWALA LANUD <br className="sm:hidden block" />{" "}
                ABDULRACHMAN SALEH
              </h3>
              <p
                data-hero-default-text
                className="text-center text-xs leading-relaxed font-normal will-change-transform sm:text-sm lg:text-base"
              >
                Jl. Krajan Saptorenggo, Kecamatan Pakis,{" "}
                <br className="sm:hidden block" /> Kabupaten Malang
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
