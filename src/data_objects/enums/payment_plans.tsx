import { Platform } from 'react-native';

export const Plans = {
    OneMonth: {Plan: 'OneMonth', Title: 'חודש', Description: 'מנוי לחודש בודד', Price: '29.90', isRecommended: false, backgroundColor: '#232323', productId: Platform.OS === "ios" ? 'onefifty_3000_1m_1w' : 'ANDROID_PLACEHOLDER'},
    TwoMonths: {Plan: 'TwoMonth', Title: 'חודשיים', Description: 'חיסכון של כ-17% בחודש', Price: '49.90', isRecommended: false, backgroundColor: '#e57c37', productId: Platform.OS === "ios" ? 'onefifty_5500_2m_1w' : 'ANDROID_PLACEHOLDER'},
    ThreeMonths: {Plan: 'ThreeMonth', Title: 'שלושה חודשים', Description: 'חיסכון של כ-23% בחודש', Price: '69.90', isRecommended: true, backgroundColor: '#7F5CA6', productId: Platform.OS === "ios" ? 'onefifty_6990_3m_1w' : 'ANDROID_PLACEHOLDER'},
    SixMonths: {Plan: 'SixMonth', Title: 'שישה חודשים', Description: 'חיסכון של כ-28% בחודש', Price: '129.90', isRecommended: true, backgroundColor: '#48D1CC', productId: Platform.OS === "ios" ? 'onefifty_11990_6m_1w' : 'ANDROID_PLACEHOLDER'}, 
} as const;