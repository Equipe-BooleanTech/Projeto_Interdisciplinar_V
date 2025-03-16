import { ScrollViewProps } from './ScrollView.interface';
import { ScrollViewContent, StyledScrollView } from './ScrollView.style';

const ScrollView = ({ children }: ScrollViewProps) => {
  return (
    <StyledScrollView>
      <ScrollViewContent>{children}</ScrollViewContent>
    </StyledScrollView>
  );
};

export default ScrollView;
