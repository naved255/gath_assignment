import React from "react";
import "./FloatingBubbles.css";

const FloatingBubbles = () => {
  const bubbles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 50 + 10,
    startX: Math.random() * 100,
    duration: Math.random() * 6 + 6,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.3,
  }));

  return (
    <div className="bubble-container inset-0 z-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.startX}%`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
            opacity: bubble.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBubbles;