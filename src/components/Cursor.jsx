import React, { useEffect } from "react";

const Cursor = () => {
  useEffect(() => {
    // Initialize cursor elements
    const cursorDot = document.getElementById("cursor-dot");
    const cursorRing = document.getElementById("cursor-ring");

    if (!cursorDot || !cursorRing) return;

    // Update cursor position for mouse
    const moveCursor = (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      // Add slight delay to ring movements for smooth effect
      cursorRing.style.left = `${posX - 15}px`;
      cursorRing.style.top = `${posY - 15}px`;
    };

    // Update cursor position for touch
    const moveCursorTouch = (e) => {
      const touch = e.touches[0];
      const posX = touch.clientX;
      const posY = touch.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;
      cursorRing.style.left = `${posX - 15}px`;
      cursorRing.style.top = `${posY - 15}px`;

      // Prevent scrolling while touching
      e.preventDefault();
    };

    // Add hover effect
    const addHoverClass = () => {
      cursorDot.classList.add("cursor-hover");
      cursorRing.classList.add("cursor-hover");
    };

    const removeHoverClass = () => {
      cursorDot.classList.remove("cursor-hover");
      cursorRing.classList.remove("cursor-hover");
    };

    // Add click/touch effect
    const addClickClass = () => {
      cursorDot.classList.add("cursor-clicking");
      cursorRing.classList.add("cursor-clicking");
    };

    const removeClickClass = () => {
      cursorDot.classList.remove("cursor-clicking");
      cursorRing.classList.remove("cursor-clicking");
    };

    // Hide cursor when mouse/touch leaves window
    const hideCursor = () => {
      cursorDot.style.opacity = "0";
      cursorRing.style.opacity = "0";
    };

    // Show cursor when mouse/touch enters window
    const showCursor = () => {
      cursorDot.style.opacity = "1";
      cursorRing.style.opacity = "1";
    };

    // Add event listeners for mouse
    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mousedown", addClickClass);
    document.addEventListener("mouseup", removeClickClass);
    window.addEventListener("mouseleave", hideCursor);
    window.addEventListener("mouseenter", showCursor);

    // Add event listeners for touch
    window.addEventListener("touchstart", showCursor);
    window.addEventListener("touchmove", moveCursorTouch, { passive: false });
    window.addEventListener("touchend", hideCursor);
    document.addEventListener("touchstart", addClickClass);
    document.addEventListener("touchend", removeClickClass);

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll(
      "button, a, input, select, textarea, .interactive, [role='button']"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseover", addHoverClass);
      el.addEventListener("mouseleave", removeHoverClass);
      el.addEventListener("touchstart", addHoverClass);
      el.addEventListener("touchend", removeHoverClass);
    });

    // Cleanup event listeners
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mousedown", addClickClass);
      document.removeEventListener("mouseup", removeClickClass);
      document.removeEventListener("mouseleave", hideCursor);
      document.removeEventListener("mouseenter", showCursor);

      window.removeEventListener("touchstart", showCursor);
      window.removeEventListener("touchmove", moveCursorTouch);
      window.removeEventListener("touchend", hideCursor);
      document.removeEventListener("touchstart", addClickClass);
      document.removeEventListener("touchend", removeClickClass);

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseover", addHoverClass);
        el.removeEventListener("mouseleave", removeHoverClass);
        el.removeEventListener("touchstart", addHoverClass);
        el.removeEventListener("touchend", removeHoverClass);
      });
    };
  }, []);

  return (
    <>
      <style>
        {`
          /* Hide default cursor */
          * {
            cursor: none !important;
          }

          /* Custom cursor dot */
          .cursor-dot {
            width: 8px;
            height: 8px;
            background: #fff;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 99999;
            transition: all 0.1s ease;
            box-shadow: 0 0 10px #fca311;
          }

          /* Custom cursor rings */
          .cursor-ring {
            width: 40px;
            height: 40px;
            border: 2px solid rgba(252, 163, 17, 0.8);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 99998;
            transition: all 0.15s ease-out;
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
          }

          /* Hover effects */
          .cursor-hover.cursor-dot {
            transform: scale(3);
            background: #fff;
            box-shadow: 0 0 15px rgba(252, 163, 17, 0.8);
            mix-blend-mode: lighten;
          }

          .cursor-hover.cursor-ring {
            border-color: rgba(252, 163, 17, 0.9);
            background: rgba(252, 163, 17, 0.1);
            transform: scale(0.8);
            animation: none;
          }

          /* Click effects */
          .cursor-clicking.cursor-dot {
            transform: scale(0.5);
            background: #ffffff;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
            animation: pulse
          }

          .cursor-clicking.cursor-ring {
            transform: scale(0.9);
            border-color: #ffffff;
            background: rgba(255, 255, 255, 0.1);
          }

          /* Hide cursor on mobile/touch devices */
          @media (hover: none) and (pointer: coarse) {
            * {
              cursor: auto !important;
            }
            .cursor-dot, .cursor-ring {
              display: none !important;
            }
          }
        `}
      </style>

      <div className="hidden lg:block cursor-dot" id="cursor-dot"></div>
      <div className="hidden lg:block cursor-ring" id="cursor-ring"></div>
    </>
  );
};

export default Cursor;
