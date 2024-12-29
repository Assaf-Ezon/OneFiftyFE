import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FC } from 'react';

import cardStyle from './card_style';

import { useNavigation } from '@react-navigation/native';
import { HomePageLearningCardConfig } from '../../../../../data_objects/components_config/home_page/home_page_learning_card_config';
import { useLearningSettingsContext } from '../../../../../context/settings_context/learning_context';
import { Screens } from '../../../../../data_objects/enums/screens';

const LearningCard: FC<HomePageLearningCardConfig> = ({ image, title, description, gameName }) => {
    const navigation = useNavigation();

    const { toggleLearningSettings, isSettingsFilled } = useLearningSettingsContext();
    
    const goToGamePage = () => {
        if (isSettingsFilled()) {
            navigation.navigate(gameName as never);
        } else {
            toggleLearningSettings();
            navigation.navigate(Screens.LEARNING as never);
        }
    };

    return (
        <View style={cardStyle.container}>
            <Image source={image} style={cardStyle.cardImage} />
            <View style={cardStyle.textContainer}>
                <Text style={cardStyle.titleText}>{title}</Text>
                <Text style={cardStyle.descriptionText}>{description}</Text>
                <TouchableOpacity style={cardStyle.btn} onPress={() => {goToGamePage()}}>
                    <Text style={cardStyle.btnText}>התחל משחק</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LearningCard;