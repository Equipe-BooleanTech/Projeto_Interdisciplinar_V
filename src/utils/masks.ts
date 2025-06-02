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


// maskUtils.ts
export const maskHandler = (text: string, pattern: string): string => {
  if (!pattern) return text;

  switch (pattern) {
    case 'phone':
      return phoneMask(text);
    case 'credit-card':
      return creditCardMask(text);
    case 'date':
      return dateMask(text);
    default:
      return customPatternMask(text, pattern);
  }
};

const phoneMask = (text: string): string => {
  // Format: (XX) XXXXX-XXXX
  const cleaned = text.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
  if (!match) return text;

  return `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ''}`;
};

const creditCardMask = (text: string): string => {
  // Format: XXXX XXXX XXXX XXXX
  const cleaned = text.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/);
  if (!match) return text;

  return `${match[1]}${match[2] ? ` ${match[2]}` : ''}${match[3] ? ` ${match[3]}` : ''}${match[4] ? ` ${match[4]}` : ''
    }`;
};

const dateMask = (text: string): string => {
  // Format: MM/DD/YYYY
  const cleaned = text.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{0,2})(\d{0,2})(\d{0,4})$/);
  if (!match) return text;

  return `${match[1]}${match[2] ? `/${match[2]}` : ''}${match[3] ? `/${match[3]}` : ''}`;
};

const customPatternMask = (text: string, pattern: string): string => {
  // Handle custom patterns like '##-##-####'
  const patternChars = pattern.replace(/\D/g, '');
  const textChars = text.replace(/\D/g, '');

  let maskedText = '';
  let textIndex = 0;

  for (let i = 0; i < pattern.length; i++) {
    if (textIndex >= textChars.length) break;

    if (pattern[i] === '#') {
      maskedText += textChars[textIndex];
      textIndex++;
    } else {
      maskedText += pattern[i];
    }
  }

  return maskedText;
};