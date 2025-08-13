import { ReactNode, createContext, useContext, useState } from "react";

type DeleteUserConfirmationContextType = {
    isDeleteUserConfirmationOpen: boolean;
    toggleOpenDeleteUserConfirmation: () => void;
    toggleCloseDeleteUserConfirmation: () => void;
};

const DeleteUserConfirmationContext = createContext<DeleteUserConfirmationContextType | undefined>(undefined);

export const DeleteUserConfirmationProvider = ({ children }: { children: ReactNode }) => {
    const [isDeleteUserConfirmationOpen, setIsDeleteUserConfirmationOpen] = useState<boolean>(false);

    const toggleOpenDeleteUserConfirmation = () => {
        setIsDeleteUserConfirmationOpen(true);
    };

    const toggleCloseDeleteUserConfirmation = () => {
        setIsDeleteUserConfirmationOpen(false);
    };

    const value = {
        isDeleteUserConfirmationOpen,
        toggleOpenDeleteUserConfirmation,
        toggleCloseDeleteUserConfirmation,
    };

    return (
        <DeleteUserConfirmationContext.Provider value={value}>
            {children}
        </DeleteUserConfirmationContext.Provider>
    );
};

export const useDeleteUserConfirmationContext = (): DeleteUserConfirmationContextType => {
    const context = useContext(DeleteUserConfirmationContext);
    if (context === undefined) {
        throw new Error('useDeleteUserConfirmationContext must be used within a DeleteUserConfirmationProvider');
    }
    return context;
};