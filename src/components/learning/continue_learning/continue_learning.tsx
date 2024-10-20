import { View, Text, ScrollView } from 'react-native';
import { FC } from 'react';
import { IMAGES } from '../../../image_handler';

import learningPartStyle from './continue_learning_style';
import LearningCard from '../card/card';


const ContinueLearningPart: FC = () => {
    return (
        <View style={learningPartStyle.container}>
            <View style={learningPartStyle.titleContainer}>
                <Text style={learningPartStyle.title}>המשך לומדות</Text>   
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={learningPartStyle.cardsContainer}>
                <LearningCard image={IMAGES.profile_image} 
                            title='ידעתי/לא ידעתי' 
                            gameName='kdk'
                />
                <LearningCard image={IMAGES.profile_image} 
                            title='שאלון אמריקאי' 
                            gameName='mc'
                />
            </ScrollView>
        </View>
    );
};

export default ContinueLearningPart;