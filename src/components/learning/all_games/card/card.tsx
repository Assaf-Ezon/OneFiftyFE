import { Text, View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { FC } from 'react';

import allGamesCardStyle from './card_style';

interface AllGamesCardProp {
    image: ImageSourcePropType;
    title: string;
}

const AllGamesCard: FC<AllGamesCardProp> = ({image, title}) => {
    return (
        <View style={allGamesCardStyle.card}>
            <TouchableOpacity style={allGamesCardStyle.cardBtn}>
                <Text style={allGamesCardStyle.cardBtnText}>ללומדה</Text>
            </TouchableOpacity>
            <Text style={allGamesCardStyle.cardTitle}>{title}</Text>
            <Image style={allGamesCardStyle.icon} source={image} />
        </View>
    );
};  

export default AllGamesCard;
