import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { ContactUsFormContextConfig } from '../../config/contexts/contact_us_form_context_config';

const ContactUsFormContext = createContext<ContactUsFormContextConfig | undefined>(undefined);

export const ContactUsFormProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isContactFormOpen, setIsContactFormOpen] = useState<boolean>(false);

    const toggleOpenContactUsForm = () => {
        setIsContactFormOpen(prev => !prev);
    };

    return (
        <ContactUsFormContext.Provider value={{ isContactFormOpen, toggleOpenContactUsForm }}>
            {children}
        </ContactUsFormContext.Provider>
    );
};

export const useContactUsFormContext = () => {
    const context = useContext(ContactUsFormContext);
    if (context === undefined) {
        throw new Error('Trying to reach contact us context outside of provider');
    }
    return context;
};