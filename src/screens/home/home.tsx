import { View, Image, Text, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { FC } from 'react';
import HomeScreenStyle from './home_style';
import BottomBar from '../../components/bottom_bar/bar/bar'
import { IMAGES } from '../../iamge_handler'

const HomePage: FC = () => {
    return (
        <View style={HomeScreenStyle.container}>
            <BottomBar 
                activeScreen={true}
                homePath={IMAGES.used_home}
                learningPath={IMAGES.unused_learning}
                leaderboardPath={IMAGES.unused_leaderboard}
                profilePath={IMAGES.unused_profile}
            />
        </View>
    );
};

export default HomePage;