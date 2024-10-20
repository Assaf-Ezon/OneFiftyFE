import {  } from 'react-native';
import { IMAGES } from '../../image_handler';

import LearningScreenStyle from './learning_style';

import BottomBar from '../../components/bottom_bar/bar/bar';
import SideBar from '../../components/side_bar/bar/bar';
import PagePart from '../../components/learning/page_part/page_part';

import { ProfileProvider } from '../../context/general_context/profile_context';
import { SidebarProvider } from '../../context/general_context/sidebar_context';

const LearningPage = ({ navigation }: {navigation: any}) => {
    return (
        <ProfileProvider>
            <SidebarProvider>
                <PagePart />
                <BottomBar 
                    activeScreen={"learning"}
                    homePath={IMAGES.unused_home}
                    dictionaryPath={IMAGES.unused_dictionary}
                    learningPath={IMAGES.used_learning}
                    leaderboardPath={IMAGES.unused_leaderboard}
                    profilePath={IMAGES.unused_profile}
                />
                <SideBar/>
            </SidebarProvider>
        </ProfileProvider>
    );
};

export default LearningPage;