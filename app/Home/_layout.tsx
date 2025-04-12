import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#454F2C',
    alignItems: 'center',
    justifyContent: 'center',
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    borderColor: '#454F2C',
  },
  phoneButtonText: {
    fontSize: 16,
    color: '#454F2C',
    fontWeight: 'bold',
  },

  field: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
