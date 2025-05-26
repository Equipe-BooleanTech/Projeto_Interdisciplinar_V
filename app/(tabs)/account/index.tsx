import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';
import { User } from './types';
import { router } from 'expo-router';

const AccountScreen: React.FC = () => {

    const [user, setUser] = useState<User>({
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        avatar: null,
    });

    const handleChangeAvatar = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert(
                'Permission Required',
                'You need to grant permission to access the photo library.',
                [{ text: 'OK' }],
            );
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!pickerResult.canceled && pickerResult.assets) {
            setUser({ ...user, avatar: pickerResult.assets[0].uri });
        }
    };

    const navigateToEditProfile = () => {
        router.push('/Account', { user });
    };

    return (
        <Container>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
                <Header>
                    <Title>Minha Conta</Title>
                </Header>

                <AvatarContainer>
                    {user.avatar ? (
                        <Avatar source={{ uri: user.avatar }} />
                    ) : (
                        <DefaultAvatar>
                            <AvatarText>{user.name.charAt(0)}</AvatarText>
                        </DefaultAvatar>
                    )}
                    <ChangeAvatarButton onPress={handleChangeAvatar}>
                        <ChangeAvatarText>Mudar foto de perfil</ChangeAvatarText>
                    </ChangeAvatarButton>
                </AvatarContainer>

                <InfoContainer>
                    <InfoItem>
                        <InfoLabel>Nome Completo</InfoLabel>
                        <InfoValue>{user.name}</InfoValue>
                    </InfoItem>

                    <InfoItem>
                        <InfoLabel>E-mail</InfoLabel>
                        <InfoValue>{user.email}</InfoValue>
                    </InfoItem>

                    <InfoItem>
                        <InfoLabel>Celular</InfoLabel>
                        <InfoValue>{user.phone}</InfoValue>
                    </InfoItem>
                </InfoContainer>

                <EditButton onPress={navigateToEditProfile}>
                    <EditButtonText>Editar Perfil</EditButtonText>
                </EditButton>

                <SignOutButton onPress={() => console.log('Sign out')}>
                    <SignOutButtonText>Sign Out</SignOutButtonText>
                </SignOutButton>
            </ScrollView>
        </Container>
    );
};

// Styled components
const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #f8f9fa;
`;

const Header = styled.View`
  padding: 24px 16px 16px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: #333;
`;

const AvatarContainer = styled.View`
  align-items: center;
  margin: 16px 0 24px;
`;

const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: #e1e1e1;
`;

const DefaultAvatar = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: #454F2C;
  justify-content: center;
  align-items: center;
`;

const AvatarText = styled.Text`
  font-size: 48px;
  font-weight: bold;
  color: white;
`;

const ChangeAvatarButton = styled.TouchableOpacity`
  margin-top: 12px;
`;

const ChangeAvatarText = styled.Text`
  color: #454F2C;
  font-size: 16px;
`;

const InfoContainer = styled.View`
  background-color: white;
  margin: 16px;
  border-radius: 12px;
  padding: 16px;
  elevation: 2;
`;

const InfoItem = styled.View`
  margin-bottom: 16px;
`;

const InfoLabel = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

const InfoValue = styled.Text`
  font-size: 16px;
  color: #333;
`;

const EditButton = styled.TouchableOpacity`
  background-color: #454F2C;
  padding: 16px;
  border-radius: 8px;
  margin: 16px;
  align-items: center;
`;

const EditButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

const SignOutButton = styled.TouchableOpacity`
  padding: 16px;
  border-radius: 8px;
  margin: 0 16px;
  align-items: center;
  border: 1px solid #ff4444;
`;

const SignOutButtonText = styled.Text`
  color: #ff4444;
  font-size: 16px;
  font-weight: 600;
`;

export default AccountScreen;