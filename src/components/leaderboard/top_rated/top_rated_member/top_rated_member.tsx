import { Text, View, Image } from 'react-native';
import { FC } from 'react';

import TopRatedMemberStyle from './top_rated_member_style';

import { LeaderBoardCardConfig } from '../../../../data_objects/components_config/leaderboard_card_config';

const TopRatedMember: FC<LeaderBoardCardConfig> = ({ name, score, rank, image }) => {

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
        <View style={TopRatedMemberStyle.profileScore}>
            <View style={TopRatedMemberStyle.rankContainer}>
                <Text style={[{color: colorByRank()}, TopRatedMemberStyle.rankText]} allowFontScaling={false}>{rank}</Text>
            </View>
            <View style={TopRatedMemberStyle.profileContainer}>
                <View style={TopRatedMemberStyle.profileDetailsContainer}>
                    <Text style={TopRatedMemberStyle.profileNameText} allowFontScaling={false}>{name}</Text>
                    <Text style={TopRatedMemberStyle.profileScoreText} allowFontScaling={false}>ניקוד: {score}</Text>
                </View>
                <Image style={TopRatedMemberStyle.profileImage} source={image} />
            </View>
        </View>
    );
};  

export default TopRatedMember;
