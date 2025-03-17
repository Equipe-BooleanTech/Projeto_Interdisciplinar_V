import styled from 'styled-components/native';
import { ViewProps, ImageProps } from 'react-native';

export const Container = styled.View<ViewProps>`
  width: 100%;
  height: 250px;
  justify-content: center;
  align-items: center;
`;

export const StyledImage = styled.Image<ImageProps>`
  width: 100%;
  height: 300px;
`;

export const Placeholder = styled.View<ViewProps>`
  width: 100%;
  height: 300px;
  background-color: #f0f0f0;
`;
