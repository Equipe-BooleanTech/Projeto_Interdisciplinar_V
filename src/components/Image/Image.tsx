import React, { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { ImageRendererProps } from './Image.interface';
import { Placeholder, Container, StyledImage } from './Image.styles';

const Image: React.FC<ImageRendererProps> = ({ source, style }) => {
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });

  // Se nenhuma imagem for passada, renderiza um placeholder
  if (!source) {
    return <Placeholder style={style} />;
  }

  // Lida com imagens SVG (React Native não suporta SVG out-of-the-box)
  if (typeof source === 'function') {
    const SvgComponent = source;

    const onLayout = (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      setDimensions({ width, height });
    };

    return (
      <Container style={style} onLayout={onLayout}>
        <SvgComponent width={dimensions.width} height={dimensions.height} />
      </Container>
    );
  }

  // Renderiza a imagem
  return <StyledImage source={source} style={style} resizeMode="contain" />;
};

export default Image;
