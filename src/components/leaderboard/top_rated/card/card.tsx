import { Text, View, Image } from 'react-native';
import { FC } from 'react';

import LeaderboardCardStyle from './card_style';
import { LeaderBoardCardConfig } from '../../../../data_objects/components_config/leaderboard_card_config';

const LeaderboardCard: FC<LeaderBoardCardConfig> = ({ name, score, rank, image }) => {

    const colorByRank = () => {
        switch (rank) {
            case 1:
                return 'gold';
            case 2:
                return 'silver';
            case 3:
                return 'sienna';
            default:
                return 'black';  
        }
    }

    return (
        <View style={LeaderboardCardStyle.profileScore}>
            <View style={LeaderboardCardStyle.rankContainer}>
                <Text style={[{color: colorByRank()}, LeaderboardCardStyle.rankText]} allowFontScaling={false}>{rank}</Text>
            </View>
            <View style={LeaderboardCardStyle.profileContainer}>
                <View style={LeaderboardCardStyle.profileDetailsContainer}>
                    <Text style={LeaderboardCardStyle.profileNameText} allowFontScaling={false}>{name}</Text>
                    <Text style={LeaderboardCardStyle.profileScoreText} allowFontScaling={false}>ניקוד: {score}</Text>
                </View>
                <Image style={LeaderboardCardStyle.profileImage} source={image} />
            </View>
        </View>
    );
};  

export default LeaderboardCard;
