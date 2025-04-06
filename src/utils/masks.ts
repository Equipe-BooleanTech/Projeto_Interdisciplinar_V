export const formatDate = (text: string) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 2) cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    if (cleaned.length > 5) cleaned = cleaned.slice(0, 5) + '/' + cleaned.slice(5, 9);
    return cleaned;
};

export const DDD_OPTIONS = ['+55', '+1', '+44', '+33', '+49'];

export const formatPhone = (text: string) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 2) cleaned = '(' + cleaned.slice(0, 2) + ') ' + cleaned.slice(2);
    if (cleaned.length > 10) cleaned = cleaned.slice(0, 10) + '-' + cleaned.slice(10, 14);
    return cleaned;
};

// Validations
export const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
};
export const validatePhone = (text: string) => {
    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return phoneRegex.test(text);
}
export const validateDate = (text: string) => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return dateRegex.test(text);
}
export const validatePassword = (text: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(text);
}
export const validateUsername = (text: string) => {
    const usernameRegex = /^[a-zA-Z0-9_]{4,}$/;
    return usernameRegex.test(text);
}

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