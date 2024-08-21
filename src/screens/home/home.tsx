import { ScrollView, View } from 'react-native';
import { FC } from 'react';
import { IMAGES } from '../../image_handler';

import HomeScreenStyle from './home_style';

import BottomBar from '../../components/bottom_bar/bar/bar';
import ProfilePartHome from '../../components/home/profile_part/profile';
import WordOfTheDay from '../../components/home/word_of_the_day/word_of_the_day';
import LearningPartHome from '../../components/home/learning_part/learning';
import LeaderboardPart from '../../components/home/leaderboard_part/leaderboard';

import { ProfileProvider } from '../../context/general_context/profile_context';

const HomePage: FC = () => {
    return (
        <ProfileProvider>
            <ScrollView contentContainerStyle={HomeScreenStyle.container}>
                <ProfilePartHome/>
                <WordOfTheDay />
                <LearningPartHome />
                <LeaderboardPart/>
                <View style={HomeScreenStyle.blankSpace}></View>
            </ScrollView>
            <BottomBar 
                activeScreen={"home"}
                homePath={IMAGES.used_home}
                learningPath={IMAGES.unused_learning}
                leaderboardPath={IMAGES.unused_leaderboard}
                profilePath={IMAGES.unused_profile}
            />
        </ProfileProvider>
    );
};

export default HomePage;