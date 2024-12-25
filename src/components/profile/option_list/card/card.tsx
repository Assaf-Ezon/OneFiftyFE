import { View, Text, TouchableOpacity, ImageSourcePropType, Image } from 'react-native';
import { FC } from 'react';
import cardStyle from './card_style';

import { useNavigation } from '@react-navigation/native';
import { ProfileOptionsProp } from '../../../../Dataobjects/ComponentsProp/ProfilePage/ProfileOptionsProp';

const OptionCard: FC<ProfileOptionsProp> = ({ image, title, screenName, isActive }) => {
    const navigation = useNavigation();

    return (
        <View style={{opacity: isActive ? 1 : 0.6}}
        pointerEvents={isActive ? 'auto' : 'none'}>        
            <View style={cardStyle.line} />
            <TouchableOpacity style={cardStyle.container} onPress={() => {navigation.navigate(screenName as never)}}>
                <Text style={cardStyle.text}>{title}</Text>
                <Image source={image} />
            </TouchableOpacity>
        </View>

    );
};

export default OptionCard;