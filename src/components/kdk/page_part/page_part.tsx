import { Text, View, TouchableOpacity, Image } from 'react-native';
import { IMAGES } from '../../../image_handler';

import PagePartStyle from './page_part_style';

import { useNavigation } from '@react-navigation/native';
import Question from '../question/question';

const PagePart = () => {
    const navigation = useNavigation();
    return (
        <View style={PagePartStyle.container}>
            <View style={PagePartStyle.topPart}>
                <View style={PagePartStyle.topPartText}>
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <Image source={IMAGES.back_icon} />
                    </TouchableOpacity>
                    <Text style={PagePartStyle.pageTitle}>ידעתי / לא ידעתי</Text>
                </View>
            </View>
            <Question />
        </View>
    );
};  

export default PagePart;
