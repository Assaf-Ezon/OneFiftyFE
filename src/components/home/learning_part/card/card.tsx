import { View, Text, Pressable, ImageSourcePropType, Image } from 'react-native';
import { FC } from 'react';
import cardStyle from './card_style';

interface LearningCardProp {
    image: ImageSourcePropType;
    title: string;
    description: string;
}

const LearningCard: FC<LearningCardProp> = ({ image, title, description }) => {
    return (
        <View style={cardStyle.container}>
            <Image source={image} style={cardStyle.cardImage} />
            <View style={cardStyle.textContainer}>
                <Text style={cardStyle.titleText}>{title}</Text>
                <Text style={cardStyle.descriptionText}>{description}</Text>
                <Pressable style={cardStyle.btn}>
                    <Text style={cardStyle.btnText}>התחל משחק</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default LearningCard;