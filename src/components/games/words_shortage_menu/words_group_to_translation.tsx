const wordsGroupToTranslation = (wordsGroup: string) => {
    switch (wordsGroup) {
        case 'new':
            return '"מילים חדשות"';
        case 'incorrect':
            return '"מילים שלא הצלחתי"';
        case 'practiced':
            return '"מילים שתרגלתי"';
        default:
            return '';
    }
};

export default wordsGroupToTranslation;