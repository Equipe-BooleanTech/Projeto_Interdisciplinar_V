import React, { useState, useRef, useCallback } from 'react';
import {
  Text,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Modal,
  Image,
} from 'react-native';
import { PieChart, BarChart, LineChart, RadarChart } from 'react-native-gifted-charts';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import images from '@/assets';
import { Alert } from '@/src/components';
import ProtectedRoute from '@/src/providers/auth/ProtectedRoute';

const { width: screenWidth } = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  background-color: #DFDDD1;
  align-items: center;
  padding-bottom: 80px;
`;

const IconContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 10px;
`;

const HeaderMonth = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const MonthText = styled.Text`
  width: 120px;
  font-size: 18px;
  margin-horizontal: 16px;
  font-weight: bold;
  text-align: center;
  color: #333;
`;

const ArrowButton = styled.TouchableOpacity`
  padding-horizontal: 20px;
`;

const TitleText = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  padding-top: 20px;
  color: #333;
`;

const FilterRow = styled.View`
  width: 90%;
  padding-vertical: 8px;
  margin: 20px;
  flex-direction: row;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 20px;
`;

const FilterButton = styled.TouchableOpacity<{ active?: boolean }>`
  width: 45%;
  align-items: center;
  padding-vertical: 12px;
  border-radius: 15px;
  margin-horizontal: 5px;
  background-color: ${({ active }) => (active ? '#fff' : 'transparent')};
`;

const FilterButtonText = styled.Text<{ active?: boolean }>`
  font-weight: bold;
  color: ${({ active }) => (active ? '#454F2C' : '#888')};
`;

const TotalText = styled.Text`
  text-align: center;
  font-size: 18px;
  margin-top: 8px;
  font-weight: bold;
  color: #454F2C;
`;

const TotalSubText = styled.Text`
  text-align: center;
  font-size: 14px;
  margin-top: 8px;
  color: #888;
`;

const CarouselContainer = styled.View`
  width: ${screenWidth * 0.9}px;
  align-items: center;
  padding-vertical: 20px;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const ChartCard = styled.View`
  height: 320px;
  border-radius: 12px;
  elevation: 3;
  padding: 16px;
  background-color: #fff;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChartTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
  text-align: center;
`;

const IndicatorContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 15px;
`;

const Indicator = styled.View<{ active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin-horizontal: 4px;
  background-color: ${({ active }) => (active ? '#454F2C' : '#AAA')};
`;

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ text: string; value: number } | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'semanal' | 'mensal'>('semanal');
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
  const [activeChartIndex, setActiveChartIndex] = useState(0);
  const carouselRef = useRef<any>(null);

  const handlePrevMonth = () => {
    setCurrentMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
  };

  const handleChartPress = useCallback((chartItem: any) => {
    setSelectedItem(chartItem);
    setModalVisible(true);
  }, []);

  
  const chartConfigs = [
    {
      title: 'Gastos por Categoria',
      component: (props: any) => (
        <PieChart
          data={[
            { value: 2500, color: '#6A994E'},
            { value: 1500, color: '#BC4749'},
            { value: 2000, color: '#F2E8CF'},
            { value: 1300, color: '#A98467'},
            { value: 1000, color: '#F4A261'},
          ]}
          donut
          showText
          textColor="black"
          radius={120}
          innerRadius={80}
          innerCircleColor="#EEEDEB"
          centerLabelComponent={() => (
            <Text style={{ fontSize: 16, color: '#5a5c69' }}>Total</Text>
          )}
          onPress={(item: any) => props.onPress(item)}
        />
      )
    },
    {
      title: 'Gastos Semanais',
      component: (props: any) => (
        <BarChart
          data={[
            { value: 2500, label: 'Seg', frontColor: '#6A994E' },
            { value: 1500, label: 'Ter', frontColor: '#BC4749' },
            { value: 2000, label: 'Qua', frontColor: '#F2E8CF' },
            { value: 1800, label: 'Qui', frontColor: '#A98467' },
            { value: 2200, label: 'Sex', frontColor: '#F4A261' },
            { value: 1200, label: 'Sáb', frontColor: '#6A994E' },
            { value: 1700, label: 'Dom', frontColor: '#BC4749' },
          ]}
          barWidth={30}
          spacing={18}
          roundedTop
          yAxisThickness={0}
          xAxisThickness={0}
          noOfSections={5}
          showReferenceLine1
          referenceLine1Position={2000}
          referenceLine1Config={{ color: 'gray', dashWidth: 2, dashGap: 3 }}
          onPress={(item: any) => props.onPress(item)}
        />
      )
    },
    {
      title: 'Tendência de Gastos',
      component: (props: any) => (
        <LineChart
          data={[
            { value: 2500, label: 'Jan' },
            { value: 1500, label: 'Fev' },
            { value: 2000, label: 'Mar' },
            { value: 1800, label: 'Abr' },
            { value: 2200, label: 'Mai' },
            { value: 1200, label: 'Jun' },
          ]}
          areaChart
          color="#6A994E"
          startFillColor="rgba(106, 153, 78, 0.8)"
          endFillColor="rgba(238, 237, 235, 0.1)"
          curved
          onPress={(item: any) => props.onPress(item)}
        />
      )
    },
    {
      title: 'Análise de Despesas',
      component: (props: any) => (
        <RadarChart
          data={[2500, 1500, 2000, 1800, 2200]}
          labels={['Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde']}
        />
      )
    }
  ];
  
  const renderChartItem = useCallback(({ item }: { item: typeof chartConfigs[0] }) => {
    return (
      <ChartCard>
        <ChartTitle>{item.title}</ChartTitle>
        <item.component
          onPress={handleChartPress}
        />
      </ChartCard>
    );
  }, [handleChartPress]);

  return (
    <ProtectedRoute>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Container>
            <IconContainer>
              <Image
                source={images.logo}
                style={{ width: 200, height: 150 }}
                resizeMode="contain"
              />
            </IconContainer>

            <HeaderMonth>
              <ArrowButton onPress={handlePrevMonth}>
                <Ionicons name="chevron-back" size={24} color="#454F2C" />
              </ArrowButton>

              <MonthText>{months[currentMonthIndex]}</MonthText>

              <ArrowButton onPress={handleNextMonth}>
                <Ionicons name="chevron-forward" size={24} color="#454F2C" />
              </ArrowButton>
            </HeaderMonth>

            <TitleText>Despesas Totais:</TitleText>

            <FilterRow>
              {['semanal', 'mensal'].map((filtro) => (
                <FilterButton
                  key={filtro}
                  onPress={() => setSelectedFilter(filtro as 'semanal' | 'mensal')}
                  active={selectedFilter === filtro}
                >
                  <FilterButtonText active={selectedFilter === filtro}>
                    {filtro.charAt(0).toUpperCase() + filtro.slice(1)}
                  </FilterButtonText>
                </FilterButton>
              ))}
            </FilterRow>

            <TotalText>R$14.500,89</TotalText>
            <TotalSubText>Total Estimado</TotalSubText>

            <CarouselContainer>
              <Carousel
                ref={carouselRef}
                data={chartConfigs}
                renderItem={renderChartItem}
                vertical={false}
                layoutCardOffset={9}
                layout="default"
                sliderWidth={screenWidth}
                itemWidth={screenWidth * 0.9}
                onSnapToItem={(index) => setActiveChartIndex(index)}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
              />
              <IndicatorContainer>
                {chartConfigs.map((_, index) => (
                  <Indicator key={index} active={index === activeChartIndex} />
                ))}
              </IndicatorContainer>
            </CarouselContainer>

            <TotalText>R$11.300,85</TotalText>
            <TotalSubText>Total Gasto</TotalSubText>

            <Modal
              transparent
              animationType="fade"
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <Alert
                isVisible={modalVisible}
                onConfirm={() => setModalVisible(false)}
                title={selectedItem?.text || 'Detalhes'}
                message={`Valor: R$${selectedItem?.value?.toFixed(2) || '0.00'}`}
              />
            </Modal>
          </Container>
        </ScrollView>
      </SafeAreaView>
    </ProtectedRoute>
  );
};

export default React.memo(HomeScreen);