import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FC } from 'react';
import { useNavigation } from '@react-navigation/native';

import learningPartStyle from './learning_style';
import LearningCard from './card/card';
import { IMAGES } from '../../../../image_handler';

const LearningPartHome: FC = () => {
    const navigation = useNavigation();

    return (
        <View style={learningPartStyle.container}>
            <View style={learningPartStyle.titleContainer}>
                <TouchableOpacity onPress={() => {navigation.navigate('learning')}}><Text style={learningPartStyle.seeEverything}>ראה הכל</Text></TouchableOpacity>
                <Text style={learningPartStyle.title}>לומדות מילים</Text>   
            </View>
            <View style={learningPartStyle.cardsContainerContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={learningPartStyle.cardsContainer}>
                    <LearningCard image={IMAGES.profile_image} 
                                title='ידעתי/לא ידעתי' 
                                description='משחקונים קצרים שבודקים האם הינך יודע את המילים.'
                                gameName='kdk'
                    />
                    <LearningCard image={IMAGES.profile_image} 
                                title='שאלון אמריקאי' 
                                description='בחר את הפירוש הנכון מבין ארבעת הפירושים.'
                                gameName='mc'
                    />
                </ScrollView>
            </View>
        </View>
    );
};

export default LearningPartHome;