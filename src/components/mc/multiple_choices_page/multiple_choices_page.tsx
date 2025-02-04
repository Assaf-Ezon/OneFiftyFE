import { Text, View, TouchableOpacity, Image } from 'react-native';
import { IMAGES } from '../../../image_handler';
import React from 'react';

import MultipleChoicesPageStyle from './multiple_choices_page_style';
import MultipleChoicesGame from '../multiple_choices_game/multiple_choices_game';

import GameError from '../../games/game_error/game_error';
import LeaveGame from '../../games/leave_game/leave_game';
import WordsShortageMenu from '../../games/words_shortage_menu/words_shortage_menu';

import { useEndGameContext } from '../../../context/game_context/end_game_context';
import { useLeaveGameContext } from '../../../context/game_context/leave_game_context';
import { useGameErrorContext } from '../../../context/game_context/game_error_context';
import { useWordsShortageContext } from '../../../context/game_context/words_shortage_context';

const MultipleChoicesPage = () => {    
    const { isEndGame } = useEndGameContext();
    const { isLeaveGame, toggleLeaveGameMenu } = useLeaveGameContext();
    const { isGameError } = useGameErrorContext();
    const { isWordsShortage } = useWordsShortageContext();

    const handleBackPress = () => {
        isEndGame ? null : toggleLeaveGameMenu();
    }
    return (
        <>
            <View style={[{opacity: isLeaveGame || isGameError || isWordsShortage ? 0.6 : 1}, MultipleChoicesPageStyle.container]}>
                <View style={MultipleChoicesPageStyle.topPart}>
                    <View style={[{opacity: isEndGame ? 0.6 : 1}, MultipleChoicesPageStyle.topPartText]}>
                        <TouchableOpacity onPress={() => {handleBackPress()}}>
                            <Image source={IMAGES.back_icon} />
                        </TouchableOpacity>
                        <Text style={MultipleChoicesPageStyle.pageTitle} allowFontScaling={false}>שאלון אמריקאי</Text>
                    </View>
                </View>
                {isGameError || isWordsShortage ? null : <MultipleChoicesGame />}
            </View>
            {isGameError ? <GameError /> : null}
            {isLeaveGame ? <LeaveGame /> : null}
            {isWordsShortage ? <WordsShortageMenu /> : null}
        </>
    );
};  

export default MultipleChoicesPage;
