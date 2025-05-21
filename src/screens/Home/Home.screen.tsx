import React, { useEffect } from 'react';
import { Modal, Pressable, SafeAreaView } from 'react-native';
import images from '@/assets';
import { Image, Chart} from '@/src/components';
import { useRedirect } from '@/src/hooks';
import { router } from 'expo-router';
import { HomeProps } from '@/src/screens/Home/Home.interface';
import {
  Container,
  IconContainer,
  HeaderMonth,
  ArrowLeft,
  MonthText,
  ArrowRight,
  TitleText,
  FilterRow,
  FilterButton,
  FilterButtonActive,
  TotalText,
  TotalSubText,
  ChartContainer,
  ModalOverlay,
  ModalBackground,
  ModalBox,
  ModalTitle,
  ModalValue
} from '@/src/screens/Home/Home.styles';

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const HomeScreen: React.FC<HomeProps> = ({
  filter,
  onFilterChange,
  statistics,
  onItemPress,
  onModalClose,
  modalVisible
}) => {
  const [currentMonthIndex, setCurrentMonthIndex] = React.useState(new Date().getMonth());

  const handlePrevMonth = () => {
    setCurrentMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
  };

  const { checkAuthentication } = useRedirect();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await checkAuthentication();
      if (!isAuth) {
        router.replace('/Login');
      }
    };
    
    checkAuth();
  }, []);

  // Transform statistics data for chart component
  const chartData = statistics.chartData.labels.map((label, index) => ({
    value: statistics.chartData.data[index],
    color: getChartColor(index),
    text: label
  }));

  // Function to generate chart colors
  function getChartColor(index: number) {
    const colors = ['#6A994E', '#BC4749', '#F2E8CF', '#A98467', '#F4A261'];
    return colors[index % colors.length];
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Container>
        <IconContainer>
          <Image svg={images.car} imgWidth={100} imgHeight={100} viewBox="0 0 100 100" />
        </IconContainer>
        
        <HeaderMonth>
          <Pressable onPress={handlePrevMonth}>
            <ArrowLeft>{'<'}</ArrowLeft>
          </Pressable>

          <MonthText>{months[currentMonthIndex]}</MonthText>

          <Pressable onPress={handleNextMonth}>
            <ArrowRight>{'>'}</ArrowRight>
          </Pressable>
        </HeaderMonth>

        <TitleText>Despesas Totais:</TitleText>

        <FilterRow>
          {['semanal', 'mensal'].map((filtro) => (
            filter === filtro ? (
              <FilterButtonActive key={filtro} onPress={() => onFilterChange(filtro)}>
                <TitleText>{filtro.charAt(0).toUpperCase() + filtro.slice(1)}</TitleText>
              </FilterButtonActive>
            ) : (
              <FilterButton key={filtro} onPress={() => onFilterChange(filtro)}>
                <TitleText>{filtro.charAt(0).toUpperCase() + filtro.slice(1)}</TitleText>
              </FilterButton>
            )
          ))}
        </FilterRow>

        <TotalText>R${statistics.total.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TotalText>
        <TotalSubText>{statistics.totalSub}</TotalSubText>

        <ChartContainer>
          <Chart
            type="pie"
            data={chartData}
            donut
            textColor="black"
            innerCircleColor="#eee"
            innerRadius={80}
            radius={100}
            onPress={onItemPress}
          />
        </ChartContainer>

        <TotalText>R${calculateTotal(chartData).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TotalText>
        <TotalSubText>Total Gasto</TotalSubText>

        <Modal
          transparent
          animationType="fade"
          visible={modalVisible}
          onRequestClose={onModalClose}
        >
          <ModalOverlay>
            <ModalBackground onPress={onModalClose} />
            <ModalBox>
              {/* The selected item will be passed from the parent component via onItemPress */}
              <ModalTitle>{statistics.chartData.labels[0]}</ModalTitle>  
              <ModalValue>R${statistics.chartData.data[0].toFixed(2)}</ModalValue>
            </ModalBox>
          </ModalOverlay>
        </Modal>
      </Container>
    </SafeAreaView>
  );
};

// Helper function to calculate total from chart data
function calculateTotal(data: Array<{value: number, color: string, text: string}>): number {
  return data.reduce((sum, item) => sum + item.value, 0);
}

export default HomeScreen;