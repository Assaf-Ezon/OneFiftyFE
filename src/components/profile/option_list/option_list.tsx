import { Text, View, TouchableOpacity, Image } from 'react-native';
import { IMAGES } from '../../../image_handler';

import OptionListStyle from './option_list_style';

import OptionCard from './card/card';

const OptionList = () => {
    return (
        <View style={OptionListStyle.container}>
            <OptionCard title='ערוך פרופיל' image={IMAGES.unused_profile} screenName='' />
            <OptionCard title='אפס סיסמא' image={IMAGES.reset_password} screenName='' />
            <OptionCard title='המנוי שלי' image={IMAGES.subscription} screenName='' />
            <OptionCard title='הגדרות' image={IMAGES.settings} screenName=''  />
            <OptionCard title='תשלום' image={IMAGES.payment} screenName='payment' />
            <OptionCard title='הודעות' image={IMAGES.notification} screenName='' />
            <OptionCard title='דווח על בעיה' image={IMAGES.report_problem} screenName='' />
            <View style={OptionListStyle.line} />
        </View>
    );
};  

export default OptionList;
