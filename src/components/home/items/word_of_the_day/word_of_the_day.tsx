import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import {LinearGradient} from 'expo-linear-gradient';

import wordOfTheDayStyle from './word_of_the_day_style';

import { useWords } from '../../../../context/general_context/words_context';

import { Languages } from '../../../../data_objects/enums/language';
import { WordDetails } from '../../../../data_objects/words/basic_data_objects/word_details';
import { WordsDictionary } from '../../../../data_objects/words/dIctionary/words_dictionary';
import AsyncStorage from '@react-native-async-storage/async-storage';

const generateDailyWord = (hebrewWords: WordsDictionary, englishWords: WordsDictionary) => {
    // random language and level
    const randomLanguage = Math.random() < 0.5 ? Languages.Hebrew : Languages.English;
    const randomLevel = 0; // TODO: change level 0 to random 1-10/5-10

    let randomLanguageWordsDict: { [word: string]: WordDetails } = {};
    
    // handle the selection of the correct dict by random language
    switch (randomLanguage) {
        case Languages.Hebrew:
            randomLanguageWordsDict = hebrewWords.Words[randomLevel];
            break;
        case Languages.English:
            randomLanguageWordsDict = englishWords.Words[randomLevel];
            break;
    }

    // gets all the keys (words) of the random language and level
    const randomLanguageWords = Object.keys(randomLanguageWordsDict);
    // picks a random word
    const randomWord = randomLanguageWords[Math.floor(Math.random() * randomLanguageWords.length)];
    
    // creates the meanings string
    const randomMeaning = randomLanguageWordsDict[randomWord].Meanings.map((meaning) => meaning.Meaning).join("\n");

    return {word: randomWord, meaning: randomMeaning};
}

const getDateToday = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

const WordOfTheDay = () => {
    const { hebrewWords, englishWords } = useWords();

    const [word, setWord] = useState<string>('');
    const [meaning, setMeaning] = useState<string>('');
    
    useEffect(() => {
        const RandomWord = async () => {
            try {
                // get the last daily word
                const currentWord = await AsyncStorage.getItem('daily_word');
                // if there is data then parsing over it
                const parsedCurrentWord = currentWord ? JSON.parse(currentWord) : {};
                
                let randomWord = '';
                let randomMeaning = '';
                
                // date of today
                const today = getDateToday();
                
                // if there is no data about last daily word/the last time a daily word was generated was not today
                if (!currentWord || (Object.keys(parsedCurrentWord).length > 0 && new Date(parsedCurrentWord.date).toISOString() !== new Date(today).toISOString())) {
                    const fullWord = generateDailyWord(hebrewWords, englishWords);
                    randomWord = fullWord.word;
                    randomMeaning = fullWord.meaning;

                    // updates the last daily word data
                    await AsyncStorage.setItem('daily_word', JSON.stringify({
                        date: today,
                        word: randomWord,
                        meaning: randomMeaning,
                    }))
                } 
                // if the last daily word was today
                else if (Object.keys(parsedCurrentWord).length > 0 && new Date(parsedCurrentWord.date).toISOString() == new Date(today).toISOString()) {
                    randomWord = parsedCurrentWord.word;
                    randomMeaning = parsedCurrentWord.meaning;
                }
                else {
                    throw new Error();
                }

                setWord(randomWord);
                setMeaning(randomMeaning);

            } catch (err) {
                setMeaning('תקלה');
            }
        }

        RandomWord();
    }, []);

    return (
        <View style={wordOfTheDayStyle.container}>
            <LinearGradient colors={['#F27155', '#EA7B30']}
                            start={{ x: 1, y: 0.5 }}
                            end={{ x: 0, y: 0.5 }}
                            style={wordOfTheDayStyle.wordOfTheDaySection}>
                <View style={wordOfTheDayStyle.title}>
                    <Text style={wordOfTheDayStyle.subTitle}>המילה היומית</Text>
                    <Text style={wordOfTheDayStyle.word}>"{word}"</Text>
                </View>
                <View style={wordOfTheDayStyle.meaningContainer}>
                    <Text style={wordOfTheDayStyle.meaning}>{meaning}</Text>
                </View>
                <View style={wordOfTheDayStyle.blankSpace}></View>
            </LinearGradient>
        </View>
    );
};

export default WordOfTheDay;