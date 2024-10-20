import { IMAGES } from '../../image_handler';

import LearningScreenStyle from './dictionary_style';

import BottomBar from '../../components/bottom_bar/bar/bar';
import SideBar from '../../components/side_bar/bar/bar';

import { ProfileProvider } from '../../context/general_context/profile_context';
import { SidebarProvider } from '../../context/general_context/sidebar_context';

const DictionaryPage = ({ navigation }: {navigation: any}) => {
    return (
        <ProfileProvider>
            <SidebarProvider>
                <BottomBar 
                    activeScreen={"dictionary"}
                    homePath={IMAGES.unused_home}
                    dictionaryPath={IMAGES.used_dictionary}
                    learningPath={IMAGES.unused_learning}
                    leaderboardPath={IMAGES.unused_leaderboard}
                    profilePath={IMAGES.unused_profile}
                />
                <SideBar/>
            </SidebarProvider>
        </ProfileProvider>
    );
};

export default DictionaryPage;