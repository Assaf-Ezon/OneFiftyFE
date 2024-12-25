import { Text, View, Image } from 'react-native';
import { FC } from 'react';

import LeaderboardCardStyle from './card_style';
import { LeaderBoardCardProp } from '../../../../Dataobjects/ComponentsProp/LeaderboardPage/LeaderBoardCardProp';

const LeaderboardCard: FC<LeaderBoardCardProp> = ({ name, score, rank, image }) => {

    return (
        <View style={LeaderboardCardStyle.profileScore}>
            <View style={LeaderboardCardStyle.rankContainer}>
                <Text style={LeaderboardCardStyle.rankText}>{rank}</Text>
            </View>
            <View style={LeaderboardCardStyle.profileContainer}>
                <View style={LeaderboardCardStyle.profileDetailsContainer}>
                    <Text style={LeaderboardCardStyle.profileNameText}>{name}</Text>
                    <Text style={LeaderboardCardStyle.profileScoreText}>ניקוד: {score}</Text>
                </View>
                <Image style={LeaderboardCardStyle.profileImage} source={image} />
            </View>
        </View>
    );
};  

export default LeaderboardCard;
