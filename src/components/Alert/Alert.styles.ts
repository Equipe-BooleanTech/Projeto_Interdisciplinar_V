import { theme } from '@/theme';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.normalBackground};
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Message = styled.Text`
  text-align: center;
  margin-bottom: 20px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  align-items: center;
  margin: 20px auto;
`;

export const CancelButton = styled.Button`
  border: 1px solid ${theme.colors.green};
  background-color: transparent;
  padding: 10px;
  border-radius: 5px;
`;

export const ConfirmButton = styled.Button`
  background-color: ${theme.colors.green};
  padding: 10px;
  border-radius: 5px;
`;
