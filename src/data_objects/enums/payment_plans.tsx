export const Plans = {
    OneMonth: {Plan: 'OneMonth', Title: 'חודש', Description: 'מנוי לחודש בודד', Price: '30.00', isRecommended: false, backgroundColor: '#232323'},
    TwoMonths: {Plan: 'TwoMonth', Title: 'חודשיים', Description: 'חיסכון של כ-17% בחודש', Price: '50.00', isRecommended: false, backgroundColor: '#e57c37'},
    ThreeMonths: {Plan: 'ThreeMonth', Title: 'שלושה חודשים', Description: 'חיסכון של כ-23% בחודש', Price: '70.00', isRecommended: true, backgroundColor: '#7F5CA6'},
    SixMonths: {Plan: 'SixMonths', Title: 'שישה חודשים', Description: 'חיסכון של כ-33% בחודש', Price: '120.00', isRecommended: true, backgroundColor: '#7F5CA6'}, // TODO: change background color
} as const;