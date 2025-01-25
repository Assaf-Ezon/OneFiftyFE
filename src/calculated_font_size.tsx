import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// width and height of iphone 14 pro  
const ORIGINAL_WIDTH = 393;
const ORIGINAL_HEIGHT = 852;

const calculateFontSize = (baseFontSize: number, baseWidth = ORIGINAL_WIDTH, baseHeight = ORIGINAL_HEIGHT) => {
    // Calculate the screen ratio
    const widthRatio = width / baseWidth;
    const heightRatio = height / baseHeight;

    // Use the smaller ratio (to maintain proportional scaling)
    const screenRatio = Math.min(widthRatio, heightRatio);

    // Return the adjusted font size
    return Math.round(baseFontSize * screenRatio);
};

export default calculateFontSize;