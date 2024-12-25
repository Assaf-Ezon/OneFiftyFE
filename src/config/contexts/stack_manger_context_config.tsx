import { StackNames } from "../../data_objects/contexts/stack_names";

export interface StackMangerContextConfig {
    stackIndex: number;
    setStackIndexByName: (name: StackNames) => void;
    authStackInitialRouteName: string;
    handleLogout: () => void;
    handleInactive: () => void;
}