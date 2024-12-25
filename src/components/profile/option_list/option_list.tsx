import { View } from 'react-native';
import { IMAGES } from '../../../image_handler';
import { Screens } from '../../../data_objects/enums/Screens/Screens';

import OptionListStyle from './option_list_style';

import OptionCard from './card/card';
import { useProfile } from '../../../context/general_context/profile_context';

const OptionList = () => {
    const {profile} = useProfile();    

    return (
        <View style={OptionListStyle.container}>
            <OptionCard title='ערוך פרופיל' image={IMAGES.unused_profile} screenName='' isActive={true} />
            <OptionCard title='המנוי שלי' image={IMAGES.subscription} screenName='' isActive={true} />
            <OptionCard title='הגדרות' image={IMAGES.settings} screenName=''  isActive={true} />
            <OptionCard title='תשלום' image={IMAGES.payment} screenName={Screens.PAYMENT} isActive={profile.trial} />
            <OptionCard title='הודעות' image={IMAGES.notification} screenName='' isActive={true} />
            <OptionCard title='דווח על בעיה' image={IMAGES.report_problem} screenName='' isActive={true} />
            <View style={OptionListStyle.line} />
        </View>
    );
};  

export default OptionList;
