import { WordGroups } from "../../../data_objects/enums/word_groups";

const wordsGroupToTranslation = (wordsGroup: string) => {
    switch (wordsGroup) {
        case WordGroups.NEW:
            return '"מילים חדשות"';
        case WordGroups.INCORRECT:
            return '"מילים שלא הצלחתי"';
        case WordGroups.PRACTICED:
            return '"מילים שתרגלתי"';
        case WordGroups.SMART:
            return '"תרגול חכם"';
        default:
            return '';
    }
};

export default wordsGroupToTranslation;