import { Text, View, TouchableOpacity, Image } from 'react-native';
import { IMAGES } from '../../../image_handler';

import allGamesStyle from './all_games_style';

import AllGamesCard from './card/card';

const AllGames = () => {
    return (
        <View style={allGamesStyle.container}>
            <Text style={allGamesStyle.title}>כל הלומדות</Text>
            <View style={allGamesStyle.cards}>
                <AllGamesCard image={IMAGES.profile_image} title={'ידעתי/לא ידעתי'} />
                <AllGamesCard image={IMAGES.profile_image} title={'שאלון אמריקאי'} /> 
                <AllGamesCard image={IMAGES.profile_image} title={'מתח את הקו'} />  
            </View>
        </View>
    );
};  

export default AllGames;
