
"use client";

import { useEffect, useMemo, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCounterStore } from "@/store/counter";
import { LegacySets } from "@/components/shared/counter";

const SIZE = 520;
const CX = 260;
const CY = 260;

const OUTER_RADIUS = 225;
const INNER_RADIUS = 145;
const LABEL_RADIUS = 180;

const ACTIVE_ANGLE = 120;
const GAP_ANGLE = 1.5;

const SLIDE_DURATION = 1.1;
const SLIDE_EASE = [0.22, 1, 0.36, 1] as const;

function round(value: number): number {
  return Number(value.toFixed(3));
}

function polar(radius: number, angle: number) {
  const radians = (angle * Math.PI) / 180;

  return {
    x: round(CX + radius * Math.cos(radians)),
    y: round(CY + radius * Math.sin(radians)),
  };
}

function createSlicePath(startAngle: number, endAngle: number) {
  const start = polar(
    OUTER_RADIUS,
    startAngle + GAP_ANGLE / 2
  );

  const end = polar(
    OUTER_RADIUS,
    endAngle - GAP_ANGLE / 2
  );

  const innerEnd = polar(
    INNER_RADIUS,
    endAngle - GAP_ANGLE / 2
  );

  const innerStart = polar(
    INNER_RADIUS,
    startAngle + GAP_ANGLE / 2
  );

  return [
    `M ${start.x} ${start.y}`,
    `A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 0 1 ${end.x} ${end.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${INNER_RADIUS} ${INNER_RADIUS} 0 0 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

export default function CounterRoundedTable() {
  const gradientId = useId().replace(/:/g, "");
  const shadowId = useId().replace(/:/g, "");

  const {
    isHovered,
    currentIndex,
    setIsHovered,
    setCurrentIndex,
  } = useCounterStore();

  const total = LegacySets.length;

  const activeIndex = total
    ? ((currentIndex % total) + total) % total
    : 0;

  const activeItem = LegacySets[activeIndex];

  const inactiveAngle =
    total > 1
      ? (360 - ACTIVE_ANGLE) / (total - 1)
      : 360;

  // Keep the segments in their original order.
  // The active segment is always rotated to the top.

  // Active item gets the maximum 120° slice.
  // All inactive items share the remaining 240° equally.

  const segments = useMemo(() => {
    if (!total) return [];

    let cursor = -150;

    return LegacySets.map((item, index) => {
      const isActive = index === activeIndex;

      const angle = isActive
        ? ACTIVE_ANGLE
        : inactiveAngle;

      const startAngle = cursor;
      const endAngle = startAngle + angle;
      const middleAngle = (startAngle + endAngle) / 2;

      cursor = endAngle;

      const label = polar(LABEL_RADIUS, middleAngle);

      return {
        ...item,
        originalIndex: index,
        isActive,
        startAngle,
        endAngle,
        middleAngle,
        angle,
        path: createSlicePath(startAngle, endAngle),
        labelX: label.x,
        labelY: label.y,
      };
    });
  }, [activeIndex, total, inactiveAngle]);

  // Calculate the rotation using the actual active slice position.
  // This keeps the largest slice centred at the top.

  const activeSegment = segments[activeIndex];

  const rotation = activeSegment
  ? round(-90 - activeSegment.middleAngle)
  : 0;

  // Autoplay

  useEffect(() => {
    if (isHovered || total <= 1) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((currentIndex + 1) % total);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [
    isHovered,
    currentIndex,
    total,
    setCurrentIndex,
  ]);

  if (!activeItem) return null;

  const handleSelect = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="relative flex w-full flex-col items-center justify-center overflow-visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mx-auto aspect-square w-full max-w-[520px]">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full" role="group" aria-label="Shalimar portfolio selector" >
          <defs>
            <linearGradient
              id={`${gradientId}-active`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#d9bd87" />
              <stop offset="45%" stopColor="#a47c43" />
              <stop offset="100%" stopColor="#78552e" />
            </linearGradient>
            <linearGradient
              id={`${gradientId}-inactive`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#fffdf8" />
              <stop offset="100%" stopColor="#e9ddc8" />
            </linearGradient>
            <filter
              id={shadowId}
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
            >
              <feDropShadow
                dx="0"
                dy="5"
                stdDeviation="6"
                floodColor="#72552f"
                floodOpacity="0.18"
              />
            </filter>
          </defs>
          <circle
            cx={CX}
            cy={CY}
            r={OUTER_RADIUS + 6}
            fill="none"
            stroke="#b18a50"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
          <motion.g
            initial={false}
            animate={{ rotate: rotation }}
            transition={{
              duration: SLIDE_DURATION,
              ease: SLIDE_EASE,
            }}
            style={{
              transformOrigin: `${CX}px ${CY}px`,
            }}
          >
            {segments.map((segment) => (
              <g key={segment.id}>
                <path
                  d={segment.path}
                  fill={
                    segment.isActive
                      ? `url(#${gradientId}-active)`
                      : `url(#${gradientId}-inactive)`
                  }
                  stroke={
                    segment.isActive
                      ? "#f0d9a9"
                      : "#cbb58e"
                  }
                  strokeWidth={segment.isActive ? 2 : 1}
                  filter={
                    segment.isActive
                      ? `url(#${shadowId})`
                      : undefined
                  }
                  className="cursor-pointer outline-none"
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${segment.plateLabel}`}
                  aria-pressed={segment.isActive}
                  onClick={() =>
                    handleSelect(segment.originalIndex)
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" ||
                      event.key === " "
                    ) {
                      event.preventDefault();
                      handleSelect(segment.originalIndex);
                    }
                  }}
                />
                <motion.g
                  initial={false}
                  animate={{ rotate: -rotation }}
                  transition={{
                    duration: SLIDE_DURATION,
                    ease: SLIDE_EASE,
                  }}
                  style={{
                    transformOrigin:
                      `${segment.labelX}px ${segment.labelY}px`,
                  }}
                  pointerEvents="none"
                >
                  <text
                    x={segment.labelX}
                    y={round(segment.labelY - 4)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={
                      segment.isActive
                        ? "#fff9ec"
                        : "#705638"
                    }
                    fontFamily="Georgia, serif"
                    fontSize={segment.isActive ? 13 : 10}
                    fontWeight={segment.isActive ? 600 : 400}
                  >
                    {segment.plateLabel.length > 16
                      ? `${segment.plateLabel.slice(0, 15)}…`
                      : segment.plateLabel}
                  </text>
                </motion.g>
              </g>
            ))}
          </motion.g>
        </svg>
        <div
          className="absolute left-1/2 top-1/2 z-20
            h-[53%] w-[53%] -translate-x-1/2
            -translate-y-1/2 rounded-full
            border-[5px] border-[#d4bc91]
            bg-[#e9dfcd] p-1
            shadow-[0_12px_40px_rgba(91,65,35,0.22)]"
        >
          <div className="relative h-full w-full
            overflow-hidden rounded-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <Image
                  src={activeItem.image}
                  alt={activeItem.plateLabel}
                  fill
                  priority
                  sizes="220px"
                  className="object-cover"
                />
                <div className="absolute inset-0
                  bg-gradient-to-t from-black/70
                  via-black/10 to-transparent" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-x-0
              bottom-[12%] z-10 text-center">
              <span className="text-[10px] uppercase
                tracking-[0.3em] text-[#ead3a6]">
                Shalimar
              </span>
              <p className="font-serif text-base text-white">
                {activeItem.plateLabel}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-20 mt-2 min-h-[125px] w-full max-w-md text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-[9px] uppercase
              tracking-[0.35em] text-[#a17d43]">
              Discover Our Portfolio
            </span>
            <h3 className="mt-2 font-serif text-xl
              text-[#493729] sm:text-2xl">
              {activeItem.title}
            </h3>
            <p className="mt-1 text-xs italic
              text-[#a17d43]">
              {activeItem.subtitle}
            </p>
            <p className="mx-auto mt-2 max-w-sm
              text-xs font-light leading-5
              text-[#817361]">
              {activeItem.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-4 flex items-center gap-2">
        {LegacySets.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Select ${item.plateLabel}`}
            aria-current={activeIndex === index}
            onClick={() => handleSelect(index)}
            className={`h-1 rounded-full
              transition-all duration-500 ${
                activeIndex === index
                  ? "w-7 bg-[#a47c43]"
                  : "w-2 bg-[#c9b895] hover:bg-[#a47c43]"
              }`}
          />
        ))}
      </div>
    </div>
  );
}
