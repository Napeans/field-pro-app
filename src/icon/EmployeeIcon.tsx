import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const EmployeeIcon = ({ size = 40, color = '#04A554' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="12"
        cy="7"
        r="4"
        stroke={color}
        strokeWidth="2"
      />
      <Path
        d="M4 21c0-4 4-6 8-6s8 2 8 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default EmployeeIcon;
