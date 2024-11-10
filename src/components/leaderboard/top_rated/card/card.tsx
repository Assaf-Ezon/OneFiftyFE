import { Text, View, Image, ImageSourcePropType } from 'react-native';
import { FC } from 'react';
import { IMAGES } from '../../../../image_handler';

import LeaderboardCardStyle from './card_style';
import profile from '../../../home/items/profile_part/profile';

interface LeaderBoardCardProp {
    name: string,
    score: number,
    rank: number,
    image: ImageSourcePropType;
};

const LeaderboardCard: FC<LeaderBoardCardProp> = ({ name, score, rank, image }) => {

    return (
        <View style={LeaderboardCardStyle.selfScore}>
            <View style={LeaderboardCardStyle.score}>
                <Text style={LeaderboardCardStyle.scoreText}>מקום: {rank}</Text>
                {/* <Image source={IMAGES.score_icon} /> */}
            </View>
            <View style={LeaderboardCardStyle.profileContainer}>
                <View style={LeaderboardCardStyle.profileDetailsContainer}>
                    <Text style={LeaderboardCardStyle.profileNameText}>{name}</Text>
                    <Text style={LeaderboardCardStyle.profileEmailText}>ניקוד: {score}</Text>
                </View>
                <Image style={LeaderboardCardStyle.profileImage} source={image} />
            </View>
        </View>
    );
};  

export default LeaderboardCard;
