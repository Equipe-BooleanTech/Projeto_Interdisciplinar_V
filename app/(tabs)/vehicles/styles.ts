import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #dad6c7;
  padding: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

export const IconButton = styled.TouchableOpacity`
  width: 35px;
  height: 35px;
  background-color: #3d442b;
  color: #fff;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

export const ProfileButton = styled.TouchableOpacity`
  margin-left: auto;
  width: 35px;
  height: 35px;
  border: 2px solid #000;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

export const Card = styled.TouchableOpacity`
  background-color: #fff;
  border-radius: 12px;
  width: 42%;
  margin: 10px;
  padding: 10px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
  border: 1px solid #ccc;
  min-height: 100px;
  cursor: pointer;
`;

export const VehicleName = styled.Text`
  font-size: 23px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const VehicleImage = styled.Image`
  width: 100px;
  height: 150px;
  resize-mode: contain;
  margin-bottom: 10px;
`;

export const PlateText = styled.Text`
  font-size: 14px;
  font-weight: 500;
`;

export const AddCard = styled(Card)`
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 2px dashed #ccc;
  min-height: 225px;
`;

export const EmptyStateContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const EmptyStateText = styled.Text`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-bottom: 20px;
`;