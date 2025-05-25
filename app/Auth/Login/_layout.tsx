import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#DFDDD1',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    marginTop: 0,
    marginBottom: 0,
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  titleInput: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    marginBottom: 5,
    marginEnd: 'auto',
  },
  signupText: {
    color: '#454F2C',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginEnd: 'auto',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 5,
    marginRight: 10,
    marginTop: 20,
    marginEnd: 'auto',
  },
  checkboxChecked: {
    backgroundColor: '#fff',
  },
  checkmark: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 2.5,
    marginTop: -3,
  },
  checkboxLabel: {
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: '#454F2C',
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    marginBottom: 10,
  },
  googleButton: {
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#454F2C',
  },
  googleButtonText: {
    fontSize: 16,
    color: '#454F2C',
    fontWeight: 'bold',
  },
  phoneButton: {
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#454F2C',
  },
  phoneButtonText: {
    fontSize: 16,
    color: '#454F2C',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  modalBox: {
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderRadius: 12,
    elevation: 5,
    alignItems: 'center',
    width: '70%',
    zIndex: 2,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  modalMessage: {
    fontSize: 15,
  },
});
