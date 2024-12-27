export interface ProfileImageContextConfig {
    isProfileImageMenuOpen: boolean;
    toggleProfileImageMenu: () => void;
    imageIndex: number | null;
    setImageIndex: (image: number) => void;
}