import React from 'react';

import { Image, ScrollView } from 'react-native';
import images from '../../../assets';
import { Container, IconContainer } from './styles';
import { Register } from '@/src/screens';
import { theme } from '@/src/theme/theme';

const RegisterScreen = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.normalBackground }}>
      <Container>
        <IconContainer>
          <Image
            source={images.logo}
            style={{ width: 200, height: 150 }}
          />
        </IconContainer>
      </Container>
      <Register />
    </ScrollView>
  );
};

export default RegisterScreen;
