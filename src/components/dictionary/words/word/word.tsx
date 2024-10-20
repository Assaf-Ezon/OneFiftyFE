import { FC, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import WordStyle from "./word_style";

import { IMAGES } from '../../../../image_handler';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

interface WordProp {
    word: string;
    meaning: string;
}

const Word: FC<WordProp> = ({ word, meaning }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <View style={[WordStyle.container, {height:  isOpen ? height * 0.08 : height * 0.04}]}>
            <TouchableOpacity style={WordStyle.wordContainer} onPress={() => {setIsOpen(!isOpen)}}>
                <Text style={[WordStyle.word, {color: isOpen ? '#ff7518' : 'black'}]}>{word}</Text>
                <Image source={isOpen ? IMAGES.open_dictionary : IMAGES.close_dictionary} />
            </TouchableOpacity>
            {isOpen ? 
                <View style={WordStyle.meaningConatiner}>
                    <Text style={WordStyle.meaning}>{meaning}</Text>
                </View> 
            : null}
        </View>
    );
};

export default Word; 