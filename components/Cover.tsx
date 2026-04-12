import Image from "next/image";

export default function Cover() {
  return (
    <div className="w-full h-screen relative">
     
      <Image
        src="/images/amplop-cover.png"
        alt="Hero Background"
        width={1440}
        height={615}
        className="absolute top-0 left-0"
      />
    </div>
  );
}
