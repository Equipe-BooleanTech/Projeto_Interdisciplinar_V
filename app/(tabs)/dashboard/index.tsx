import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Text, Dimensions, ScrollView, SafeAreaView, Image, View, ActivityIndicator } from 'react-native';
import { PieChart, BarChart, LineChart, RadarChart } from 'react-native-gifted-charts';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import images from '@/assets';
import ProtectedRoute from '@/src/providers/auth/ProtectedRoute';
import { theme } from '@/theme';
import { getCostsData } from '@/src/services';
import { listVehicles } from '@/src/services';
import { useStorage } from '@/src/hooks';
import { Button } from '@/src/components';
import { router } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  background-color: #dfddd1;
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
  color: #454f2c;
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
  border-radius: 12px;
  elevation: 3;
  padding: 16px;
  background-color: #fff;
  margin: 20px;
  display: flex;
  flex-direction: column;
  min-height: 300px;
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

const EmptyStateContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const EmptyStateText = styled.Text`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-top: 20px;
`;

const ErrorText = styled.Text`
  font-size: 16px;
  color: #BC4749;
  text-align: center;
  margin-top: 20px;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

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

type ChartData = {
  maintenanceCost: number;
  fuelCost: number;
  totalCost: number;
  insuranceCost?: number;
  taxesCost?: number;
  partsCost?: number;
};

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ text: string; value: number } | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'semanal' | 'mensal'>('semanal');
  const [data, setData] = useState<ChartData | null>(null);
  const [vehicleIds, setVehicleIds] = useState<string[]>([]);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
  const [activeChartIndex, setActiveChartIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const carouselRef = useRef<any>(null);

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handlePrevMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentYear(prev => prev - 1);
      setCurrentMonthIndex(11);
    } else {
      setCurrentMonthIndex(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentYear(prev => prev + 1);
      setCurrentMonthIndex(0);
    } else {
      setCurrentMonthIndex(prev => prev + 1);
    }
  };

  const handleChartPress = useCallback((chartItem: any) => {
    setSelectedItem(chartItem);
    setModalVisible(true);
  }, []);

  const { getItem } = useStorage();

const fetchUserId = useCallback(async () => {
    const userId = await getItem('userId');
    return userId;
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const userId = await getItem('userId');
        if (!userId) {
          throw new Error('User not authenticated');
        }

        const vehiclesData = await listVehicles(userId);
        if (!vehiclesData?.content || vehiclesData.content.length === 0) {
          setData({
            maintenanceCost: 0,
            fuelCost: 0,
            totalCost: 0,
            insuranceCost: 0,
            taxesCost: 0,
            partsCost: 0
          });
          return;
        }

        const fetchedVehicleIds = vehiclesData.content.map((vehicle) => vehicle.id);
        setVehicleIds(fetchedVehicleIds);

        let totalMaintenance = 0;
        let totalFuel = 0;
        let totalInsurance = 0;
        let totalTaxes = 0;
        let totalParts = 0;

        // Calculate start and end dates based on filter type
        let startDate = new Date();
        let endDate = new Date();

        if (selectedFilter === 'mensal') {
          // Monthly view - first day to last day of month
          startDate = new Date(currentYear, currentMonthIndex, 1);
          endDate = new Date(currentYear, currentMonthIndex + 1, 0);
        } else {
          // Weekly view - current day to 7 days ago
          const today = new Date();
          const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

          // Calculate start of week (Sunday)
          startDate = new Date(today);
          startDate.setDate(today.getDate() - dayOfWeek);

          // Calculate end of week (Saturday)
          endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + 6);

          // If we're looking at a different month than current
          if (currentMonthIndex !== today.getMonth()) {
            // Get the first day of the selected month
            startDate = new Date(currentYear, currentMonthIndex, 1);

            // Find the first Sunday of that month
            while (startDate.getDay() !== 0) {
              startDate.setDate(startDate.getDate() + 1);
            }

            // Set end date to Saturday of that week
            endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6);

            // If we're past week 1, adjust accordingly
            const weekOffset = Math.floor((today.getDate() - 1) / 7) * 7;
            if (weekOffset > 0) {
              startDate.setDate(startDate.getDate() + weekOffset);
              endDate.setDate(endDate.getDate() + weekOffset);
            }
          }
        }

        // Set time to beginning/end of day
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);

        console.log(`Fetching ${selectedFilter} data:`, {
          start: startDate.toISOString(),
          end: endDate.toISOString()
        });

        const costResults = await Promise.allSettled(
          fetchedVehicleIds.map(id => getCostsData(id, startDate, endDate))
        );

        console.log('Cost results:', costResults);

        costResults.forEach((result) => {
          if (result.status === 'fulfilled' && result.value) {
            const costData = result.value;
            totalMaintenance += costData.maintenanceCost || 0;
            totalFuel += costData.fuelCost || 0;
            totalInsurance += costData.insuranceCost || 0;
            totalTaxes += costData.taxesCost || 0;
            totalParts += costData.partsCost || 0;
          }
        });

        const totalCost = totalMaintenance + totalFuel + totalInsurance + totalTaxes + totalParts;

        setData({
          maintenanceCost: totalMaintenance,
          fuelCost: totalFuel,
          insuranceCost: totalInsurance,
          taxesCost: totalTaxes,
          partsCost: totalParts,
          totalCost: totalCost
        });

      } catch (err) {
        console.error('Error in fetchAllData:', err);
        setError('Failed to load data. Please try again later.');
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [currentMonthIndex, currentYear, selectedFilter])

  const chartConfigs = [
    {
      title: 'Gastos por Categoria',
      component: (props: any) => (
        <>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <View style={{ flexDirection: 'column', width: '100%' }}>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  marginBottom: 5,
                }}
              >
                {[
                  { color: '#6A994E', label: 'Combustível', value: data?.fuelCost || 0 },
                  { color: '#BC4749', label: 'Manutenção', value: data?.maintenanceCost || 0 },
                  { color: '#F2E8CF', label: 'Seguro', value: data?.insuranceCost || 0 },
                  { color: '#A98467', label: 'Impostos', value: data?.taxesCost || 0 },
                  { color: '#F4A261', label: 'Peças', value: data?.partsCost || 0 },
                ]
                  .filter(item => item.value > 0)
                  .map((item, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '45%',
                        marginBottom: 8,
                      }}
                    >
                      <View
                        style={{
                          width: 12,
                          height: 12,
                          backgroundColor: item.color,
                          borderRadius: 6,
                          marginRight: 8,
                        }}
                      />
                      <Text style={{ fontSize: 12 }}>
                        {item.label}: R${item.value.toFixed(2)}
                      </Text>
                    </View>
                  ))}
              </View>
            </View>
          </View>
          {data && data.totalCost > 0 ? (
            <PieChart
              data={[
                { value: data.fuelCost, color: '#6A994E' },
                { value: data.maintenanceCost, color: '#BC4749' },
                { value: data.insuranceCost || 0, color: '#F2E8CF' },
                { value: data.taxesCost || 0, color: '#A98467' },
                { value: data.partsCost || 0, color: '#F4A261' },
              ].filter(item => item.value > 0)}
              donut
              showText
              textColor="black"
              radius={120}
              innerRadius={80}
              innerCircleColor="#EEEDEB"
              centerLabelComponent={() => (
                <View>
                  <Text style={{ fontSize: 16, color: '#5a5c69' }}>Total</Text>
                  <Text style={{ fontSize: 14, color: '#5a5c69' }}>R${data.totalCost.toFixed(2)}</Text>
                </View>
              )}
            />
          ) : (
            <EmptyStateText>Não há dados de despesas disponíveis</EmptyStateText>
          )}
        </>
      ),
    },
    {
      title: 'Gastos Mensais',
      component: (props: any) => (
        <>
          {data && data.totalCost > 0 ? (
            <BarChart
              data={[
                { value: data.fuelCost, label: 'Combustível', frontColor: '#6A994E' },
                { value: data.maintenanceCost, label: 'Manutenção', frontColor: '#BC4749' },
                { value: data.insuranceCost || 0, label: 'Seguro', frontColor: '#F2E8CF' },
                { value: data.taxesCost || 0, label: 'Impostos', frontColor: '#A98467' },
              ].filter(item => item.value > 0)}
              barWidth={35}
              spacing={18}
              yAxisThickness={0}
              xAxisThickness={0}
              noOfSections={5}
              showReferenceLine1
              referenceLine1Position={data ? data.totalCost / 2 : 0}
              referenceLine1Config={{ color: 'gray', dashWidth: 2, dashGap: 3 }}
              onPress={(item: any) => props.onPress(item)}
            />
          ) : (
            <EmptyStateText>No monthly data available</EmptyStateText>
          )}
        </>
      ),
    },
    {
      title: 'Tendência de Gastos',
      component: (props: any) => (
        <>
          {data && data.totalCost > 0 ? (
            <LineChart
              data={[
                { value: data.fuelCost, label: 'Combustível' },
                { value: data.maintenanceCost, label: 'Manutenção' },
                { value: data.insuranceCost || 0, label: 'Seguro' },
                { value: data.taxesCost || 0, label: 'Impostos' },
              ].filter(item => item.value > 0)}
              areaChart
              color="#6A994E"
              startFillColor="rgba(106, 153, 78, 0.8)"
              endFillColor="rgba(238, 237, 235, 0.1)"
              curved
              onPress={(item: any) => props.onPress(item)}
            />
          ) : (
            <EmptyStateText>No trend data available</EmptyStateText>
          )}
        </>
      ),
    },
  ];

  const renderChartItem = useCallback(
    ({ item }: { item: (typeof chartConfigs)[0] }) => {
      return (
        <ChartCard>
          <ChartTitle>{item.title}</ChartTitle>
          <item.component onPress={handleChartPress} />
        </ChartCard>
      );
    },
    [handleChartPress]
  );

  if (isLoading) {
    return (
      <ProtectedRoute>
        <LoadingContainer>
          <ActivityIndicator size="large" color="#454F2C" />
        </LoadingContainer>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <EmptyStateContainer>
          <ErrorText>{error}</ErrorText>
          <Ionicons name="warning-outline" size={48} color="#BC4749" />
        </EmptyStateContainer>
      </ProtectedRoute>
    );
  }

  if (!data || data.totalCost === 0) {
    return (
      <ProtectedRoute>
        <EmptyStateContainer>
          <HeaderMonth>
            <ArrowButton onPress={handlePrevMonth}>
              <Ionicons name="chevron-back" size={24} color="#454F2C" />
            </ArrowButton>

            <MonthText>{months[currentMonthIndex]}</MonthText>

            <ArrowButton onPress={handleNextMonth}>
              <Ionicons name="chevron-forward" size={24} color="#454F2C" />
            </ArrowButton>
          </HeaderMonth>
          <EmptyStateText>Ainda não há dados de despesas cadastrados! Adicione despesas ao seu veículo para visualizar os gráficos.</EmptyStateText>
          <Button
            onPress={() => router.push('/(tabs)/vehicles')}
          >Ir para veículos</Button>
        </EmptyStateContainer>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.normalBackground }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Container>
            <IconContainer>
              <Image
                source={images.logo}
                style={{ width: 150, height: 100 }}
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

            <TotalText>R${data.totalCost.toFixed(2)}</TotalText>
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

            <TotalText>R${(data.totalCost).toFixed(2)}</TotalText>
            <TotalSubText>Total Gasto</TotalSubText>
          </Container>
        </ScrollView>
      </SafeAreaView>
    </ProtectedRoute>
  );
};

export default React.memo(HomeScreen);