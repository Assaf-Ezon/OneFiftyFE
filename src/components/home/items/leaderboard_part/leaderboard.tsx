import { View, Image, Text, TouchableOpacity } from 'react-native';
import { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { IMAGES } from '../../../../image_handler';
import { Screens } from '../../../../Dataobjects/Enums/Screens/Screens';

import leaderboardPartStyle from './leaderboard_style';
import { useProfile } from '../../../../context/general_context/profile_context';

const LeaderboardPart: FC = () => {
    const {profile, setProfile} = useProfile();
    const navigation = useNavigation();

    return (
        <View style={leaderboardPartStyle.container}>
            <View style={leaderboardPartStyle.titleContainer}>
                <TouchableOpacity onPress={() => {navigation.navigate(Screens.LEADERBOARD as never)}}><Text style={leaderboardPartStyle.seeEverything}>ראה הכל</Text></TouchableOpacity>
                <Text style={leaderboardPartStyle.title}>מובילים</Text>   
            </View>
            <View style={leaderboardPartStyle.selfScore}>
                <View style={leaderboardPartStyle.score}>
                    <Text style={leaderboardPartStyle.scoreText}>{profile?.score}</Text>
                    <Image source={IMAGES.score_icon} />
                </View>
                <View style={leaderboardPartStyle.profileContainer}>
                    <View style={leaderboardPartStyle.profileDetailsContainer}>
                        <Text style={leaderboardPartStyle.profileNameText}>{profile.name}</Text>
                        <Text style={leaderboardPartStyle.profileEmailText}>מקום {profile.rank}</Text>
                    </View>
                    <Image style={leaderboardPartStyle.profileImage} source={IMAGES.profile_image} />
                </View>
            </View>
        </View>
    );
};

export default LeaderboardPart;