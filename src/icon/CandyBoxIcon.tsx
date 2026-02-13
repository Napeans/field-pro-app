import React from 'react';
import Svg, { Rect } from 'react-native-svg';

const CandyGridIcon = ({ size = 24, color = '#FF7A00' }) => {
  const dot = 4.2;   // ⬅️ bigger dots
  const gap = 4;     // ⬅️ reduced gap for balance

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {[0, 1, 2].map(row =>
        [0, 1, 2].map(col => (
          <Rect
            key={`${row}-${col}`}
            x={3 + col * (dot + gap)}
            y={3 + row * (dot + gap)}
            width={dot}
            height={dot}
            rx={1.2}
            fill={color}
          />
        ))
      )}
    </Svg>
  );
};

export default CandyGridIcon;
