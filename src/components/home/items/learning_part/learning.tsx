import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FC } from 'react';
import { useNavigation } from '@react-navigation/native';

import learningPartStyle from './learning_style';
import LearningCard from './card/card';

import { IMAGES } from '../../../../image_handler';
import { GAMES } from '../../../../game_objects';
import { Screens } from '../../../../Data objects/Enums/Screens/Screens';

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
                        GAMES.map(game => {
                            return (
                                <LearningCard image={IMAGES.profile_image} 
                                    title={game.name} 
                                    description={game.description}
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

export default LearningPartHome;