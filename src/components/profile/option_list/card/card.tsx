import { View, Text, TouchableOpacity, ImageSourcePropType, Image } from 'react-native';
import { FC } from 'react';
import cardStyle from './card_style';

interface LearningCardProp {
    image: ImageSourcePropType;
    title: string;
}

const OptionCard: FC<LearningCardProp> = ({ image, title }) => {
    return (
        <>        
            <View style={cardStyle.line} />
            <TouchableOpacity style={cardStyle.container} onPress={() => {}}>
                <Text style={cardStyle.text}>{title}</Text>
                <Image source={image} />
            </TouchableOpacity>
        </>

    );
};

export default OptionCard;