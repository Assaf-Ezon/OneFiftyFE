import { PaymentDetails } from "../../Dataobjects/Contexts/PaymentDetails";

export interface PaymentContextProps {
    details: PaymentDetails;
    setDetails: (details: PaymentDetails) => void;
    isPaymentWebViewOpen: boolean;
    setIsPaymentWebViewOpen: (isPaymentWebViewOpen: boolean) => void;
};