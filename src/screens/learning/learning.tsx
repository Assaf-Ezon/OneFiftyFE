import {  } from 'react-native';
import { IMAGES } from '../../image_handler';

import LearningScreenStyle from './learning_style';

import LearningSettings from '../../components/learning_settings/settings';
import BottomBar from '../../components/bottom_bar/bar/bar';
import SideBar from '../../components/side_bar/bar/bar';
import PagePart from '../../components/learning/page_part/page_part';
import ContactForm from '../../components/contact_form/contact_form';

import { SidebarProvider } from '../../context/general_context/sidebar_context';
import { ProfileImageProvider } from '../../context/settings_context/profile_image_context';
import { ContactUsFormProvider } from '../../context/general_context/contact_form_context';

const LearningPage = ({ navigation }: {navigation: any}) => {
    return (
        <SidebarProvider>
            <ContactUsFormProvider>
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
                    <ContactForm />
                    <LearningSettings />
                </ProfileImageProvider>
            </ContactUsFormProvider>
        </SidebarProvider>
    );
};

export default LearningPage;