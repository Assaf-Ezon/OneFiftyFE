import { useEffect } from 'react';

import { IMAGES } from '../../image_handler';

import ProfileScreenStyle from './profile_style';

import BottomBar from '../../components/bottom_bar/bar/bar';
import SideBar from '../../components/side_bar/bar/bar';
import PagePart from '../../components/profile/page_part/page_part';
import ChangeProfileImagePopup from '../../components/profile/change_profile_image/change_profile_image';
import ContactForm from '../../components/contact_form/contact_form';
import DeleteUserConfirmation from '../../components/profile/delete_user_confirmation/delete_user_confirmation';

import { SidebarProvider } from '../../context/general_context/sidebar_context';
import { ProfileImageProvider } from '../../context/settings_context/profile_image_context';
import { ContactUsFormProvider } from '../../context/general_context/contact_form_context';
import { DeleteUserConfirmationProvider } from '../../context/general_context/delete_user_confirmation_context';

const ProfilePage = ({ navigation }: {navigation: any}) => {
    useEffect(() => {
        navigation.setOptions({ gestureEnabled: false });
    }, []);

    return (
        <SidebarProvider>
            <ContactUsFormProvider>
                <DeleteUserConfirmationProvider>
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
                        <ContactForm />
                        <ChangeProfileImagePopup />
                        <DeleteUserConfirmation />
                    </ProfileImageProvider>
                </DeleteUserConfirmationProvider>
            </ContactUsFormProvider>
        </SidebarProvider>
    );
};

export default ProfilePage;