"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EVENT_DATE = new Date("2026-05-31T18:00:00+07:00");

type CountdownUnit = {
  label: string;
  value: string;
};

function getTimeLeft(targetDate: Date) {
  const diff = targetDate.getTime() - Date.now();

  if (diff <= 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

export default function Event() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(EVENT_DATE));

  const rootRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const dateSectionRef = useRef<HTMLDivElement | null>(null);
  const locationSectionRef = useRef<HTMLDivElement | null>(null);
  const countdownSectionRef = useRef<HTMLDivElement | null>(null);
  const dayCounterRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      setTimeLeft(getTimeLeft(EVENT_DATE));
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const countdownItems: CountdownUnit[] = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  useGSAP(
    () => {
      if (
        !introRef.current ||
        !dateSectionRef.current ||
        !locationSectionRef.current ||
        !countdownSectionRef.current
      ) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      const introHeader = gsap.utils.toArray<HTMLElement>(
        "[data-event-header='main']",
      );
      const introParagraph = gsap.utils.toArray<HTMLElement>(
        "[data-event-desc='main']",
      );
      const topFrames = gsap.utils.toArray<HTMLElement>(
        "[data-event-frame-top]",
      );
      const bottomFrames = gsap.utils.toArray<HTMLElement>(
        "[data-event-frame-bottom]",
      );
      const staticNumbers = gsap.utils.toArray<HTMLElement>(
        "[data-event-static-num]",
      );
      const locationHeader = gsap.utils.toArray<HTMLElement>(
        "[data-event-header='location']",
      );
      const locationParagraphs = gsap.utils.toArray<HTMLElement>(
        "[data-event-desc='location']",
      );
      const mapButton = gsap.utils.toArray<HTMLElement>("[data-event-map]");
      const countdownHeader = gsap.utils.toArray<HTMLElement>(
        "[data-event-header='countdown']",
      );
      const timeCards = gsap.utils.toArray<HTMLElement>(
        "[data-event-count-card]",
      );
      const dateNumber = dayCounterRef.current ? [dayCounterRef.current] : [];

      const allAnimated = [
        ...introHeader,
        ...introParagraph,
        ...topFrames,
        ...bottomFrames,
        ...staticNumbers,
        ...dateNumber,
        ...locationHeader,
        ...locationParagraphs,
        ...mapButton,
        ...countdownHeader,
        ...timeCards,
      ];

      if (reduceMotion.matches) {
        gsap.set(allAnimated, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          clearProps: "all",
        });

        if (dayCounterRef.current) {
          dayCounterRef.current.textContent = "31";
        }
        return;
      }

      gsap.set(introHeader, {
        opacity: 0,
        y: -28,
        scale: 1.08,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(introParagraph, {
        opacity: 0,
        y: 28,
        scale: 1.08,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(locationHeader, {
        opacity: 0,
        y: -28,
        scale: 1.08,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(locationParagraphs, {
        opacity: 0,
        y: 28,
        scale: 1.08,
        transformOrigin: "center center",
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

      gsap.set(countdownHeader, {
        opacity: 0,
        y: -28,
        scale: 1.08,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(timeCards, {
        opacity: 0,
        y: 20,
        scale: 1.08,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(mapButton, {
        opacity: 0,
        y: 18,
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

      if (dayCounterRef.current) {
        gsap.set(dayCounterRef.current, {
          opacity: 0,
          y: 0,
          scale: 1.08,
          transformOrigin: "center center",
          force3D: true,
        });
      }

      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: {
          ease: "power2.out",
        },
      });

      introTl
        .to(introHeader, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
        })
        .to(
          introParagraph,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.35,
          },
          "-=0.95",
        );

      const dateTl = gsap.timeline({
        scrollTrigger: {
          trigger: dateSectionRef.current,
          start: "top 82%",
          once: true,
        },
        defaults: {
          ease: "power2.out",
        },
      });

      dateTl.to(topFrames, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.1,
        stagger: 0.1,
      })
        .to(
          staticNumbers,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.15,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.8",
        )
        .to(
          dayCounterRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.15,
            ease: "power3.out",
          },
          "<",
        )
        .to(
          bottomFrames,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            stagger: 0.1,
          },
          "-=1.0",
        );

      if (dayCounterRef.current) {
        const counterObj = { value: 0 };

        dateTl.to(
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

      const locationTl = gsap.timeline({
        scrollTrigger: {
          trigger: locationSectionRef.current,
          start: "top 82%",
          once: true,
        },
        defaults: {
          ease: "power2.out",
        },
      });

      locationTl
        .to(locationHeader, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.35,
          ease: "power3.out",
        })
        .to(
          locationParagraphs,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.25,
            stagger: 0.12,
          },
          "-=0.85",
        )
        .to(
          mapButton,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.15,
            ease: "back.out(1.15)",
          },
          "-=0.7",
        );

      const countdownTl = gsap.timeline({
        scrollTrigger: {
          trigger: countdownSectionRef.current,
          start: "top 82%",
          once: true,
        },
        defaults: {
          ease: "power2.out",
        },
      });

      countdownTl
        .to(countdownHeader, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.45,
          ease: "power3.out",
        })
        .to(
          timeCards,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            stagger: 0.08,
          },
          "-=0.9",
        )
        ;
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="relative h-full w-full bg-primary">
      <Image
        src="/images/bg-event-2.webp"
        alt="Gallery"
        width={1104}
        height={928}
        className="absolute top-0 left-1/2 -translate-x-1/2"
      />
      <Image
        src="/images/bg-event-2.webp"
        alt="Gallery"
        width={1104}
        height={928}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <Image
        src="/images/bg-event-2.webp"
        alt="Gallery"
        width={1104}
        height={928}
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
      />
      <Image
        src="/images/side-frame.webp"
        alt="Gallery"
        width={353}
        height={1096}
        className="absolute top-10 left-0 h-[360px] w-[116px] sm:h-[498px] sm:w-[161px] lg:top-14 lg:h-[760px] lg:w-[245px] xl:top-[100px] xl:h-[1096px] xl:w-[353px]"
      />

      <Image
        src="/images/side-frame.webp"
        alt="Gallery"
        width={353}
        height={1096}
        className="absolute top-10 right-0 h-[360px] w-[116px] rotate-y-180 sm:h-[498px] sm:w-[161px] lg:top-14 lg:h-[760px] lg:w-[245px] xl:top-[100px] xl:h-[1096px] xl:w-[353px]"
      />
      <Image
        src="/images/mini-frame.webp"
        alt="Gallery"
        width={353}
        height={1096}
        className="absolute top-10 left-1/2 h-auto w-[160px] -translate-x-1/2 sm:w-[196px] lg:top-14 lg:w-[280px] xl:top-[110px] xl:w-[353px]"
      />
      <Image
        src="/images/side-frame.webp"
        alt="Gallery"
        width={353}
        height={1096}
        className="absolute bottom-10 left-0 h-[360px] w-[116px] rotate-x-180 sm:h-[498px] sm:w-[161px] lg:bottom-14 lg:h-[760px] lg:w-[245px] xl:bottom-[100px] xl:h-[1096px] xl:w-[353px]"
      />
      <Image
        src="/images/side-frame.webp"
        alt="Gallery"
        width={353}
        height={1096}
        className="absolute right-0 bottom-10 h-[360px] w-[116px] rotate-y-180 rotate-x-180 sm:h-[498px] sm:w-[161px] lg:bottom-14 lg:h-[760px] lg:w-[245px] xl:bottom-[100px] xl:h-[1096px] xl:w-[353px]"
      />
      <Image
        src="/images/mini-frame.webp"
        alt="Gallery"
        width={353}
        height={1096}
        className="absolute bottom-10 left-1/2 h-auto w-[160px] -translate-x-1/2 rotate-180 sm:w-[196px] lg:bottom-14 lg:w-[280px] xl:bottom-[110px] xl:w-[353px]"
      />

      <div className="container px-[15px] pt-28 pb-24 text-secondary sm:pt-32 sm:pb-[112px] lg:pt-36 lg:pb-40 xl:pt-44 xl:pb-[273px]">
        <div ref={introRef}>
          <h2
            data-event-header="main"
            className="text-center font-alex-brush text-[clamp(2.5rem,7vw,5.5rem)] will-change-transform"
          >
            Save The Date
          </h2>

          <p
            data-event-desc="main"
            className="px-6 pt-5 text-center text-sm leading-relaxed will-change-transform sm:px-12 sm:text-base lg:px-0 lg:pt-10 lg:text-[1.375rem] xl:pt-[72px] xl:text-[32px] xl:leading-[1.35]"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy text
            ever since the
          </p>
        </div>

        <div
          ref={dateSectionRef}
          className="mt-10 grid grid-cols-3 items-start gap-3 px-1 sm:mt-12 sm:gap-5 sm:px-3 lg:mt-16 lg:gap-10 xl:mt-[72px] xl:justify-center xl:gap-[72px] xl:px-0"
        >
          <div className="flex flex-col items-center justify-center gap-2 lg:gap-3 xl:gap-4">
            <Image
              data-event-frame-top
              src="/images/mini-frame.webp"
              alt="mini-frame"
              width={340}
              height={28}
              className="w-[92px] will-change-transform sm:w-[120px] lg:w-[220px] xl:w-[340px]"
            />
            <span
              data-event-static-num
              className="text-center text-[11px] leading-tight will-change-transform sm:text-sm lg:text-xl xl:text-[40px]"
            >
              Minggu
            </span>
            <Image
              data-event-frame-bottom
              src="/images/mini-frame.webp"
              alt="mini-frame"
              width={340}
              height={28}
              className="w-[92px] rotate-180 will-change-transform sm:w-[120px] lg:w-[220px] xl:w-[340px]"
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-2 lg:gap-3 xl:gap-4">
            <span
              data-event-static-num
              className="text-[16px] leading-none will-change-transform sm:text-[18px] lg:text-[30px] xl:text-[48px]"
            >
              Mei
            </span>
            <span
              ref={dayCounterRef}
              className="text-[32px] leading-none font-bold will-change-transform sm:text-[40px] lg:text-[80px] xl:text-[132px]"
            >
              0
            </span>
            <span
              data-event-static-num
              className="text-[16px] leading-none will-change-transform sm:text-[18px] lg:text-[30px] xl:text-[48px]"
            >
              2026
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 lg:gap-3 xl:gap-4">
            <Image
              data-event-frame-top
              src="/images/mini-frame.webp"
              alt="mini-frame"
              width={340}
              height={28}
              className="w-[92px] will-change-transform sm:w-[120px] lg:w-[220px] xl:w-[340px]"
            />
            <span
              data-event-static-num
              className="text-center text-[11px] leading-tight will-change-transform sm:text-sm lg:text-xl xl:text-[40px]"
            >
              12:00 - 15:00 WIB
            </span>
            <Image
              data-event-frame-bottom
              src="/images/mini-frame.webp"
              alt="mini-frame"
              width={340}
              height={28}
              className="w-[92px] rotate-180 will-change-transform sm:w-[120px] lg:w-[220px] xl:w-[340px]"
            />
          </div>
        </div>

        <div
          ref={locationSectionRef}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:mt-12 sm:gap-5 lg:mt-16 lg:gap-7 xl:mt-[72px] xl:gap-10"
        >
          <h3
            data-event-header="location"
            className="text-[clamp(1.75rem,4.5vw,3.5rem)] leading-none will-change-transform"
          >
            Lokasi
          </h3>

          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 lg:gap-5">
            <p
              data-event-desc="location"
              className="max-w-[18rem] text-center text-lg leading-tight will-change-transform sm:max-w-[26rem] sm:text-2xl lg:max-w-[42rem] lg:text-[2rem] xl:text-[40px]"
            >
              GEDUNG CAKRAWALA LANUD ABDULRACHMAN SALEH
            </p>
            <p
              data-event-desc="location"
              className="max-w-[18rem] text-center text-sm leading-relaxed will-change-transform sm:max-w-[24rem] sm:text-base lg:max-w-[40rem] lg:text-[1.375rem] xl:text-[32px]"
            >
              Jl. Krajan Saptorenggo, Kecamatan Pakis, Kabupaten Malang
            </p>
          </div>

          <a
            data-event-map
            href="https://www.google.com/maps/place/Gedung+Cakrawala+Lanud+ABD+Shaleh+Malang/@-7.9294638,112.7003603,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd6294581f44e75:0xd3a88671f87fe1a3!8m2!3d-7.9294691!4d112.7029352!16s%2Fg%2F11gg6_fnhr?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="relative will-change-transform"
          >
            <span className="absolute top-1/2 right-1/2 flex -translate-y-[62%] translate-x-1/2 transform cursor-pointer items-center gap-1.5 sm:gap-2 lg:-translate-y-[65%]">
              <Image
                src="/images/location-icon.webp"
                alt="location-icon"
                width={32}
                height={32}
                className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8"
              />
              <span className="text-sm sm:text-base lg:text-2xl">
                Google Maps
              </span>
            </span>
            <Image
              src="/images/frame-social.webp"
              alt="mini-frame"
              width={360}
              height={102}
              className="h-auto w-[250px] sm:w-[301px] lg:w-[330px] xl:w-[360px]"
            />
          </a>
        </div>

        <div
          ref={countdownSectionRef}
          className="mt-8 flex flex-col gap-5 sm:mt-10 sm:gap-6 lg:mt-16 lg:gap-10 xl:mt-[128px] xl:gap-[72px]"
        >
          <h3
            data-event-header="countdown"
            className="text-center font-alex-brush text-[clamp(2.5rem,7vw,5.5rem)] leading-none will-change-transform"
          >
            Count the date
          </h3>

          <div className="grid grid-cols-4 justify-center gap-2 sm:gap-3 lg:gap-8 xl:gap-[88px]">
            {countdownItems.map((item) => (
              <span
                key={item.label}
                data-event-count-card
                className="relative h-[115px] w-[83px] will-change-transform sm:h-[150px] sm:w-[108px] lg:h-[240px] lg:w-[180px] xl:h-[321px] xl:w-[271px]"
              >
                <Image
                  src="/images/count-frame-2.webp"
                  alt={item.label}
                  width={271}
                  height={321}
                  className="absolute h-[115px] w-[83px] sm:h-[150px] sm:w-[108px] lg:h-[240px] lg:w-[180px] xl:h-[321px] xl:w-[271px]"
                />
                <span className="absolute top-1/2 left-1/2 z-10 -translate-x-[40%] -translate-y-1/2 transform text-center text-[24px] leading-none font-bold text-text-dark sm:text-[30px] lg:text-[48px] xl:text-[64px]">
                  {item.value}
                  <p className="text-[10px] font-normal sm:text-xs lg:text-lg xl:text-2xl">
                    {item.label}
                  </p>
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
