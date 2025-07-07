import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint
    };

    // Run on mount
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  const styleRing = {
    left: `${position.x - 16}px`,
    top: `${position.y - 16}px`,
  };

  const styleDot = {
    left: `${position.x - 5}px`,
    top: `${position.y - 5}px`,
  };

  return (
    <>
      {/* Outer Ring */}
      <div
        className={`fixed z-[9999] w-8 h-8 border-2 border-orange-500 rounded-full pointer-events-none transition-opacity duration-200 ease-out ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={styleRing}
      />
      {/* Dot */}
      <div
        className={`fixed z-[9999] w-2.5 h-2.5 bg-orange-500 rounded-full pointer-events-none transition-opacity duration-150 ease-out ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={styleDot}
      />
    </>
  );
};

export default CustomCursor;
