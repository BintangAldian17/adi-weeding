"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const galleryImages = [
  "/images/gallery1.jpg",
  "/images/gallery2.jpg",
  "/images/gallery3.jpg",
  "/images/gallery4.jpg",
  "/images/gallery5.jpg",
  "/images/gallery6.jpg",
];

export default function Gallery() {
  const rootRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!contentRef.current) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      const title = "[data-gallery-title]";
      const desc = "[data-gallery-desc]";

      if (reduceMotion.matches) {
        gsap.set([title, desc], {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: "all",
        });
        return;
      }

      gsap.set(title, {
        opacity: 0,
        y: -28,
        scale: 1.08,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(desc, {
        opacity: 0,
        y: 28,
        scale: 1.08,
        transformOrigin: "center center",
        force3D: true,
      });

      const tl = gsap.timeline({
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
      }).to(
        desc,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.35,
          ease: "power2.out",
        },
        "-=0.95",
      );
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="relative min-h-[90vh] overflow-hidden bg-secondary text-text-dark xl:min-h-screen"
    >
      <Image
        src="/images/bg-accent2.png"
        alt="Gallery"
        width={1440}
        height={1918}
        className="absolute h-full w-full object-cover mix-blend-multiply"
      />

      <div className="relative z-10 flex flex-col items-center justify-center gap-6 pt-10 xl:gap-[72px] xl:pt-[100px] xl:pb-[100px]">
        <div
          ref={contentRef}
          className="container flex flex-col items-center justify-center gap-6 px-4 xl:gap-[72px] xl:px-0"
        >
          <Image
            src="/images/mini-frame-black.png"
            alt="mini-frame"
            width={398}
            height={32}
            className="h-auto w-[196px] xl:w-[398px]"
          />

          <h2
            data-gallery-title
            className="font-alex-brush text-[40px] will-change-transform xl:text-[88px]"
          >
            Potraits of Us
          </h2>

          <p
            data-gallery-desc
            className="text-center text-base leading-normal will-change-transform xl:text-[32px] xl:leading-none"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </p>

          <div className="flex h-full w-full items-center justify-center">
            <div className="relative">
              <Image
                src="/images/frame-video.png"
                alt="gallery"
                width={1267}
                height={813}
                className="object-cover"
              />

              <div className="absolute top-1/2 left-1/2 z-10 aspect-video w-[85%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-primary xl:h-[615px] xl:w-[1091px]">
                <div className="pointer-events-none absolute inset-0 h-full w-full">
                  <iframe
                    className="absolute top-1/2 left-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2"
                    src="https://www.youtube.com/embed/PTUZ-S9eYhc?autoplay=1&mute=1&controls=0&loop=1&playlist=PTUZ-S9eYhc&showinfo=0&modestbranding=1&iv_load_policy=3&rel=0"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>

              <Image
                src="/images/flower-accent-video.png"
                alt="gallery"
                width={451}
                height={358}
                className="absolute -top-2 -left-7 z-20 h-auto w-[150px] rotate-6 object-cover xl:-top-5 xl:-left-16 xl:w-[451px]"
              />

              <Image
                src="/images/flower-accent-video.png"
                alt="gallery"
                width={451}
                height={358}
                className="absolute -right-7 -bottom-2 z-20 h-auto w-[150px] rotate-190 object-cover rotate-6 xl:-right-16 xl:-bottom-5 xl:w-[451px]"
              />
            </div>
          </div>
        </div>

        <div className="relative w-[calc(100%+2rem)] xl:w-[calc(100%+6rem)]">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r from-secondary to-transparent xl:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l from-secondary to-transparent xl:w-20" />

          <div className="gallery-marquee flex w-max gap-[14px] xl:gap-20">
            {[...galleryImages, ...galleryImages].map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="relative h-[141px] w-[80px] shrink-0 overflow-hidden rounded-[8px] bg-primary xl:h-[415px] xl:w-[234px] xl:rounded-2xl"
              >
                <Image
                  src={src}
                  alt={`gallery ${index + 1}`}
                  fill
                  sizes="(max-width: 1280px) 80px, 234px"
                  className="absolute object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
