import React, { useEffect } from 'react';

import { ScrollView } from 'react-native';
import images from '../../assets';
import { Container, IconContainer } from './styles';
import { Image } from '@/src/components';
import { Login } from '@/src/screens';
import { theme } from '@/theme';
import { useDevice } from '@/src/hooks';

const LoginScreen = () => {
  
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.normalBackground }}>
      <Container>
        <IconContainer>
          <Image svg={images.car} imgWidth={100} imgHeight={100} />
        </IconContainer>
      </Container>
      <Login />
    </ScrollView>
  );
};

export default LoginScreen;
