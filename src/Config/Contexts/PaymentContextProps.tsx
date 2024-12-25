import { PaymentDetails } from "../../Data objects/Contexts/PaymentDetails";

export interface PaymentContextProps {
    details: PaymentDetails;
    setDetails: (details: PaymentDetails) => void;
    isPaymentWebViewOpen: boolean;
    setIsPaymentWebViewOpen: (isPaymentWebViewOpen: boolean) => void;
};