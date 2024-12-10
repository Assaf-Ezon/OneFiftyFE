import { Text, View, Image, Alert } from 'react-native';
import { useEffect, useState } from 'react';

import { IMAGES } from '../../../image_handler';
import TopRatedStyle from './top_rated_style';

import * as SecureStore from 'expo-secure-store';

import LeaderboardCard from './card/card';

import { useProfile } from '../../../context/general_context/profile_context';
import { useStackManagerContext, StackNames } from '../../../context/general_context/stack_manager_context';
import { getLeaderboardData, getTopUsersByScore, getUserRankByName } from '../../../requests/top_rated_request';
import AuthenticationHandler from '../../../screens/AuthenticationHandler';




const TopRated = () => {
    const {profile, updateRank} = useProfile();
    const {setStackIndexByName} = useStackManagerContext();

    interface Score {
        DisplayName: string;
        Score: number;
        ProfilePicture: number;
    }

    const [leaderboardData, setLeaderboardData] = useState<Score[] | null>(null);
    
    useEffect(() => {
        const fetchLeaderboard = async () => {
            const leaderboardData = await getLeaderboardData('OverallScore', false);

            if (leaderboardData && typeof leaderboardData !== 'number') {
                setLeaderboardData(getTopUsersByScore(leaderboardData.Scores, 10));
            
                const name = await AuthenticationHandler.getInstance().getName();
                updateRank(getUserRankByName(leaderboardData.Scores, typeof name === 'string' ? name : ''));
            } else if (typeof leaderboardData == 'number') {
                switch (leaderboardData) {
                    case 0:
                        Alert.alert('משהו לא צפוי קרה!');
                        break;
                    case -1:
                        Alert.alert('התחברות נכשלה!');
                        await AuthenticationHandler.getInstance().logout();
                        setStackIndexByName(StackNames.Auth);
                        break;
                }
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
