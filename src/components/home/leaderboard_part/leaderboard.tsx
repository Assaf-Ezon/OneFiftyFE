import { View, Image, Text, ImageSourcePropType, Pressable } from 'react-native';
import { FC } from 'react';
import leaderboardPartStyle from './leaderboard_style';
import { IMAGES } from '../../../iamge_handler';

interface LeaderboardPartProp {
    profileImage: ImageSourcePropType;
    profileName: string;
    rank: number;
    score: number;
}

const LeaderboardPart: FC<LeaderboardPartProp> = ({ profileImage, profileName, rank, score }) => {
    return (
        <View style={leaderboardPartStyle.container}>
            <View style={leaderboardPartStyle.titleContainer}>
                <Pressable><Text style={leaderboardPartStyle.seeEverything}>ראה הכל</Text></Pressable>
                <Text style={leaderboardPartStyle.title}>מובילים</Text>   
            </View>
            <View style={leaderboardPartStyle.selfScore}>
                <View style={leaderboardPartStyle.score}>
                    <Text style={leaderboardPartStyle.scoreText}>{score}</Text>
                    <Image source={IMAGES.score_icon} />
                </View>
                <View style={leaderboardPartStyle.profileContainer}>
                    <View style={leaderboardPartStyle.profileDetailsContainer}>
                        <Text style={leaderboardPartStyle.profileNameText}>{profileName}</Text>
                        <Text style={leaderboardPartStyle.profileEmailText}>מקום {rank}</Text>
                    </View>
                    <Image style={leaderboardPartStyle.profileImage} source={profileImage} />
                </View>
            </View>
        </View>
    );
};

export default LeaderboardPart;