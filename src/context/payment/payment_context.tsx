import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface Payment {
    name: string,
    price: number,
};

interface PaymentContextProps {
    details: Payment;
    setDetails: (details: Payment) => void;
    isPaymentWebViewOpen: boolean;
    setIsPaymentWebViewOpen: (isPaymentWebViewOpen: boolean) => void;
};

export const PaymentContext = createContext<PaymentContextProps | undefined>(undefined);

export const PaymentProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [details, setDetails] = useState<Payment>({
        name: '',
        price: 0,
    });
    const [isPaymentWebViewOpen, setIsPaymentWebViewOpen] = useState<boolean>(false);

    return (
        <PaymentContext.Provider value={{ details, setDetails, isPaymentWebViewOpen, setIsPaymentWebViewOpen }}>
            {children}
        </PaymentContext.Provider>
    );
};

export const usePaymentContext = () => {
    const context = useContext(PaymentContext);
    if (!context) {
      throw new Error('Trying to reach payment context outside of payment provider');
    }
    return context;
};