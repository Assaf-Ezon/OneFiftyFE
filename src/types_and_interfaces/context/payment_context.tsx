export type Payment = {
    name: string,
    price: string,
};

export interface PaymentContextProps {
    details: Payment;
    setDetails: (details: Payment) => void;
    isPaymentWebViewOpen: boolean;
    setIsPaymentWebViewOpen: (isPaymentWebViewOpen: boolean) => void;
};