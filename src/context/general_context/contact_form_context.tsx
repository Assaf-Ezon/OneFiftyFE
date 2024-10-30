import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface ContactUsFormContextProps {
    isContactFormOpen: boolean;
    toggleOpenContactUsForm: () => void;
}

const ContactUsFormContext = createContext<ContactUsFormContextProps | undefined>(undefined);

export const ContactUsFormProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isContactFormOpen, setIsContactFormOpen] = useState<boolean>(true);

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