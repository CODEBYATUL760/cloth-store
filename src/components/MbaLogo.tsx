/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface MbaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function MbaLogo({ className = '', size = 'md' }: MbaLogoProps) {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12 md:w-14 md:h-14',
    lg: 'w-16 h-16 md:w-20 md:h-20',
    xl: 'w-24 h-24 md:w-28 md:h-28',
  };

  const dimensions = sizeMap[size];

  return (
    <div className={`flex items-center justify-center select-none ${dimensions} ${className}`} id="mba-kapdewala-badge-logo">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Circle borders */}
        <circle cx="50" cy="50" r="48" fill="#000000" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="45" fill="#141414" stroke="#8E8E93" strokeWidth="1" />
        
        {/* MBA Text: Slanted, extra bold */}
        <text
          x="50"
          y="39"
          textAnchor="middle"
          fontWeight="900"
          fontSize="17"
          fontStyle="italic"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.2"
        >
          <tspan fill="#EF4444">M</tspan>
          <tspan fill="#EAB308">B</tspan>
          <tspan fill="#10B981">A</tspan>
        </text>

        {/* Group for the overlapping shirts */}
        <g id="overlapping-shirts" transform="translate(0, 1)">
          {/* 1. Left Shirt (Red) - rendered first */}
          <g transform="translate(41, 51) scale(0.65)">
            <path
              d="M -5,-6 L -9,-6 L -11,-1 L -8,0 L -8,8 L 8,8 L 8,0 L 11,-1 L 9,-6 L 5,-6 C 3,-4.5 -3,-4.5 -5,-6 Z"
              fill="#EF4444"
              stroke="#000000"
              strokeWidth="0.75"
              strokeLinejoin="round"
            />
          </g>

          {/* 2. Right Shirt (Green) - rendered second */}
          <g transform="translate(59, 51) scale(0.65)">
            <path
              d="M -5,-6 L -9,-6 L -11,-1 L -8,0 L -8,8 L 8,8 L 8,0 L 11,-1 L 9,-6 L 5,-6 C 3,-4.5 -3,-4.5 -5,-6 Z"
              fill="#10B981"
              stroke="#000000"
              strokeWidth="0.75"
              strokeLinejoin="round"
            />
          </g>

          {/* 3. Middle Shirt (Blue) - rendered last to overlap both */}
          <g transform="translate(50, 50.5) scale(0.72)">
            <path
              d="M -5,-6 L -9,-6 L -11,-1 L -8,0 L -8,8 L 8,8 L 8,0 L 11,-1 L 9,-6 L 5,-6 C 3,-4.5 -3,-4.5 -5,-6 Z"
              fill="#2563EB"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
          </g>
        </g>

        {/* "कपड़े वाला" in Yellow */}
        <text
          x="47"
          y="69"
          textAnchor="middle"
          fill="#FACC15"
          fontWeight="bold"
          fontSize="11"
          fontFamily="'Inter', 'Noto Sans Devanagari', sans-serif"
          letterSpacing="0.2"
        >
          कपड़े वाला
        </text>

        {/* Trademark symbol ® */}
        <text
          x="75"
          y="65"
          fill="#FFFFFF"
          fontWeight="medium"
          fontSize="5"
          fontFamily="sans-serif"
        >
          ®
        </text>
      </svg>
    </div>
  );
}
