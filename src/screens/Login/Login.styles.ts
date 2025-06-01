import styled from 'styled-components/native';

export const CenteredView = styled.View`
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
`;

export const LoginTextContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 24px;
  gap: 4px;
`;

export const Container = styled.View`
  background-color: #dfddd1;
  align-items: center;
  padding: 20px;
`;

export const IconContainer = styled.View`
  margin-top: 0;
  margin-bottom: 0;
`;

export const Icon = styled.Image`
  width: 100px;
  height: 100px;
  resize-mode: contain;
`;

export const FormContainer = styled.View`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 5px;
  elevation: 5;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
`;

export const TitleInput = styled.Text`
  font-size: 16px;
  color: #666;
  margin-top: 10px;
  margin-bottom: 5px;
  margin-end: auto;
`;

export const SignupText = styled.Text`
  color: #454f2c;
  font-weight: bold;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background-color: #f2f2f2;
  padding-horizontal: 15px;
  margin-bottom: 15px;
`;

export const CheckboxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  margin-end: auto;
`;

export const Checkbox = styled.View`
  width: 20px;
  height: 20px;
  border-width: 1px;
  border-color: #666;
  border-radius: 5px;
  margin-right: 10px;
  margin-top: 20px;
  margin-end: auto;
  ${(props) => props.checked && `background-color: #fff;`}
`;

export const Checkmark = styled.Text`
  color: #000;
  font-size: 18px;
  font-weight: bold;
  margin-left: 2.5px;
  margin-top: -3px;
`;

export const CheckboxLabel = styled.Text`
  color: #666;
  font-size: 16px;
  margin-top: 20px;
`;

export const LoginButton = styled.TouchableOpacity`
  background-color: #454f2c;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;

export const OrText = styled.Text`
  font-size: 16px;
  color: #666;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const GoogleButton = styled.TouchableOpacity`
  background-color: #fff;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  border-width: 1px;
  border-color: #454f2c;
`;

export const OutlinedButtonText = styled.Text`
  font-size: 16px;
  color: #454f2c;
  font-weight: bold;
`;

export const PhoneButton = styled.TouchableOpacity`
  background-color: #fff;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #454f2c;
`;

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const ModalBackground = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ModalBox = styled.View`
  background-color: white;
  padding-vertical: 30px;
  padding-horizontal: 10px;
  border-radius: 12px;
  elevation: 5;
  align-items: center;
  width: 70%;
  z-index: 2;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 10px;
`;

export const ModalMessage = styled.Text`
  font-size: 15px;
`;
