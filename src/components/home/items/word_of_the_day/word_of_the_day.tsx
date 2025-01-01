import { View, Text } from 'react-native';
import { FC, useEffect, useState } from 'react';
import {LinearGradient} from 'expo-linear-gradient';

import wordOfTheDayStyle from './word_of_the_day_style';

import { useWords } from '../../../../context/general_context/words_context';

import { Languages } from '../../../../data_objects/enums/language';
import { WordDetails } from '../../../../data_objects/words/basic_data_objects/word_details';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WordOfTheDay: FC = () => {
    const { hebrewWords, englishWords } = useWords();

    const [word, setWord] = useState<string>('');
    const [meaning, setMeaning] = useState<string>('');
    
    useEffect(() => {
        const RandomWord = async () => {
            try {
                // get the last daily word
                const currecntWord = await AsyncStorage.getItem('daily_word');
                // if there is data then parsing over it
                const parsedCurrentWord = currecntWord ? JSON.parse(currecntWord) : {};
                
                let randomWord = '';
                let randomMeaning = '';
                
                // date of today
                const today = new Date().toISOString().slice(0, 10);
                
                // if there is no data about last daily word/the last daily word wasn't today
                if (!currecntWord || (Object.keys(parsedCurrentWord).length > 0 && new Date(parsedCurrentWord.date).toISOString() !== new Date(today).toISOString())) {
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
                    randomWord = randomLanguageWords[Math.floor(Math.random() * randomLanguageWords.length)];
                    
                    // creates the meanings string
                    randomMeaning = randomLanguageWordsDict[randomWord].Meanings.map((meaning) => meaning.Meaning).join("\n");

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