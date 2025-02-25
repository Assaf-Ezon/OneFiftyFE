import { ScrollView, View, StyleSheet } from 'react-native';

import ProfilePartHome from './items/profile_part/profile';
import WordOfTheDay from './items/word_of_the_day/word_of_the_day';
import PayNow from './items/pay_now/pay_now';
import LearningPartHome from './items/learning_part/learning';
import LeaderboardPart from './items/leaderboard_part/leaderboard';

import { useSidebarContext } from '../../context/general_context/sidebar_context';
import { useContactUsFormContext } from '../../context/general_context/contact_form_context';
import { useProfile } from '../../context/general_context/profile_context';

const HomeScrollView = () => {
    const {isOpen} = useSidebarContext();
    const {isContactFormOpen} = useContactUsFormContext();
    const { profile, isTermsAndServiesValidation } = useProfile();

    return (
        <ScrollView pointerEvents={ isOpen || isContactFormOpen || isTermsAndServiesValidation ? 'none' : 'auto' } 
                    contentContainerStyle={[HomeScrollViewStyle.container, { opacity: isOpen || isContactFormOpen || isTermsAndServiesValidation ? 0.2 : 1 }]}
                    showsVerticalScrollIndicator={false}>
            <ProfilePartHome />
            <WordOfTheDay />
            {profile.isTrial ? <PayNow /> : null}
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