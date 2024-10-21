import {  } from 'react-native';
import { IMAGES } from '../../image_handler';

import LearningScreenStyle from './learning_style';

import LearningSettings from '../../components/learning_settings/settings';
import BottomBar from '../../components/bottom_bar/bar/bar';
import SideBar from '../../components/side_bar/bar/bar';
import PagePart from '../../components/learning/page_part/page_part';

import { ProfileProvider } from '../../context/general_context/profile_context';
import { SidebarProvider } from '../../context/general_context/sidebar_context';
import { LearningSettingsProvider } from '../../context/settings_context/learning_context';

const LearningPage = ({ navigation }: {navigation: any}) => {
    return (
        <ProfileProvider>
            <SidebarProvider>
                <LearningSettingsProvider>
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
                    <LearningSettings />
                </LearningSettingsProvider>
            </SidebarProvider>
        </ProfileProvider>
    );
};

export default LearningPage;