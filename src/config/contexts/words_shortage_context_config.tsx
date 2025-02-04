export interface WordsShortageContextConfig {
    isMenuShown: boolean;
    setIsMenuShown: React.Dispatch<React.SetStateAction<boolean>>;
    isWordsShortage: boolean; 
    setIsWordsShortage: React.Dispatch<React.SetStateAction<boolean>>; 
    wordsShortage: { [groupId: string]: string[] };
    setWordsShortage: (wordsShortage: { [groupId: string]: string[] }) => void; 
}