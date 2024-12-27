import { Text, View, Image } from 'react-native';
import { FC } from 'react';

import LeaderboardCardStyle from './card_style';
import { LeaderBoardCardConfig } from '../../../../data_objects/components_config/leaderboard_page/leaderboard_card_config';

const LeaderboardCard: FC<LeaderBoardCardConfig> = ({ name, score, rank, image }) => {

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
