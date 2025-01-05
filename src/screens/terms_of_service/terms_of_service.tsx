import React, { useEffect } from 'react';

import TermsOfServiceStyle from './terms_of_service_style';

import PagePart from '../../components/terms_of_service/page_part/page_part';

const TermsOfServicePage = ({ navigation }: {navigation: any}) => {
    useEffect(() => {
        navigation.setOptions({ gestureEnabled: false });
    }, []);
    
    return (
        <>
            <PagePart/>
        </>
    );
};

export default TermsOfServicePage;