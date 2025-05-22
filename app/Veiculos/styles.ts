// styles.ts
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #dcd8c8;
  padding: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`;

export const IconButton = styled.TouchableOpacity`
  background-color: #3f442b;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const ProfileButton = styled.TouchableOpacity`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  border: 1px solid #000;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #3f3f3f;
  text-align: center;
  margin: 16px 0;
`;

export const VehicleGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const VehicleCard = styled.TouchableOpacity`
  background-color: #fff;
  width: ${(width - 72) / 2}px;  // Slightly narrower
  border-radius: 10px;  // Smaller border radius
  padding: 8px;  // Less padding
  margin-bottom: 12px;  // Less margin
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 2;
`;

export const VehicleImage = styled.Image`
  width: 80px;  // Smaller image
  height: 50px;  // Smaller image
  resize-mode: contain;
  margin-bottom: 6px;  // Less spacing
`;

export const VehicleLabel = styled.Text`
  font-weight: bold;
  font-size: 14px;  // Smaller font
`;

export const VehiclePlate = styled.Text`
  font-size: 12px;  // Smaller font
  color: #333;
`;

export const AddCard = styled.TouchableOpacity`
  background-color: #fff;
  width: ${(width - 72) / 2}px;  // Slightly narrower
  height: 110px;  // Reduced height
  border-radius: 10px;  // Smaller border radius
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 2;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 12px 0;
  background-color: #3f442b;
`;

export const FooterButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const AddButton = styled.TouchableOpacity`
  background-color: #fff;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  margin-top: -30px;
`;

export const FooterIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

export const CenteredView = styled.View`
  align-items: center;
  justify-content: center;
`;
