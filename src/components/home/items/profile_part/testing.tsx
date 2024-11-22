const fullDict = {
    "1": {
        "הֲגַם שֶׁ...": {
            "FullWord":"הֲגַם שֶׁ...",
            "Meanings": [
                {
                    "Meaning":"אף על פי",
                    "Source":""
                }
            ],
            "Group": 0
        },
        "אָבַד עָלָיו הַכֶּלַח": {
            "FullWord":"אָבַד עָלָיו הַכֶּלַח",
            "Meanings": [
                {
                    "Meaning":"התיישן, עבר זמנו",
                    "Source":""
                }
            ],
            "Group": 0
        },
    },
    "2": {
        "אַבְדָּאִי": {
            "FullWord":"אַבְדָּאִי",
            "Meanings": [
                {
                    "Meaning":"גבר חזק ותקיף, בריון",
                    "Source":"ויקימילון"
                }
            ],
            "Group": 0
        },
        "אֵבוּס": {
            "FullWord":"אֵבוּס",
            "Meanings": [
                {
                    "Meaning":"כלי צר ומוארך הפתוח בחלקו העליון ובו משאירים מזון לבהמות",
                    "Source":""
                }
            ],
            "Group": 0
        },
        "אֲבוּקָה": {
            "FullWord":"אֲבוּקָה",
            "Meanings": [
                {
                    "Meaning":"לפיד",
                    "Source":""
                }
            ],
            "Group": 0
        }
    }
}

const statistics = {
    "WordCount": 2,
    "Words": {
        1: {
            "אָבַד עָלָיו הַכֶּלַח": {
                "אָבַד עָלָיו הַכֶּלַח": {
                    "FullWord": "אָבַד עָלָיו הַכֶּלַח",
                    "Meanings": [
                        {
                            "Meaning": "התיישן, עבר זמנו", 
                            "Source": ""
                        },
                    ],
                    "Group": 1,
                },
                "ConsecutiveSuccesses": 5,
                "LastSeen": "2024-11-22T10:00:00",
                "Successes": 20,
                "Failure": 2,
            },
        },
        2: {  
            "אַבְדָּאִי": {
                "אַבְדָּאִי": {
                    "FullWord":  "אַבְדָּאִי",
                    "Meanings": [
                        {
                            "Meaning":"גבר חזק ותקיף, בריון",
                            "Source":"ויקימילון"
                        }
                    ],
                    "Group": 2,
                },
                "ConsecutiveSuccesses": 2,
                "LastSeen": "2024-11-20T08:30:00",
                "Successes": 8,
                "Failure": 5,
            }
        },
    }
}

let sub = {}

export const subtract = () => {
    for (const [key, value] of Object.entries(fullDict)) {

    }
}
