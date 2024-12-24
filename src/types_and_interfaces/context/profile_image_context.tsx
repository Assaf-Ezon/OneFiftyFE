export interface ProfileImageContextProps {
    isProfileImageMenuOpen: boolean;
    toggleProfileImageMenu: () => void;
    imageIndex: number | null;
    setImageIndex: (image: number) => void;
}