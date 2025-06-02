// TextInputStyles.ts
import styled from 'styled-components/native';
import { TextInput } from 'react-native';

export const InputContainer = styled.View`
  margin-bottom: 15px;
  width: 100%;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 8px;
  background-color: #fff;
  padding-horizontal: 10px;
`;

export const StyledTextInput = styled(TextInput)`
  flex: 1;
  height: 50px;
  color: #333;
  font-size: 16px;
  padding-vertical: 0;
`;

export const IconContainer = styled.TouchableOpacity`
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

export const ErrorText = styled.Text`
  font-size: 12px;
  color: #ff3333;
  margin-top: 5px;
`;

export const DisabledOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
`;