import styled from 'styled-components/native';
import { StepperProps } from './Stepper.interface';
import { theme } from '@/src/theme/theme';

export const StyledStepper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

export const Step = styled.View<StepperProps>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${(props: StepperProps) =>
    props.isActive ? theme.colors.green : 'transparent'};
  border: 2px solid
    ${(props: StepperProps) => (props.isActive ? 'transparent' : theme.colors.green)};
  margin: 0 5px;
`;
