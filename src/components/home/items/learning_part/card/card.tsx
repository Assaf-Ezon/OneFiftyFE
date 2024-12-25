import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FC } from 'react';

import cardStyle from './card_style';

import { useNavigation } from '@react-navigation/native';
import { HomePageLearningCardProp } from '../../../../../Dataobjects/ComponentsProp/HomePage/HomePageLearningCardProp';

const LearningCard: FC<HomePageLearningCardProp> = ({ image, title, description, gameName }) => {
    const navigation = useNavigation();

    return (
        <View style={cardStyle.container}>
            <Image source={image} style={cardStyle.cardImage} />
            <View style={cardStyle.textContainer}>
                <Text style={cardStyle.titleText}>{title}</Text>
                <Text style={cardStyle.descriptionText}>{description}</Text>
                <TouchableOpacity style={cardStyle.btn} onPress={() => {navigation.navigate(gameName as never)}}>
                    <Text style={cardStyle.btnText}>התחל משחק</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LearningCard;