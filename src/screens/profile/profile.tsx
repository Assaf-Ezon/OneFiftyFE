import { IMAGES } from '../../image_handler';

import ProfileScreenStyle from './profile_style';

import BottomBar from '../../components/bottom_bar/bar/bar';
import SideBar from '../../components/side_bar/bar/bar';
import PagePart from '../../components/profile/page_part/page_part';
import ChangeProfileImagePopup from '../../components/profile/change_profile_image/change_profile_image';

import { ProfileProvider } from '../../context/general_context/profile_context';
import { SidebarProvider } from '../../context/general_context/sidebar_context';
import { LearningSettingsProvider } from '../../context/settings_context/learning_context';
import { ProfileImageProvider } from '../../context/settings_context/profile_image_context';

const ProfilePage = ({ navigation }: {navigation: any}) => {
    return (
        <SidebarProvider>
            <LearningSettingsProvider>
                <ProfileImageProvider>
                    <PagePart />
                    <BottomBar 
                        activeScreen={"profile"}
                        homePath={IMAGES.unused_home}
                        dictionaryPath={IMAGES.unused_dictionary}
                        learningPath={IMAGES.unused_learning}
                        leaderboardPath={IMAGES.unused_leaderboard}
                        profilePath={IMAGES.used_profile}
                    />
                    <SideBar/>
                    <ChangeProfileImagePopup />
                </ProfileImageProvider>
            </LearningSettingsProvider>
        </SidebarProvider>
    );
};

export default ProfilePage;