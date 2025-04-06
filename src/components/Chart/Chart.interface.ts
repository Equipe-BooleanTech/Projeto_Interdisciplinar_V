import { 
    BarChartPropsType, 
    PieChartPropsType, 
    RadarChartProps, 
    LineChartPropsType 
} from 'react-native-gifted-charts';

// Define a base props type with common props
type BaseProps = {
    type: 'bar' | 'pie' | 'radar' | 'line';
    data: any[];
};

// Create conditional props types based on chart type
type BarProps = BaseProps & {
    type: 'bar';
} & Omit<BarChartPropsType, keyof BaseProps>;

type PieProps = BaseProps & {
    type: 'pie';
} & Omit<PieChartPropsType, keyof BaseProps>;

type RadarProps = BaseProps & {
    type: 'radar';
} & Omit<RadarChartProps, keyof BaseProps>;

type LineProps = BaseProps & {
    type: 'line';
} & Omit<LineChartPropsType, keyof BaseProps>;

// Define the ChartProps as a union type of all specific chart props
export type ChartProps = BarProps | PieProps | RadarProps | LineProps;