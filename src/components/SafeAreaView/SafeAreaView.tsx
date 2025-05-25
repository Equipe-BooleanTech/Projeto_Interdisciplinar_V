import React from 'react';
import { SafeAreaViewProps } from './SafeAreaView.interface';
import { SafeAreaViewContent, StyledSafeAreaView } from './SafeAreaView.style';

const SafeAreaView = ({ children }: SafeAreaViewProps) => {
  return (
    <StyledSafeAreaView>
      <SafeAreaViewContent>{children}</SafeAreaViewContent>
    </StyledSafeAreaView>
  );
};

export default SafeAreaView;
