import { IMAGES } from '../../image_handler';

import ProfileScreenStyle from './profile_style';

import BottomBar from '../../components/bottom_bar/bar/bar';
import SideBar from '../../components/side_bar/bar/bar';
import PagePart from '../../components/profile/page_part/page_part';

import { ProfileProvider } from '../../context/general_context/profile_context';
import { SidebarProvider } from '../../context/general_context/sidebar_context';

const ProfilePage = ({ navigation }: {navigation: any}) => {
    return (
        <ProfileProvider>
            <SidebarProvider>
                <PagePart />
                <BottomBar 
                    activeScreen={"profile"}
                    homePath={IMAGES.unused_home}
                    learningPath={IMAGES.unused_learning}
                    leaderboardPath={IMAGES.unused_leaderboard}
                    profilePath={IMAGES.used_profile}
                />
                <SideBar/>
            </SidebarProvider>
        </ProfileProvider>
    );
};

export default ProfilePage;