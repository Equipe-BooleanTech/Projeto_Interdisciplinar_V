import Svg from 'react-native-svg';

export interface IntroductionViewProps {
  image: Svg;
  title: string;
  description: string;
  onPress: () => void;
  step: number;
}
