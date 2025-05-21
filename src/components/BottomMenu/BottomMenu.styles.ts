import styled from "styled-components/native";

export const BottomMenu = styled.View`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: #454F2C;
  padding-vertical: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 20px;
  border-top-width: 1px;
  border-top-color: #ccc;
  z-index: 10;
`;

export const MenuSide = styled.View`
  flex-direction: row;
  gap: 25px;
`;

export const MenuItem = styled.View`
  align-items: center;
  justify-content: center;
`;

export const MenuIcon = styled.Image`
  width: 24px;
  height: 24px;
  resize-mode: contain;
  margin-bottom: 4px;
`;

export const MenuText = styled.Text`
  font-size: 12px;
  color: #fff;
  font-weight: bold;
`;

export const AddButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  margin-horizontal: 10px;
  elevation: 5;
`;

export const AddButtonText = styled.Text`
  font-size: 36px;
  color: #454F2C;
  font-weight: bold;
  margin-top: -7px;
`;