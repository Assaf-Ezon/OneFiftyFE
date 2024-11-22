interface Meaning {
    Meaning: string;
    Source: string;
}

interface WordDetails {
    FullWord: string;
    Meanings: Meaning[];
    Group: number;
}

interface WordsDictionary {
    [key: string]: {
        [word: string]: WordDetails;
    };
}

interface FullWordsDictionary {
    WordCount: number;
    Words: WordsDictionary;
}

const fullDict: FullWordsDictionary  = {
    "WordCount": 5, 
    "Words": {
        1: {
            "הֲגַם שֶׁ...": {
                "FullWord":"הֲגַם שֶׁ...",
                "Meanings": [
                    {
                        "Meaning":"אף על פי",
                        "Source":""
                    }
                ],
                "Group": 0,
            },
            "אָבַד עָלָיו הַכֶּלַח": {
                "FullWord":"אָבַד עָלָיו הַכֶּלַח",
                "Meanings": [
                    {
                        "Meaning":"התיישן, עבר זמנו",
                        "Source":""
                    }
                ],
                "Group": 0,
            },
        },
        2: {
            "אַבְדָּאִי": {
                "FullWord":"אַבְדָּאִי",
                "Meanings": [
                    {
                        "Meaning":"גבר חזק ותקיף, בריון",
                        "Source":"ויקימילון"
                    }
                ],
                "Group": 0,
            },
            "אֵבוּס": {
                "FullWord":"אֵבוּס",
                "Meanings": [
                    {
                        "Meaning":"כלי צר ומוארך הפתוח בחלקו העליון ובו משאירים מזון לבהמות",
                        "Source":""
                    }
                ],
                "Group": 0,
            },
            "אֲבוּקָה": {
                "FullWord":"אֲבוּקָה",
                "Meanings": [
                    {
                        "Meaning":"לפיד",
                        "Source":""
                    }
                ],
                "Group": 0,
            },
        },
    },
}

interface WordStatisticsData {
    Word: WordDetails;                 
    ConsecutiveSuccesses: number; 
    LastSeen: string;           
    Successes: number;          
    Failures: number;            
}

interface WordsStatistics {
    WordCount: number;
    Words: { [groupId: number]: { [word: string]: WordStatisticsData } };
}

interface UserStatistics {
    WordsStatistics: WordsStatistics; 
}

const statistics: UserStatistics = {
    "WordsStatistics": {
        "WordCount": 2,
        "Words": {
            1: {
                "אָבַד עָלָיו הַכֶּלַח": {
                    "Word": {
                        "FullWord": "אָבַד עָלָיו הַכֶּלַח",
                        "Meanings": [
                            {
                                "Meaning": "התיישן, עבר זמנו", 
                                "Source": ""
                            },
                        ],
                        "Group": 1,
                    },
                    "ConsecutiveSuccesses": 2,
                    "LastSeen": "2024-11-22T10:09:59.7948609Z",
                    "Successes": 2,
                    "Failures": 0
                },
            },
            2: {  
                "אַבְדָּאִי": {
                    "Word": {
                        "FullWord":  "אַבְדָּאִי",
                        "Meanings": [
                            {
                                "Meaning":"גבר חזק ותקיף, בריון",
                                "Source":"ויקימילון"
                            },
                        ],
                        "Group": 2,
                    },
                    "ConsecutiveSuccesses": 0,
                    "LastSeen": "2024-11-22T10:09:59.794862Z",
                    "Successes": 0,
                    "Failures": 2
                },
            },
        },
    },
}

const get_new_words = () => {
    const newWords: { [groupId: number]: { [word: string]: WordDetails } } = {}; 

    for (const [groupKey, groupValue] of Object.entries(fullDict.Words)) {
        const newGroupWords: { [word: string]: WordDetails } = {};
        
        const groupId = Number(groupKey);

        if (groupId in statistics.WordsStatistics.Words) {
            for (const [wordsKey, wordsValue] of Object.entries(groupValue)) {
                if (!(wordsKey in statistics.WordsStatistics.Words[groupId])) {
                    newGroupWords[wordsKey] = wordsValue;
                }
            }
            newWords[groupId] = newGroupWords;
        } else {
            newWords[groupId] = groupValue;
        }
    }
    console.log(newWords);
    return newWords;
}

get_new_words();


