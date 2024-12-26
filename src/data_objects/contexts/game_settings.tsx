export type GameSettings = {
    shouldIncludeNewWords: boolean;
    shouldIncludeIncorrectWords: boolean;
    shouldIncludePracticedwords: boolean;
    shouldIncludeSmartStudy: boolean;
    language: string | null;
    levels: { [key: number]: number };
}
