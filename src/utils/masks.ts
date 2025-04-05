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