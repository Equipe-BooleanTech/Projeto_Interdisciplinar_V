import { Typography, Colors } from 'react-native-ui-lib';

Colors.loadColors({
    darkGreen: '#262A18',
    green: '#454F2C',
    brown: '#713519',
    card: '#F2F2F2',
    warning: '#D49A56',
    danger: '#D9534F',
    white: '#FFFFFF',
    black: '#000000',
    text: '#1A1C1E'
});

Typography.loadTypographies({
    h1: { fontSize: 32, fontWeight: '700', lineHeight: 30 },
    h2: { fontSize: 20, fontWeight: '700', lineHeight: 32 },
    h3: { fontSize: 18, fontWeight: '700', lineHeight: 24 },
    body: { fontSize: 12, fontWeight: '400', lineHeight: 24 },
    bodyBold: { fontSize: 12, fontWeight: '700', lineHeight: 24 },
    label: { fontSize: 14, fontWeight: '500', lineHeight: 24 },
});