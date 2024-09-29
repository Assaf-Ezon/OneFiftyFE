import { Text, View, TouchableOpacity, Image } from 'react-native';
import { IMAGES } from '../../../image_handler';

import OptionListStyle from './option_list_style';

import OptionCard from './card/card';

const OptionList = () => {
    return (
        <View style={OptionListStyle.container}>
            <OptionCard title='ערוך פרופיל' image={IMAGES.unused_profile} />
            <OptionCard title='אפס סיסמא' image={IMAGES.reset_password} />
            <OptionCard title='המנוי שלי' image={IMAGES.subscription} />
            <OptionCard title='הגדרות' image={IMAGES.settings} />
            <OptionCard title='צורת תשלום' image={IMAGES.payment} />
            <OptionCard title='הודעות' image={IMAGES.notification} />
            <OptionCard title='דווח על בעיה' image={IMAGES.report_problem} />
            <View style={OptionListStyle.line} />
        </View>
    );
};  

export default OptionList;
