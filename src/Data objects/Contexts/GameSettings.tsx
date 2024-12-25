export type Settings = {
    shouldIncludeNewWords: boolean;
    shouldIncludeIncorrectWords: boolean;
    shouldIncludePracticeWords: boolean;
    shouldIncludeSmartStudy: boolean;
    language: string | null;
    levels: { [key: number]: number };
}
