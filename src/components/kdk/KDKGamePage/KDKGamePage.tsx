import { Text, View, TouchableOpacity, Image } from 'react-native';
import { IMAGES } from '../../../image_handler';

import KDKGamePageStyle from './KDKGamePageStyle';

import { useNavigation } from '@react-navigation/native';
import Question from '../question/question';
import { useEndGameContext } from '../../../context/game_context/end_game_context';

const KDKGamePage = () => {
    const navigation = useNavigation();

    const { isEndGame } = useEndGameContext();

    const handleBackPress = () => {
        isEndGame ? null : navigation.goBack();
    }

    return (
        <View style={KDKGamePageStyle.container}>
            <View style={KDKGamePageStyle.topPart}>
                <View style={[{opacity: isEndGame ? 0.6 : 1}, KDKGamePageStyle.topPartText]}>
                    <TouchableOpacity onPress={() => {handleBackPress()}}>
                        <Image source={IMAGES.back_icon} />
                    </TouchableOpacity>
                    <Text style={KDKGamePageStyle.pageTitle}>ידעתי / לא ידעתי</Text>
                </View>
            </View>
            <Question />
        </View>
    );
};  

export default KDKGamePage;
