import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full md:py-5 py-3 flex items-center justify-center bg-black md:text-[32px] text-2xl">
      Powered by
      <Image
        alt="Logo XVite"
        src="/logo-xvite.svg"
        width={97}
        height={27}
        className="md:ml-2 ml-1 md:w-[97px] md:h-[27px] w-[67] h-[17]"
      />
    </footer>
  );
}
