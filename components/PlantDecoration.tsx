import Image from "next/image";

type Corner = "tl" | "tr" | "bl" | "br";

const cornerClass: Record<Corner, string> = {
  tl: "top-0 left-0 -translate-x-1/4 -translate-y-1/4 rotate-[-8deg]",
  tr: "top-0 right-0 translate-x-1/4 -translate-y-1/4 rotate-[10deg]",
  bl: "bottom-0 left-0 -translate-x-1/5 translate-y-1/5 rotate-[6deg]",
  br: "bottom-0 right-0 translate-x-1/5 translate-y-1/5 rotate-[-12deg]",
};

/** Допълнително завъртане и огледалност за plant.png — различно по ъгли */
const pngAccent: Record<Corner, { mirror: boolean; spin: string }> = {
  tl: { mirror: true, spin: "-rotate-[11deg]" },
  tr: { mirror: false, spin: "rotate-[17deg]" },
  bl: { mirror: true, spin: "rotate-[9deg]" },
  br: { mirror: false, spin: "-rotate-[14deg]" },
};

export function PlantDecoration({
  corner,
  className = "",
  size = 160,
  opacity = 0.55,
  kind = "avif",
}: {
  corner: Corner;
  className?: string;
  size?: number;
  opacity?: number;
  /** avif — основна илюстрация; png — допълнителна, с огледалност и завъртане по ъгъл */
  kind?: "avif" | "png";
}) {
  const src = kind === "png" ? "/plant.png" : "/plant.avif";
  const png = pngAccent[corner];

  const inner =
    kind === "png" ? (
      <div
        className={`origin-center ${png.mirror ? "-scale-x-100" : ""} ${png.spin}`}
      >
        <Image
          src={src}
          alt=""
          width={size}
          height={size}
          className="h-auto w-[min(38vw,260px)] max-w-none drop-shadow-sm"
          sizes="260px"
        />
      </div>
    ) : (
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        className="h-auto w-[min(40vw,280px)] max-w-none drop-shadow-sm"
        sizes="280px"
      />
    );

  return (
    <div
      className={`pointer-events-none absolute z-0 select-none ${cornerClass[corner]} ${className}`}
      style={{ opacity }}
      aria-hidden
    >
      {inner}
    </div>
  );
}

export function PlantFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      <PlantDecoration corner="tr" kind="avif" size={180} opacity={0.45} />
      <PlantDecoration corner="bl" kind="avif" size={140} opacity={0.4} />
      <PlantDecoration corner="tl" kind="png" size={130} opacity={0.34} />
      <PlantDecoration corner="br" kind="png" size={145} opacity={0.32} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
