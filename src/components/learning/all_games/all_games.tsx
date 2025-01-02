import { Text, View, ScrollView } from 'react-native';
import { FC } from 'react';
import { IMAGES } from '../../../image_handler';
import { GAMES } from '../../../game_objects';

import allGamesStyle from './all_games_style';

import GameCard from '../../game_card/game_card';

const AllGamesPart: FC = () => {
    return (
        <View style={allGamesStyle.container}>
            <View style={allGamesStyle.titleContainer}>
                <Text style={allGamesStyle.title}>כל הלומדות</Text>   
            </View>
            <View style={allGamesStyle.cardsContainerConatiner}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={allGamesStyle.cardsContainer}>
                <View style={allGamesStyle.blank} />
                {
                    GAMES.map(game => {
                        return (
                            <GameCard key={game.id}
                                id={game.id}
                                image={IMAGES.profile_image} 
                                title={game.name} 
                                description={game.description}
                                gameName={game.page_name}
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
