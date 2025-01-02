import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FC } from 'react';

import GameCardStyle from './game_card_style';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GameCardConfig } from '../../data_objects/components_config/game_card_config';
import { Screens } from '../../data_objects/enums/screens';
import { useLearningSettingsContext } from '../../context/settings_context/learning_context';

const GameCard: FC<GameCardConfig> = ({ id, image, title, description, gameName }) => {
    const navigation = useNavigation();

    const { toggleLearningSettings, isSettingsFilled } = useLearningSettingsContext();
    
    const goToGamePage = async () => {
        try {
            const games = await AsyncStorage.getItem('games');
            const parsedGames = games ? JSON.parse(games) : [];
            
            const updatedGames = parsedGames.includes(id) ? parsedGames : [...parsedGames, id];
            await AsyncStorage.setItem('games',  JSON.stringify(updatedGames));
        } catch (error) {
            console.error('Error adding game: ', error);
        }

        if (isSettingsFilled()) {
            navigation.navigate(gameName as never);
        } else {
            toggleLearningSettings();
            navigation.navigate(Screens.LEARNING as never);
        }
    };

    return (
        <View style={GameCardStyle.container}>
            <Image source={image} style={GameCardStyle.cardImage} />
            <View style={GameCardStyle.textContainer}>
                <Text style={GameCardStyle.titleText}>{title}</Text>
                <Text style={GameCardStyle.descriptionText}>{description}</Text>
                <TouchableOpacity style={GameCardStyle.btn} onPress={() => {goToGamePage()}}>
                    <Text style={GameCardStyle.btnText}>התחל משחק</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default GameCard;