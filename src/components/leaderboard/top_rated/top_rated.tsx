import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { IMAGES } from '../../../image_handler';

import TopRatedStyle from './top_rated_style';

import { useProfile } from '../../../context/general_context/profile_context';
import LeaderboardCard from './card/card';
import getLeaderboardData from './top_rated_request';
import { useEffect, useState } from 'react';


const TopRated = () => {
    const {profile} = useProfile();

    interface Score {
        DisplayName: string;
        Score: number;
    }

    interface ApiResponse {
        PlayerScore: number;
        Scores: Score[];
    }

    const [leaderboardData, setLeaderboardData] = useState<ApiResponse | null>(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const data = await getLeaderboardData('OverallScore', true);
            if (data && typeof data != 'number') {
                setLeaderboardData(data);
            }
        };

        fetchLeaderboard();
    }, []);

    return (
        <View style={TopRatedStyle.container}>
            <View style={TopRatedStyle.self}>
                <Image source={profile.profileImage} style={TopRatedStyle.profileImage} />
                <Text style={TopRatedStyle.textName}>{profile.name}</Text>
                <Text style={TopRatedStyle.rankText}>מקום: {profile.rank}</Text>
                <View style={TopRatedStyle.selfScore}>
                    <Text style={TopRatedStyle.scoreText}>{profile.score}</Text>
                    <Image source={IMAGES.score_icon} />
                </View>
            </View>
            <View style={TopRatedStyle.line} />

            <LeaderboardCard name= {'אסף איזון'} score={1000} rank={1} image={IMAGES.profile_image} />
            {
                leaderboardData && leaderboardData.Scores ? leaderboardData.Scores.map((score, index) => {
                    return (
                        <LeaderboardCard
                            key={index}
                            name={score.DisplayName}
                            score={score.Score}
                            rank={index + 2}  // Assuming ranks start from 2 and increment
                            image={IMAGES.profile_image}
                        />
                    );
                }) 
                : null
            }
        </View>
    );
};  

export default TopRated;
