import { View, Text, ScrollView, Image } from 'react-native';
import { FC, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IMAGES } from '../../../image_handler';
import { GAMES } from '../../../data_objects/enums/game_objects';

import learningPartStyle from './continue_learning_style';
import GameCard from '../../game_card/game_card';


const ContinueLearningPart: FC = () => {
    const [games, setGames] = useState<[]>([]);
    
    useEffect(() => {
        const fetchGames = async () => {
            const gamesString = await AsyncStorage.getItem('games');
            setGames(gamesString ? JSON.parse(gamesString) : []);
        };

        fetchGames();
    }, []);
    

    return (
        <View style={learningPartStyle.container}>
            <View style={learningPartStyle.titleContainer}>
                <Text style={learningPartStyle.title} allowFontScaling={false}>המשיכו לומדות</Text>   
            </View>
            <View style={learningPartStyle.cardsContainerContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={learningPartStyle.cardsContainer}>
                    <View style={learningPartStyle.blank} />
                    {
                        games.length == 0 ? 
                            <View style={learningPartStyle.playSomethingContainer}>
                                <Image source={IMAGES.mc} style={learningPartStyle.cardImage} />
                                <View style={learningPartStyle.textContainer}>
                                    <Text style={learningPartStyle.titleText} allowFontScaling={false}>שחקו עכשיו</Text>
                                </View>
                            </View>
                        :
                            Object.entries(GAMES).map(([gameName, gameValue]) => {
                                const game = games.find((value) => value === gameValue.id);

                                if (!game) {
                                    return null;
                                }

                                return (
                                    <GameCard key={gameValue.id}
                                        id={gameValue.id}
                                        image={gameValue.image_route} 
                                        title={gameValue.name}
                                        description={gameValue.description}
                                        gameName={gameValue.page_name}
                                    />  
                                )
                            })
                    }
                </ScrollView>
            </View>
        </View>
    );
};

export default ContinueLearningPart;