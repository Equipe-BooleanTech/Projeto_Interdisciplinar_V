import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Animated, Easing, Alert, ActivityIndicator, View } from 'react-native';
import styled from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons, Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import { AccountMenuItem } from './types';
import { router } from 'expo-router';
import { User } from '@/src/@types';
import { useStorage } from '@/src/hooks';
import ProtectedRoute from '@/src/providers/auth/ProtectedRoute';
import { Header as MobileHeader } from '@/src/components';
import { get } from '@/src/services';
import { logout } from '@/src/services/auth';

const AccountScreen: React.FC = () => {
  const [scaleValue] = useState(new Animated.Value(1));
  const [userID, setUserID] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>();
  const [maintenancesCount, setMaintenancesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const menuItems: AccountMenuItem[] = [
    { id: '1', title: 'Editar Perfil', icon: 'edit', screen: 'Account/Edit' },
  ];

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleChangeAvatar = async () => {
    animateButton();
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permissão negada!');
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

  const { getItem } = useStorage();

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'edit':
        return <MaterialIcons name="edit" size={24} color="#454F2C" />;
      case 'notifications':
        return <Ionicons name="notifications-outline" size={24} color="#454F2C" />;
      case 'credit-card':
        return <Feather name="credit-card" size={24} color="#454F2C" />;
      case 'lock':
        return <Feather name="lock" size={24} color="#454F2C" />;
      case 'help-center':
        return <MaterialIcons name="help-outline" size={24} color="#454F2C" />;
      case 'person-add':
        return <MaterialIcons name="person-add" size={24} color="#454F2C" />;
      default:
        return <Feather name="settings" size={24} color="#454F2C" />;
    }
  };

  const getUserId = async () => {
    const userId = await getItem('userId');
    if (!userId) {
      Alert.alert('Usuário não encontrado', 'Por favor, faça login novamente.');
      router.replace('/Auth/Login');
      return null;
    }
    setUserID(userId);
    return userId;
  };

  const fetchUserVehiclesCount = useCallback(() => {
    return user?.vehicles ? user.vehicles.length : 0;
  }, [user]);

  // -------------------------------------------------
  // Busca os dados do usuário aqui, se necessário
  // -------------------------------------------------
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const userId = await getUserId();
      if (!userId) return;
      try {
        const userData = await get<{ userId: string }, User>(`/users/list-by-id/${userId}`);
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        Alert.alert('Erro ao buscar dados do usuário');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userID]);
  return (
    <ProtectedRoute>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#454F2C" />
        </View>
      ) : (
        <>
          <MobileHeader
            title="Minha Conta"
            onBackPress={() => router.back()}
            onSearchPress={(route: string) => {
              if (route) {
                const validRoute = route.startsWith('/') ? route : `/${route}`;
                router.push(validRoute as never);
              } else {
                router.push('/(tabs)/account');
              }
            }}
            onNotificationPress={() => router.push('/notifications')}
            notificationCount={0}
          />
          <Container>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>

              <AvatarContainer>
                <AvatarWrapper>
                  {user?.avatar ? (
                    <Avatar source={{ uri: user?.avatar }} />
                  ) : (
                    <DefaultAvatar>
                      <AvatarText>{user?.name.charAt(0)}</AvatarText>
                    </DefaultAvatar>
                  )}

                </AvatarWrapper>

                <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                  <ChangeAvatarButton onPress={handleChangeAvatar}>
                    <MaterialIcons name="photo-camera" size={20} color="white" />
                    <ChangeAvatarText>Mudar Foto</ChangeAvatarText>
                  </ChangeAvatarButton>
                </Animated.View>

                <UserName>{user?.name}</UserName>
                <UserEmail>{user?.email}</UserEmail>
              </AvatarContainer>

              <StatsContainer>
                <StatItem>
                  <StatValue>{fetchUserVehiclesCount()}</StatValue>
                  <StatLabel>Veículos</StatLabel>
                </StatItem>
                <StatDivider />
                <StatItem>
                  <StatValue>{maintenancesCount}</StatValue>
                  <StatLabel>Manutenções</StatLabel>
                </StatItem>
              </StatsContainer>

              <MenuContainer>
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.id}
                    onPress={() => item.screen ? router.push(item.screen as any) : null}
                    activeOpacity={0.7}
                  >
                    <MenuItemLeft>
                      {renderIcon(item.icon)}
                      <MenuItemText>{item.title}</MenuItemText>
                    </MenuItemLeft>
                    <AntDesign name="right" size={18} color="#999" />
                  </MenuItem>
                ))}
              </MenuContainer>

              <SignOutButton onPress={() => {
                logout()
                router.replace('/Auth/Login');
              }}>
                <SignOutButtonText>Sair</SignOutButtonText>
                <MaterialIcons name="logout" size={20} color="#ff4444" />
              </SignOutButton>
            </ScrollView>
          </Container>
        </>
      )}
    </ProtectedRoute>
  );
}


// Styled components
const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #f8f9fa;
`;

const AvatarContainer = styled.View`
  align-items: center;
  margin: 16px 0 24px;
`;

const AvatarWrapper = styled.View`
  position: relative;
  margin-bottom: 16px;
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
  flex-direction: row;
  align-items: center;
  background-color: #454F2C;
  padding: 10px 16px;
  border-radius: 20px;
  margin-top: 12px;
`;

const ChangeAvatarText = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: 500;
  margin-left: 8px;
`;

const UserName = styled.Text`
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin-top: 12px;
`;

const UserEmail = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 4px;
`;

const StatsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  background-color: white;
  margin: 16px;
  border-radius: 12px;
  padding: 20px;
  elevation: 2;
  gap: 16px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
`;

const StatItem = styled.View`
  align-items: center;
`;

const StatValue = styled.Text`
  font-size: 20px;
  font-weight: 700;
  text-wrap: wrap;
  color: #454F2C;
`;

const StatLabel = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 4px;
  text-align: center;
  text-wrap: wrap;
  width: 90%;
  max-width: 120px;

`;

const StatDivider = styled.View`
  width: 1px;
  height: 40px;
  background-color: #eee;
`;

const MenuContainer = styled.View`
  background-color: white;
  margin: 16px;
  border-radius: 12px;
  padding: 8px 0;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
`;

const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

const MenuItemLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MenuItemText = styled.Text`
  font-size: 16px;
  color: #333;
  margin-left: 16px;
`;

const SignOutButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 8px;
  margin: 16px;
  background-color: rgba(255, 68, 68, 0.1);
`;

const SignOutButtonText = styled.Text`
  color: #ff4444;
  font-size: 16px;
  font-weight: 600;
  margin-right: 8px;
`;

export default AccountScreen;