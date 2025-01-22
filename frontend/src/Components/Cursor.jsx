import React, { useEffect, useRef } from "react";
import "../Style/cursor.css"; // Assuming your CSS file is named "cursor.css"

const Cursor = () => {
  const cursorRef = useRef(null);
  const circlesRef = useRef([]);

  useEffect(() => {
    const coords = { x: 0, y: 0 };

    // Initialize circle styles outside handleMouseMove
    circlesRef.current.forEach((circle) => {
      if (circle) {
        circle.style.backgroundColor = "white";
        circle.style.left = `${coords.x - 12}px`;
        circle.style.top = `${coords.y - 12}px`;
      }
    });

    const handleMouseMove = (e) => {
      coords.x = e.clientX;
      coords.y = e.clientY;

      // Move cursor and circles efficiently using spread syntax
      cursorRef.current.style.transform = `translate(${coords.x}px, ${coords.y}px)`;
      circlesRef.current.forEach((circle, index) => {
        if (circle) {
          const scale = (circlesRef.current.length - index) / circlesRef.current.length;
          circle.style.transform = `translate(-25%, -25%) scale(${scale})`; 
        }
      });
    };

    const animate = () => {
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate(); 

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="cursor" ref={cursorRef}>
      {[...Array(20)].map((_, index) => (
        <div key={index} className="cursor-circle" ref={(el) => (circlesRef.current[index] = el)} />
      ))}
    </div>
  );
};

export default Cursor;