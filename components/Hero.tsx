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
        "relative h-[50vh] w-full bg-primary xl:h-screen",
        isDefault ? "h-[70vh]" : " h-[50vh]",
      )}
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
        <div
          className={cn(
            "absolute inset-0 md:scale-100 ",
            !isDefault && "scale-125",
          )}
        >
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
          className="flex translate-y-[50%] flex-col items-center gap-2 md:translate-y-[30%] md:gap-6"
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
          {isDefault ? (
            <div className=" flex items-center justify-between gap-9 px-2.5 xl:justify-center xl:gap-[72px] xl:px-0">
              <div className="flex flex-col items-center justify-center gap-2 xl:gap-4">
                <Image
                  data-hero-frame-top
                  src="/images/mini-frame.png"
                  alt="mini-frame"
                  width={340}
                  height={28}
                  className="w-[102px] will-change-transform xl:w-[305px]"
                />
                <span
                  data-hero-static-num
                  className="text-sm will-change-transform xl:text-[32px]"
                >
                  Minggu
                </span>
                <Image
                  data-hero-frame-bottom
                  src="/images/mini-frame.png"
                  alt="mini-frame"
                  width={340}
                  height={28}
                  className="w-[102px] rotate-180 will-change-transform xl:w-[305px]"
                />
              </div>

              <div className="flex flex-col items-center justify-center gap-2 xl:gap-4">
                <span
                  data-hero-static-num
                  className="text-[18px] will-change-transform xl:text-[32px] leading-none"
                >
                  Mei
                </span>
                <span
                  ref={dayCounterRef}
                  className="text-[28px] leading-none font-bold will-change-transform xl:text-[80px]"
                >
                  0
                </span>
                <span
                  data-hero-static-num
                  className="text-[18px] will-change-transform xl:text-[32px] leading-none"
                >
                  2026
                </span>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 xl:gap-4">
                <Image
                  data-hero-frame-top
                  src="/images/mini-frame.png"
                  alt="mini-frame"
                  width={340}
                  height={28}
                  className="w-[102px] will-change-transform xl:w-[305px]"
                />
                <span
                  data-hero-static-num
                  className="text-sm will-change-transform xl:text-[32px]"
                >
                  12:00 - 15:00 WIB
                </span>
                <Image
                  data-hero-frame-bottom
                  src="/images/mini-frame.png"
                  alt="mini-frame"
                  width={340}
                  height={28}
                  className="w-[102px] rotate-180 will-change-transform xl:w-[305px]"
                />
              </div>
            </div>
          ) : (
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
          )}
          {isDefault && (
            <div className="flex flex-col md:gap-8 gap-4 items-center justify-center xl:mt-4 mt-10">
              <h3
                data-hero-default-text
                className="uppercase md:font-bold md:text-2xl text-center leading-none will-change-transform"
              >
                GEDUNG CAKRAWALA LANUD <br className="md:hidden block" />{" "}
                ABDULRACHMAN SALEH
              </h3>
              <p
                data-hero-default-text
                className="font-normal text-center leading-none md:text-base text-sm will-change-transform"
              >
                Jl. Krajan Saptorenggo, Kecamatan Pakis,{" "}
                <br className="md:hidden md:block" /> Kabupaten Malang
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
