import React from 'react';
import useDisableBack from '../use_disable_back';

import { IMAGES } from '../../image_handler';

import HomeScreenStyle from './home_style';

import BottomBar from '../../components/bottom_bar/bar/bar';
import SideBar from '../../components/side_bar/bar/bar';
import HomeScrollView from '../../components/home/scroll_view';
import ContactForm from '../../components/contact_form/contact_form';
import TermsAndServicesPopup from '../../components/terms_and_services_popup/terms_and_services_popup';

import { SidebarProvider } from '../../context/general_context/sidebar_context';
import { ProfileImageProvider } from '../../context/settings_context/profile_image_context';
import { ContactUsFormProvider } from '../../context/general_context/contact_form_context';
import { useProfile } from '../../context/general_context/profile_context';

const HomePage = ({ navigation }: {navigation: any}) => {
    useDisableBack(navigation);

    const { isTermsAndServiesValidation } = useProfile();

    return (
        <SidebarProvider>
            <ContactUsFormProvider>
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
                    <ContactForm />
                    {isTermsAndServiesValidation ? <TermsAndServicesPopup /> : null}
                </ProfileImageProvider>
            </ContactUsFormProvider>
        </SidebarProvider>
    );
};

export default HomePage;