import { Text, View, TouchableOpacity, Image } from 'react-native';
import { IMAGES } from '../../../image_handler';
import React from 'react';

import PagePartStyle from './page_part_style';
import Question from '../question/question';

import GameError from '../../games/game_error/game_error';
import LeaveGame from '../../games/leave_game/leave_game';
import { useEndGameContext } from '../../../context/game_context/end_game_context';
import { useLeaveGameContext } from '../../../context/game_context/leave_game_context';
import { useGameErrorContext } from '../../../context/game_context/game_error_context';

const PagePart = () => {    
    const { isEndGame } = useEndGameContext();
    const { isLeaveGame, toggleLeaveGameMenu } = useLeaveGameContext();
    const { isGameError } = useGameErrorContext();

    const handleBackPress = () => {
        isEndGame ? null : toggleLeaveGameMenu();
    }
    return (
        <>
            <View style={[{opacity: isLeaveGame || isGameError ? 0.6 : 1}, PagePartStyle.container]}>
                <View style={PagePartStyle.topPart}>
                    <View style={[{opacity: isEndGame ? 0.6 : 1}, PagePartStyle.topPartText]}>
                        <TouchableOpacity onPress={() => {handleBackPress()}}>
                            <Image source={IMAGES.back_icon} />
                        </TouchableOpacity>
                        <Text style={PagePartStyle.pageTitle}>שאלון אמריקאי</Text>
                    </View>
                </View>
                <Question />
            </View>
            {isGameError ? <GameError /> : null}
            {isLeaveGame ? <LeaveGame /> : null}
        </>
    );
};  

export default PagePart;
