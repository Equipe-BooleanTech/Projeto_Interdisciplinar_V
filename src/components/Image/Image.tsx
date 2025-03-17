import React from 'react';
import Svg from 'react-native-svg';
import { ImageProps } from './Image.interface';

const Image = ({ svg: SvgComponent, imgWidth, imgHeight, viewBox }: ImageProps) => {
  if (typeof SvgComponent === 'function') {
    return <SvgComponent width={imgWidth} height={imgHeight} />;
  }

  return (
    <Svg width={imgWidth} height={imgHeight} viewBox={viewBox}>
      {SvgComponent}
    </Svg>
  );
};

export default Image;
