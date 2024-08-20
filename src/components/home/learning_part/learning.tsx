import { View, Text, Pressable, ScrollView } from 'react-native';
import { FC } from 'react';
import learningPartStyle from './learning_style';
import LearningCard from './card/card';
import { IMAGES } from '../../../image_handler';

const LearningPartHome: FC = () => {
    return (
        <View style={learningPartStyle.container}>
            <View style={learningPartStyle.titleContainer}>
                <Pressable><Text style={learningPartStyle.seeEverything}>ראה הכל</Text></Pressable>
                <Text style={learningPartStyle.title}>לומדות מילים</Text>   
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={learningPartStyle.cardsContainer}>
                <LearningCard image={IMAGES.profile_image} 
                            title='ידעתי/לא ידעתי' 
                            description='משחקונים קצרים שבודקים האם הינך יודע את המילים.'
                />
                <LearningCard image={IMAGES.profile_image} 
                            title='שאלון אמריקאי' 
                            description='בחר את הפירוש הנכון מבין ארבעת הפירושים.'
                />
            </ScrollView>
        </View>
    );
};

export default LearningPartHome;