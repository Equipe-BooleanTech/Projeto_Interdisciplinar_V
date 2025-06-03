import React from 'react';

import { ScrollView, Image } from 'react-native';
import images from '../../../assets';
import { Container } from './styles';
import { Login } from '@/src/screens';
import { theme } from '@/src/theme/theme';

const LoginScreen = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.normalBackground }}>
      <Container>
        <Image
          source={images.logo}
          style={{ width: 200, height: 150 }}
        />
      </Container>
      <Login />
    </ScrollView>
  );
};

export default LoginScreen;
