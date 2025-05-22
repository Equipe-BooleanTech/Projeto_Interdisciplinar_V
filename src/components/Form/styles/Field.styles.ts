import MaskInput from 'react-native-mask-input';
import { Picker } from '@react-native-picker/picker';
import styled from 'styled-components/native';

export const StyledMaskedInput = styled(MaskInput)`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
`;

export const StyledPicker = styled(Picker)`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
`;


