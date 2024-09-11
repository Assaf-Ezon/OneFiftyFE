import { View, ImageSourcePropType } from 'react-native';
import { FC } from 'react';
import barStyle from './bar_style';
import BottomBarIcon from '../icon/icon';

interface bottomBarProp {
    activeScreen: string;
    homePath: ImageSourcePropType;
    learningPath: ImageSourcePropType;
    leaderboardPath: ImageSourcePropType;
    profilePath: ImageSourcePropType;
};

const BottomBar: FC<bottomBarProp> = ({ homePath, learningPath, leaderboardPath, profilePath, activeScreen }) => {
    return (
        <View style={barStyle.container}>
            <BottomBarIcon iconPath={profilePath} iconText='משתמש' activeScreen={activeScreen == "profile" ? true : false} screenName='' />
            <BottomBarIcon iconPath={leaderboardPath} iconText='מובילים' activeScreen={activeScreen == "leaderboard" ? true : false} screenName='leaderboard' />
            <BottomBarIcon iconPath={learningPath} iconText='למידה' activeScreen={activeScreen == "learning" ? true : false} screenName='learning' />
            <BottomBarIcon iconPath={homePath} iconText='בית' activeScreen={activeScreen == "home" ? true : false} screenName='home' />
        </View>
    );
};

export default BottomBar;