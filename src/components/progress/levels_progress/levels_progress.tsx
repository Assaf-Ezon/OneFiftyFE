import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';

import LevelsProgressStyle from './levels_progress_style';

import LevelProgress from './level_progress/level_progress';

const LevelsProgress = () => {
    return (
        <View style={LevelsProgressStyle.ScrollviewContainer}>
            <ScrollView contentContainerStyle={LevelsProgressStyle.mainPart}
                    showsVerticalScrollIndicator={false}>
                
                <LevelProgress level={0} />
                <LevelProgress level={1} />
                <LevelProgress level={2} />
                <LevelProgress level={3} />
                <LevelProgress level={4} />
                <LevelProgress level={5} />
                <LevelProgress level={6} />
                <LevelProgress level={7} />
                <LevelProgress level={8} />
            </ScrollView>
        </View>
    );
};  

export default LevelsProgress;
