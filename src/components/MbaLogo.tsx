import React from 'react';

export interface MbaLogoProps {
  className?: string;
  height?: number | string;
  width?: number | string;
}

export const MbaLogo: React.FC<MbaLogoProps> = ({
  className = "",
  height,
  width,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      width={width}
      height={height}
      className={className}
    >
      <defs>
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Mukta:wght@800&display=swap');`}
        </style>
        {/* Beautiful golden gradient for the outer circle border */}
        <linearGradient id="logoGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF275" />
          <stop offset="30%" stopColor="#F4D03F" />
          <stop offset="50%" stopColor="#F9E79F" />
          <stop offset="75%" stopColor="#D35400" />
          <stop offset="100%" stopColor="#F4D03F" />
        </linearGradient>
        
        {/* Drop shadow filter to match the premium, real-life feel of a metallic badge */}
        <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Solid Black Circular Emblem with Drop Shadow */}
      <circle
        cx="250"
        cy="250"
        r="220"
        fill="#090909"
        stroke="url(#logoGoldGrad)"
        strokeWidth="11"
        filter="url(#logoShadow)"
      />
      
      {/* Internal Delicate Inner Ring */}
      <circle
        cx="250"
        cy="250"
        r="205"
        fill="none"
        stroke="url(#logoGoldGrad)"
        strokeWidth="2"
        opacity="0.85"
      />

      {/* Top Bold "MBA" text - slanted/oblique */}
      <text
        x="250"
        y="158"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="900"
        fontSize="86"
        fontStyle="oblique"
        letterSpacing="-1"
      >
        <tspan fill="#E52320">M</tspan>
        <tspan fill="#FFD700">B</tspan>
        <tspan fill="#00A859">A</tspan>
      </text>

      {/* The Three Overlapping Silhouetted T-Shirts with clean borders */}
      <g>
        {/* Left RED Shirt (Rotated slightly outward left) */}
        <path
          d="M 235 185 Q 250 195 265 185 L 218 193 L 208 228 L 223 233 L 226 218 L 228 265 L 272 265 L 274 218 L 277 233 L 292 228 L 282 193 Z"
          fill="#E52320"
          stroke="#000000"
          strokeWidth="2.5"
          strokeLinejoin="round"
          transform="translate(-48, 12) rotate(-8, 250, 225)"
        />
        
        {/* Right GREEN Shirt (Rotated slightly outward right) */}
        <path
          d="M 235 185 Q 250 195 265 185 L 218 193 L 208 228 L 223 233 L 226 218 L 228 265 L 272 265 L 274 218 L 277 233 L 292 228 L 282 193 Z"
          fill="#00A859"
          stroke="#000000"
          strokeWidth="2.5"
          strokeLinejoin="round"
          transform="translate(48, 12) rotate(8, 250, 225)"
        />
        
        {/* Middle BLUE Shirt (Stands prominent in the center) */}
        <path
          d="M 235 185 Q 250 195 265 185 L 218 193 L 208 228 L 223 233 L 226 218 L 228 265 L 272 265 L 274 218 L 277 233 L 292 228 L 282 193 Z"
          fill="#1A3FB5"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinejoin="round"
          transform="translate(0, 5)"
        />
      </g>

      {/* Devanagari "कपड़े वाला" Text in Bold Yellow */}
      <text
        x="250"
        y="346"
        textAnchor="middle"
        fill="#FFDD00"
        fontFamily="'Mukta', 'Hind', 'Noto Sans Devanagari', sans-serif"
        fontWeight="800"
        fontSize="64"
        letterSpacing="0.5"
      >
        कपड़े वाला
      </text>

      {/* Trademark Registered Symbol ® */}
      <text
        x="400"
        y="312"
        fill="#FFFFFF"
        fontFamily="sans-serif"
        fontWeight="bold"
        fontSize="24"
      >
        ®
      </text>
    </svg>
  );
};
