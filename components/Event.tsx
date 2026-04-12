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
  const contentRef = useRef<HTMLDivElement | null>(null);
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
      if (!contentRef.current) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      const headers = gsap.utils.toArray<HTMLElement>("[data-event-header]");
      const paragraphs = gsap.utils.toArray<HTMLElement>("[data-event-desc]");
      const topFrames = gsap.utils.toArray<HTMLElement>(
        "[data-event-frame-top]",
      );
      const bottomFrames = gsap.utils.toArray<HTMLElement>(
        "[data-event-frame-bottom]",
      );
      const timeCards = gsap.utils.toArray<HTMLElement>(
        "[data-event-count-card]",
      );
      const mapButton = gsap.utils.toArray<HTMLElement>("[data-event-map]");
      const staticNumbers = gsap.utils.toArray<HTMLElement>(
        "[data-event-static-num]",
      );

      const dateNumber = dayCounterRef.current ? [dayCounterRef.current] : [];

      const allAnimated = [
        ...headers,
        ...paragraphs,
        ...topFrames,
        ...bottomFrames,
        ...timeCards,
        ...mapButton,
        ...staticNumbers,
        ...dateNumber,
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

      // initial state
      gsap.set(headers, {
        opacity: 0,
        y: -28,
        scale: 1.08,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(paragraphs, {
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

      tl.to("[data-event-header='main']", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
      })
        .to(
          "[data-event-desc='main']",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.35,
          },
          "-=0.95",
        )
        .to(
          "[data-event-frame-top]",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            stagger: 0.1,
          },
          "-=0.8",
        )
        .to(
          "[data-event-static-num]",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.15,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.95",
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
          "[data-event-frame-bottom]",
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
        "[data-event-header='location']",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.35,
          ease: "power3.out",
        },
        "-=0.65",
      )
        .to(
          "[data-event-desc='location']",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.25,
            stagger: 0.12,
          },
          "-=0.95",
        )
        .to(
          "[data-event-map]",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.15,
            ease: "back.out(1.15)",
          },
          "-=0.8",
        )
        .to(
          "[data-event-header='countdown']",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.45,
            ease: "power3.out",
          },
          "-=0.75",
        )
        .to(
          "[data-event-count-card]",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            stagger: 0.08,
          },
          "-=0.9",
        );
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="relative h-full w-full bg-primary">
      <Image
        src="/images/bg-event-2.png"
        alt="Gallery"
        width={1104}
        height={928}
        className="absolute top-0 left-1/2 -translate-x-1/2"
      />
      <Image
        src="/images/bg-event-2.png"
        alt="Gallery"
        width={1104}
        height={928}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <Image
        src="/images/bg-event-2.png"
        alt="Gallery"
        width={1104}
        height={928}
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
      />
      <Image
        src="/images/side-frame.png"
        alt="Gallery"
        width={353}
        height={1096}
        className="absolute top-10 left-0 h-[498px] w-[161px] xl:top-[100px] xl:h-[1096px] xl:w-[353px]"
      />

      <Image
        src="/images/side-frame.png"
        alt="Gallery"
        width={353}
        height={1096}
        className="absolute top-10 right-0 h-[498px] w-[161px] rotate-y-180 xl:top-[100px] xl:h-[1096px] xl:w-[353px]"
      />
      <Image
        src="/images/mini-frame.png"
        alt="Gallery"
        width={353}
        height={1096}
        className="absolute top-10 left-1/2 h-auto w-[196px] -translate-x-1/2 xl:top-[110px] xl:w-[353px]"
      />
      <Image
        src="/images/side-frame.png"
        alt="Gallery"
        width={353}
        height={1096}
        className="absolute bottom-10 left-0 h-[498px] w-[161px] rotate-x-180 xl:bottom-[100px] xl:h-[1096px] xl:w-[353px]"
      />
      <Image
        src="/images/side-frame.png"
        alt="Gallery"
        width={353}
        height={1096}
        className="absolute right-0 bottom-10 h-[498px] w-[161px] rotate-y-180 rotate-x-180 xl:bottom-[100px] xl:h-[1096px] xl:w-[353px]"
      />
      <Image
        src="/images/mini-frame.png"
        alt="Gallery"
        width={353}
        height={1096}
        className="absolute bottom-10 left-1/2 h-auto w-[196px] -translate-x-1/2 rotate-180 xl:bottom-[110px] xl:w-[353px]"
      />

      <div
        ref={contentRef}
        className="container px-[15px] pt-32 pb-[112px] text-secondary xl:pt-44 xl:pb-[273px]"
      >
        <h2
          data-event-header="main"
          className="text-center font-alex-brush text-[40px] will-change-transform xl:text-[88px]"
        >
          Save The Date
        </h2>

        <p
          data-event-desc="main"
          className="px-12 pt-5 text-center leading-none will-change-transform xl:px-0 xl:pt-[72px] xl:text-[32px]"
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the
        </p>

        <div className="mt-10 flex items-center justify-between gap-0 px-2.5 xl:mt-[72px] xl:justify-center xl:gap-[72px] xl:px-0">
          <div className="flex flex-col items-center justify-center gap-2 xl:gap-4">
            <Image
              data-event-frame-top
              src="/images/mini-frame.png"
              alt="mini-frame"
              width={340}
              height={28}
              className="w-[102px] will-change-transform xl:w-[340px]"
            />
            <span
              data-event-static-num
              className="text-sm will-change-transform xl:text-[40px]"
            >
              Minggu
            </span>
            <Image
              data-event-frame-bottom
              src="/images/mini-frame.png"
              alt="mini-frame"
              width={340}
              height={28}
              className="w-[102px] rotate-180 will-change-transform xl:w-[340px]"
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-2 xl:gap-4">
            <span
              data-event-static-num
              className="text-[18px] will-change-transform xl:text-[48px]"
            >
              Mei
            </span>
            <span
              ref={dayCounterRef}
              className="text-[28px] leading-none font-bold will-change-transform xl:text-[132px]"
            >
              0
            </span>
            <span
              data-event-static-num
              className="text-[18px] will-change-transform xl:text-[48px]"
            >
              2026
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 xl:gap-4">
            <Image
              data-event-frame-top
              src="/images/mini-frame.png"
              alt="mini-frame"
              width={340}
              height={28}
              className="w-[102px] will-change-transform xl:w-[340px]"
            />
            <span
              data-event-static-num
              className="text-sm will-change-transform xl:text-[40px]"
            >
              12:00 - 15:00 WIB
            </span>
            <Image
              data-event-frame-bottom
              src="/images/mini-frame.png"
              alt="mini-frame"
              width={340}
              height={28}
              className="w-[102px] rotate-180 will-change-transform xl:w-[340px]"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 xl:mt-[72px] xl:gap-10">
          <h3
            data-event-header="location"
            className="text-[28px] leading-none will-change-transform xl:text-[56px]"
          >
            Lokasi
          </h3>

          <div className="flex flex-col items-center justify-center gap-4">
            <p
              data-event-desc="location"
              className="text-center leading-none will-change-transform xl:text-[40px]"
            >
              GEDUNG CAKRAWALA LANUD ABDULRACHMAN SALEH
            </p>
            <p
              data-event-desc="location"
              className="text-center text-sm will-change-transform xl:text-[32px]"
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
            <span className="absolute top-1/2 right-1/2 flex -translate-y-[65%] translate-x-1/2 transform cursor-pointer items-center gap-2 text-[24px]">
              <Image
                src="/images/location-icon.png"
                alt="location-icon"
                width={32}
                height={32}
              />
              <span className="text-base xl:text-2xl">Google Maps</span>
            </span>
            <Image
              src="/images/frame-social.png"
              alt="mini-frame"
              width={360}
              height={102}
              className="h-auto w-[301px] xl:w-[360px]"
            />
          </a>
        </div>

        <div className="mt-5 flex flex-col gap-5 xl:mt-[128px] xl:gap-[72px]">
          <h3
            data-event-header="countdown"
            className="text-center font-alex-brush text-[40px] leading-none will-change-transform xl:text-[88px]"
          >
            Count the date
          </h3>

          <div className="flex justify-center gap-[5px] xl:gap-[88px]">
            {countdownItems.map((item) => (
              <span
                key={item.label}
                data-event-count-card
                className="relative h-[115px] w-[83px] will-change-transform"
              >
                <Image
                  src="/images/count-frame.png"
                  alt={item.label}
                  width={83}
                  height={115}
                  className="absolute"
                />
                <span className="absolute top-1/2 left-1/2 z-10 -translate-x-[40%] -translate-y-1/2 transform text-center text-[24px] leading-none font-bold text-text-dark">
                  {item.value}
                  <p className="text-[10px] font-normal">{item.label}</p>
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
