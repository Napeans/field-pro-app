import React from 'react';
import Svg, { Path } from 'react-native-svg';

const HomeIcon = ({ size = 24, color = '#999' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 11L12 4l9 7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5 10v10h14V10"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </Svg>
);

export default HomeIcon;
