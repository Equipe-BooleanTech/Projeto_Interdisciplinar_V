import React from 'react';
import { Button, Image, SafeAreaView, Stepper } from '@/src/components';
import { IntroductionViewProps } from './Introduction.interface';
import { Description, TextContainer, Title, ImageContainer } from './Introduction.styles';

// TODO: Completar a implementação da tela de introdução
const Introduction = (Props: IntroductionViewProps) => {
  const { image, description, onPress, title, step, totalSteps } = Props;
  return (
    <SafeAreaView>
      <ImageContainer>
        <Image imgHeight="100%" imgWidth="90%" svg={image} />
      </ImageContainer>
      {title && description && (
        <TextContainer>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </TextContainer>
      )}
      <Button onPress={onPress} variant="primary">
        {step === 3 ? 'Criar conta' : 'Continuar'}
      </Button>
      <Stepper steps={totalSteps} currentStep={step} isActive={true} />
    </SafeAreaView>
  );
};

export default Introduction;
