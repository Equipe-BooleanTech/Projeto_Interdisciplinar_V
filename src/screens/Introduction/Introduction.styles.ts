// TODO: implementar, se necessário, estilos para a screen.

import styled from 'styled-components/native';

export const ImageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 90%;
  height: 250px;
`;

export const TextContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 90%;
`;

export const Title = styled.Text`
  font-size: 22px;
  line-height: 22px;
  font-weight: bold;
  letter-spacing: -0.15px;
  text-align: center;
  margin-bottom: 10px;
`;

export const Description = styled.Text`
  font-size: 14px;
  margin-top: 10px;
  line-height: 20px;
  letter-spacing: 0.2px;
  font-weight: 400;
`;
