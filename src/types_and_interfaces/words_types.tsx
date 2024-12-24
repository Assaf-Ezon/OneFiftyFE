// part of "wordDetails" and "WordsListDetails"
export type Meaning = {
    Meaning: string;
    Source: string;
}

// the data inside a word in the dict that is used in games 
export type WordListDetails = {
    FullWord: string;
    Meanings: Meaning[];
    Group: number;
    Type: string;
}

// type of dicts that are used in games
export type GameWords = {
    [key: string]: {
        [word: string]: WordListDetails;
    };
}

// details of words in dictionaries inside the words context
export type WordDetails = {
    FullWord: string;
    Meanings: Meaning[];
    Group: number;
}

// the words in 'dictionary' dicts
export type WordsDictionary = {
    [key: string]: {
        [word: string]: WordDetails;
    };
}

// type of the "new words" dict that is generated on "profile data" request
export type NewWords = {
    [groupId: number]: { 
        [word: string]: WordDetails 
    }
}

// type of word data in statistics format
export type WordStatisticsData = {
    Word: WordDetails;                 
    ConsecutiveSuccesses: number; 
    LastSeen: string;           
    Successes: number;          
    Failures: number;            
}

// wrapper for the words dict in statitistics dicts
export type WordsStatistics = {
    WordCount: number;
    Words: { [groupId: number]: { [word: string]: WordStatisticsData } };
}

// wrapper for statistics
export type UserStatistics = {
    WordsStatistics: WordsStatistics; 
}

// 'dictionary' dict
export type FullWordsDictionary = {
    WordCount: number;
    Words: WordsDictionary;
}