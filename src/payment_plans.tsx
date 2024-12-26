import { Plans } from "./data_objects/enums/payment_plans";
import { PlanType } from "./data_objects/general/plan_type";

export const findPlanByName = (key: string): PlanType => {
    const plan = Object.values(Plans).find((plan) => plan.Plan === key);

    return plan ? plan : Plans.OneMonth;
};