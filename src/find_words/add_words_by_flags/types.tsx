//types for word list
export type Meaning = {
    Meaning: string;
    Source: string;
}

export type WordListDetails = {
    FullWord: string;
    Meanings: Meaning[];
    Group: number;
    Type: string;
}

export type Words = {
    [key: string]: {
        [word: string]: WordListDetails;
    };
}

// new words dictionaries interface
export type WordDetails = {
    FullWord: string;
    Meanings: Meaning[];
    Group: number;
}

export type NewWords = {
    [groupId: number]: { 
        [word: string]: WordDetails 
    }
}

// interfaces for statistics
export type WordStatisticsData = {
    Word: WordDetails;                 
    ConsecutiveSuccesses: number; 
    LastSeen: string;           
    Successes: number;          
    Failures: number;            
}

export type WordsStatistics = {
    WordCount: number;
    Words: { [groupId: number]: { [word: string]: WordStatisticsData } };
}

export type UserStatistics = {
    WordsStatistics: WordsStatistics; 
}