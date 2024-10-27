import { View, Text, ScrollView, Image } from 'react-native';
import { FC, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IMAGES } from '../../../image_handler';
import { GAMES } from '../../../game_objects';

import learningPartStyle from './continue_learning_style';
import LearningCard from '../card/card';


const ContinueLearningPart: FC = () => {
    const [games, setGames] = useState<[]>([]);
    
    useEffect(() => {
        const fetchGames = async () => {
            const gamesString = await AsyncStorage.getItem('games');
            setGames(gamesString ? JSON.parse(gamesString) : {});
        };

        fetchGames();
    }, []);
    

    return (
        <View style={learningPartStyle.container}>
            <View style={learningPartStyle.titleContainer}>
                <Text style={learningPartStyle.title}>המשך לומדות</Text>   
            </View>
            <View style={learningPartStyle.cardsContainerContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={learningPartStyle.cardsContainer}>
                    {
                        games.length == 0 ? 
                            <View style={learningPartStyle.playSomethingContainer}>
                                <Image source={IMAGES.profile_image} style={learningPartStyle.cardImage} />
                                <View style={learningPartStyle.textContainer}>
                                    <Text style={learningPartStyle.titleText}>שחק עכשיו</Text>
                                </View>
                            </View>
                        :
                            games.map(gameId => {
                                const game = GAMES.find(game => game.id === gameId);

                                if (!game) {
                                    return null;
                                }

                                return (
                                    <LearningCard id={game.id}
                                        image={game.image_route} 
                                        title={game.name}
                                        gameName={game.page_name}
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