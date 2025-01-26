import { Text, View, TouchableOpacity, Image, Animated } from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';

import EndGame from '../../games/end_game/end_game';

import { IMAGES } from '../../../image_handler';

import MultipleChoicesGameStyle from './multiple_choices_game_style';

import { fadeIn } from '../../../animations/fade_animations';

import { useEndGameContext } from '../../../context/game_context/end_game_context';

import { GAMES } from '../../../data_objects/enums/game_objects';

import { EnrichersParamName } from '../../../data_objects/enums/enrichers_param_name';
import { useGameLogic } from '../../../game_component_logic/use_game_logic';
import { getMeaningsAsString } from '../../../game_component_logic/get_meanings_as_string';

const MultipleChoicesGame = () => {    
    // Contexts
    const { isEndGame } = useEndGameContext();

    // State
    const [isNextBtn, setIsNextBtn] = useState<boolean>(false);
    const [isCheckBtn, setIsCheckBtn] = useState<boolean>(false);

    const [desiredMeaning, setDesiredMeaning] = useState<string>(""); // the meaning that the user chose right now

    // Animations
    const fadeAnim = useState<Animated.Value>(new Animated.Value(0))[0];

    const { correctAnswers,
        wrongAnswers,
        totalWords,
        currentWord,
        wordCount,
        setNewValuesForNextWord,
        setIsAnswerCorrect } = useGameLogic(GAMES.MC.id, fadeAnim, {[EnrichersParamName.RandomMeanings]: []});
        

    useEffect(() => {
        fadeIn(fadeAnim).start();
    }, [currentWord.FullWord, fadeAnim]);

    // changes the user's pick and reveals the first button
    const setUserMeaning = (meaning: string) => {
        setDesiredMeaning(meaning);
        setIsCheckBtn(true);
    };

    return (
        <>
            <Animated.View style={[MultipleChoicesGameStyle.question, {opacity: fadeAnim}]}>
                <View style={MultipleChoicesGameStyle.wordSection}>
                    <Text style={MultipleChoicesGameStyle.word} allowFontScaling={false}>{currentWord.FullWord}</Text>
                </View>
                <View style={MultipleChoicesGameStyle.texts}>  
                    <Text style={MultipleChoicesGameStyle.wordCounter} allowFontScaling={false}>סוג: {currentWord.Type}</Text>
                    <Text style={MultipleChoicesGameStyle.wordCounter} allowFontScaling={false}>רמה: {currentWord.Group}</Text>
                    <Text style={MultipleChoicesGameStyle.wordCounter} allowFontScaling={false}>כמות: {wordCount}/{totalWords}</Text>
                </View>
                <View style={MultipleChoicesGameStyle.pirushim}>
                    {
                        currentWord.ExtraParameters[EnrichersParamName.RandomMeanings].map((meaning: string) => {
                                return (
                                    <TouchableOpacity style={MultipleChoicesGameStyle.option} onPress={!isNextBtn ? () => {setUserMeaning(meaning)} : () => {}} key={meaning}>
                                        <Text style={[MultipleChoicesGameStyle.optionText, {fontWeight: isNextBtn && meaning === getMeaningsAsString(currentWord.Meanings) ? '600' : '300', 
                                            textDecorationLine: isNextBtn && meaning === desiredMeaning ? 'underline' : 'none'}]}
                                            allowFontScaling={false}>
                                            {meaning}
                                        </Text>
                                        <Image source={meaning ===  desiredMeaning && isCheckBtn ? IMAGES.chosen_option : 
                                            meaning === getMeaningsAsString(currentWord.Meanings) && isNextBtn ? IMAGES.correct : 
                                            isNextBtn && meaning !== getMeaningsAsString(currentWord.Meanings) ? IMAGES.wrong : IMAGES.option} 
                                        style={MultipleChoicesGameStyle.option_image} />
                                    </TouchableOpacity>
                                )
                        })
                    }
                </View>
            </Animated.View>
            {isCheckBtn ? (
                <TouchableOpacity style={MultipleChoicesGameStyle.nextBtn} onPress={() => {setIsNextBtn(true); setIsCheckBtn(false);}}>
                    <Text style={MultipleChoicesGameStyle.btnText} allowFontScaling={false}>בדיקה</Text>
                </TouchableOpacity>
            ): null}
            {isNextBtn ? (
                <TouchableOpacity style={MultipleChoicesGameStyle.nextBtn} onPress={() => {setIsAnswerCorrect(getMeaningsAsString(currentWord.Meanings) === desiredMeaning); setIsNextBtn(false); setNewValuesForNextWord();}}>
                    <Text style={MultipleChoicesGameStyle.btnText} allowFontScaling={false}>המשך</Text>
                </TouchableOpacity>
            ) : null}

            {isEndGame ? <EndGame correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} /> : null}
        </>
    );
};

export default MultipleChoicesGame;