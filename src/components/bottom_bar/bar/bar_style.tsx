import { StyleSheet } from 'react-native';
import { CONFIG } from '../../../config';

const barStyle = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '88%',
        left: '5%',
        width: '90%',
        height: '9%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 80,
        shadowOpacity: 0.05,
        shadowRadius: 2,
        backgroundColor: 'white',
        zIndex: CONFIG.zIndexLevels.bottom_bar,
        borderWidth: 0.2,
    },
});

export default barStyle;