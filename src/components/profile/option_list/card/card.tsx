import { View, Text, TouchableOpacity, ImageSourcePropType, Image } from 'react-native';
import { FC } from 'react';
import cardStyle from './card_style';

import { useNavigation } from '@react-navigation/native';

interface LearningCardProp {
    image: ImageSourcePropType;
    title: string;
    screenName: string;
}

const OptionCard: FC<LearningCardProp> = ({ image, title, screenName }) => {
    const navigation = useNavigation();

    return (
        <>        
            <View style={cardStyle.line} />
            <TouchableOpacity style={cardStyle.container} onPress={() => {navigation.navigate(screenName)}}>
                <Text style={cardStyle.text}>{title}</Text>
                <Image source={image} />
            </TouchableOpacity>
        </>

    );
};

export default OptionCard;