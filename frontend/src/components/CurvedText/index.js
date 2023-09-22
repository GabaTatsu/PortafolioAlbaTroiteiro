import React, { useState, useEffect } from "react";
import "./style.css";

const CurvedText = ({ text, invert }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [height, setHeight] = useState(invert === "SI" ? 60 : 14);
    const [deg, setDeg] = useState(invert === "SI"? (60 / text.length) : 0);
    const [translateX, setTranslateX] = useState(invert === "SI" ? 0 : 11);
   
    const radius = 90;
  
    useEffect(() => {
        setTimeout(() => {
          setIsAnimating(true);
          setHeight(invert === "SI" ? 14 : 60);
          setDeg(invert === "SI" ? 0 : (60 / text.length));
          setTranslateX(invert === "SI" ? 11 : 0);
        }, 500);
      }, []);

    return (
      <div 
      className={`spinning-text-wrapper ${isAnimating ? "animating" : ""}`}
      style={{
        height: `${height}px`,
    }}
      >
        <div 
        className="spinning-text"
        style={{
            top: `89px`,
        }}
        >
          <p>
            {text.split("").map((letra, i) => (
              <span
                key={i}
                style={{
                  transform: `rotate(${deg * i}deg) translate(${translateX*i}px, -${radius}px)`,
                  transition: isAnimating ? "transform 2s ease" : "none",
                }}
              >
                {letra}
              </span>
            ))}
          </p>
        </div>
      </div>
    );
  };

export default CurvedText;