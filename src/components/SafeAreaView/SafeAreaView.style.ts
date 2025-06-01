import { theme } from '@/src/theme/theme';
import styled from 'styled-components/native';

export const StyledSafeAreaView = styled.SafeAreaView`
  background-color: ${theme.colors.normalBackground};
  color: ${theme.colors.text};
  flex: 1;
`;

export const SafeAreaViewContent = styled.View`
  flex: 1;
  align-items: center;
  gap: 30px;
  min-height: 100%;
`;
