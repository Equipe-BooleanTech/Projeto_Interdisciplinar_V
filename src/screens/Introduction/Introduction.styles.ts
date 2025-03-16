// TODO: implementar, se necessário, estilos para a screen.

import styled from 'styled-components/native';

export const Image = styled.Image`
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
  margin-top: 20px;
  width: 90%;
`;

export const Title = styled.Text`
  font-size: 18px;
  line-height: 22px;
  font-weight: bold;
  letter-spacing: -0.15px;
`;

export const Description = styled.Text`
  font-size: 13px;
  line-height: 20px;
  letter-spacing: 0.2px;
  font-weight: 400;
`;
