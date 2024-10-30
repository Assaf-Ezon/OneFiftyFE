import { IMAGES } from '../../image_handler';

import LeaderboardScreenStyle from './leaderboard_style';

import BottomBar from '../../components/bottom_bar/bar/bar';
import SideBar from '../../components/side_bar/bar/bar';
import PagePart from '../../components/leaderboard/page_part/page_part';
import ContactForm from '../../components/contact_form/contact_form';

import { SidebarProvider } from '../../context/general_context/sidebar_context';
import { ProfileImageProvider } from '../../context/settings_context/profile_image_context';
import { ContactUsFormProvider } from '../../context/general_context/contact_form_context';

const LeaderboardPage = ({ navigation }: {navigation: any}) => {
    return (
        <SidebarProvider>
            <ContactUsFormProvider>
                <ProfileImageProvider>
                    <PagePart />
                    <BottomBar 
                        activeScreen={"leaderboard"}
                        homePath={IMAGES.unused_home}
                        dictionaryPath={IMAGES.unused_dictionary}
                        learningPath={IMAGES.unused_learning}
                        leaderboardPath={IMAGES.used_leaderboard}
                        profilePath={IMAGES.unused_profile}
                    />
                    <SideBar/>
                    <ContactForm />
                </ProfileImageProvider>
            </ContactUsFormProvider>
        </SidebarProvider>
    );
};

export default LeaderboardPage;