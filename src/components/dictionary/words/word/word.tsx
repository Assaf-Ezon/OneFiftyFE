import { FC, useEffect, useState } from "react";
import { View, Text } from "react-native";

import WordStyle from "./word_style";

interface WordProp {
    word: string;
    meaning: string;
    count: number;
}

const Word: FC<WordProp> = ({ word, meaning, count }) => {
    return (
        <View style={WordStyle.container}>
            <Text>{word}</Text>
            <Text>{meaning}</Text>
            <Text>{count}</Text>
        </View>
    );
};

export default Word;