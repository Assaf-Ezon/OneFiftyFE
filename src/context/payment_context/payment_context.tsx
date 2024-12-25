import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { PaymentContextProps } from '../../Config/Contexts/PaymentContextProps';
import { PaymentDetails } from '../../Dataobjects/Contexts/PaymentDetails';

export const PaymentContext = createContext<PaymentContextProps | undefined>(undefined);

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