import { Text, View, ScrollView } from 'react-native';
import { FC } from 'react';
import { IMAGES } from '../../../image_handler';
import { GAMES } from '../../../data_objects/enums/game_objects';

import allGamesStyle from './all_games_style';

import GameCard from '../../game_card/game_card';

const AllGamesPart: FC = () => {
    return (
        <View style={allGamesStyle.container}>
            <View style={allGamesStyle.titleContainer}>
                <Text style={allGamesStyle.title} allowFontScaling={false}>כל הלומדות</Text>   
            </View>
            <View style={allGamesStyle.cardsContainerConatiner}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={allGamesStyle.cardsContainer}>
                <View style={allGamesStyle.blank} />
                {
                    Object.entries(GAMES).map(([gameName, gameValue]) => {
                        return (
                            <GameCard key={gameValue.id}
                                id={gameValue.id}
                                image={gameValue.image_route} 
                                title={gameValue.name} 
                                description={gameValue.description}
                                gameName={gameValue.page_name}
                            />
                        );
                    })
                }
                </ScrollView>
            </View>
        </View>
    );
};

export default AllGamesPart;
