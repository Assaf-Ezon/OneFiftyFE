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
        ProfilePicture: number;
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

    const isValidProfilePictureIndex = (index: number): index is keyof typeof IMAGES.profile_images => index >= 0 && index <= 11;

    return (
        <View style={TopRatedStyle.container}>
            <View style={TopRatedStyle.self}>
                <Image source={profile.profileImage} style={TopRatedStyle.profileImage} />
                <Text style={TopRatedStyle.textName}>{profile.name}</Text>
                <View style={TopRatedStyle.selfStatsContainer}>
                    <Text style={TopRatedStyle.scoreText}>ניקוד: {profile.score}</Text>
                    <View style={TopRatedStyle.line} />
                    <Text style={TopRatedStyle.rankText}>מקום: {profile.rank}</Text> 
                </View>
            </View>

            {
                leaderboardData && leaderboardData ? leaderboardData.map((score, index) => {
                    return (
                        <LeaderboardCard
                            key={index}
                            name={score.DisplayName}
                            score={score.Score}
                            rank={index + 1} 
                            image={isValidProfilePictureIndex(score.ProfilePicture) 
                            ? IMAGES.profile_images[score.ProfilePicture] 
                            : IMAGES.profile_images[0]}
                        />
                    );
                }) 
                : null
            }
        </View>
    );
};  

export default TopRated;
