import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FC } from 'react';
import { useNavigation } from '@react-navigation/native';

import learningPartStyle from './learning_style';

import { IMAGES } from '../../../../image_handler';
import { GAMES } from '../../../../data_objects/enums/game_objects';
import { Screens } from '../../../../data_objects/enums/screens';

import GameCard from '../../../game_card/game_card';

const LearningPartHome: FC = () => {
    const navigation = useNavigation();

    return (
        <View style={learningPartStyle.container}>
            <View style={learningPartStyle.titleContainer}>
                <TouchableOpacity onPress={() => {navigation.navigate(Screens.LEARNING as never)}}><Text style={learningPartStyle.seeEverything}>ראה הכל</Text></TouchableOpacity>
                <Text style={learningPartStyle.title}>לומדות מילים</Text>   
            </View>
            <View style={learningPartStyle.cardsContainerContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={learningPartStyle.cardsContainer}>
                    <View style={learningPartStyle.blank} />
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

export default LearningPartHome;