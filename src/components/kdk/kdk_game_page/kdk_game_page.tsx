import { Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { IMAGES } from '../../../image_handler';

import KDKGamePageStyle from './kdk_game_page_style';

import Question from '../question/question';
import { useEndGameContext } from '../../../context/game_context/end_game_context';
import LeaveGame from '../../games/leave_game/leave_game';
import { useLeaveGameContext } from '../../../context/game_context/leave_game_context';

const KDKGamePage = () => {
    const { isEndGame } = useEndGameContext();

    const {isLeaveGame, toggleLeaveGameMenu } = useLeaveGameContext();

    const handleBackPress = () => {
        isEndGame ? null : toggleLeaveGameMenu();
    }

    return (
        <>
            <View style={[{opacity: isLeaveGame ? 0.6 : 1}, KDKGamePageStyle.container]}
            pointerEvents={isLeaveGame ? 'none' : 'auto'}>
                <View style={KDKGamePageStyle.topPart}>
                    <View style={[{opacity: isEndGame ? 0.6 : 1}, KDKGamePageStyle.topPartText]}>
                        <TouchableOpacity onPress={() => {handleBackPress()}}>
                            <Image source={IMAGES.back_icon} />
                        </TouchableOpacity>
                        <Text style={KDKGamePageStyle.pageTitle}>ידעתי / לא ידעתי</Text>
                    </View>
                </View>
                <Question />
            </View>
            {isLeaveGame ? <LeaveGame /> : null}
        </>
    );
};  

export default KDKGamePage;
