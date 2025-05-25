export interface IntroductionViewProps {
  image: any;
  title: string;
  description: string;
  onPress: () => void;
  step: number;
  totalSteps: number;
}
