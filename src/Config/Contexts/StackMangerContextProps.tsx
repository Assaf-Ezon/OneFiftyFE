import { StackNames } from "../../Dataobjects/Contexts/StackNames";

export interface StackMangerContextProps {
    stackIndex: number;
    setStackIndexByName: (name: StackNames) => void;
    authStackInitialRouteName: string;
    handleLogout: () => void;
    handleInactive: () => void;
}