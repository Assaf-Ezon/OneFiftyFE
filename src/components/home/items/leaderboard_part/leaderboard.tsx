import { View, Image, Text, TouchableOpacity } from 'react-native';
import { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../../data_objects/enums/screens';

import leaderboardPartStyle from './leaderboard_style';
import { useProfile } from '../../../../context/general_context/profile_context';

const LeaderboardPart: FC = () => {
    const {profile} = useProfile();
    const navigation = useNavigation();

    return (
        <View style={leaderboardPartStyle.container}>
            <View style={leaderboardPartStyle.titleContainer}>
                <TouchableOpacity onPress={() => {navigation.navigate(Screens.LEADERBOARD as never)}}>
                    <Text style={leaderboardPartStyle.seeEverything} allowFontScaling={false}>ראו הכל</Text>
                </TouchableOpacity>
                <Text style={leaderboardPartStyle.title} allowFontScaling={false}>מובילים</Text>   
            </View>
            <View style={leaderboardPartStyle.selfScore}>
                <View style={leaderboardPartStyle.score}>
                    <Text style={leaderboardPartStyle.scoreText} allowFontScaling={false}>ניקוד: {profile.score}</Text>
                </View>
                <View style={leaderboardPartStyle.profileContainer}>
                    <View style={leaderboardPartStyle.profileDetailsContainer}>
                        <Text style={leaderboardPartStyle.profileNameText} allowFontScaling={false}>{profile.name}</Text>
                        <Text style={leaderboardPartStyle.profileEmailText} allowFontScaling={false}>מקום {profile.rank}</Text>
                    </View>
                    <Image style={leaderboardPartStyle.profileImage} source={profile.profileImage} />
                </View>
            </View>
        </View>
    );
};

export default LeaderboardPart;