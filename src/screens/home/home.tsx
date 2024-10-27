import { IMAGES } from '../../image_handler';

import HomeScreenStyle from './home_style';

import BottomBar from '../../components/bottom_bar/bar/bar';
import SideBar from '../../components/side_bar/bar/bar';
import HomeScrollView from '../../components/home/scroll_view';

import { SidebarProvider } from '../../context/general_context/sidebar_context';
import { ProfileImageProvider } from '../../context/settings_context/profile_image_context';

const HomePage = ({ navigation }: {navigation: any}) => {
    return (
        <SidebarProvider>
            <ProfileImageProvider>
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
            </ProfileImageProvider>
        </SidebarProvider>
    );
};

export default HomePage;