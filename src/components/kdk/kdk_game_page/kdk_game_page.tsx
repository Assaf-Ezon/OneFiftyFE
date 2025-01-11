import { Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { IMAGES } from '../../../image_handler';

import KDKGamePageStyle from './kdk_game_page_style';

import KnewDidntKnowGame from '../knew_didnt_know_game/knew_didnt_know_game';
import LeaveGame from '../../games/leave_game/leave_game';
import GameError from '../../games/game_error/game_error';
import { useLeaveGameContext } from '../../../context/game_context/leave_game_context';
import { useGameErrorContext } from '../../../context/game_context/game_error_context';
import { useEndGameContext } from '../../../context/game_context/end_game_context';

const KDKGamePage = () => {
    const { isEndGame } = useEndGameContext();
    const { isLeaveGame, toggleLeaveGameMenu } = useLeaveGameContext();
    const { isGameError } = useGameErrorContext();

    const handleBackPress = () => {
        isEndGame ? null : toggleLeaveGameMenu();
    }

    return (
        <>
            <View style={[{opacity: isLeaveGame || isGameError ? 0.6 : 1}, KDKGamePageStyle.container]}
            pointerEvents={isLeaveGame || isGameError ? 'none' : 'auto'}>
                <View style={KDKGamePageStyle.topPart}>
                    <View style={[{opacity: isEndGame ? 0.6 : 1}, KDKGamePageStyle.topPartText]}>
                        <TouchableOpacity onPress={() => {handleBackPress()}}>
                            <Image source={IMAGES.back_icon} />
                        </TouchableOpacity>
                        <Text style={KDKGamePageStyle.pageTitle}>ידעתי / לא ידעתי</Text>
                    </View>
                </View>
                <KnewDidntKnowGame />
            </View>
            {isGameError ? <GameError /> : null}
            {isLeaveGame ? <LeaveGame /> : null}
        </>
    );
};  

export default KDKGamePage;
