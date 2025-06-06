import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import {
    Content,
    FuelingCard,
    CardHeader,
    CardTitle,
    CardSubtitle,
    CardDetailRow,
    CardDetail,
    DetailLabel,
    DetailValue,
    SummaryContainer,
    SummaryItem,
    SummaryLabel,
    SummaryValue,
    LoadingContainer,
} from './ReminderManagement.style';
import { ReminderDTO, ReminderProps } from './ReminderManagement.interface';
import { theme } from '@/src/theme/theme';
import { ButtonContainer } from '@/src/components/Alert/Alert.styles';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Dropdown } from 'react-native-element-dropdown';
import { Button } from '@/src/components';

const ReminderManagement: React.FC<ReminderProps> = ({
    reminderRecords = [],
    isLoading = false,
}) => {

    const renderLabels = (status: string) => {
    switch (status) {
        case 'PENDING':
        return 'Pendente';
        case 'COMPLETED':
        return 'Completo';
        case 'OVERDUE':
        return 'Atrasado';
        default:
        return status;
    }
    
}
const renderFuelingItem = ({ item }: { item: ReminderDTO }) => (
    <FuelingCard>
        <CardHeader>
            <View>
                <CardTitle>{item.title}</CardTitle>
                {item.antecedenceDays && (
                    <CardSubtitle>Dias de antecendência: {item.antecedenceDays}</CardSubtitle>
                )}
            </View>
            <DetailValue>{renderLabels(item.status)}</DetailValue>
        </CardHeader>

        <CardDetailRow>
            <CardDetail>
                <DetailLabel>Recorrente?</DetailLabel>
                <DetailValue>{item.isRecurring ? 'Sim' : 'Não'}</DetailValue>
            </CardDetail>
        </CardDetailRow>
        <CardDetailRow>
            <CardDetail>
                <DetailLabel>Descrição</DetailLabel>
                <DetailValue>{item.description || 'Nenhuma descrição'}</DetailValue>
            </CardDetail>
        </CardDetailRow>
    </FuelingCard>
);

return (
    <Content>
        {isLoading ? (
            <LoadingContainer>
                <ActivityIndicator size="large" color={theme.colors.green} />
            </LoadingContainer>
        ) : reminderRecords.length === 0 ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <CardTitle>Nenhum lembrete registrado</CardTitle>
                <CardSubtitle>Você ainda não possui lembretes registrados.</CardSubtitle>
                <Button
                    onPress={() => router.push('/Reminders/Register')}
                    style={{ marginTop: 20 }}
                >
                    Adicionar Lembrete
                </Button>
            </View>
        ) :
            <>
                <ButtonContainer>
                    <Dropdown
                        style={{ width: '90%' }}
                        data={[
                            { label: 'Novo Lembrete', value: 'new', onPress: () => router.push('/Reminders/Register') },
                        ]}
                        labelField="label"
                        valueField="value"
                        placeholder=""
                        search={false}
                        onChange={(item) => {
                            if (item.onPress) {
                                item.onPress();
                            }
                        }
                        }
                        renderRightIcon={() => <></>}
                        renderLeftIcon={() => <Ionicons name="menu" size={24} color="black" />}
                    />
                </ButtonContainer>
                <SummaryContainer>
                    <SummaryItem>
                        <SummaryLabel>Lembretes</SummaryLabel>
                        <SummaryValue>{reminderRecords.length}</SummaryValue>
                    </SummaryItem>

                </SummaryContainer>
                <FlatList
                    data={reminderRecords}
                    renderItem={renderFuelingItem}
                    keyExtractor={item => item.id}
                />
            </>
        }
    </Content>
);
};

export default ReminderManagement;