import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

export const stylesHome = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A4CFF',
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
  signupText: {
    color: '#4D86FF',
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
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 5,
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#fff',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    color: '#666',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#4D86FF',
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
    marginBottom: 15,
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
    borderColor: '#DB4437',
  },
  googleButtonText: {
    fontSize: 16,
    color: '#DB4437',
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
    borderColor: '#34B7F1',
    marginBottom: 15,
  },
  phoneButtonText: {
    fontSize: 16,
    color: '#34B7F1',
    fontWeight: 'bold',
  },
  emailButton: {
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#000',
  },
  emailButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  biometricButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#000',
  },
  biometricButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
