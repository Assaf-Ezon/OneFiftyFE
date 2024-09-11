import { ScrollView, View, StyleSheet } from 'react-native';

import ProfilePartHome from './items/profile_part/profile';
import WordOfTheDay from './items/word_of_the_day/word_of_the_day';
import LearningPartHome from './items/learning_part/learning';
import LeaderboardPart from './items/leaderboard_part/leaderboard';

import { useSidebarContext } from '../../context/general_context/sidebar_context';


const HomeScrollView = () => {
    const {isOpen} = useSidebarContext();
    return (
        <ScrollView pointerEvents={ isOpen ? 'none' : 'auto' } 
                    contentContainerStyle={[HomeScrollViewStyle.container, { opacity: isOpen ? 0.2 : 1 }]}
                    showsVerticalScrollIndicator={false}>
            <ProfilePartHome />
            <WordOfTheDay />
            <LearningPartHome />
            <LeaderboardPart/>

            <View style={HomeScrollViewStyle.blankSpace}></View>
        </ScrollView>
    )
};

const HomeScrollViewStyle = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    blankSpace: {
        height: 120,
    },
});

export default HomeScrollView;