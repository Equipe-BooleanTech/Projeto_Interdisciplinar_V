import { router } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { MenuSide, MenuItem, MenuText, BottomMenu } from './BottomMenu.styles';
import { Feather } from '@expo/vector-icons';

const BottomMenuComponent = () => {
  return (
    <BottomMenu>
      <MenuSide>
        <Pressable onPress={() => router.push('/Home')}>
          <MenuItem>
            <Feather name="dollar-sign" size={20} color="white" />
            <MenuText>Custos</MenuText>
          </MenuItem>
        </Pressable>
        <Pressable onPress={() => router.push('/Home')}>
          <MenuItem>
            <Feather name="map-pin" size={20} color="white" />
            <MenuText>Postos</MenuText>
          </MenuItem>
        </Pressable>
      </MenuSide>
      <MenuSide>
        <Pressable onPress={() => router.push('/Home')}>
          <MenuItem>
            <Feather name="tool" size={20} color="white" />
            <MenuText>Revisões</MenuText>
          </MenuItem>
        </Pressable>
        <Pressable onPress={() => router.push('/Home')}>
          <MenuItem>
            <Feather name="user" size={20} color="white" />
            <MenuText>Minha conta</MenuText>
          </MenuItem>
        </Pressable>
      </MenuSide>
    </BottomMenu>
  );
};
export default BottomMenuComponent;
