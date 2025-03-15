import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { stylesHome } from '@/app/_layout';

export default function googleButton() {
  return (
    <>
      <TouchableOpacity style={stylesHome.googleButton}>
        <Text style={stylesHome.googleButtonText}>Continuar com o Google</Text>
      </TouchableOpacity>
      )
    </>
  );
}
