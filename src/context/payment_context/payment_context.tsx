import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { Payment, PaymentContextProps } from '../../types_and_interfaces/context/payment_context';

export const PaymentContext = createContext<PaymentContextProps | undefined>(undefined);

export const PaymentProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [details, setDetails] = useState<Payment>({
        name: '',
        price: '00.00',
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