import { View, ImageSourcePropType } from 'react-native';
import { FC } from 'react';
import barStyle from './bar_style';
import BottomBarIcon from '../icon/icon';

interface bottomBarProp {
    activeScreen: boolean;
    homePath: ImageSourcePropType;
    learningPath: ImageSourcePropType;
    leaderboardPath: ImageSourcePropType;
    profilePath: ImageSourcePropType;
};

const BottomBar: FC<bottomBarProp> = ({ homePath, learningPath, leaderboardPath, profilePath, activeScreen }) => {
    return (
        <View style={barStyle.container}>
            <BottomBarIcon iconPath={profilePath} iconText='משתמש' activeScreen={false} />
            <BottomBarIcon iconPath={leaderboardPath} iconText='מובילים' activeScreen={false} />
            <BottomBarIcon iconPath={learningPath} iconText='למידה' activeScreen={false} />
            <BottomBarIcon iconPath={homePath} iconText='בית' activeScreen={activeScreen} />
        </View>
    );
};

export default BottomBar;