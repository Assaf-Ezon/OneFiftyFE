import { useEffect } from 'react';

import McStyle from './mc_style';

import PagePart from '../../components/mc/page_part/page_part';

const McPage = ({ navigation }: {navigation: any}) => {
    useEffect(() => {
        navigation.setOptions({ gestureEnabled: false });
    }, []);

    return (
        <PagePart />
    );
};

export default McPage;