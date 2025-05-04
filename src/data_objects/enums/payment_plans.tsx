export const Plans = {
    OneMonth: {Plan: 'OneMonth', Title: 'חודש', Description: 'מנוי לחודש בודד', Price: '30.00', isRecommended: false, backgroundColor: '#232323', productId: 'onefifty_3000_1m_1w'},
    TwoMonths: {Plan: 'TwoMonth', Title: 'חודשיים', Description: 'חיסכון של כ-17% בחודש', Price: '50.00', isRecommended: false, backgroundColor: '#e57c37', productId: 'PLACEHOLDER'},
    ThreeMonths: {Plan: 'ThreeMonth', Title: 'שלושה חודשים', Description: 'חיסכון של כ-23% בחודש', Price: '70.00', isRecommended: true, backgroundColor: '#7F5CA6', productId: 'PLACEHOLDER'},
    SixMonths: {Plan: 'SixMonth', Title: 'שישה חודשים', Description: 'חיסכון של כ-33% בחודש', Price: '120.00', isRecommended: true, backgroundColor: '#48D1CC', productId: 'PLACEHOLDER'}, 
} as const;