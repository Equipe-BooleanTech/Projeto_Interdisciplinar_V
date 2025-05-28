import { theme } from '@/theme';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

export const ModalView = styled.View`
    width: 90%;
    background-color: ${theme.colors.card};
    border-radius: 10px;
    padding: 20px;
    align-items: center;
    shadow-color: #000;
    shadow-offset: {
        width: 0;
        height: 2px;
    };
    shadow-opacity: 0.25;
    shadow-radius: 4px;
    elevation: 5;
    border: 1px solid ${theme.colors.green};
    max-height: 80%;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1000;
    margin: auto;
    padding-bottom: 30px;
`;

export const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`;

export const Message = styled.Text`
    text-align: center;
    margin-bottom: 20px;
`;

export const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    align-items: center;
    margin: auto;
`;

export const CancelButton = styled.Button`
    background-color: transparent;
    padding: 10px;
    border-radius: 5px;
`;

export const ConfirmButton = styled.Button`
    border-radius: 5px;
    margin: auto;
    padding: 10px;
`;