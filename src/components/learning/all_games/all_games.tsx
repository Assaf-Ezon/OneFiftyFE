import { Text, View, TouchableOpacity, Image } from 'react-native';
import { IMAGES } from '../../../image_handler';

import allGamesStyle from './all_games_style';

const AllGames = () => {
    return (
        <View style={allGamesStyle.container}>
            <Text style={allGamesStyle.title}>כל הלומדות</Text>
        </View>
    );
};  

export default AllGames;
