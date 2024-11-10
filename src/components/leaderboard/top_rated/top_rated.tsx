import { Text, View, Image } from 'react-native';
import { IMAGES } from '../../../image_handler';

import TopRatedStyle from './top_rated_style';
import * as SecureStore from 'expo-secure-store';

import { useProfile } from '../../../context/general_context/profile_context';
import LeaderboardCard from './card/card';
import { getLeaderboardData, getTopUsersByScore, getUserRankByName } from '../../../requests/top_rated_request';
import { useEffect, useState } from 'react';


const TopRated = () => {
    const {profile, updateRank} = useProfile();

    interface Score {
        DisplayName: string;
        Score: number;
    }

    const [leaderboardData, setLeaderboardData] = useState<Score[] | null>(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const data = await getLeaderboardData('OverallScore', false);

            if (data && typeof data !== 'number') {
                setLeaderboardData(getTopUsersByScore(data.Scores, 10));
            
                const name = await SecureStore.getItemAsync('name');
                updateRank(getUserRankByName(data.Scores, typeof name === 'string' ? name : ''));
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

            {
                leaderboardData && leaderboardData ? leaderboardData.map((score, index) => {
                    return (
                        <LeaderboardCard
                            key={index}
                            name={score.DisplayName}
                            score={score.Score}
                            rank={index + 1} 
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
