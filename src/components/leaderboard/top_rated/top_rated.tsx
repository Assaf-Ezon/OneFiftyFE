import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { IMAGES } from '../../../image_handler';

import TopRatedStyle from './top_rated_style';

import { useProfile } from '../../../context/general_context/profile_context';
import LeaderboardCard from './card/card';


const TopRated = () => {
    const {profile} = useProfile();

    return (
        <View style={TopRatedStyle.container}>
            <View style={TopRatedStyle.self}>
                <Image source={IMAGES.profile_image} style={TopRatedStyle.profileImage} />
                <Text style={TopRatedStyle.textName}>{profile?.name}</Text>
                <Text style={TopRatedStyle.rankText}>מקום: {profile?.rank}</Text>
                <View style={TopRatedStyle.selfScore}>
                    <Text style={TopRatedStyle.scoreText}>{profile?.score}</Text>
                    <Image source={IMAGES.score_icon} />
                </View>
            </View>
            <View style={TopRatedStyle.line} />

            <LeaderboardCard name= {'אסף איזון'} score={1000} rank={1} image={IMAGES.profile_image} />
            <LeaderboardCard name= {'אסף איזון'} score={999} rank={2} image={IMAGES.profile_image} />
            <LeaderboardCard name= {'אסף איזון'} score={998} rank={3} image={IMAGES.profile_image} />
            <LeaderboardCard name= {'אסף איזון'} score={997} rank={4} image={IMAGES.profile_image} />
            <LeaderboardCard name= {'אסף איזון'} score={996} rank={5} image={IMAGES.profile_image} />
        </View>
    );
};  

export default TopRated;
