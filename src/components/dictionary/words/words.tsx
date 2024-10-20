import { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";

import WordsStyle from "./words_style";
import Word from './word/word';

import { useSettings } from '../../../context/dictionary_context/settings_context';

const Words = () => {
    const { settings } = useSettings();
    return (
        <ScrollView>
            <Word word='אִסְטְנִיס' meaning='אנין דעת, מעודן, שאינו יכול לסבול צער, מיאוס וגועל' count={1} />
            <Word word='אִטֵּר' meaning='שמאלי' count={2} />
            <Word word='בּוֹהֵק' meaning='מפיץ אור' count={3} />
            <Word word='אֵימָתַי' meaning='מתי' count={4} />
            <Word word='גִּיל' meaning='שמחה' count={5} />
        </ScrollView>
    );
};

export default Words;