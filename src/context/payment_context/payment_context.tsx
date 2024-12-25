import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { PaymentContextConfig } from '../../config/contexts/payment_context_config';
import { PaymentDetails } from '../../data_objects/contexts/payment_details';

export const PaymentContext = createContext<PaymentContextConfig | undefined>(undefined);

export const PaymentProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [details, setDetails] = useState<PaymentDetails>({
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