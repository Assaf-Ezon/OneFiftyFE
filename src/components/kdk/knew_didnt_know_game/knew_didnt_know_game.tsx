import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import EndGame from '../../games/end_game/end_game';
import React from 'react';

import KnewDidntKnowGameStyle from './knew_didnt_know_game_style';
import { fadeIn } from '../../../animations/fade_animations';
import { useEffect, useState } from 'react';

import { useEndGameContext } from '../../../context/game_context/end_game_context';

import { ButtonState } from '../../../data_objects/enums/button_state';

import { GAMES } from '../../../data_objects/enums/game_objects';
import { useGameLogic } from '../../../game_utils/use_game_logic';
import { getMeaningsAsString } from '../../../game_utils/get_meanings_as_string';

const KnewDidntKnowGame = () => {
    // Contexts
    const { isEndGame } = useEndGameContext();

    // State
    const [answer, setAnswer] = useState<number>(ButtonState.ShowAnswer); // Button states

    // Animations
    const fadeAnim = useState<Animated.Value>(new Animated.Value(0))[0];
    const btnFadeAnim = useState<Animated.Value>(new Animated.Value(0))[0];

    const { correctAnswers,
        wrongAnswers,
        totalWords,
        currentWord,
        wordCount,
        setNewValuesForNextWord,
        setIsAnswerCorrect } = useGameLogic(GAMES.KDK.id, fadeAnim, {});

        
    useEffect(() => {
        if (answer) {
            fadeIn(btnFadeAnim, 1, 200, false).start();
        } else {
            btnFadeAnim.setValue(0);
        }
    }, [answer, btnFadeAnim]);

    return (
        <>
            <Animated.View style={[KnewDidntKnowGameStyle.question, { opacity: isEndGame ? 0.6 : fadeAnim }]}
                pointerEvents={isEndGame ? 'none' : 'auto'}>
                            <View style={KnewDidntKnowGameStyle.wordSection}>
                    <Text style={KnewDidntKnowGameStyle.word} allowFontScaling={false}>{currentWord.FullWord}</Text>
                </View>
                <View style={KnewDidntKnowGameStyle.texts}>  
                    <Text style={KnewDidntKnowGameStyle.wordCounter} allowFontScaling={false}>סוג: {currentWord.Type}</Text>
                    <Text style={KnewDidntKnowGameStyle.wordCounter} allowFontScaling={false}>רמה: {currentWord.Group}</Text>
                    <Text style={KnewDidntKnowGameStyle.wordCounter} allowFontScaling={false}>כמות: {wordCount}/{totalWords}</Text>
                </View>
                <View style={KnewDidntKnowGameStyle.interpretation}>
                    <LinearGradient
                        colors={['#F27155', '#EA7B30']}
                        start={{ x: 1, y: 0.5 }}
                        end={{ x: 0, y: 0.5 }}
                        style={KnewDidntKnowGameStyle.color}
                    >
                        <View style={KnewDidntKnowGameStyle.meaningContainer}>
                            {answer != ButtonState.ShowAnswer ? <Text style={KnewDidntKnowGameStyle.meaning} allowFontScaling={false}>
                                {getMeaningsAsString(currentWord.Meanings)}</Text> : null}
                        </View>
                    </LinearGradient>
                </View>
                {answer == ButtonState.ShowAnswer ? (
                    <Animated.View style={{ opacity: btnFadeAnim }}>
                        <TouchableOpacity style={KnewDidntKnowGameStyle.nextBtn} onPress={() =>{setAnswer(ButtonState.ChooseAnswer)}}>
                            <Text style={KnewDidntKnowGameStyle.btnText} allowFontScaling={false}>הצג תשובה</Text>
                        </TouchableOpacity>
                    </Animated.View>
                ) : answer == ButtonState.ChooseAnswer ? (
                    <View style={KnewDidntKnowGameStyle.btns}>
                        <TouchableOpacity style={KnewDidntKnowGameStyle.btn} onPress={() => {setIsAnswerCorrect(false); setAnswer(ButtonState.Continue);}}>
                            <Text style={KnewDidntKnowGameStyle.btnText} allowFontScaling={false}>לא ידעתי</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={KnewDidntKnowGameStyle.btn} onPress={() => {setIsAnswerCorrect(true); setAnswer(ButtonState.Continue);}}>
                            <Text style={KnewDidntKnowGameStyle.btnText} allowFontScaling={false}>ידעתי</Text>
                        </TouchableOpacity>
                    </View>
                ) : answer == ButtonState.Continue ? (
                    <Animated.View style={{ opacity: btnFadeAnim }}>
                        <TouchableOpacity style={KnewDidntKnowGameStyle.nextBtn} onPress={() => {setNewValuesForNextWord(); setAnswer(ButtonState.ShowAnswer);}}>
                            <Text style={KnewDidntKnowGameStyle.btnText} allowFontScaling={false}>המשך</Text>
                        </TouchableOpacity>
                    </Animated.View>
                ) : null}
            </Animated.View>
            {isEndGame ? <EndGame correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} /> : null}
        </>
    );
};

export default KnewDidntKnowGame;