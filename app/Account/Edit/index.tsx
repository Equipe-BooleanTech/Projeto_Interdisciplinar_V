import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { User } from '@/src/@types';
import { router, useLocalSearchParams } from 'expo-router';

const EditProfileScreen: React.FC = () => {
  const params = useLocalSearchParams();

    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [changesMade, setChangesMade] = useState(false);

  useEffect(() => {
    // If user was passed via params
    if (params.user) {
      try {
        const userData = typeof params.user === 'string'
          ? JSON.parse(params.user)
          : params.user;
        setUser(userData);
      } catch (e) {
        console.error('Error parsing user data:', e);
        Alert.alert('Error', 'Could not load user data');
      }
    } else {
      // Optional: Fetch user data from API if not provided in params
      // fetchUserData();
    }
  }, [params]);
  
    const handleInputChange = (field: keyof User, value: string) => {
        setUser({ ...user, [field]: value });
        setChangesMade(true);
    };

    const handleSave = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setChangesMade(false);
            Alert.alert('Success', 'Your profile has been updated!');
            router.back();
        }, 1500);
    };

    return (
        <Container>
            <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
                    <Header>
                        <BackButton onPress={() => router.push('/(tabs)/account')}>
                            <Feather name="chevron-left" size={28} color="#454F2C" />
                        </BackButton>
                        <HeaderTitle>Editar Perfil</HeaderTitle>
                        <SaveButton
                            onPress={handleSave}
                            disabled={!changesMade || isLoading}
                        >
                            {isLoading ? (
                                <LoadingIndicator size="small" color="#454F2C" />
                            ) : (
                                <SaveButtonText disabled={!changesMade}>Salvar</SaveButtonText>
                            )}
                        </SaveButton>
                    </Header>

                    <AvatarSection>
                        <AvatarContainer>
                            {user?.avatar ? (
                                <Avatar source={{ uri: user?.avatar }} />
                            ) : (
                                <DefaultAvatar>
                                    <AvatarText>{user?.name.charAt(0)}</AvatarText>
                                </DefaultAvatar>
                            )}
                            <EditAvatarButton>
                                <MaterialIcons name="edit" size={20} color="white" />
                            </EditAvatarButton>
                        </AvatarContainer>
                    </AvatarSection>

                    <FormContainer>
                        <InputContainer>
                            <InputLabel>Nome Completo</InputLabel>
                            <TextInput
                                value={user?.name}
                                onChangeText={(text) => handleInputChange('name', text)}
                                placeholder="Digite seu nome completo..."
                            />
                            <MaterialIcons name="person" size={20} color="#999" style={styles.icon} />
                        </InputContainer>

                        <InputContainer>
                            <InputLabel>Email</InputLabel>
                            <TextInput
                                value={user?.email}
                                onChangeText={(text) => handleInputChange('email', text)}
                                placeholder="Digite seu email..."
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <MaterialIcons name="email" size={20} color="#999" style={styles.icon} />
                        </InputContainer>

                        <InputContainer>
                            <InputLabel>Número de Celular</InputLabel>
                            <TextInput
                                value={user?.phone}
                                onChangeText={(text) => handleInputChange('phone', text)}
                                placeholder="Digite o número do seu celular..."
                                keyboardType="phone-pad"
                            />
                            <Feather name="phone" size={20} color="#999" style={styles.icon} />
                        </InputContainer>

                        <DeleteAccountButton onPress={() => Alert.alert('Confirme a exclusão', 'Tem certeza que deseja excluir sua conta?')}>
                            <DeleteAccountText>Excluir Conta</DeleteAccountText>
                        </DeleteAccountButton>
                    </FormContainer>
                </ScrollView>
            </KeyboardAvoidingView>
        </Container>
    );
};

const styles = {
    icon: {
        position: 'absolute',
        left: 16,
        top: 40,
    },
};

// Styled components
const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #f8f9fa;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const BackButton = styled.TouchableOpacity`
  padding: 8px;
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #333;
`;

const SaveButton = styled.TouchableOpacity<{ disabled: boolean }>`
  padding: 8px 16px;
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

const SaveButtonText = styled.Text<{ disabled: boolean }>`
  color: #454F2C;
  font-size: 16px;
  font-weight: 600;
`;

const LoadingIndicator = styled.ActivityIndicator`
  margin-right: 8px;
`;

const AvatarSection = styled.View`
  align-items: center;
  margin: 24px 0;
`;

const AvatarContainer = styled.View`
  position: relative;
`;

const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #e1e1e1;
`;

const DefaultAvatar = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #454F2C;
  justify-content: center;
  align-items: center;
`;

const AvatarText = styled.Text`
  font-size: 36px;
  font-weight: bold;
  color: white;
`;

const EditAvatarButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #454F2C;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.View`
  margin: 0 16px;
`;

const InputContainer = styled.View`
  margin-bottom: 24px;
  position: relative;
`;

const InputLabel = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 500;
`;

const TextInput = styled.TextInput`
  background-color: white;
  padding: 12px 16px 12px 48px;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  border-width: 1px;
  border-color: #ddd;
`;

const MembershipContainer = styled.View`
  margin-bottom: 32px;
`;

const MembershipButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;

const MembershipButton = styled.TouchableOpacity<{ active: boolean }>`
  flex: 1;
  margin: 0 4px;
  padding: 12px;
  border-radius: 8px;
  background-color: ${props => props.active ? '#454F2C' : '#f0f0f0'};
  align-items: center;
`;

const MembershipButtonText = styled.Text<{ active: boolean }>`
  color: ${props => props.active ? 'white' : '#666'};
  font-weight: 500;
`;

const DeleteAccountButton = styled.TouchableOpacity`
  margin-top: 32px;
  align-items: center;
  padding: 16px;
`;

const DeleteAccountText = styled.Text`
  color: #ff4444;
  font-size: 16px;
  font-weight: 500;
`;

export default EditProfileScreen;