import { theme } from "@/theme";
import { Picker } from "@react-native-picker/picker";
import styled from "styled-components/native";

export const SelectContainer = styled.View`
  width: 100%;
  margin-bottom: 16px;
  display: flex;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: ${theme.colors.text};
`;

export const SelectTrigger = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  padding: 0 16px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  justify-content: center;
`;

export const SelectValue = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text};
  font-weight: 400;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const PickerContainer = styled.View`
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom-width: 1px;
`;

export const ButtonText = styled.Text`
  color: ${theme.colors.green};
  font-size: 16px;
  font-weight: ${props => props.bold ? '700' : '400'};
`;

export const StyledPicker = styled(Picker)`
  width: 100%;
  height: 200px;
`;

export const AndroidPicker = styled(Picker)`
  width: 100%;
  height: 50px;
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 0 10px;
  border: 1px solid #ccc;
`;

export const ErrorText = styled.Text`
  color: ${theme.colors.danger};
  font-size: 12px;
  margin-top: 4px;
`;
