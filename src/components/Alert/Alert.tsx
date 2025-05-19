import { Modal } from 'react-native';
import { AlertProps } from './Alert.interface';
import React from 'react';
import { ButtonContainer, Container, Message, Title } from './Alert.styles';
import { Button } from '..';

const Alert = (Props: AlertProps) => {
  const { isVisible, message, onConfirm, title, cancelText, confirmText, onCancel } = Props;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        onCancel ? onCancel() : null;
      }}
    >
      <Container>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <ButtonContainer>
          {onCancel && (
            <Button
              onPress={() => {
                onCancel();
              }}
              variant="primary"
            >
              {cancelText || 'Cancelar'}
            </Button>
          )}
          <Button
            onPress={() => {
              onConfirm();
            }}
            variant="primary"
          >
            {confirmText || 'OK'}
          </Button>
        </ButtonContainer>
      </Container>
    </Modal>
  );
};
export default Alert;
