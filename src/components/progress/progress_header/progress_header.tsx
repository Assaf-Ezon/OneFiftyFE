import { Text, View, TouchableOpacity, Image } from 'react-native';
import { IMAGES } from '../../../image_handler';

import ProgressHeaderStyle from './progress_header_style';

import { useNavigation } from '@react-navigation/native';

const ProgressHeader = () => {
    const navigation = useNavigation();

    return (
        <View style={ProgressHeaderStyle.topPart}>
            <View style={ProgressHeaderStyle.topPartText}>
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                    <Image source={IMAGES.back_icon} />
                </TouchableOpacity>
                <Text style={ProgressHeaderStyle.pageTitle} allowFontScaling={false}>התקדמות</Text>
            </View>
        </View>
    );
};  

export default ProgressHeader;
