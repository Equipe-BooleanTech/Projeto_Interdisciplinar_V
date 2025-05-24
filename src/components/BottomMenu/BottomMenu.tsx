import images from '@/assets';
import { router } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { Image } from '@/src/components';
import {
  MenuSide,
  MenuItem,
  MenuText,
  AddButton,
  AddButtonText,
  BottomMenu,
} from './BottomMenu.styles';

const BottomMenuComponent = () => {
  <BottomMenu>
    <MenuSide>
      <Pressable onPress={() => router.push('/Home')}>
        <MenuItem>
          <Image svg={images.MoneyIcon} imgWidth={20} imgHeight={20} viewBox="0 0 100 100" />
          <MenuText>Custos</MenuText>
        </MenuItem>
      </Pressable>
      <Pressable onPress={() => router.push('/Home')}>
        <MenuItem>
          <Image svg={images.MapIcon} imgWidth={20} imgHeight={20} viewBox="0 0 100 100" />
          <MenuText>Postos</MenuText>
        </MenuItem>
      </Pressable>
    </MenuSide>

    <AddButton onPress={() => router.push('/Home')}>
      <AddButtonText>+</AddButtonText>
    </AddButton>

    <MenuSide>
      <Pressable onPress={() => router.push('/Home')}>
        <MenuItem>
          <Image svg={images.ScrewdriverIcon} imgWidth={20} imgHeight={20} viewBox="0 0 100 100" />
          <MenuText>Revisões</MenuText>
        </MenuItem>
      </Pressable>
      <Pressable onPress={() => router.push('/Home')}>
        <MenuItem>
          <Image svg={images.GroupIcon} imgWidth={20} imgHeight={20} viewBox="0 0 100 100" />
          <MenuText>Conta</MenuText>
        </MenuItem>
      </Pressable>
    </MenuSide>
  </BottomMenu>;
};
export default BottomMenuComponent;
