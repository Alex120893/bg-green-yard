import Image from "next/image";

type Corner = "tl" | "tr" | "bl" | "br";

/** Позиция без завъртане — на мобилен по-навън, за частично изрязване от ръба */
const cornerPos: Record<Corner, string> = {
  tl: "top-0 left-0 max-md:-translate-x-[62%] max-md:-translate-y-[28%] md:-translate-x-1/4 md:-translate-y-1/4",
  tr: "top-0 right-0 max-md:translate-x-[62%] max-md:-translate-y-[28%] md:translate-x-1/4 md:-translate-y-1/4",
  bl: "bottom-0 left-0 max-md:-translate-x-[58%] max-md:translate-y-[24%] md:-translate-x-1/5 md:translate-y-1/5",
  br: "bottom-0 right-0 max-md:translate-x-[58%] max-md:translate-y-[24%] md:translate-x-1/5 md:translate-y-1/5",
};

/** Завъртане на контейнера по ъгъл */
const cornerRot: Record<Corner, string> = {
  tl: "rotate-[-8deg]",
  tr: "rotate-[10deg]",
  bl: "rotate-[6deg]",
  br: "rotate-[-12deg]",
};

/** Същите ъгли с обратен знак (ляво ↔ дясно наклон) */
const cornerRotFlipped: Record<Corner, string> = {
  tl: "rotate-[8deg]",
  tr: "rotate-[-10deg]",
  bl: "rotate-[-6deg]",
  br: "rotate-[12deg]",
};

/** Допълнително завъртане и огледалност за plant.png */
const pngAccent: Record<Corner, { mirror: boolean; spin: string }> = {
  tl: { mirror: true, spin: "-rotate-[11deg]" },
  tr: { mirror: false, spin: "rotate-[17deg]" },
  bl: { mirror: true, spin: "rotate-[9deg]" },
  br: { mirror: false, spin: "-rotate-[14deg]" },
};

const pngAccentFlipped: Record<Corner, { mirror: boolean; spin: string }> = {
  tl: { mirror: true, spin: "rotate-[11deg]" },
  tr: { mirror: false, spin: "-rotate-[17deg]" },
  bl: { mirror: true, spin: "-rotate-[9deg]" },
  br: { mirror: false, spin: "rotate-[14deg]" },
};

export function PlantDecoration({
  corner,
  className = "",
  size = 160,
  opacity = 0.55,
  kind = "avif",
  /** Обръща посоката на наклона при същия абсолютен ъгъл */
  flipTilt = false,
}: {
  corner: Corner;
  className?: string;
  size?: number;
  opacity?: number;
  kind?: "avif" | "png";
  flipTilt?: boolean;
}) {
  const src = "/plant.png";
  const png = (flipTilt ? pngAccentFlipped : pngAccent)[corner];
  const outerRot = flipTilt ? cornerRotFlipped[corner] : cornerRot[corner];

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
          className="h-auto w-[min(50vw,300px)] max-w-none drop-shadow-sm md:w-[min(38vw,260px)]"
          sizes="260px"
        />
      </div>
    ) : (
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        className="h-auto w-[min(52vw,320px)] max-w-none drop-shadow-sm md:w-[min(40vw,280px)]"
        sizes="280px"
      />
    );

  return (
    <div
      className={`pointer-events-none absolute z-0 select-none ${cornerPos[corner]} ${outerRot} ${className}`}
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
  clipDecorations = true,
}: {
  children: React.ReactNode;
  className?: string;
  /** false — ъгловите растения не се режат (за допълнителни декорации към ръба) */
  clipDecorations?: boolean;
}) {
  return (
    <div
      className={`relative isolate ${clipDecorations ? "overflow-hidden" : ""} ${className}`}
    >
      <PlantDecoration corner="tr" kind="avif" size={180} opacity={0.45} />
      <PlantDecoration corner="bl" kind="avif" size={140} opacity={0.4} />
      <PlantDecoration corner="tl" kind="png" size={130} opacity={0.34} />
      <PlantDecoration corner="br" kind="png" size={145} opacity={0.32} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
