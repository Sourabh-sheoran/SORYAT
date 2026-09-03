"use client";

/**
 * CardSwap Component
 * Highly polished 3D card stack animation with automatic cycling,
 * manual controls, pause-on-hover, and exceptional visual contrast in both Light & Dark modes.
 */
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, children, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`absolute top-1/2 left-1/2 rounded-3xl border border-black/15 dark:border-white/20 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.7)] [transform-style:preserve-3d] [will-change:transform,opacity] [backface-visibility:hidden] overflow-hidden transition-colors duration-300 ${
        customClass ?? ""
      } ${rest.className ?? ""}`.trim()}
    >
      {/* Top subtle highlight rim */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/30 to-transparent pointer-events-none" />
      {children}
    </div>
  )
);

Card.displayName = "Card";

interface Slot {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  zIndex: number;
}

const makeSlot = (
  i: number,
  distX: number,
  distY: number,
  total: number
): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 2,
  scale: Math.max(1 - i * 0.04, 0.75),
  opacity: i === 0 ? 1 : Math.max(1 - i * 0.12, 0.45),
  zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) => {
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    scale: slot.scale,
    opacity: slot.opacity,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });
};

export const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 360,
  cardDistance = 35,
  verticalDistance = 35,
  delay = 4000,
  pauseOnHover = true,
  onCardClick,
  skewAmount = 4,
  children,
}) => {
  const childArr = React.useMemo(
    () => Children.toArray(children) as ReactElement<CardProps>[],
    [children]
  );
  const total = childArr.length;

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const orderRef = useRef<number[]>(Array.from({ length: total }, (_, i) => i));
  const isAnimatingRef = useRef(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Set initial 3D positions
  useEffect(() => {
    orderRef.current = Array.from({ length: total }, (_, i) => i);
    cardRefs.current.forEach((el, i) => {
      if (el) {
        placeNow(
          el,
          makeSlot(i, cardDistance, verticalDistance, total),
          skewAmount
        );
      }
    });
  }, [total, cardDistance, verticalDistance, skewAmount]);

  const swapNext = () => {
    if (isAnimatingRef.current || total < 2) return;
    isAnimatingRef.current = true;

    const currentOrder = [...orderRef.current];
    const frontIdx = currentOrder[0];
    const rest = currentOrder.slice(1);
    const frontEl = cardRefs.current[frontIdx];

    if (!frontEl) {
      isAnimatingRef.current = false;
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        orderRef.current = [...rest, frontIdx];
        setActiveCardIndex(rest[0]);
        isAnimatingRef.current = false;
      },
    });

    // 1. Front card drops down and fades out
    tl.to(
      frontEl,
      {
        y: "+=380",
        opacity: 0,
        scale: 0.9,
        duration: 0.55,
        ease: "power2.in",
      },
      0
    );

    // 2. Remaining cards slide forward into new slots
    rest.forEach((idx, i) => {
      const el = cardRefs.current[idx];
      if (!el) return;
      const slot = makeSlot(i, cardDistance, verticalDistance, total);

      // elevate zIndex right at beginning
      tl.set(el, { zIndex: slot.zIndex }, 0.05);

      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          scale: slot.scale,
          opacity: slot.opacity,
          duration: 0.65,
          ease: "power3.out",
        },
        0.08 + i * 0.02
      );
    });

    // 3. Teleport front card to the back and slide it in
    const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total);
    tl.set(
      frontEl,
      {
        x: backSlot.x,
        y: backSlot.y + 180,
        z: backSlot.z,
        scale: backSlot.scale,
        skewY: skewAmount,
        xPercent: -50,
        yPercent: -50,
        zIndex: backSlot.zIndex,
        opacity: 0,
      },
      0.5
    );

    tl.to(
      frontEl,
      {
        y: backSlot.y,
        opacity: backSlot.opacity,
        duration: 0.5,
        ease: "power2.out",
      },
      0.55
    );
  };

  const swapPrev = () => {
    if (isAnimatingRef.current || total < 2) return;
    isAnimatingRef.current = true;

    const currentOrder = [...orderRef.current];
    const backIdx = currentOrder[total - 1];
    const rest = currentOrder.slice(0, total - 1);
    const backEl = cardRefs.current[backIdx];

    if (!backEl) {
      isAnimatingRef.current = false;
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        orderRef.current = [backIdx, ...rest];
        setActiveCardIndex(backIdx);
        isAnimatingRef.current = false;
      },
    });

    // 1. Move current stack back one slot
    rest.forEach((idx, i) => {
      const el = cardRefs.current[idx];
      if (!el) return;
      const slot = makeSlot(i + 1, cardDistance, verticalDistance, total);
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          scale: slot.scale,
          opacity: slot.opacity,
          duration: 0.55,
          ease: "power3.out",
        },
        0
      );
      tl.set(el, { zIndex: slot.zIndex }, 0.2);
    });

    // 2. Bring back card to bottom below screen
    tl.set(
      backEl,
      {
        x: 0,
        y: 380,
        z: 0,
        scale: 0.9,
        zIndex: total + 1,
        opacity: 0,
      },
      0
    );

    // 3. Animate back card up into front slot
    const frontSlot = makeSlot(0, cardDistance, verticalDistance, total);
    tl.to(
      backEl,
      {
        x: frontSlot.x,
        y: frontSlot.y,
        z: frontSlot.z,
        scale: frontSlot.scale,
        opacity: 1,
        duration: 0.65,
        ease: "power3.out",
      },
      0.15
    );
  };

  // Auto-cycle interval
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      swapNext();
    }, delay);

    return () => clearInterval(timer);
  }, [delay, isPaused, total]);

  return (
    <div className="flex flex-col items-center w-full">
      {/* 3D Stage */}
      <div
        ref={containerRef}
        className="relative perspective-[1200px] transform-gpu mx-auto w-full select-none"
        style={{
          height:
            Number(height) + Number(verticalDistance) * (total - 1) + 40,
        }}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      >
        <div className="absolute inset-0 [transform-style:preserve-3d]">
          {childArr.map((child, i) =>
            isValidElement<CardProps>(child)
              ? cloneElement(child, {
                  key: i,
                  ref: (el: HTMLDivElement | null) => {
                    cardRefs.current[i] = el;
                  },
                  style: {
                    width: typeof width === "number" ? `${width}px` : width,
                    height: typeof height === "number" ? `${height}px` : height,
                    maxWidth: "92vw",
                    ...(child.props.style ?? {}),
                  },
                  onClick: (e: React.MouseEvent<HTMLDivElement>) => {
                    // If clicked front card, swap to next
                    if (orderRef.current[0] === i) {
                      swapNext();
                    }
                    child.props.onClick?.(e);
                    onCardClick?.(i);
                  },
                } as CardProps & React.RefAttributes<HTMLDivElement>)
              : child
          )}
        </div>
      </div>

      {/* Interactive Controls & Pagination */}
      <div className="flex items-center justify-between gap-4 mt-8 px-4 py-2 rounded-full border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 backdrop-blur-md">
        <button
          onClick={swapPrev}
          aria-label="Previous pillar"
          className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/15 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-all"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-1.5 px-2">
          {childArr.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeCardIndex === idx
                  ? "w-6 bg-black dark:bg-white"
                  : "w-1.5 bg-black/20 dark:bg-white/20"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setIsPaused((prev) => !prev)}
          aria-label={isPaused ? "Play animation" : "Pause animation"}
          className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/15 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-all"
        >
          {isPaused ? <Play size={14} /> : <Pause size={14} />}
        </button>

        <button
          onClick={swapNext}
          aria-label="Next pillar"
          className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/15 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-all"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default CardSwap;
