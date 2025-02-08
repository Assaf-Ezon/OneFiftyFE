import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FC, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import learningPartStyle from './learning_style';

import { GAMES } from '../../../../data_objects/enums/game_objects';
import { Screens } from '../../../../data_objects/enums/screens';

import GameCard from '../../../game_card/game_card';

const getRandomIds = (): [number, number] => {
    const gameIds = Object.values(GAMES).map((game) => game.id);
    const minId = Math.min(...gameIds);
    const maxId = Math.max(...gameIds);

    let first = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
    let second;

    do {
      second = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
    } while (second === first);

    return [first, second];
};

const LearningPartHome: FC = () => {
    const navigation = useNavigation();

    const [randomIds, setRandomIds] = useState<[number, number]>(getRandomIds());
    console.log(randomIds);
    return (
        <View style={learningPartStyle.container}>
            <View style={learningPartStyle.titleContainer}>
                <TouchableOpacity onPress={() => {navigation.navigate(Screens.LEARNING as never)}}>
                    <Text style={learningPartStyle.seeEverything} allowFontScaling={false}>ראו הכל</Text>
                </TouchableOpacity>
                <Text style={learningPartStyle.title} allowFontScaling={false}>לומדות מילים</Text>   
            </View>
            <View style={learningPartStyle.cardsContainerContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={learningPartStyle.cardsContainer}>
                    <View style={learningPartStyle.blank} />
                    {
                        randomIds.map((id) => {
                                const game = Object.values(GAMES).find((game) => game.id === id);
                                return (
                                    game ? 
                                        <GameCard key={game.id}
                                        id={game.id}
                                        image={game.image_route} 
                                        title={game.name} 
                                        description={game.description}
                                        gameName={game.page_name}
                                />
                                : null
                                )
                        })
                    }
                </ScrollView>
            </View>
        </View>
    );
};

export default LearningPartHome;