import { Text, View, Image, Alert, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';

import { CONFIG } from '../../../config';
import { IMAGES } from '../../../image_handler';
import TopRatedStyle from './top_rated_style';

import LeaderboardCard from './card/card';

import { useProfile } from '../../../context/general_context/profile_context';
import { useStackManagerContext } from '../../../context/general_context/stack_manager_context';
import LeaderboardDataRequestHandler, { getTopUsersByScore, getUserRankByName } from '../../../requests/requests_handlers/leaderboard_data_request_handler';
import AuthenticationHandler from '../../../authentication_handler';

import { Score } from '../../../data_objects/requests/leaderboard_data/score';
import { LeaderboardDataResponse } from '../../../data_objects/requests/leaderboard_data/leaderboard_data_response';
import { RequestsError } from '../../../data_objects/enums/requests_error_type';
import AppRequestsErrors from '../../../requests/components_requests_errors/app_requests_errors';

const TopRated = () => {
    const {profile, updateRank} = useProfile();
    const {handleLogout, handleInactive} = useStackManagerContext();

    const authInstance = AuthenticationHandler.getInstance();

    const [leaderboardData, setLeaderboardData] = useState<Score[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    
    useEffect(() => {
        const fetchLeaderboard = async () => {
            setLoading(true);

            try {
                const name = await authInstance.getName();
                const token = await authInstance.getAccessToken();

                const leaderboardData: LeaderboardDataResponse = await LeaderboardDataRequestHandler.getInstance().post({
                    DisplayName: name,
                    token: token,
                    LeaderboardType: 'OverallScore',
                    PartialList: false,
                    expirationDate: profile.expirationDate,
                });

                setLeaderboardData(getTopUsersByScore(leaderboardData.Scores, 10));
            
                updateRank(getUserRankByName(leaderboardData.Scores, name));

            } catch (err) {
                if (err instanceof Error) {
                    AppRequestsErrors(err, handleLogout, handleInactive);
                } 
                else {
                    Alert.alert('תקלה קרתה, נסו שנית מאוחר יותר');
                }
            }
            
            setLoading(false);
        };

        fetchLeaderboard();
    }, []);

    const isValidProfilePictureIndex = (index: number): index is keyof typeof IMAGES.profile_images => index >= CONFIG.min_profile_image && index <= CONFIG.max_profile_image;

    return (
        <View style={TopRatedStyle.container}>
            <View style={TopRatedStyle.self}>
                <Image source={profile.profileImage} style={TopRatedStyle.profileImage} />
                <Text style={TopRatedStyle.textName}>{profile.name}</Text>
                <View style={TopRatedStyle.selfStatsContainer}>
                    <Text style={TopRatedStyle.scoreText}>מקום: {profile.rank} {'\n'}  ניקוד: {profile.score}</Text>
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
