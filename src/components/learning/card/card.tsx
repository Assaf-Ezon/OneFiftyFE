import { View, Text, TouchableOpacity, ImageSourcePropType, Image } from 'react-native';
import { FC } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import cardStyle from './card_style';

import { useNavigation } from '@react-navigation/native';
import { LearningPageLearningCardConfig } from '../../../data_objects/components_config/learning_page/learning_page_learning_card_config';

const LearningCard: FC<LearningPageLearningCardConfig> = ({ id, image, title, gameName }) => {
    const navigation = useNavigation();

    const handlePress = async () => {
        try {
            const games = await AsyncStorage.getItem('games');
            const parsedGames = games ? JSON.parse(games) : [];
            
            const updatedGames = parsedGames.includes(id) ? parsedGames : [...parsedGames, id];
            await AsyncStorage.setItem('games',  JSON.stringify(updatedGames));
        } catch (error) {
            console.error('Error adding game: ', error);
        }

        navigation.navigate(gameName as never);
    };

    return (
        <View style={cardStyle.container}>
            <Image source={image} style={cardStyle.cardImage} />
            <View style={cardStyle.textContainer}>
                <Text style={cardStyle.titleText}>{title}</Text>
                <TouchableOpacity style={cardStyle.btn} onPress={() => {handlePress()}}>
                    <Text style={cardStyle.btnText}>התחל משחק</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LearningCard;