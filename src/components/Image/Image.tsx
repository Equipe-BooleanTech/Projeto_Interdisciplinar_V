import React from 'react';
import { ImageRendererProps } from './Image.interface';
import { Placeholder, Container, StyledImage } from './Image.styles';

const Image: React.FC<ImageRendererProps> = ({ source, style }) => {
  // Se nenhuma imagem for passada, renderiza um placeholder
  if (!source) {
    return <Placeholder style={style} />;
  }

  // Handle both SVG and regular images
  if (typeof source === 'function') {
    const SvgComponent = source;
    return (
      <Container style={style}>
        <SvgComponent width="100%" height="100%" />
      </Container>
    );
  }

  // Regular image
  return <StyledImage source={source} style={style} resizeMode="contain" />;
};

export default Image;
