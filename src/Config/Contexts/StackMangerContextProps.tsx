import { StackNames } from "../../Data objects/Contexts/StackNames";

export interface StackMangerContextProps {
    stackIndex: number;
    setStackIndexByName: (name: StackNames) => void;
    authStackInitialRouteName: string;
    handleLogout: () => void;
    handleInactive: () => void;
}