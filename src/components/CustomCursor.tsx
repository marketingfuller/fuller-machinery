"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorType, setCursorType] = useState<"default" | "machine" | "food">("default");
  const [isVisible, setIsVisible] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Hide on touch devices
    if ("ontouchstart" in window) return;

    document.documentElement.classList.add("cursor-hidden");

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check cursor attribute on target element tree
      const target = e.target as HTMLElement;
      const cursorEl = target.closest("[data-cursor]");
      if (cursorEl) {
        const type = cursorEl.getAttribute("data-cursor");
        setCursorType(type as "machine" | "food");
      } else {
        setCursorType("default");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const animate = () => {
      // Smooth follow for ring (lerp)
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafId.current);
      document.documentElement.classList.remove("cursor-hidden");
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
        style={{ width: 8, height: 8 }}
      >
        <div
          className="w-full h-full rounded-full transition-colors duration-200"
          style={{
            backgroundColor: "#4ab84c",
            mixBlendMode: "difference",
          }}
        />
      </div>

      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none will-change-transform"
        style={{ width: 40, height: 40 }}
      >
        {cursorType === "machine" ? (
          /* Gear shape SVG */
          <svg
            viewBox="0 0 40 40"
            className="w-full h-full"
            style={{ animation: "gear-spin 3s linear infinite" }}
          >
            <path
              d="M20 4 L22 8 L26 6 L26 10 L30 10 L28 14 L32 16 L28 18 L30 22 L26 22 L26 26 L22 24 L20 28 L18 24 L14 26 L14 22 L10 22 L12 18 L8 16 L12 14 L10 10 L14 10 L14 6 L18 8 Z"
              fill="none"
              stroke="#4ab84c"
              strokeWidth="1.5"
              opacity="0.8"
            />
            <circle cx="20" cy="16" r="5" fill="none" stroke="#4ab84c" strokeWidth="1.5" opacity="0.8" />
          </svg>
        ) : (
          <div
            className="w-full h-full rounded-full border transition-all duration-200"
            style={{
              borderColor: "#4ab84c",
              mixBlendMode: "difference",
              borderWidth: 2,
            }}
          />
        )}
      </div>
    </>
  );
}
