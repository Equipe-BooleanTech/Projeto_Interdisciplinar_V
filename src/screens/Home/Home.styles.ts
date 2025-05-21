// ---------------------------------------------
// Old styles converted to styled components
// ---------------------------------------------

import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: #EEEDEB;
  align-items: center;
`;

export const IconContainer = styled.View`
  margin-top: 0px;
  margin-bottom: 0px;
`;

export const HeaderMonth = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const MonthText = styled.Text`
  width: 100px;
  font-size: 18px;
  margin-horizontal: 16px;
  font-weight: bold;
  text-align: center;
`;

export const ArrowLeft = styled.Text`
  font-size: 24px;
  font-weight: bold;
  padding-right: 60px;
`;

export const ArrowRight = styled.Text`
  font-size: 24px;
  font-weight: bold;
  padding-left: 60px;
`;

export const TitleText = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  padding-top: 20px;
`;

export const FilterRow = styled.View`
  width: 90%;
  padding-vertical: 8px;
  margin: 20px;
  flex-direction: row;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 20px;
`;

export const FilterButton = styled.TouchableOpacity`
  width: 45%;
  align-items: center;
  padding-vertical: 12px;
  padding-horizontal: 50px;
  border-radius: 15px;
  margin-horizontal: 5px;
  font-weight: bold;
  background-color: transparent;
`;

export const FilterButtonActive = styled(FilterButton)`
  background-color: #fff;
`;

export const TotalText = styled.Text`
  text-align: center;
  font-size: 18px;
  margin-top: 8px;
  font-weight: bold;
`;

export const TotalSubText = styled.Text`
  text-align: center;
  font-size: 14px;
  margin-top: 8px;
  color: #888;
`;

export const ChartContainer = styled.View`
  width: ${width}px;
  align-items: center;
  padding-vertical: 20px;
`;

export const IndicatorContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const Indicator = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin: 4px;
  background-color: #AAA;
`;

export const IndicatorActive = styled(Indicator)`
  background-color: #333;
`;

export const TotalGasto = styled.Text`
  text-align: center;
  margin-top: 12px;
  font-size: 16px;
`;

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
  right: 0;
  bottom: 0;
  left: 0;
`;

export const ModalBox = styled.View`
  background-color: white;
  padding-vertical: 30px;
  padding-horizontal: 60px;
  border-radius: 12px;
  elevation: 5;
  align-items: center;
  z-index: 2;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const ModalValue = styled.Text`
  font-size: 18px;
  color: #444;
`;