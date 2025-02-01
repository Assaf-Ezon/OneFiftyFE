import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { FC, useState } from "react";

import WordStyle from "./word_style";

import { IMAGES } from '../../../../image_handler';;
import { DictionaryWordConfig } from "../../../../data_objects/components_config/dictionary_word_config";

const { height } = Dimensions.get('window');

const Word: FC<DictionaryWordConfig> = ({ word, meaning, success, failure }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <View style={[WordStyle.container, {height:  isOpen ? height * 0.18 : height * 0.04}]}>
            <TouchableOpacity style={WordStyle.wordContainer} onPress={() => {setIsOpen(!isOpen)}}>
                <Text style={[WordStyle.word, {color: isOpen ? '#ff7518' : 'black'}]} allowFontScaling={false}>{word}</Text>
                <Image source={isOpen ? IMAGES.open_dictionary : IMAGES.close_dictionary} />
            </TouchableOpacity>
            {isOpen ? 
                <View style={WordStyle.meaningConatiner}>
                    <Text style={WordStyle.meaning} allowFontScaling={false}>{meaning}</Text>
                    <View style={WordStyle.statisticsContainer}>
                        <Text>כשלונות: {failure}</Text>
                        <Text>הצלחות: {success}</Text>
                    </View>
                </View> 
            : null}
        </View>
    );
};

export default Word; 