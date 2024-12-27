import { Plans } from "../enums/payment_plans";

export type PlanType = typeof Plans[keyof typeof Plans];