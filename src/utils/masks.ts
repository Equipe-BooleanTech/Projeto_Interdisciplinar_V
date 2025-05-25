export const formatDate = () => {
  const regex = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  return regex;
};

export const formatPhone = () => {
  const regex = [
    '(',
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
  return regex;
};

// Validations
export const validateEmail = (text: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(text);
};
export const validatePhone = (text: string) => {
  const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  return phoneRegex.test(text);
};
export const validateDate = (text: string) => {
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  return dateRegex.test(text);
};
export const validatePassword = (text: string) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&_\-#])[A-Za-z\d@$!%*?&_\-#]{8,}$/;
  return passwordRegex.test(text);
};
export const validateUsername = (text: string) => {
  const usernameRegex = /^[a-zA-Z0-9_]{4,}$/;
  return usernameRegex.test(text);
};

export const validations = {
  email: validateEmail,
  phone: validatePhone,
  date: validateDate,
  password: validatePassword,
  username: validateUsername,
};

export const masks = {
  phone: formatPhone,
  date: formatDate,
};
