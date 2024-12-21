import { Text, View, Image, Alert, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';

import { IMAGES } from '../../../image_handler';
import TopRatedStyle from './top_rated_style';

import LeaderboardCard from './card/card';

import { useProfile } from '../../../context/general_context/profile_context';
import { useStackManagerContext, StackNames } from '../../../context/general_context/stack_manager_context';
import { getLeaderboardData, getTopUsersByScore, getUserRankByName } from '../../../requests/top_rated_request';
import AuthenticationHandler from '../../../screens/AuthenticationHandler';
import { CONFIG } from '../../../config';

const TopRated = () => {
    const {profile, updateRank} = useProfile();
    const {handleLogout, handleInactive} = useStackManagerContext();

    const authInstance = AuthenticationHandler.getInstance();

    interface Score {
        DisplayName: string;
        Score: number;
        ProfilePicture: number;
    }

    const [leaderboardData, setLeaderboardData] = useState<Score[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    
    useEffect(() => {
        const fetchLeaderboard = async () => {
            const name = await authInstance.getName();
            const access_token = await authInstance.getAccessToken();

            if (name && access_token) {
                setLoading(true);
                const leaderboardData = await getLeaderboardData(name, access_token, 'OverallScore', false);
                setLoading(false);
                
                if (leaderboardData && 'Scores' in leaderboardData) {
                    setLeaderboardData(getTopUsersByScore(leaderboardData.Scores, 10));
                
                    const name = await authInstance.getName();
                    updateRank(getUserRankByName(leaderboardData.Scores, typeof name === 'string' ? name : ''));
                } else {
                        Alert.alert('תקלה קרתה, נסה שנית מאוחר יותר');
                }
            } else {
                Alert.alert('התחברות נכשלה!');
                handleLogout();
            }
        };

        if (profile.expirationDate <= new Date()) {
            Alert.alert('תוקף המנוי נגמר');
            handleInactive();
        } else {
            fetchLeaderboard();
        }
    }, []);

    const isValidProfilePictureIndex = (index: number): index is keyof typeof IMAGES.profile_images => index >= CONFIG.min_profile_image && index <= CONFIG.max_profile_image;

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
            {loading ? <View style={TopRatedStyle.loadingContainer}><ActivityIndicator size="large" color="black" /></View> : null}
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
