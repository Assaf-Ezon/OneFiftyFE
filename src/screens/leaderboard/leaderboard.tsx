import { View } from 'react-native';
import { IMAGES } from '../../image_handler';

import LeaderboardScreenStyle from './leaderboard_style';

import BottomBar from '../../components/bottom_bar/bar/bar';
import SideBar from '../../components/side_bar/bar/bar';
import PagePart from '../../components/leaderboard/page_part/page_part';

import { ProfileProvider } from '../../context/general_context/profile_context';
import { SidebarProvider } from '../../context/general_context/sidebar_context';

const LeaderboardPage = ({ navigation }: {navigation: any}) => {
    return (
        <ProfileProvider>
            <SidebarProvider>
                <PagePart />
                <BottomBar 
                    activeScreen={"leaderboard"}
                    homePath={IMAGES.unused_home}
                    learningPath={IMAGES.unused_learning}
                    leaderboardPath={IMAGES.used_leaderboard}
                    profilePath={IMAGES.unused_profile}
                />
                <SideBar/>
            </SidebarProvider>
        </ProfileProvider>
    );
};

export default LeaderboardPage;