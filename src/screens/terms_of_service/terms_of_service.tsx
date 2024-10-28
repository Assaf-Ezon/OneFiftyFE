import { IMAGES } from '../../image_handler';

import TermsOfServiceStyle from './terms_of_service_style';

import SideBar from '../../components/side_bar/bar/bar';

import { SidebarProvider } from '../../context/general_context/sidebar_context';

const TermsOfServicePage = ({ navigation }: {navigation: any}) => {
    return (
        <SidebarProvider>
                <SideBar/>
        </SidebarProvider>
    );
};

export default TermsOfServicePage;