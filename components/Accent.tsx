import Image from "next/image";

export const Accent = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/images/bg-accent2.png"
      alt=""
      fill
      className={`object-cover mix-blend-screen opacity-60 pointer-events-none ${className ?? ""}`}
    />
  );
};
