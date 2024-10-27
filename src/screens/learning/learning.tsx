import {  } from 'react-native';
import { IMAGES } from '../../image_handler';

import LearningScreenStyle from './learning_style';

import LearningSettings from '../../components/learning_settings/settings';
import BottomBar from '../../components/bottom_bar/bar/bar';
import SideBar from '../../components/side_bar/bar/bar';
import PagePart from '../../components/learning/page_part/page_part';

import { SidebarProvider } from '../../context/general_context/sidebar_context';
import { ProfileImageProvider } from '../../context/settings_context/profile_image_context';

const LearningPage = ({ navigation }: {navigation: any}) => {
    return (
        <SidebarProvider>
            <ProfileImageProvider>
                <PagePart />
                <BottomBar 
                    activeScreen={"learning"}
                    homePath={IMAGES.unused_home}
                    dictionaryPath={IMAGES.unused_dictionary}
                    learningPath={IMAGES.used_learning}
                    leaderboardPath={IMAGES.unused_leaderboard}
                    profilePath={IMAGES.unused_profile}
                />
                <SideBar />
                <LearningSettings />
            </ProfileImageProvider>
        </SidebarProvider>
    );
};

export default LearningPage;