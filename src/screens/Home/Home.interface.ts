export interface HomeProps {
    filter: string;
    onFilterChange: (filter: string) => void;
    statistics: {
        total: number;
        totalSub: string;
        chartData: {
            labels: string[];
            data: number[];
        };
    };
    onItemPress: (item: { text: string; value: number }) => void;
    onModalClose: () => void;
    modalVisible: boolean;
}