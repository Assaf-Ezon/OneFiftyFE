import { View } from 'react-native';
import { IMAGES } from '../../../image_handler';
import { Screens } from '../../../data_objects/enums/screens';

import OptionListStyle from './option_list_style';

import OptionCard from './card/card';
import { useProfile } from '../../../context/general_context/profile_context';
import { ProfilePageActionIndex } from '../../../data_objects/enums/profile_page_action_index';

const OptionList = () => {
    const {profile} = useProfile();    

    return (
        <View style={OptionListStyle.container}>
            <View style={OptionListStyle.line} />
            <OptionCard title='התקדמות' image={IMAGES.progress} onPressActionIndex={ProfilePageActionIndex.NavigateToPage} screenName={Screens.PROGRESS} isActive={true} />
            <View style={OptionListStyle.line} />
            <OptionCard title='תשלום' image={IMAGES.payment} onPressActionIndex={ProfilePageActionIndex.NavigateToPage} screenName={Screens.PAYMENT} isActive={profile.isTrial} />
            <View style={OptionListStyle.line} />
            <OptionCard title='דיווח על בעיה' image={IMAGES.report_problem} onPressActionIndex={ProfilePageActionIndex.OpenContactUsForm} screenName='' isActive={true} />
            <View style={OptionListStyle.line} />
        </View>
    );
};  

export default OptionList;
