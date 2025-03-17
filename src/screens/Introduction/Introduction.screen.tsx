import React from 'react';
import { Button, ScrollView, Image } from '@/src/components';
import { IntroductionViewProps } from './Introduction.interface';
import { Description, TextContainer, Title, ImageContainer } from './Introduction.styles';

// TODO: Completar a implementação da tela de introdução
const Introduction = (Props: IntroductionViewProps) => {
  const { image, description, onPress, title, step } = Props;
  return (
    <ScrollView>
      <ImageContainer>
        <Image imgHeight="100%" imgWidth="100%" svg={image} />
      </ImageContainer>
      {title && description && (
        <TextContainer>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </TextContainer>
      )}
      <Button onPress={onPress} variant="primary">
        {step === 4 ? 'Criar conta' : 'Continuar'}
      </Button>
    </ScrollView>
  );
};

export default Introduction;