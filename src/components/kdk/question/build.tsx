// settings interface
interface Settings {
    newWords: boolean;
    incorrectWords: boolean;
    practiceWords: boolean;
    smartStudy: boolean;
    language: string | null;
    levels: { [key: number]: number };
}

// dict object for game interfaces
interface Meaning {
    Meaning: string;
    Source: string;
}

interface WordDetails {
    FullWord: string;
    Meanings: Meaning[];
    Group: number;
}

class buildKdkGame {
    private _settings: Settings;

    constructor(settings: Settings) {
        this._settings = settings;
    }

    setSettings(settings: Settings): void {
        this._settings = settings;
    }

    buildGame() {
        switch (this._settings.smartStudy) {
            case true:
                break;
            case false:
                break;
        }
    }
}