import { IMAGES } from '../../image_handler';

import HomeScreenStyle from './home_style';

import BottomBar from '../../components/bottom_bar/bar/bar';
import SideBar from '../../components/side_bar/bar/bar';
import HomeScrollView from '../../components/home/scroll_view';

import { ProfileProvider } from '../../context/general_context/profile_context';
import { SidebarProvider } from '../../context/general_context/sidebar_context';
import { LearningSettingsProvider } from '../../context/settings_context/learning_context';

const HomePage = ({ navigation }: {navigation: any}) => {
    return (
        <ProfileProvider>
            <SidebarProvider>
                <LearningSettingsProvider>
                    <HomeScrollView />
                    <BottomBar 
                        activeScreen={"home"}
                        homePath={IMAGES.used_home}
                        dictionaryPath={IMAGES.unused_dictionary}
                        learningPath={IMAGES.unused_learning}
                        leaderboardPath={IMAGES.unused_leaderboard}
                        profilePath={IMAGES.unused_profile}
                    />
                    <SideBar/>
                </LearningSettingsProvider>
            </SidebarProvider>
        </ProfileProvider>
    );
};

export default HomePage;