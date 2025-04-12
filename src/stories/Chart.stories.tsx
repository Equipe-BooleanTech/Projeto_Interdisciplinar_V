import React from 'react';
import { View } from 'react-native';
import { Chart } from '../components';
import { theme } from '@/theme';

export default {
  title: 'Chart',
  component: Chart,
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <View
        style={{
          padding: 16,
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </View>
    ),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['bar', 'pie', 'radar', 'line'],
      description: 'Type of chart to display',
    },
    data: {
      control: 'object',
      description: 'Data to display in the chart',
    },
  },
};

// Simple Bar Chart
export const SimpleBarChart = {
  args: {
    type: 'bar',
    data: [
      { value: 50, label: 'Jan' },
      { value: 80, label: 'Feb' },
      { value: 45, label: 'Mar' },
      { value: 95, label: 'Apr' },
      { value: 60, label: 'May' },
    ],
    barWidth: 30,
    spacing: 10,
    frontColor: theme.colors.green,
  },
};

// Basic Pie Chart
export const BasicPieChart = {
  args: {
    type: 'pie',
    data: [
      { value: 30, label: 'Maintenance', color: theme.colors.green },
      { value: 20, label: 'Fuel', color: theme.colors.brown },
      { value: 15, label: 'Insurance', color: theme.colors.warning },
      { value: 35, label: 'Other', color: theme.colors.danger },
    ],
    radius: 120,
  },
};

// Advanced Pie Chart
export const AdvancedPieChart = {
  args: {
    type: 'pie',
    data: [
      { value: 30, label: 'Maintenance', color: theme.colors.green },
      { value: 20, label: 'Fuel', color: theme.colors.brown },
      { value: 15, label: 'Insurance', color: theme.colors.warning },
      { value: 35, label: 'Other', color: theme.colors.danger },
    ],
    showText: true,
    textSize: 12,
    radius: 120,
    innerRadius: 60,
    showTextBackground: true,
    textBackgroundColor: 'rgba(255,255,255,0.7)',
    textBackgroundRadius: 10,
  },
};

// Vehicle Expenses Chart
export const VehicleExpensesChart = {
  args: {
    type: 'pie',
    data: [
      { value: 250, label: 'Combustível', color: theme.colors.green },
      { value: 120, label: 'Manutenção', color: theme.colors.brown },
      { value: 180, label: 'Seguro', color: theme.colors.warning },
      { value: 90, label: 'Estacionamento', color: theme.colors.danger },
      { value: 60, label: 'Impostos', color: theme.colors.success },
    ],
    showText: true,
    textSize: 12,
    radius: 130,
    innerRadius: 50,
    labelsPosition: 'onBorder',
    showValuesAsLabels: true,
    showAnimation: true,
    textColor: theme.colors.stroke,
  },
};

// Fuel Consumption Chart
export const FuelConsumptionChart = {
  args: {
    type: 'bar',
    data: [
      { value: 12.5, label: 'Jan', frontColor: theme.colors.success },
      { value: 11.8, label: 'Feb', frontColor: theme.colors.success },
      { value: 13.2, label: 'Mar', frontColor: theme.colors.green },
      { value: 14.1, label: 'Apr', frontColor: theme.colors.warning },
      { value: 13.7, label: 'May', frontColor: theme.colors.green },
      { value: 14.5, label: 'Jun', frontColor: theme.colors.warning },
    ],
    barWidth: 28,
    spacing: 12,
    hideRules: false,
    showYAxisIndices: true,
    noOfSections: 5,
    yAxisTextStyle: { color: theme.colors.stroke },
    xAxisTextStyle: { color: theme.colors.stroke },
    yAxisLabelPrefix: '',
    yAxisLabelSuffix: 'km/l',
  },
};

// Maintenance History Chart
export const MaintenanceHistoryChart = {
  args: {
    type: 'bar',
    data: [
      { value: 350, label: 'Jan', frontColor: theme.colors.green },
      { value: 0, label: 'Feb', frontColor: theme.colors.green },
      { value: 980, label: 'Mar', frontColor: theme.colors.brown },
      { value: 0, label: 'Apr', frontColor: theme.colors.green },
      { value: 450, label: 'May', frontColor: theme.colors.warning },
      { value: 1200, label: 'Jun', frontColor: theme.colors.danger },
    ],
    barWidth: 25,
    spacing: 18,
    hideRules: false,
    showYAxisIndices: true,
    noOfSections: 4,
    isAnimated: true,
    animationDuration: 800,
    yAxisLabelPrefix: 'R$',
  },
};

// Basic Line Chart
export const BasicLineChart = {
  args: {
    type: 'line',
    data: [
      { value: 11.5, label: 'Jan' },
      { value: 12.8, label: 'Feb' },
      { value: 11.0, label: 'Mar' },
      { value: 13.2, label: 'Apr' },
      { value: 12.5, label: 'May' },
      { value: 10.8, label: 'Jun' },
    ],
    width: 340,
    height: 300,
    spacing: 40,
    initialSpacing: 10,
    color: theme.colors.green,
    thickness: 3,
    xAxisThickness: 1,
    yAxisThickness: 1,
    yAxisTextStyle: { color: theme.colors.stroke },
    xAxisLabelTextStyle: { color: theme.colors.stroke },
  },
};

// Vehicle Mileage Line Chart
export const VehicleMileageLineChart = {
  args: {
    type: 'line',
    data: [
      { value: 11.5, dataPointText: '11.5', label: 'Jan' },
      { value: 12.8, dataPointText: '12.8', label: 'Feb' },
      { value: 11.0, dataPointText: '11.0', label: 'Mar' },
      { value: 13.2, dataPointText: '13.2', label: 'Apr' },
      { value: 12.5, dataPointText: '12.5', label: 'May' },
      { value: 10.8, dataPointText: '10.8', label: 'Jun' },
    ],
    width: 340,
    height: 300,
    showVerticalLines: true,
    spacing: 40,
    initialSpacing: 10,
    color: theme.colors.green,
    thickness: 3,
    hideDataPoints: false,
    dataPointsColor: theme.colors.green,
    dataPointsRadius: 5,
    textColor: theme.colors.stroke,
    textShiftY: -8,
    textShiftX: -8,
    showXAxisIndices: true,
    xAxisIndicesHeight: 4,
    xAxisIndicesColor: theme.colors.green,
    showYAxisText: true,
    yAxisTextStyle: { color: theme.colors.stroke },
    yAxisLabelSuffix: 'km/l',
    xAxisLabelTextStyle: { color: theme.colors.stroke, fontSize: 10 },
    curved: true,
  },
};

// Vehicle Comparison Line Chart
export const VehicleComparisonLineChart = {
  args: {
    type: 'line',
    data: [
      { value: 11.5, dataPointText: '11.5', label: 'Jan' },
      { value: 12.8, dataPointText: '12.8', label: 'Feb' },
      { value: 11.0, dataPointText: '11.0', label: 'Mar' },
      { value: 13.2, dataPointText: '13.2', label: 'Apr' },
      { value: 12.5, dataPointText: '12.5', label: 'May' },
      { value: 10.8, dataPointText: '10.8', label: 'Jun' },
    ],
    secondaryData: [
      { value: 10.2, dataPointText: '10.2', label: 'Jan' },
      { value: 11.0, dataPointText: '11.0', label: 'Feb' },
      { value: 9.5, dataPointText: '9.5', label: 'Mar' },
      { value: 10.3, dataPointText: '10.3', label: 'Apr' },
      { value: 9.8, dataPointText: '9.8', label: 'May' },
      { value: 8.9, dataPointText: '8.9', label: 'Jun' },
    ],
    width: 340,
    height: 300,
    showVerticalLines: true,
    spacing: 40,
    initialSpacing: 10,
    color: theme.colors.green,
    secondaryLineConfig: {
      color: theme.colors.brown,
      dataPointsColor: theme.colors.brown,
      textColor: theme.colors.brown,
      thickness: 3,
    },
    thickness: 3,
    hideDataPoints: false,
    dataPointsColor: theme.colors.green,
    dataPointsRadius: 5,
    textColor: theme.colors.stroke,
    textShiftY: -12,
    textShiftX: -8,
    showXAxisIndices: true,
    xAxisIndicesHeight: 4,
    xAxisIndicesColor: theme.colors.green,
    showYAxisText: true,
    yAxisTextStyle: { color: theme.colors.stroke },
    yAxisLabelSuffix: 'km/l',
    xAxisLabelTextStyle: { color: theme.colors.stroke, fontSize: 10 },
    xAxisLabelPrefix: '',
    xAxisLabelSuffix: '',
    curved: true,
    horizSections: [
      { value: 8, dashWidth: 2, dashGap: 3, strokeWidth: 1, color: theme.colors.warning },
      { value: 14, dashWidth: 2, dashGap: 3, strokeWidth: 1, color: theme.colors.danger },
    ],
  },
};
