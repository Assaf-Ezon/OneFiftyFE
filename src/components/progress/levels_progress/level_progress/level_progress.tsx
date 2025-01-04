import { Text, View, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { FC, useState } from 'react';

import { IMAGES } from '../../../../image_handler';

import LevelProgressStyle from './level_progress_style';

import { LevelProgressConfig } from '../../../../data_objects/components_config/level_progress_config';

const { height } = Dimensions.get('window');

const LevelProgress: FC<LevelProgressConfig> = ({ level }) => {
    const [isLevelOpen, setIsLevelOpen] = useState<boolean>(false);

    return (
        <View style={[{height: isLevelOpen ? height * 0.25 : height * 0.1}, LevelProgressStyle.container]}>
            <TouchableOpacity style={LevelProgressStyle.levelContainer} onPress={() => {setIsLevelOpen(prev => !prev)}}>
                <Image source={isLevelOpen ? IMAGES.open_dictionary : IMAGES.close_dictionary} />
                <Text style={LevelProgressStyle.title}>רמה {level}</Text>
            </TouchableOpacity>
            {
                isLevelOpen ?

                null

                : 

                null
            }
        </View>
    );
};  

export default LevelProgress;
