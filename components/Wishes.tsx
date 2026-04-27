"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import React, { useMemo, useRef, useState } from "react";
import { createWishes } from "@/lib/actions/createWishes";
import type { WishItem } from "@/lib/actions/getWishes";
import WishesForm from "./shared/WishesForm";
import WishesMessagesSection from "./shared/WishesMessagesSection";

type PaginationItem =
  | { type: "control"; control: "first" | "prev" | "next" | "last" }
  | { type: "page"; page: number; active: boolean }
  | { type: "ellipsis"; key: string };

const WISHES_PER_PAGE = 8;

function buildPaginationItems(
  currentPage: number,
  totalPages: number,
): PaginationItem[] {
  const items: PaginationItem[] = [
    { type: "control", control: "first" },
    { type: "control", control: "prev" },
  ];

  if (totalPages <= 5) {
    for (let page = 1; page <= totalPages; page += 1) {
      items.push({ type: "page", page, active: page === currentPage });
    }
  } else if (currentPage <= 3) {
    items.push(
      { type: "page", page: 1, active: currentPage === 1 },
      { type: "page", page: 2, active: currentPage === 2 },
      { type: "page", page: 3, active: currentPage === 3 },
      { type: "ellipsis", key: "right" },
      { type: "page", page: totalPages, active: false },
    );
  } else if (currentPage >= totalPages - 2) {
    items.push(
      { type: "page", page: 1, active: false },
      { type: "ellipsis", key: "left" },
      {
        type: "page",
        page: totalPages - 2,
        active: currentPage === totalPages - 2,
      },
      {
        type: "page",
        page: totalPages - 1,
        active: currentPage === totalPages - 1,
      },
      { type: "page", page: totalPages, active: currentPage === totalPages },
    );
  } else {
    items.push(
      { type: "page", page: 1, active: false },
      { type: "ellipsis", key: "left" },
      { type: "page", page: currentPage, active: true },
      { type: "ellipsis", key: "right" },
      { type: "page", page: totalPages, active: false },
    );
  }

  items.push(
    { type: "control", control: "next" },
    { type: "control", control: "last" },
  );

  return items;
}

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Wishes({
  guestId,
  initialWishes,
}: {
  guestId: string;
  initialWishes: WishItem[];
}) {
  const rootRef = useRef<HTMLElement | null>(null);
  const formSectionRef = useRef<HTMLDivElement | null>(null);
  const listSectionRef = useRef<HTMLDivElement | null>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [present, setPresent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [allWishes, setAllWishes] = useState(initialWishes);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(allWishes.length / WISHES_PER_PAGE));
  const hasWishes = allWishes.length > 0;

  const paginatedWishes = useMemo(() => {
    const from = (currentPage - 1) * WISHES_PER_PAGE;
    return allWishes.slice(from, from + WISHES_PER_PAGE);
  }, [allWishes, currentPage]);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      const formItems = gsap.utils.toArray<HTMLElement>(
        "[data-wishes-form-anim], .data-wishes-form-anim",
      );
      const listItems = gsap.utils.toArray<HTMLElement>(
        "[data-wishes-list-anim]",
      );
      const cards = gsap.utils.toArray<HTMLElement>("[data-wishes-card]");

      if (reduceMotion.matches) {
        gsap.set([...formItems, ...listItems, ...cards], {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          clearProps: "all",
        });
        return;
      }

      gsap.set(formItems, {
        opacity: 0,
        y: 28,
        scale: 1.04,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(listItems, {
        opacity: 0,
        y: 28,
        scale: 1.04,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(cards, {
        opacity: 0,
        y: 24,
        scale: 1.04,
        transformOrigin: "center center",
        force3D: true,
      });

      if (formSectionRef.current) {
        gsap.to(formItems, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.05,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formSectionRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }

      if (listSectionRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: listSectionRef.current,
            start: "top 82%",
            once: true,
          },
          defaults: {
            ease: "power3.out",
          },
        });

        tl.to(listItems, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.05,
          stagger: 0.1,
        }).to(
          cards,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.08,
          },
          "-=0.65",
        );
      }
    },
    { scope: rootRef, dependencies: [hasWishes, currentPage, totalPages] },
  );

  const paginationItems = useMemo(
    () => buildPaginationItems(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const handlePaginationClick = (item: PaginationItem) => {
    if (item.type === "ellipsis") return;

    let nextPage = currentPage;

    if (item.type === "page") {
      nextPage = item.page;
    } else if (item.control === "first") {
      nextPage = 1;
    } else if (item.control === "prev") {
      nextPage = Math.max(1, currentPage - 1);
    } else if (item.control === "next") {
      nextPage = Math.min(totalPages, currentPage + 1);
    } else {
      nextPage = totalPages;
    }

    if (nextPage === currentPage) {
      return;
    }

    setCurrentPage(nextPage);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      setErrorMessage("Nama, kehadiran, dan ucapan wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData();
    formData.set("name", trimmedName);
    formData.set("message", trimmedMessage);
    formData.set("present", String(present));
    formData.set("user_id", guestId);

    try {
      const createdWish = await createWishes(formData);
      setName("");
      setMessage("");
      setPresent(true);
      setAllWishes((prev) =>
        createdWish ? [createdWish, ...prev] : prev,
      );
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
      setErrorMessage("Ucapan belum bisa dikirim. Coba lagi sebentar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={rootRef}
      className="relative h-full w-full overflow-hidden bg-transparent"
    >
      <div ref={formSectionRef}>
        <WishesForm
          name={name}
          onNameChange={setName}
          message={message}
          onMessageChange={setMessage}
          present={present}
          onPresentChange={setPresent}
          errorMessage={errorMessage}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        />
      </div>
      {hasWishes ? (
        <div ref={listSectionRef}>
          <WishesMessagesSection
            wishes={paginatedWishes}
            totalPages={totalPages}
            paginationItems={paginationItems}
            currentPage={currentPage}
            onPaginationClick={handlePaginationClick}
          />
        </div>
      ) : null}
    </section>
  );
}
