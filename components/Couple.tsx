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
      className="relative w-full overflow-hidden pb-28 sm:pb-32 lg:pb-40 xl:pb-[195px]"
    >
      <div className="absolute bottom-4 left-0 z-20">
        <Image
          src="/images/accent-flower.webp"
          alt="side-frame"
          width={268}
          height={426}
          className="absolute -top-16 -z-10 h-auto w-[72px] -translate-x-6 translate-y-8 sm:-top-20 sm:w-[98px] sm:-translate-x-8 sm:translate-y-10 lg:-top-24 lg:w-[180px] lg:translate-y-12 xl:-top-[100px] xl:w-[268px]"
        />
        <Image
          src="/images/accent-flower3.webp"
          alt="side-frame"
          width={212}
          height={263}
          className="h-auto w-[58px] -translate-x-2 rotate-y-180 sm:w-[77px] sm:-translate-x-3 lg:w-[142px] xl:w-[212px]"
        />
      </div>

      <div className="absolute bottom-4 right-0 z-20 rotate-y-180">
        <Image
          src="/images/accent-flower.webp"
          alt="side-frame"
          width={268}
          height={426}
          className="absolute -top-16 -z-10 h-auto w-[72px] -translate-x-6 translate-y-8 sm:-top-20 sm:w-[98px] sm:-translate-x-8 sm:translate-y-10 lg:-top-24 lg:w-[180px] lg:translate-y-12 xl:-top-[100px] xl:w-[268px]"
        />
        <Image
          src="/images/accent-flower3.webp"
          alt="side-frame"
          width={212}
          height={263}
          className="h-auto w-[58px] -translate-x-2 rotate-y-180 sm:w-[77px] sm:-translate-x-3 lg:w-[142px] xl:w-[212px]"
        />
      </div>

      <div className="container flex w-full flex-col text-secondary">
        <div className="relative flex flex-col items-center justify-center gap-10 sm:gap-12 lg:gap-16 xl:flex-row xl:items-center xl:gap-0">
          {/* LEFT / BRIDE */}
          <div className="flex w-full flex-col justify-center xl:w-1/2">
            <div
              ref={bridePhotoRef}
              className="mx-auto w-full max-w-[18rem] sm:max-w-[24rem] md:max-w-[30rem] lg:max-w-[36rem] xl:max-w-none"
            >
              <Image
                data-couple-photo
                src="/images/bride-couple.webp"
                alt="bride"
                width={1148}
                height={1280}
                className="h-auto w-full will-change-transform"
              />
            </div>

            <div
              ref={brideInfoRef}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:gap-4 lg:mt-12 xl:mt-14"
            >
              <Image
                data-couple-mini-frame
                src="/images/mini-frame.webp"
                alt="mini-frame"
                width={340}
                height={28}
                className="h-auto w-[168px] will-change-transform sm:w-[196px] lg:w-[260px] xl:w-[340px]"
              />

              <h2
                data-couple-name
                className="text-center font-alex-brush text-[clamp(2.25rem,5.5vw,4rem)] will-change-transform"
              >
                Devi Risma Anggraeni
              </h2>

              <p
                data-couple-desc
                className="max-w-[18rem] text-center font-eb-garamond text-sm leading-relaxed will-change-transform sm:max-w-[22rem] sm:text-base lg:max-w-[26rem] lg:text-[1.125rem]"
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
                <span className="absolute top-1/2 right-1/2 flex translate-x-1/2 -translate-y-[60%] items-center gap-1.5 sm:gap-2 lg:-translate-y-[65%]">
                  <Image
                    src="/images/icon-ig.webp"
                    alt="ig-icon"
                    width={32}
                    height={32}
                    className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8"
                  />
                  <span className="text-sm sm:text-base lg:text-xl">
                    @devirisma22
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
          </div>

          {/* AMPERSAND */}
          <div className="xl:flex xl:self-center xl:items-center xl:justify-center xl:px-6 xl:-translate-y-[150%]">
            <span
              ref={ampersandRef}
              className="font-alegreya text-[clamp(2.5rem,5vw,5rem)] will-change-transform"
            >
              &
            </span>
          </div>

          {/* RIGHT / GROOM */}
          <div className="flex w-full flex-col justify-center xl:w-1/2">
            <div
              ref={groomPhotoRef}
              className="mx-auto w-full max-w-[18rem] sm:max-w-[24rem] md:max-w-[30rem] lg:max-w-[36rem] xl:max-w-none"
            >
              <Image
                data-couple-photo
                src="/images/groom-couple.webp"
                alt="groom"
                width={1148}
                height={1280}
                className="h-auto w-full will-change-transform"
              />
            </div>

            <div
              ref={groomInfoRef}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:gap-4 lg:mt-12 xl:mt-14"
            >
              <Image
                data-couple-mini-frame
                src="/images/mini-frame.webp"
                alt="mini-frame"
                width={340}
                height={28}
                className="h-auto w-[168px] will-change-transform sm:w-[196px] lg:w-[260px] xl:w-[340px]"
              />

              <h2
                data-couple-name
                className="text-center font-alex-brush text-[clamp(2.25rem,5.5vw,4rem)] will-change-transform"
              >
                Gema Adi Perwira
              </h2>

              <p
                data-couple-desc
                className="max-w-[18rem] text-center font-eb-garamond text-sm leading-relaxed will-change-transform sm:max-w-[22rem] sm:text-base lg:max-w-[26rem] lg:text-[1.125rem]"
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
                <span className="absolute top-1/2 right-1/2 flex translate-x-1/2 -translate-y-[60%] items-center gap-1.5 sm:gap-2 lg:-translate-y-[65%]">
                  <Image
                    src="/images/icon-ig.webp"
                    alt="ig-icon"
                    width={32}
                    height={32}
                    className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8"
                  />
                  <span className="text-sm sm:text-base lg:text-xl">
                    @adiiperwira
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
          </div>
        </div>
      </div>
    </section>
  );
}
