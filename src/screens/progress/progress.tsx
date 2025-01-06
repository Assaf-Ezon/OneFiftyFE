import { View } from 'react-native';
import { useEffect } from 'react';

import ProgressScreenStyle from './progress_style';

import ProgressHeader from '../../components/progress/progress_header/progress_header';
import LevelsProgress from '../../components/progress/levels_progress/levels_progress';

const ProgressPage = ({ navigation }: {navigation: any}) => {
    useEffect(() => {
        navigation.setOptions({ gestureEnabled: false });
    }, []);

    return (
        <View>
            <ProgressHeader />
            <LevelsProgress />
        </View>
    );
};

export default ProgressPage;