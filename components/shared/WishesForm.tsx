"use client";

import Image from "next/image";
import React from "react";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import EnvelopeMessage from "./EnvelopeMessage";

type WishesFormProps = {
  name: string;
  onNameChange: (value: string) => void;
  message: string;
  onMessageChange: (value: string) => void;
  present: boolean;
  onPresentChange: (value: boolean) => void;
  errorMessage: string;
  isSubmitting: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function WishesForm({
  name,
  onNameChange,
  message,
  onMessageChange,
  present,
  onPresentChange,
  errorMessage,
  isSubmitting,
  onSubmit,
}: WishesFormProps) {
  return (
    <div className="flex">
      <div className="relative flex-1 px-4 py-10 md:flex-1/2">
        <Image
          data-wishes-form-anim
          src="/images/mini-frame.webp"
          alt="Gallery"
          width={341}
          height={28}
          className="absolute top-10 left-1/2 h-auto w-[196px] -translate-x-1/2 xl:top-[110px] xl:w-[372px]"
        />
        <Image
          src="/images/bg-event-2.webp"
          alt="Gallery"
          width={1104}
          height={928}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-125"
        />
        <div className="absolute inset-0 h-full w-full bg-white opacity-[2%]" />
        <div className="flex items-center justify-center pt-10 text-secondary xl:mt-28">
          <div className="flex w-full flex-col items-center gap-6 md:px-10 xl:px-20">
            <h2
              data-wishes-form-anim
              className="font-alex-brush text-[40px] leading-none xl:text-[72px]"
            >
              Tulis Doa & Harapanmu
            </h2>
            <p
              data-wishes-form-anim
              className="text-center text-base leading-none xl:text-2xl"
            >
              Setiap ucapan dan doamu adalah hadiah terbaik dan terindah bagi
              kami.
            </p>
            <form
              onSubmit={onSubmit}
              className="flex w-full flex-col items-center justify-center gap-4"
            >
              <div data-wishes-form-anim className="relative w-full px-4">
                <Image
                  src="/images/ornament-input.webp"
                  alt="Gallery"
                  width={19}
                  height={26}
                  className="absolute -left-1 top-1/2 -translate-y-1/2"
                />
                <Image
                  src="/images/ornament-input.webp"
                  alt="Gallery"
                  width={19}
                  height={26}
                  className="absolute -right-1 top-1/2 -translate-y-1/2 rotate-y-180"
                />
                <input
                  name="name"
                  value={name}
                  maxLength={50}
                  onChange={(event) => onNameChange(event.target.value)}
                  className="h-[37px] w-full rounded-[5px] border border-secondary px-2 text-sm text-secondary focus:outline-none focus:ring-0"
                  placeholder="Nama"
                />
              </div>
              <Select
                className="data-wishes-form-anim"
                name="present"
                placeholder="Konfirmasi Kehadiran"
                value={String(present)}
                onValueChange={(value) => onPresentChange(value === "true")}
                options={[
                  { label: "Hadir", value: "true" },
                  { label: "Tidak Hadir", value: "false" },
                ]}
              />
              <div data-wishes-form-anim className="relative w-full px-4">
                <Image
                  src="/images/ornament-input.webp"
                  alt="Gallery"
                  width={19}
                  height={26}
                  className="absolute -left-1 top-1/2 -translate-y-1/2"
                />
                <Image
                  src="/images/ornament-input.webp"
                  alt="Gallery"
                  width={19}
                  height={26}
                  className="absolute -right-1 top-1/2 -translate-y-1/2 rotate-y-180"
                />
                <div className="relative z-10">
                  <span className="absolute right-2 bottom-2 opacity-50 z-10">
                    {message.length}/255
                  </span>
                  <textarea
                    name="message"
                    value={message}
                    placeholder="Tulis Ucapan & Doa"
                    maxLength={255}
                    onChange={(event) => onMessageChange(event.target.value)}
                    className="h-[101px] py-2 w-full resize-none rounded-[5px] border border-secondary px-2 text-sm text-secondary focus:outline-none focus:ring-0"
                  />
                </div>
              </div>
              {errorMessage ? (
                <p
                  data-wishes-form-anim
                  className="w-full px-4 text-sm text-[#FFD7D7]"
                >
                  {errorMessage}
                </p>
              ) : null}
              <div
                data-wishes-form-anim
                className="flex w-full justify-center md:justify-start"
              >
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Mengirim..." : "Kirim"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        data-wishes-form-anim
        className="hidden items-center justify-center md:flex md:flex-1/2"
      >
        <EnvelopeMessage
          message={message}
          from={name || undefined}
          present={present}
          size="xl"
        />
      </div>
    </div>
  );
}
