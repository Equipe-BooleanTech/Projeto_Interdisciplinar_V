export const formatDate = () => {
  const regex = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  return regex;
};

export const getNewDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}

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


export const formatNumberMask = (
  value: string,
  decimalPlaces: number = 0,
  allowNegative: boolean = false
): string => {
  // Handle negative numbers
  const isNegative = allowNegative && value.startsWith('-');
  let cleaned = value.replace(/[^0-9]/g, '');

  // Ensure we don't exceed 10 million (10,000,000)
  const numericValue = parseFloat(cleaned) / Math.pow(10, decimalPlaces);
  if (numericValue > 10000000) {
    cleaned = '10000000';
  }

  // Handle decimal part
  let integerPart = cleaned;
  let decimalPart = '';

  if (decimalPlaces > 0) {
    integerPart = cleaned.slice(0, -decimalPlaces) || '0';
    decimalPart = cleaned.slice(-decimalPlaces);

    if (decimalPart.length > decimalPlaces) {
      decimalPart = decimalPart.slice(0, decimalPlaces);
    }
  }

  // Add thousand separators to integer part
  const formattedInteger = integerPart
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Combine parts
  let result = formattedInteger;
  if (decimalPlaces > 0 && decimalPart) {
    result += `.${decimalPart}`;
  }

  if (isNegative) {
    result = `-${result}`;
  }

  return result;
};

/**
 * Removes formatting from a formatted number string
 * @param value Formatted number string (e.g., "1,234,567.89")
 * @returns Plain numeric string (e.g., "1234567.89")
 */
export const removeNumberMask = (value: string): string => {
  return value.replace(/,/g, '');
};

/**
 * Validates if the number is within the 0-10,000,000 range
 * @param value Numeric string to validate
 * @param decimalPlaces Number of decimal places to consider
 * @returns Boolean indicating validity
 */
export const validateNumberMask = (
  value: string,
  decimalPlaces: number = 0
): boolean => {
  const numericValue = parseFloat(removeNumberMask(value));
  const maxValue = 10000000;
  const minValue = 0;

  // Check if it's a valid number
  if (isNaN(numericValue)) return false;

  // Check range
  if (numericValue < minValue) return false;
  if (numericValue > maxValue) return false;

  // Check decimal places
  if (decimalPlaces > 0) {
    const decimalPart = value.split('.')[1] || '';
    if (decimalPart.length > decimalPlaces) return false;
  }

  return true;
};

// Predefined number formats
export const numberFormats = {
  integer: {
    format: (value: string) => formatNumberMask(value, 0),
    validate: (value: string) => validateNumberMask(value, 0),
  },
  currency: {
    format: (value: string) => formatNumberMask(value, 2),
    validate: (value: string) => validateNumberMask(value, 2),
  },
  decimal: {
    format: (value: string, decimalPlaces: number = 2) =>
      formatNumberMask(value, decimalPlaces),
    validate: (value: string, decimalPlaces: number = 2) =>
      validateNumberMask(value, decimalPlaces),
  },
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
  number: formatNumberMask,
  currency: (value: string) => formatNumberMask(value, 2),
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
    case 'number': 
      return formatNumberMask(text);
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