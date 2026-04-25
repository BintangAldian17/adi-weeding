"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Couple() {
  const rootRef = useRef<HTMLElement | null>(null);
  const bridePhotoRef = useRef<HTMLDivElement | null>(null);
  const brideInfoRef = useRef<HTMLDivElement | null>(null);
  const ampersandRef = useRef<HTMLSpanElement | null>(null);
  const groomPhotoRef = useRef<HTMLDivElement | null>(null);
  const groomInfoRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      const animatePhotoBlock = (
        block: HTMLDivElement | null,
        options?: {
          start?: string;
        },
      ) => {
        if (!block) return;

        const photo = block.querySelector<HTMLElement>("[data-couple-photo]");
        const items = [photo].filter(Boolean) as HTMLElement[];

        if (!items.length) return;

        if (reduceMotion.matches) {
          gsap.set(items, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            clearProps: "all",
          });
          return;
        }

        if (photo) {
          gsap.set(photo, {
            opacity: 0,
            y: 28,
            scale: 1.08,
            transformOrigin: "center center",
            force3D: true,
          });
        }

        gsap.to(photo, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.25,
          ease: "power2.out",
          scrollTrigger: {
            trigger: block,
            start: options?.start ?? "top 78%",
            once: true,
          },
        });
      };

      const animateInfoBlock = (
        block: HTMLDivElement | null,
        options?: {
          start?: string;
        },
      ) => {
        if (!block) return;

        const miniFrame = block.querySelector<HTMLElement>(
          "[data-couple-mini-frame]",
        );
        const name = block.querySelector<HTMLElement>("[data-couple-name]");
        const desc = block.querySelector<HTMLElement>("[data-couple-desc]");
        const social = block.querySelector<HTMLElement>("[data-couple-social]");

        const items = [miniFrame, name, desc, social].filter(
          Boolean,
        ) as HTMLElement[];

        if (!items.length) return;

        if (reduceMotion.matches) {
          gsap.set(items, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            clearProps: "all",
          });
          return;
        }

        if (miniFrame) {
          gsap.set(miniFrame, {
            opacity: 0,
            y: -28,
            scale: 1.08,
            transformOrigin: "center center",
            force3D: true,
          });
        }

        if (name) {
          gsap.set(name, {
            opacity: 0,
            y: 0,
            scale: 1.08,
            transformOrigin: "center center",
            force3D: true,
          });
        }

        if (desc) {
          gsap.set(desc, {
            opacity: 0,
            y: 24,
            scale: 1.08,
            transformOrigin: "center center",
            force3D: true,
          });
        }

        if (social) {
          gsap.set(social, {
            opacity: 0,
            y: 10,
            scale: 1.12,
            transformOrigin: "center center",
            force3D: true,
          });
        }

        const tl = gsap.timeline({
          defaults: {
            ease: "power2.out",
          },
          scrollTrigger: {
            trigger: block,
            start: options?.start ?? "top 82%",
            once: true,
          },
        });

        tl.to(miniFrame, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.05,
        })
          .to(
            name,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.3,
              ease: "power3.out",
            },
            "-=0.65",
          )
          .to(
            desc,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.15,
            },
            "-=0.8",
          )
          .to(
            social,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.15,
              ease: "back.out(1.2)",
            },
            "-=0.75",
          );
      };

      animatePhotoBlock(bridePhotoRef.current, { start: "top 82%" });
      animateInfoBlock(brideInfoRef.current, { start: "top 78%" });
      animatePhotoBlock(groomPhotoRef.current, { start: "top 82%" });
      animateInfoBlock(groomInfoRef.current, { start: "top 78%" });

      if (ampersandRef.current) {
        if (reduceMotion.matches) {
          gsap.set(ampersandRef.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            clearProps: "all",
          });
        } else {
          gsap.set(ampersandRef.current, {
            opacity: 0,
            y: 10,
            scale: 1.08,
            transformOrigin: "center center",
            force3D: true,
          });

          gsap.to(ampersandRef.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ampersandRef.current,
              start: "top 88%",
              once: true,
            },
          });
        }
      }
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden pb-[195px]"
    >
      <div className="absolute bottom-4 left-0 z-20">
        <Image
          src="/images/accent-flower.png"
          alt="side-frame"
          width={268}
          height={426}
          className="absolute -top-[100px] -z-10 h-auto w-[98px] -translate-x-8 translate-y-10 xl:w-[268px]"
        />
        <Image
          src="/images/accent-flower3.png"
          alt="side-frame"
          width={212}
          height={263}
          className="h-auto w-[77px] -translate-x-3 rotate-y-180 xl:w-[212px]"
        />
      </div>

      <div className="absolute bottom-4 right-0 z-20 rotate-y-180">
        <Image
          src="/images/accent-flower.png"
          alt="side-frame"
          width={268}
          height={426}
          className="absolute -top-[100px] -z-10 h-auto w-[98px] -translate-x-8 translate-y-10 xl:w-[268px]"
        />
        <Image
          src="/images/accent-flower3.png"
          alt="side-frame"
          width={212}
          height={263}
          className="h-auto w-[77px] -translate-x-3 rotate-y-180 xl:w-[212px]"
        />
      </div>

      <div className="container flex w-full flex-col text-secondary">
        <div className="relative flex flex-col items-center justify-center xl:flex-row xl:items-center">
          {/* LEFT / BRIDE */}
          <div className="flex w-full flex-col justify-center xl:w-1/2">
            <div ref={bridePhotoRef}>
              <Image
                data-couple-photo
                src="/images/bride-couple.png"
                alt="bride"
                width={1148}
                height={1280}
                className="h-auto w-full will-change-transform"
              />
            </div>

            <div
              ref={brideInfoRef}
              className="mt-12 flex flex-col items-center justify-center gap-3 xl:mt-14"
            >
              <Image
                data-couple-mini-frame
                src="/images/mini-frame.png"
                alt="mini-frame"
                width={340}
                height={28}
                className="h-auto w-[196px] will-change-transform xl:w-[340px]"
              />

              <h2
                data-couple-name
                className="font-alex-brush text-[40px] will-change-transform xl:text-[64px] text-center"
              >
                Devi Risma Anggraeni
              </h2>

              <p
                data-couple-desc
                className="text-center font-eb-garamond text-sm will-change-transform xl:text-base"
              >
                Putri dari
                <br />
                Bapak Andhi Yuliantoro & Ibu Ida Latif
              </p>

              <a
                data-couple-social
                href="https://instagram.com/devirisma22"
                target="_blank"
                rel="noopener noreferrer"
                className="relative will-change-transform"
              >
                <span className="absolute top-1/2 right-1/2 flex translate-x-1/2 -translate-y-[60%] items-center gap-2 text-[24px] xl:top-1/2 xl:-translate-y-[65%]">
                  <Image
                    src="/images/icon-ig.png"
                    alt="ig-icon"
                    width={32}
                    height={32}
                  />
                  <span className="text-base xl:text-xl">@devirisma22</span>
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
          </div>

          {/* AMPERSAND */}
          <div className="xl:self-center xl:flex xl:items-center xl:justify-center xl:px-6 xl:-translate-y-[150%]">
            <span
              ref={ampersandRef}
              className="font-alegreya text-[40px] will-change-transform xl:text-[80px]"
            >
              &
            </span>
          </div>

          {/* RIGHT / GROOM */}
          <div className="flex w-full flex-col justify-center xl:w-1/2">
            <div ref={groomPhotoRef}>
              <Image
                data-couple-photo
                src="/images/groom-couple.png"
                alt="groom"
                width={1148}
                height={1280}
                className="h-auto w-full will-change-transform"
              />
            </div>

            <div
              ref={groomInfoRef}
              className="mt-12 flex flex-col items-center justify-center gap-3 xl:mt-14"
            >
              <Image
                data-couple-mini-frame
                src="/images/mini-frame.png"
                alt="mini-frame"
                width={340}
                height={28}
                className="h-auto w-[196px] will-change-transform xl:w-[340px]"
              />

              <h2
                data-couple-name
                className="font-alex-brush text-[40px] will-change-transform xl:text-[64px] text-center"
              >
                Gema Adi Perwira
              </h2>

              <p
                data-couple-desc
                className="text-center font-eb-garamond text-sm will-change-transform xl:text-base"
              >
                Putra dari
                <br />
                Bapak Bambang Rudianto & Ibu Diah Pratiwi
              </p>

              <a
                data-couple-social
                href="https://instagram.com/adiiperwira"
                target="_blank"
                rel="noopener noreferrer"
                className="relative will-change-transform"
              >
                <span className="absolute top-1/2 right-1/2 flex translate-x-1/2 -translate-y-[60%] items-center gap-2 text-[24px] xl:top-1/2 xl:-translate-y-[65%]">
                  <Image
                    src="/images/icon-ig.png"
                    alt="ig-icon"
                    width={32}
                    height={32}
                  />
                  <span className="text-base xl:text-xl">@adiiperwira</span>
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
          </div>
        </div>
      </div>
    </section>
  );
}
