
export const Plans = {
    OneMonth: {Plan: 'OneMonth', Title: 'חודש', Description: 'מנוי לחודש בודד', Price: '30.00', isRecommended: false, backgroundColor: '#232323'},
    TwoMonths: {Plan: 'TwoMonth', Title: 'חודשיים', Description: 'חיסכון של כ-17% בחודש', Price: '50.00', isRecommended: false, backgroundColor: '#e57c37'},
    ThreeMonths: {Plan: 'ThreeMonth', Title: 'שלושה חודשים', Description: 'חיסכון של כ-33% בחודש', Price: '60.00', isRecommended: true, backgroundColor: '#7F5CA6'},
} as const;

export type PlanType = typeof Plans[keyof typeof Plans];

export const findPlanByName = (key: string): PlanType => {
    const plan = Object.values(Plans).find((plan) => plan.Plan === key);

    return plan ? plan : Plans.OneMonth;
  };