import { PaymentDetails } from "../../data_objects/contexts/payment_details";

export interface PaymentContextConfig {
    details: PaymentDetails;
    setDetails: (details: PaymentDetails) => void;
    isPaymentWebViewOpen: boolean;
    setIsPaymentWebViewOpen: (isPaymentWebViewOpen: boolean) => void;
};