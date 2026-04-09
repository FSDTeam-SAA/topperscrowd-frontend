import Image from "next/image";

interface PageHeroBannerProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export default function PageHeroBanner({
  title,
  subtitle,
  backgroundImage,
}: PageHeroBannerProps) {
  return (
    <div className="relative h-[200px] md:h-[349px] w-full overflow-hidden">
      <Image src={backgroundImage} alt="" fill className="object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 md:gap-4 px-4 text-center">
        <h1 className="font-serif text-3xl md:text-5xl lg:text-[72px] font-bold leading-[1.2] text-[#fff8f5]">
          {title}
        </h1>
        <p className="text-sm md:text-xl lg:text-2xl text-white">{subtitle}</p>
      </div>
    </div>
  );
}
