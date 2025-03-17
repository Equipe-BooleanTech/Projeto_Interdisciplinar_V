import { Button, ScrollView, Image } from '@/src/components';
import { IntroductionViewProps } from './Introduction.interface';
import { Description, TextContainer, Title } from './Introduction.styles';

// TODO: Completar a implementação da tela de introdução
const Introduction = (Props: IntroductionViewProps) => {
  const { image, description, onPress, title, step } = Props;
  return (
    <ScrollView>
      {image && <Image source={image} />}
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
