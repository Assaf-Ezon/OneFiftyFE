import { ScrollView, View } from 'react-native';
import { FC } from 'react';
import { IMAGES } from '../../image_handler'
import HomeScreenStyle from './home_style';
import BottomBar from '../../components/bottom_bar/bar/bar'
import ProfilePartHome from '../../components/home/profile_part/profile'
import WordOfTheDay from '../../components/home/word_of_the_day/word_of_the_day'
import LearningPartHome from '../../components/home/learning_part/learning'
import LeaderboardPart from '../../components/home/leaderboard_part/leaderboard'

const HomePage: FC = () => {
    return (
        <>
            <ScrollView contentContainerStyle={HomeScreenStyle.container}>
                <ProfilePartHome profileImage={IMAGES.profile_image}
                                profileName='אסף איזון' 
                            profileEmail='assafezon@gmail.com'
                />
                <WordOfTheDay />
                <LearningPartHome />
                <LeaderboardPart profileImage={IMAGES.profile_image} 
                                profileName='אסף איזון' 
                                rank={1} 
                                score={100} 
                />
                <View style={HomeScreenStyle.blankSpace}></View>
            </ScrollView>
            <BottomBar 
                activeScreen={"home"}
                homePath={IMAGES.used_home}
                learningPath={IMAGES.unused_learning}
                leaderboardPath={IMAGES.unused_leaderboard}
                profilePath={IMAGES.unused_profile}
            />
        </>
    );
};

export default HomePage;