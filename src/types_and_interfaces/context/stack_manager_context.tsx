export enum StackNames {
    Auth = 1,
    Main = 2,
    Inactive = 3,
}

export interface StackMangerContextProps {
    stackIndex: number;
    setStackIndexByName: (name: StackNames) => void;
    authStackInitialRouteName: string;
    handleLogout: () => void;
    handleInactive: () => void;
}