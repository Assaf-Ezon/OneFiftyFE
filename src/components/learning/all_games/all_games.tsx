import { Text, View, ScrollView } from 'react-native';
import { FC } from 'react';
import { IMAGES } from '../../../image_handler';

import allGamesStyle from './all_games_style';

import LearningCard from '../card/card';

const AllGamesPart: FC = () => {
    return (
        <View style={allGamesStyle.container}>
            <View style={allGamesStyle.titleContainer}>
                <Text style={allGamesStyle.title}>כל הלומדות</Text>   
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={allGamesStyle.cardsContainer}>
                <LearningCard image={IMAGES.profile_image} 
                            title='ידעתי/לא ידעתי' 
                />
                <LearningCard image={IMAGES.profile_image} 
                            title='שאלון אמריקאי' 
                />
                <LearningCard image={IMAGES.profile_image} 
                            title='מתח את הקו' 
                />
            </ScrollView>
        </View>
    );
};

export default AllGamesPart;
