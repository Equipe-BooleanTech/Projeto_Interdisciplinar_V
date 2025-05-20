import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable, SafeAreaView } from 'react-native';
import images from '../../assets';
import { styles } from './_layout';
import { Image } from '@/src/components';
import Chart from '../../src/components/Chart/Chart';
import { useRedirect } from '@/src/hooks';
import { router } from 'expo-router';

const dummyData = [
  { value: 2500, color: '#6A994E', text: 'Gasto 1' },
  { value: 1500, color: '#BC4749', text: 'Gasto 2' },
  { value: 2000, color: '#F2E8CF', text: 'Gasto 3' },
  { value: 1300, color: '#A98467', text: 'Gasto 4' },
  { value: 1000, color: '#F4A261', text: 'Gasto 5' },
];

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

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ text: string; value: number } | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'semanal' | 'mensal'>('semanal');
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());

  const handlePrevMonth = () => {
    setCurrentMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
  };

  const { redirect, checkAuthentication } = useRedirect();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await checkAuthentication();
      if (!isAuth) {
        router.replace('/Login');
      }
    };
    
    checkAuth();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Image svg={images.car} imgWidth={100} imgHeight={100} viewBox="0 0 100 100" />
        </View>
        <View style={styles.headerMonth}>
          <TouchableOpacity onPress={handlePrevMonth}>
            <Text style={styles.arrowLeft}>{'<'}</Text>
          </TouchableOpacity>

          <Text style={styles.monthText}>{months[currentMonthIndex]}</Text>

          <TouchableOpacity onPress={handleNextMonth}>
            <Text style={styles.arrowRight}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.titleText}>Despesas Totais:</Text>

        <View style={styles.filterRow}>
          {['semanal', 'mensal'].map((filtro) => (
            <TouchableOpacity
              key={filtro}
              onPress={() => setSelectedFilter(filtro as 'semanal' | 'mensal')}
              style={[styles.filterButton, selectedFilter === filtro && styles.filterButtonActive]}
            >
              <Text>{filtro.charAt(0).toUpperCase() + filtro.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.totalText}>R$14.500,89</Text>
        <Text style={styles.totalSubText}>Total Estimado</Text>

        <View style={styles.chartContainer}>
          <Chart
            type="pie"
            data={dummyData}
            donut
            textColor="black"
            innerCircleColor="#eee"
            innerRadius={80}
            radius={100}
            onPress={(item: any) => {
              setSelectedItem(item);
              setModalVisible(true);
            }}
          />
        </View>

        <Text style={styles.totalText}>R$11.300,85</Text>
        <Text style={styles.totalSubText}>Total Gasto</Text>

        <View style={styles.bottomMenu}>
          <View style={styles.menuSide}>
            <TouchableOpacity style={styles.menuItem}>
              <Image svg={images.MoneyIcon} imgWidth={20} imgHeight={20} viewBox="0 0 100 100" />
              <Text style={styles.menuText}>Custos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Image svg={images.MapIcon} imgWidth={20} imgHeight={20} viewBox="0 0 100 100" />
              <Text style={styles.menuText}>Postos</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>

          <View style={styles.menuSide}>
            <TouchableOpacity style={styles.menuItem}>
              <Image
                svg={images.ScrewdriverIcon}
                imgWidth={20}
                imgHeight={20}
                viewBox="0 0 100 100"
              />
              <Text style={styles.menuText}>Revisões</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Image svg={images.GroupIcon} imgWidth={20} imgHeight={20} viewBox="0 0 100 100" />
              <Text style={styles.menuText}>Conta</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          transparent
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <Pressable style={styles.modalBackground} onPress={() => setModalVisible(false)} />
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>{selectedItem?.text}</Text>
              <Text style={styles.modalValue}>R${selectedItem?.value.toFixed(2)}</Text>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
