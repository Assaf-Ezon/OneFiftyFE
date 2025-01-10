import { WordsDictionary } from "../../../data_objects/words/dIctionary/words_dictionary";

const create4MeaningsList = (wordsDict: WordsDictionary, currentMeaning: string): string[] => {
    const levels = Object.keys(wordsDict.Words); // all levels

    // first meaning
    let randomLevel = wordsDict.Words[Math.floor(Math.random() * levels.length)]; // random level from existing levels
    
    let randomWordInLevel = Object.values(randomLevel)[Math.floor(Math.random() * Object.keys(randomLevel).length)]; // random word in the random level
    let randomMeaning1 = randomWordInLevel.Meanings.map(item => item.Meaning).join("\n"); // the meaning of the random word

    // while the random meaning is not equal to the correct one
    while (currentMeaning === randomMeaning1) {
        randomWordInLevel = Object.values(randomLevel)[Math.floor(Math.random() * Object.keys(randomLevel).length)];
        randomMeaning1 = randomWordInLevel.Meanings.map(item => item.Meaning).join("\n");
    }

    // second meaning
    randomLevel = wordsDict.Words[Math.floor(Math.random() * levels.length)]; 
    
    randomWordInLevel = Object.values(randomLevel)[Math.floor(Math.random() * Object.keys(randomLevel).length)];
    let randomMeaning2 = randomWordInLevel.Meanings.map(item => item.Meaning).join("\n");

    // while the random meaning is not equal to the correct one/other random meaning
    while (currentMeaning === randomMeaning2 || randomMeaning1 === randomMeaning2) {
        randomWordInLevel = Object.values(randomLevel)[Math.floor(Math.random() * Object.keys(randomLevel).length)];
        randomMeaning1 = randomWordInLevel.Meanings.map(item => item.Meaning).join("\n");
    }

    // third meaning
    randomLevel = wordsDict.Words[Math.floor(Math.random() * levels.length)]; 
    
    randomWordInLevel = Object.values(randomLevel)[Math.floor(Math.random() * Object.keys(randomLevel).length)];
    let randomMeaning3 = randomWordInLevel.Meanings.map(item => item.Meaning).join("\n");

    // while the random meaning is not equal to the correct one/other random meanings
    while (currentMeaning === randomMeaning3 || randomMeaning1 === randomMeaning3 || randomMeaning2 === randomMeaning3) {
        randomWordInLevel = Object.values(randomLevel)[Math.floor(Math.random() * Object.keys(randomLevel).length)];
        randomMeaning1 = randomWordInLevel.Meanings.map(item => item.Meaning).join("\n");
    }

    const incorrectList: string[] = [randomMeaning1, randomMeaning2, randomMeaning3];

    // adding the correct meaning randomly
    const randomIndex = Math.floor(Math.random() * (incorrectList.length + 1));

    const updatedList = [...incorrectList];
    updatedList.splice(randomIndex, 0, currentMeaning);

    return updatedList;
}

export default create4MeaningsList;