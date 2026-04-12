"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
        src="/images/side-frame.png"
        alt="Gallery"
        width={353}
        height={1096}
        className="absolute top-10 left-0 z-30 h-auto w-[161px] md:top-0 md:w-[353px]"
      />
      <Image
        src="/images/side-frame.png"
        alt="Gallery"
        width={353}
        height={1096}
        className="absolute top-10 right-0 z-30 h-auto w-[161px] rotate-y-180 md:top-0 md:w-[353px]"
      />
      <Image
        src="/images/mini-frame.png"
        alt="mini-frame"
        width={340}
        height={28}
        className="absolute top-10 left-1/2 z-30 h-auto w-[196px] -translate-x-1/2 xl:w-[340px]"
      />

      <div className="absolute bottom-0 left-0 z-30">
        <Image
          src="/images/accent-flower.png"
          alt="side-frame"
          width={244}
          height={389}
          className="relative z-10 h-auto w-[71px] -translate-x-5 translate-y-10 xl:w-[244px] xl:-translate-x-28 xl:translate-y-92"
        />
        <Image
          src="/images/accent-flower2.png"
          alt="side-frame"
          width={364}
          height={254}
          className="h-auto w-[85px] -translate-x-2 translate-y-2 xl:w-[364px] xl:-translate-x-28 xl:translate-y-60"
        />
        <Image
          src="/images/accent-flower3.png"
          alt="side-frame"
          width={212}
          height={263}
          className="relative z-10 hidden h-auto translate-y-28 -translate-x-20 rotate-y-180 md:block xl:w-[212px]"
        />
        <Image
          src="/images/accent-flower2.png"
          alt="side-frame"
          width={364}
          height={254}
          className="left-0 h-auto w-[110px] -translate-x-7 -translate-y-2 -rotate-95 xl:w-[364px] xl:-translate-x-10"
        />
      </div>

      <div className="absolute bottom-0 left-0 z-40 flex w-full items-end justify-center">
        <Image
          src="/images/accent-flower3.png"
          alt="side-frame"
          width={212}
          height={263}
          className="h-auto w-[59px] translate-x-2 translate-y-2 -rotate-90 rotate-y-180 xl:w-[212px] xl:translate-x-10 xl:translate-y-7"
        />
        <Image
          src="/images/flower-4.png"
          alt="side-frame"
          width={678}
          height={335}
          className="h-auto w-[190px] xl:w-[678px]"
        />
        <Image
          src="/images/accent-flower3.png"
          alt="side-frame"
          width={212}
          height={263}
          className="h-auto w-[59px] -translate-x-2 translate-y-2 rotate-90 xl:w-[212px] xl:-translate-x-10 xl:translate-y-7"
        />
      </div>

      <div className="absolute right-0 bottom-0 z-30 rotate-y-180">
        <Image
          src="/images/accent-flower.png"
          alt="side-frame"
          width={244}
          height={389}
          className="relative z-10 h-auto w-[71px] -translate-x-5 translate-y-10 xl:w-[244px] xl:-translate-x-28 xl:translate-y-92"
        />
        <Image
          src="/images/accent-flower2.png"
          alt="side-frame"
          width={364}
          height={254}
          className="h-auto w-[85px] -translate-x-2 translate-y-2 xl:w-[364px] xl:-translate-x-28 xl:translate-y-60"
        />
        <Image
          src="/images/accent-flower3.png"
          alt="side-frame"
          width={212}
          height={263}
          className="relative z-10 hidden h-auto translate-y-28 -translate-x-20 rotate-y-180 md:block xl:w-[212px]"
        />
        <Image
          src="/images/accent-flower2.png"
          alt="side-frame"
          width={364}
          height={254}
          className="left-0 h-auto w-[110px] -translate-x-7 -translate-y-2 -rotate-95 xl:w-[364px] xl:-translate-x-10"
        />
      </div>

      <div className="absolute top-0 z-10 h-full w-full bg-black/40" />

      <div className="absolute h-full w-full overflow-hidden">
        <Image
          src="/images/bg-closing.png"
          alt="hero-bg"
          width={1440}
          height={1788}
          className="h-full w-full object-cover"
        />
      </div>

      <div
        ref={contentRef}
        className="container relative z-50 flex h-full flex-col items-center pt-20 px-12 md:px-0"
      >
        <h2
          data-closing-title
          className="text-center font-alex-brush text-[40px] leading-none will-change-transform xl:text-[88px]"
        >
          Thank you
        </h2>

        <p
          data-closing-desc
          className="mt-10 text-center leading-none will-change-transform xl:text-[32px]"
        >
          We would like to express our gratitude for your presence and prayers
          in this special moment of ours. We hope that you will be willing to
          attend and enjoy the entire series of our events.
        </p>

        <Image
          data-closing-logo
          src="/images/big-logo.png"
          alt="hero-bg"
          width={105}
          height={101}
          className="xl:mt-20 mt-10 h-auto w-[51px] will-change-transform xl:w-[105px]"
        />

        <div
          data-closing-names-wrap
          className="mt-10 flex flex-col items-center justify-center gap-2 will-change-transform xl:gap-6"
        >
          <p className="font-eb-garamond text-xs leading-none tracking-widest uppercase md:text-xl">
            the wedding of
          </p>

          <h1 className="flex items-center gap-6 leading-none md:gap-[50px]">
            <span className="font-alex-brush text-[40px] leading-none xl:text-[60px] md:text-[120px]">
              Devi
            </span>

            <span className="font-alegreya text-[32px] font-thin md:text-[64px] leading-none">
              &
            </span>

            <span className="font-alex-brush text-[40px] leading-none xl:text-[60px] md:text-[120px]">
              Adi
            </span>
          </h1>
        </div>

        <div
          data-closing-date-wrap
          className="xl:mt-10 mt-2 flex flex-col items-center justify-center gap-2 will-change-transform md:gap-4"
        >
          <Image
            src="/images/mini-frame.png"
            alt="mini-frame"
            width={195}
            height={16}
            className="h-auto w-[135px] md:w-[195px]"
          />

          <time dateTime="2026-05-31" className="md:text-2xl">
            31 Mei 2026
          </time>

          <Image
            src="/images/mini-frame.png"
            alt="mini-frame"
            width={195}
            height={16}
            className="h-auto w-[135px] rotate-180 md:w-[195px]"
          />
        </div>
      </div>
    </section>
  );
}
