import { Text, View, ScrollView } from 'react-native';
import { FC } from 'react';
import { IMAGES } from '../../../image_handler';
import { GAMES } from '../../../game_objects';

import allGamesStyle from './all_games_style';

import LearningCard from '../card/card';

const AllGamesPart: FC = () => {
    return (
        <View style={allGamesStyle.container}>
            <View style={allGamesStyle.titleContainer}>
                <Text style={allGamesStyle.title}>כל הלומדות</Text>   
            </View>
            <View style={allGamesStyle.cardsContainerConatiner}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={allGamesStyle.cardsContainer}>
                {
                    GAMES.map(game => {
                        return (
                            <LearningCard image={IMAGES.profile_image} 
                                title={game.name} 
                                gameName={game.page_name}
                                key={game.id}
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
