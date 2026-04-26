"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function ClosingSideFlowers({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <div
      className={`absolute bottom-0 z-30 ${mirrored ? "right-0 rotate-y-180" : "left-0"}`}
    >
      <Image
        src="/images/accent-flower.webp"
        alt="side-frame"
        width={244}
        height={389}
        className="absolute bottom-[3.25rem] left-[-1.25rem] z-10 h-auto w-[71px] sm:bottom-[4.25rem] sm:w-[96px] md:bottom-[5rem] md:w-[120px] lg:bottom-[6rem] lg:left-[-2rem] lg:w-[160px] xl:bottom-[23rem] xl:left-[-7rem] xl:w-[244px]"
      />
      <Image
        src="/images/accent-flower2.webp"
        alt="side-frame"
        width={364}
        height={254}
        className="absolute bottom-[1.5rem] left-[-0.5rem] h-auto w-[85px] sm:bottom-[2rem] sm:w-[110px] md:bottom-[2.25rem] md:w-[145px] lg:bottom-[2.75rem] lg:left-[-1.5rem] lg:w-[210px] xl:bottom-[15rem] xl:left-[-7rem] xl:w-[364px]"
      />
      <Image
        src="/images/accent-flower3.webp"
        alt="side-frame"
        width={212}
        height={263}
        className="absolute bottom-[4.5rem] left-[-1rem] z-10 hidden h-auto w-[82px] rotate-y-180 sm:block md:bottom-[5.5rem] md:left-[-1.25rem] md:w-[110px] lg:bottom-[6.5rem] lg:left-[-2rem] lg:w-[150px] xl:bottom-[7rem] xl:left-[-5rem] xl:w-[212px]"
      />
      <Image
        src="/images/accent-flower2.webp"
        alt="side-frame"
        width={364}
        height={254}
        className="relative bottom-0 left-[-1.75rem] h-auto w-[110px] -rotate-95 sm:left-[-2rem] sm:w-[130px] md:w-[160px] lg:left-[-2.25rem] lg:w-[220px] xl:left-[-2.5rem] xl:w-[364px]"
      />
    </div>
  );
}

export default function Closing() {
  const rootRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!contentRef.current) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      const title = "[data-closing-title]";
      const desc = "[data-closing-desc]";
      const logo = "[data-closing-logo]";
      const namesWrap = "[data-closing-names-wrap]";
      const dateWrap = "[data-closing-date-wrap]";

      const allAnimated = [title, desc, logo, namesWrap, dateWrap];

      if (reduceMotion.matches) {
        gsap.set(allAnimated, {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: "all",
        });
        return;
      }

      // initial state
      gsap.set(title, {
        opacity: 0,
        y: -30,
        scale: 1.08,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(desc, {
        opacity: 0,
        y: 30,
        scale: 1.08,
        transformOrigin: "center center",
        force3D: true,
      });

      // logo: no translateY
      gsap.set(logo, {
        opacity: 0,
        scale: 1.1,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(namesWrap, {
        opacity: 0,
        y: 18,
        scale: 1.08,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(dateWrap, {
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
          start: "top 80%",
          once: true,
        },
      });

      tl.to(title, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
      })
        .to(
          desc,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.3,
          },
          "-=0.9",
        )
        .to(
          logo,
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.85",
        )
        .to(
          namesWrap,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.25,
            ease: "power3.out",
          },
          "-=0.75",
        )
        .to(
          dateWrap,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.15,
          },
          "-=0.85",
        );
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="relative h-[90vh] w-full overflow-hidden bg-primary text-secondary xl:h-[150vh]"
    >
      <Image
        src="/images/side-frame.webp"
        alt="Gallery"
        width={353}
        height={1096}
        className="absolute top-10 left-0 z-30 h-auto w-[161px] sm:w-[220px] md:top-0 md:w-[260px] lg:w-[300px] xl:w-[353px]"
      />
      <Image
        src="/images/side-frame.webp"
        alt="Gallery"
        width={353}
        height={1096}
        className="absolute top-10 right-0 z-30 h-auto w-[161px] rotate-y-180 sm:w-[220px] md:top-0 md:w-[260px] lg:w-[300px] xl:w-[353px]"
      />
      <Image
        src="/images/mini-frame.webp"
        alt="mini-frame"
        width={340}
        height={28}
        className="absolute top-10 left-1/2 z-30 h-auto w-[196px] -translate-x-1/2 sm:w-[240px] lg:w-[290px] xl:w-[340px]"
      />

      <ClosingSideFlowers />

      <div className="absolute bottom-0 left-0 z-40 flex w-full items-end justify-center">
        <Image
          src="/images/accent-flower3.webp"
          alt="side-frame"
          width={212}
          height={263}
          className="h-auto w-[59px] translate-x-2 translate-y-2 -rotate-90 rotate-y-180 sm:w-[76px] md:w-[92px] lg:w-[120px] lg:translate-x-5 lg:translate-y-4 xl:w-[212px] xl:translate-x-10 xl:translate-y-7"
        />
        <Image
          src="/images/flower-4.webp"
          alt="side-frame"
          width={678}
          height={335}
          className="h-auto w-[190px] sm:w-[280px] md:w-[340px] lg:w-[460px] xl:w-[678px]"
        />
        <Image
          src="/images/accent-flower3.webp"
          alt="side-frame"
          width={212}
          height={263}
          className="h-auto w-[59px] -translate-x-2 translate-y-2 rotate-90 sm:w-[76px] md:w-[92px] lg:w-[120px] lg:-translate-x-5 lg:translate-y-4 xl:w-[212px] xl:-translate-x-10 xl:translate-y-7"
        />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-1/2 z-35 hidden h-[12rem] w-full max-w-[120rem] -translate-x-1/2 sm:block md:h-[16rem] lg:h-[18rem] xl:h-[20rem] 2xl:h-[24rem]">
        <Image
          src="/images/flower-6.webp"
          alt="closing-flower-fill-left"
          width={420}
          height={260}
          className="absolute bottom-0 left-[6%] h-auto w-[96px] md:left-[10%] md:w-[140px] lg:left-[11%] lg:w-[180px] xl:left-[14%] xl:w-[210px] 2xl:left-[16%] 2xl:w-[280px]"
        />
        <Image
          src="/images/flower-5.webp"
          alt="closing-flower-fill-left-front"
          width={360}
          height={240}
          className="absolute bottom-0 left-[16%] h-auto w-[82px] md:left-[20%] md:w-[118px] lg:left-[21%] lg:w-[146px] xl:left-[24%] xl:w-[176px] 2xl:left-[25%] 2xl:w-[240px]"
        />
        <Image
          src="/images/flower-5.webp"
          alt="closing-flower-fill-right-front"
          width={360}
          height={240}
          className="absolute right-[16%] bottom-0 h-auto w-[82px] rotate-y-180 md:right-[20%] md:w-[118px] lg:right-[21%] lg:w-[146px] xl:right-[24%] xl:w-[176px] 2xl:right-[25%] 2xl:w-[240px]"
        />
        <Image
          src="/images/flower-6.webp"
          alt="closing-flower-fill-right"
          width={420}
          height={260}
          className="absolute right-[6%] bottom-0 h-auto w-[96px] rotate-y-180 md:right-[10%] md:w-[140px] lg:right-[11%] lg:w-[180px] xl:right-[14%] xl:w-[210px] 2xl:right-[16%] 2xl:w-[280px]"
        />
      </div>

      <ClosingSideFlowers mirrored />

      <div className="absolute top-0 z-10 h-full w-full bg-black/40" />

      <div className="absolute h-full w-full overflow-hidden">
        <Image
          src="/images/bg-closing.webp"
          alt="hero-bg"
          width={1440}
          height={1788}
          className="h-full w-full object-cover"
        />
      </div>

      <div
        ref={contentRef}
        className="container relative z-50 flex h-full flex-col items-center px-8 pt-20 sm:px-10 md:px-12 lg:px-0 lg:pt-24 xl:pt-28"
      >
        <h2
          data-closing-title
          className="text-center font-alex-brush text-[clamp(2.5rem,7vw,5.5rem)] leading-none will-change-transform"
        >
          Thank you
        </h2>

        <p
          data-closing-desc
          className="mt-8 max-w-[19rem] text-center text-sm leading-relaxed will-change-transform sm:max-w-[24rem] sm:text-base md:max-w-[32rem] lg:max-w-[36rem] lg:text-[1.125rem] xl:mt-10 xl:max-w-[52rem] xl:text-[32px] xl:leading-[1.35]"
        >
          We would like to express our gratitude for your presence and prayers
          in this special moment of ours. We hope that you will be willing to
          attend and enjoy the entire series of our events.
        </p>

        <Image
          data-closing-logo
          src="/images/big-logo.webp"
          alt="hero-bg"
          width={105}
          height={101}
          className="mt-8 h-auto w-[51px] will-change-transform sm:mt-10 sm:w-[64px] lg:mt-12 lg:w-[74px] xl:mt-20 xl:w-[105px]"
        />

        <div
          data-closing-names-wrap
          className="mt-8 flex flex-col items-center justify-center gap-2 will-change-transform sm:mt-10 sm:gap-3 lg:gap-3.5 xl:gap-6"
        >
          <p className="font-eb-garamond text-[10px] leading-none tracking-[0.3em] uppercase sm:text-xs md:text-sm lg:text-base xl:text-xl">
            the wedding of
          </p>

          <h1 className="flex items-center gap-4 leading-none sm:gap-6 md:gap-8 lg:gap-7 xl:gap-[50px]">
            <span className="font-alex-brush text-[clamp(2.5rem,8vw,7.5rem)] leading-none">
              Devi
            </span>

            <span className="font-alegreya text-[clamp(2rem,3.4vw,4rem)] leading-none font-thin">
              &
            </span>

            <span className="font-alex-brush text-[clamp(2.5rem,8vw,7.5rem)] leading-none">
              Adi
            </span>
          </h1>
        </div>

        <div
          data-closing-date-wrap
          className="mt-3 flex flex-col items-center justify-center gap-2 will-change-transform sm:mt-4 sm:gap-3 md:gap-4 xl:mt-10"
        >
          <Image
            src="/images/mini-frame.webp"
            alt="mini-frame"
            width={195}
            height={16}
            className="h-auto w-[135px] sm:w-[150px] md:w-[170px] xl:w-[195px]"
          />

          <time
            dateTime="2026-05-31"
            className="text-sm sm:text-base md:text-xl xl:text-2xl"
          >
            31 Mei 2026
          </time>

          <Image
            src="/images/mini-frame.webp"
            alt="mini-frame"
            width={195}
            height={16}
            className="h-auto w-[135px] rotate-180 sm:w-[150px] md:w-[170px] xl:w-[195px]"
          />
        </div>
      </div>
    </section>
  );
}
